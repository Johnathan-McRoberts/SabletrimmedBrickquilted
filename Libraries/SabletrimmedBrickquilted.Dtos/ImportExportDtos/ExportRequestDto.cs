namespace SabletrimmedBrickquilted.Dtos.ImportExportDtos
{
    public class ExportRequestDto
    {
        public string UserId { get; set; } = string.Empty;

        public string DocumentType { get; set; } = string.Empty;

        public string[] Options { get; set; } = Array.Empty<string>();
    }
}
