namespace SabletrimmedBrickquilted.Dtos.ChartDataDtos
{
    public class BooksTotal
    {
        public DateTime Date { get; set; }

        public DateTime StartDate { get; set; }

        public int DaysSinceStart { get; set; }

        public int TotalBooksRead { get; set; }

        public int TotalPagesRead { get; set; }
    }
}
