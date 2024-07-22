using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.Certificate;
using Backend.DAL;

namespace Backend
{
    public class Startup
    {
        private ILogger _logger;
        private DatabaseQuery _query;
        public Startup(Microsoft.AspNetCore.Hosting.IWebHostEnvironment evm)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(evm.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{evm.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            AppSettings.Instance.SetConfiguration(Configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvc().AddNewtonsoftJson();
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
            services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme)
                .AddCertificate();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            _logger = logger;
            _query = new DatabaseQuery(_logger);
            var resetResult = _query.ResetDatabase();
            if (resetResult)
            {
                _logger.LogInformation("Database successfully reset!");
            }
            else
            {
                _logger.LogWarning("Database could not be reset!");
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCertificateForwarding();
            app.UseAuthentication();
            app.UseCors("MyPolicy");
            app.UsePathBase("/api");
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
