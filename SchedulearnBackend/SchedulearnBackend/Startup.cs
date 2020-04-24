using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;
using SchedulearnBackend.DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
            services.AddDbContext<UserContext>(opt => opt.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("UserContext")));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    serviceScope.ServiceProvider.GetService<UserContext>().Database.Migrate();
                }
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
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
            });

            app.UseDotNetify(config =>
            {
                config.UseJsonSerializerSettings(ignoredPropertyNames => new JsonSerializerSettings
                {
                    
                });
            });

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}