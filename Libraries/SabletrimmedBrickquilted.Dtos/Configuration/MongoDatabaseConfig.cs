namespace SabletrimmedBrickquilted.Dtos.Configuration
{
    public class MongoDatabaseConfig
    {
        public string ExportDirectory { get; set; } = string.Empty;
        public string DatabaseConnectionString { get; set; } = string.Empty;
        public bool UseRemoteHost { get; set; } = false;
        public string RemoteHost { get; set; } = string.Empty;
        public int RemotePort { get; set; } = 10255;
        public string RemoteUserName { get; set; } = string.Empty;
        public string RemotePassword { get; set; } = string.Empty;
        public bool RemoteUseSsl { get; set; } = true;
        public bool RemoteRetryWrites { get; set; } = false;
    }
}
