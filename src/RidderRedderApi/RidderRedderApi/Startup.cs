using System;
using System.Reflection;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using MySql.Data;
using Swashbuckle.AspNetCore.Swagger;

using RidderRedderApi.Repositories;
using RidderRedderApi.Services;

namespace RidderRedderApi {
    /// <summary>
    /// Startup.
    /// </summary>
    public class Startup {

        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Startup"/> class.
        /// </summary>
        /// <param name="configuration">Configuration.</param>
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">Services.</param>
        public void ConfigureServices(IServiceCollection services) {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddMvc();

            services.AddSwaggerGen(x => {

                x.SwaggerDoc("v1.0", new Info {
                    Title = "Ridder Redder API",
                    Version = "v1.0",
                    Description = "Documentation for the Ridder Redder API"
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.XML";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                x.IncludeXmlComments(xmlPath);
            });

            services.AddDbContext<ApplicationContext>(
                options => options.UseMySQL(
                    Configuration.GetConnectionString("LocalMySQLConnection")
                )
            );

            services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddCors();

            services.AddMvcCore().AddApiExplorer();

            //dependency injection
            services.AddScoped<MonsterRepository>();
            services.AddScoped<MonsterService>();
            services.AddScoped<InventoryRepository>();
            services.AddScoped<InventoryService>();
            services.AddScoped<PlayerRepository>();
            services.AddScoped<PlayerService>();
			services.AddScoped<LandmarkRepository>();
			services.AddScoped<LandmarkService>();
        }

        /// <summary>
        /// Configure the specified app, env and ctx.
        /// </summary>
        /// <param name="app">App.</param>
        /// <param name="env">Env.</param>
        /// <param name="ctx">Context.</param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationContext ctx) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseHsts();
            }


            app.UseStaticFiles();
            app.UseSwagger();
            app.UseSwaggerUI(x => {
                x.SwaggerEndpoint("/swagger/v1.0/swagger.json", "Ridder Redder API");
                x.RoutePrefix = String.Empty;
            });


            app.UseCors("CorsPolicy");
            app.UseMvc();


            DBInitializer.Initialize(ctx);
        }
    }
}
