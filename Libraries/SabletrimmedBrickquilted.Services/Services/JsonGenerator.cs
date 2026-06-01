using System.Text;

using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class JsonGenerator : IJsonGenerator
    {
        public async Task<byte[]> Generate<T>(IEnumerable<T> data)
        {
            JsonSerializerSettings? options = new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                NullValueHandling = NullValueHandling.Ignore,
                TypeNameHandling = TypeNameHandling.None
            };

            string json =
                JsonConvert.SerializeObject(data, Formatting.Indented, options);

            await using MemoryStream stream = new MemoryStream();
            await using StreamWriter streamWriter = new StreamWriter(stream);

            streamWriter.Write(json);
            streamWriter.Flush();
            stream.Position = 0;

            await streamWriter.FlushAsync();

            return Encoding.UTF8.GetPreamble().Concat(stream.ToArray()).ToArray();
        }
    }
}
