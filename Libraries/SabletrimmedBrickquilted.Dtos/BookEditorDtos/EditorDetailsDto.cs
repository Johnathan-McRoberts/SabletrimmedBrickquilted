namespace SabletrimmedBrickquilted.Dtos.BookEditorDtos
{
    public class EditorDetailsDto
    {
        public string[] AuthorNames { get; set; } = Array.Empty<string>();
        public string[] CountryNames { get; set; } = Array.Empty<string>();
        public string[] Languages { get; set; } = Array.Empty<string>();
        public string[] Tags { get; set; } = Array.Empty<string>();
    }
}
