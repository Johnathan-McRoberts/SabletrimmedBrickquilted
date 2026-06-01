namespace SabletrimmedBrickquilted.Dtos.TablesDtos
{
    public class TalliedBook
    {
        public string DateString { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string Author { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string Format { get; set; } = string.Empty;

        public uint Pages { get; set; }

        public uint TotalBooks { get; set; }

        public uint TotalBookFormat { get; set; }

        public uint TotalComicFormat { get; set; }

        public uint TotalAudioFormat { get; set; }

        public uint TotalPagesRead { get; set; }
    }
}
