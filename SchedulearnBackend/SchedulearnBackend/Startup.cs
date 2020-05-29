using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using SchedulearnBackend.DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using SchedulearnBackend.Services;
using SchedulearnBackend.Middleware;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Data.Common;
using Microsoft.Data.SqlClient;
using System.Data;

namespace SchedulearnBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMemoryCache();

            services.AddScoped<DbConnection>((serviceProvider) => 
            {
                var dbConnection = new SqlConnection(Configuration.GetConnectionString("SchedulearnDatabase"));
                dbConnection.Open();
                return dbConnection;
            });

            services.AddScoped<DbTransaction>((serviceProvider) =>
            {
                var dbConnection = serviceProvider
                    .GetService<DbConnection>();

                return dbConnection.BeginTransaction(IsolationLevel.ReadCommitted);
            });

            services.AddScoped<DbContextOptions<SchedulearnContext>>((serviceProvider) =>
            {
                var dbConnection = serviceProvider.GetService<DbConnection>();
                return new DbContextOptionsBuilder<SchedulearnContext>()
                    .UseLazyLoadingProxies()
                    .UseSqlServer(dbConnection)
                    .Options;
            });

            services.AddScoped<SchedulearnContext>((serviceProvider) =>
            {
                var transaction = serviceProvider.GetService<DbTransaction>();
                var options = serviceProvider.GetService<DbContextOptions<SchedulearnContext>>();
                var context = new SchedulearnContext(options);
                context.Database.UseTransaction(transaction);
                return context;
            });

            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

            services.AddScoped<EmailService>();
            services.AddScoped<UserService>();
            services.AddScoped<LimitService>();
            services.AddScoped<TeamService>();
            services.AddScoped<TopicService>();
            services.AddScoped<LearningDayService>();
            services.AddScoped<SuggestionService>();

            services.AddControllers().AddNewtonsoftJson();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            }

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<SchedulearnContext>().Database.Migrate();
            }

            app.UseCors(builder => builder
             .AllowAnyMethod()
             .AllowAnyHeader()
             .WithOrigins("http://localhost:3000")
             .AllowCredentials());

            app.UseWebSockets();
            app.UseMiddleware(typeof(TransactionFilter));

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run(async (context) =>
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync("{error: \"Endpoint does not exist\"}");
            });
        }
    }
}