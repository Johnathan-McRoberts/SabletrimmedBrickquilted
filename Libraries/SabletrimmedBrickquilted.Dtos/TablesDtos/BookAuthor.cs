namespace SabletrimmedBrickquilted.Dtos.TablesDtos
{
    public class BookAuthor
    {
        public string Name { get; set; } = string.Empty;

        public string Nationality { get; set; } = string.Empty;

        public string Language { get; set; } = string.Empty;

        public int TotalPages { get; set; }

        public int TotalBooksReadBy { get; set; }

        public ReadBook[] Books { get; set; } = Array.Empty<ReadBook>();
    }
}
