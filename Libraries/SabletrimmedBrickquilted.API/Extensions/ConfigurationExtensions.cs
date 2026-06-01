using System.Reflection;

using Microsoft.Extensions.Options;

using SabletrimmedBrickquilted.Core.Configuration;

namespace SabletrimmedBrickquilted.API.Extensions
{
    public static class ConfigurationExtensions
    {
        public const string NamespacePrefix = "SabletrimmedBrickquilted.";

        public static IServiceCollection AddMongoDatabaseConfig(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            IConfigurationSection mongoDatabaseConfig =
                configuration.GetSection("MongoDatabaseConfig");

            services.Configure<MongoDatabaseConfig>(mongoDatabaseConfig);

            services.AddSingleton(
                typeof(MongoDatabaseConfig),
                x => x.GetService<IOptions<MongoDatabaseConfig>>()!.Value);

            return services;
        }

        public static void ConfigureCors(this WebApplicationBuilder builder)
        {
            string[] allowedOrigins = 
                builder.Configuration
                .GetSection("Cors:AllowedOrigins")
                .Get<string[]>() ?? [];

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ModuleFederation", policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
        }

        public static void ConfigureApplicationServices(
            this WebApplicationBuilder builder)
        {
            RegisterServicesFromAssemblies(builder);

            ILogger<Program> logger =
                builder.Services.BuildServiceProvider().GetRequiredService<ILogger<Program>>();
            logger.LogInformation(
                "Application services configured. Scanned assemblies for service registrations.");
        }

        private static void RegisterServicesFromAssemblies(WebApplicationBuilder builder)
        {
            Assembly[] assemblies =
                Directory
                    .GetFiles(AppDomain.CurrentDomain.BaseDirectory, $"{NamespacePrefix}*.dll")
                    .Select(Assembly.LoadFrom)
                    .ToArray();

            builder.Services.Scan(scan => scan
                .FromAssemblies(assemblies)
                .AddClasses(c => c
                    .Where(x =>
                        x.Namespace?.StartsWith(NamespacePrefix) == true
                        && x.GetInterfaces()
                            .Any(i => i.Namespace?.StartsWith(NamespacePrefix) == true)
                        && !x.IsAbstract
                        && !x.IsGenericTypeDefinition))
                .As(t =>
                        t.GetInterfaces()
                            .Where(i => i.Namespace?.StartsWith(NamespacePrefix) == true))
                .WithTransientLifetime());
        }
    }
}
