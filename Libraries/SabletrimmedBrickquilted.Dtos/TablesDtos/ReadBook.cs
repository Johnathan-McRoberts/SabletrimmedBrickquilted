namespace SabletrimmedBrickquilted.Dtos.TablesDtos
{
    public class ReadBook
    {
        public string DateString { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string Author { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public uint Pages { get; set; }

        public string Format { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public string Nationality { get; set; } = string.Empty;

        public string OriginalLanguage { get; set; } = string.Empty;

        public string Notes { get; set; } = string.Empty;

        public string[] Tags { get; set; } = Array.Empty<string>();

        public string User { get; set; } = string.Empty;

        public string Id { get; set; } = string.Empty;
    }
}
