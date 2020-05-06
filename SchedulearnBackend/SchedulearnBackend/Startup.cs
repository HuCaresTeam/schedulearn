using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;
using SchedulearnBackend.DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using SchedulearnBackend.Services;
using SchedulearnBackend.Middleware;
using Microsoft.AspNetCore.Http;

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
            services.AddSignalR();
            services.AddDotNetify();
            services.AddDbContext<SchedulearnContext>(opt => opt.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("SchedulearnDatabase")));
            services.AddScoped<UserService>();
            services.AddScoped<LimitService>();
            services.AddScoped<TeamService>();
            services.AddControllers().AddNewtonsoftJson();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    serviceScope.ServiceProvider.GetService<SchedulearnContext>().Database.Migrate();
                }
            }
            else
            {
                app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            }

            app.UseCors(builder => builder
             .AllowAnyMethod()
             .AllowAnyHeader()
             .WithOrigins("http://localhost:3000")
             .AllowCredentials());

            app.UseWebSockets();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<DotNetifyHub>("/dotnetify");
                endpoints.MapControllers();
            });

            app.UseDotNetify(config =>
            {
                config.UseJsonSerializerSettings(ignoredPropertyNames => new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                });
            });

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}