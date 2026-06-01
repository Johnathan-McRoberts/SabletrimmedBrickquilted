namespace SabletrimmedBrickquilted.Dtos.BookEditorDtos
{
    public class AddBookRequestDto
    {
        public DateTime Date { get; set; }

        public string Author { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public ushort Pages { get; set; }

        public string Note { get; set; } = string.Empty;

        public string Nationality { get; set; } = string.Empty;

        public string OriginalLanguage { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public List<string> Tags { get; set; } = [];

        public string UserId { get; set; } = string.Empty;

        public string Format { get; set; } = string.Empty;
    }

}
