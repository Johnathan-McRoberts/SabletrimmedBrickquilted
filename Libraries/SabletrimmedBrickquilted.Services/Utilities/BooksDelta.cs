using SabletrimmedBrickquilted.Domain.Books;

namespace SabletrimmedBrickquilted.Services.Utilities
{
    public class BooksDelta
    {
        #region Public Data

        public DateTime Date { get; }

        public DateTime StartDate { get; }

        public List<BookRead> BooksReadToDate { get; set; }

        public int DaysSinceStart { get; }

        public DeltaTally OverallTally { get; private set; }

        public DeltaTally LastTenTally { get; private set; }

        #endregion

        #region Constructor

        public BooksDelta(DateTime date, DateTime startDate)
        {
            Date = date;
            StartDate = startDate;
            TimeSpan timeSpan = date - startDate;
            DaysSinceStart = timeSpan.Days;
            BooksReadToDate = new List<BookRead>();

            OverallTally = new DeltaTally();
            LastTenTally = new DeltaTally();
        }

        #endregion

        #region Nested Classes

        public class DeltaTally
        {
            public int DaysInTally { get; set; }

            public uint TotalPages { get; set; }

            public uint TotalBooks { get; set; }

            public uint TotalBookFormat { get; set; }

            public uint TotalComicFormat { get; set; }

            public uint TotalAudioFormat { get; set; }

            public double PercentageInEnglish { get; set; }

            public double PercentageInTranslation => 100.0 - PercentageInEnglish;

            public double PageRate => TotalPages / (DaysInTally > 1 ? (double)DaysInTally : 1);

            public double DaysPerBook => DaysInTally / (TotalBooks > 1 ? (double)TotalBooks : 1);

            public double PagesPerBook => TotalPages / (TotalBooks > 1 ? (double)TotalBooks : 1);

            public double BooksPerYear => 365.25 / (DaysPerBook > 0.1 ? DaysPerBook : 1);

            public List<Tuple<string, uint, double, uint, double>> LanguageTotals { get; set; }

            public List<Tuple<string, uint, double, uint, double>> CountryTotals { get; set; }

            public DeltaTally()
            {
                LanguageTotals = [];
                CountryTotals = [];
            }
        }

        #endregion

        #region Public Functions

        public void UpdateTallies()
        {
            // start with the overall
            OverallTally = GetDeltaTallyValues(BooksReadToDate);

            // then get the last 10 books in a list
            List<BookRead> lastTenBooks = new List<BookRead>();
            if (BooksReadToDate.Count <= 10)
            {
                lastTenBooks = BooksReadToDate;
            }
            else
            {
                for (int i = BooksReadToDate.Count - 10; i < BooksReadToDate.Count; i++)
                {
                    lastTenBooks.Add(BooksReadToDate[i]);
                }
            }

            // then update the tally based on that list
            LastTenTally = GetDeltaTallyValues(lastTenBooks);
        }

        #endregion

        #region Utility Functions

        private DeltaTally GetDeltaTallyValues(List<BookRead> books)
        {
            DeltaTally tally = new DeltaTally();
            uint totalBooks = 0;
            uint totalPagesRead = 0;
            uint totalBookFormat = 0;
            uint totalComicFormat = 0;
            uint totalAudioFormat = 0;
            uint totalInEnglish = 0;

            int daysInTally = (books.Last().Date - books.First().Date).Days;
            if (daysInTally < 1)
            {
                daysInTally = 1;
            }

            Dictionary<string, Tuple<uint, uint>> languageCounts =
                new Dictionary<string, Tuple<uint, uint>>();
            Dictionary<string, Tuple<uint, uint>> countryCounts =
                new Dictionary<string, Tuple<uint, uint>>();

            foreach (var book in books)
            {
                totalBooks++;
                totalPagesRead += book.Pages;
                if (book.Format == BookFormat.Book) totalBookFormat++;
                if (book.Format == BookFormat.Comic) totalComicFormat++;
                if (book.Format == BookFormat.Audio) totalAudioFormat++;
                if (book.OriginalLanguage == "English") totalInEnglish++;
                UpdateLanguageAndCountryCounts(languageCounts, countryCounts, book);
            }

            double percentageInEnglish = GetAsPercentage(totalBooks, totalInEnglish);
            tally.DaysInTally = daysInTally;
            tally.TotalPages = totalPagesRead;
            tally.TotalBooks = totalBooks;
            tally.TotalBookFormat = totalBookFormat;
            tally.TotalComicFormat = totalComicFormat;
            tally.TotalAudioFormat = totalAudioFormat;
            tally.PercentageInEnglish = percentageInEnglish;

            foreach (string language in languageCounts.Keys)
            {
                tally.LanguageTotals.Add(
                    new Tuple<string, uint, double, uint, double>(
                        language, languageCounts[language].Item1,
                        GetAsPercentage(totalBooks, languageCounts[language].Item1),
                        languageCounts[language].Item2,
                        GetAsPercentage(totalPagesRead, languageCounts[language].Item2))
                        );
            }

            foreach (string country in countryCounts.Keys)
            {
                tally.CountryTotals.Add(
                    new Tuple<string, uint, double, uint, double>(
                        country, countryCounts[country].Item1,
                        GetAsPercentage(totalBooks, countryCounts[country].Item1),
                        countryCounts[country].Item2,
                        GetAsPercentage(totalPagesRead, countryCounts[country].Item2))
                        );
            }

            return tally;
        }

        private static void UpdateLanguageAndCountryCounts(
            Dictionary<string, Tuple<uint, uint>> languageCounts,
            Dictionary<string, Tuple<uint, uint>> countryCounts,
            BookRead book)
        {
            if (!languageCounts.ContainsKey(book.OriginalLanguage))
            {
                languageCounts.Add(book.OriginalLanguage, new Tuple<uint, uint>(1, book.Pages));
            }
            else
            {
                var updatedCounts =
                    new Tuple<uint, uint>(
                            languageCounts[book.OriginalLanguage].Item1 + 1,
                            languageCounts[book.OriginalLanguage].Item2 + book.Pages);
                languageCounts[book.OriginalLanguage] = updatedCounts;
            }

            if (!countryCounts.ContainsKey(book.Nationality))
            {
                countryCounts.Add(book.Nationality, new Tuple<uint, uint>(1, book.Pages));
            }
            else
            {
                var updatedCounts =
                    new Tuple<uint, uint>(
                            countryCounts[book.Nationality].Item1 + 1,
                            countryCounts[book.Nationality].Item2 + book.Pages);
                countryCounts[book.Nationality] = updatedCounts;
            }
        }

        public static double GetAsPercentage(uint totalBooks, uint totalInEnglish)
        {
            double percentageInEnglish = 100.0 * (totalInEnglish / (double)totalBooks);
            return percentageInEnglish;
        }

        #endregion
    }
}
