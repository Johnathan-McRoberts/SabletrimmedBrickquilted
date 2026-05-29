using Microsoft.OpenApi.Models;

namespace SabletrimmedBrickquilted
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                // The UI title/version label; not the OpenAPI version
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            WebApplication app = builder.Build();

            app.UseSwagger(); // Generates /swagger/v1/swagger.json
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Books API V1");
            });

            app.MapControllers();
            app.Run();

            //var builder = WebApplication.CreateBuilder(args);

            //// Add services to the container.

            //builder.Services.AddControllers();

            //var app = builder.Build();

            //// Configure the HTTP request pipeline.

            //app.UseHttpsRedirection();

            //app.UseAuthorization();

            //app.MapControllers();

            //app.Run();
        }
    }
}