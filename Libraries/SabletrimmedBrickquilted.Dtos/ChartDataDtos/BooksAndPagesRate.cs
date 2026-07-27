namespace SabletrimmedBrickquilted.Dtos.ChartDataDtos
{
    public class BooksAndPagesRate
    {
        public class TallyRate
        {
            private const int _daysPerYear = 365;
            private const float _booksPerDayEpsilon = 0.0001f;

            public float DailyBooksReadRate { get; set; }
            public float PageRate { get; set; }

            public float DaysPerBookRate =>
                DailyBooksReadRate > _booksPerDayEpsilon ? 1f / DailyBooksReadRate : 0;
            public float AnnualBooksRate => DailyBooksReadRate * _daysPerYear;
            public float AnnualPagesRate => PageRate * _daysPerYear;
            public float PagesPerBookRate { get; set; }
        }

        public DateTime Date { get; set; }
        public string Datestring => Date.ToString("yyyy-MM-dd");
        public DateTime StartDate { get; set; }
        public int DaysSinceStart { get; set; }


        public TallyRate OverallRates { get; set; } = new TallyRate();

        public TallyRate AnnualRates { get; set; } = new TallyRate();

        public TallyRate LastTenRates { get; set; } = new TallyRate();
    }
}
