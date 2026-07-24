namespace SabletrimmedBrickquilted.Dtos.ChartDataDtos
{
    public class DeltaBooks
    {
        public DateTime Date { get; set; }

        public DateTime StartDate { get; set; }

        public int DaysSinceStart { get; set; }

        public TallyDelta OverallTally { get; set; }

        public TallyDelta LastTenTally { get; set; }

        public CategoryTotal[] LanguageTotals { get; set; }

        public CategoryTotal[] CountryTotals { get; set; }

        public DeltaBooks()
        {
            Date = DateTime.Now;
            StartDate = DateTime.Now;
            DaysSinceStart = 0;
            OverallTally = new TallyDelta();
            LastTenTally = new TallyDelta();
            LanguageTotals = [];
            CountryTotals = [];
        }
    }
}
