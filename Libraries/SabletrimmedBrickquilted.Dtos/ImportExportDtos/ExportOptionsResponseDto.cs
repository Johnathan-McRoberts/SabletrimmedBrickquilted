namespace SabletrimmedBrickquilted.Dtos.ImportExportDtos
{
    public class ExportOptionsResponseDto
    {
        public DocumentType[] DocumentTypes { get; set; } = Array.Empty<DocumentType>();
        public ExportOption[] ExportOptions { get; set; } = Array.Empty<ExportOption>();
    }

    public class DocumentType
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ExportOption
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string[] SupportedDocumentTypes { get; set; } = Array.Empty<string>();
    }
}
