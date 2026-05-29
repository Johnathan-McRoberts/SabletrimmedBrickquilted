using Microsoft.Extensions.Options;

using SabletrimmedBrickquilted.Dtos.Configuration;

namespace SabletrimmedBrickquilted.API.Extensions
{
    public static class ConfigurationExtensions
    {
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
    }
}
