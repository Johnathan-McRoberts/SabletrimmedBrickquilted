namespace SabletrimmedBrickquilted.Dtos.ChartDataDtos
{
    public class TallyDelta
    {
        public int DaysInTally { get; set; }

        public int TotalPages { get; set; }

        public int TotalBooks { get; set; }

        public int TotalBookFormat { get; set; }

        public int TotalComicFormat { get; set; }

        public int TotalAudioFormat { get; set; }

        public float PercentageInEnglish { get; set; }

        public float PercentageInTranslation { get; set; }

        public float PageRate { get; set; }

        public float DaysPerBook { get; set; }

        public float PagesPerBook { get; set; }

        public float BooksPerYear { get; set; }

        public TallyDelta()
        {

        }
    }
}
