using SabletrimmedBrickquilted.Domain.Books;

using SabletrimmedBrickquilted.Dtos.ChartDataDtos;

using SabletrimmedBrickquilted.Repositories.Mongo;

using SabletrimmedBrickquilted.Services.Interfaces;
using SabletrimmedBrickquilted.Services.Utilities;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class ChartDataService : IChartDataService
    {
        public const int MinimumDays = 90;
        public const int PreviousYearDelta = -365;

        public string Name => "ChartDataService";

        private readonly IMongoBooksRepository _booksRepository;

        public ChartDataService(
                IMongoBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }

        public async Task<List<DeltaBooks>> GetBooksDeltas()
        {
            // get the books read from the repository
            List<BookRead> booksRead =
                (await _booksRepository.GetAllBooksRead()).OrderBy(b => b.Date).ToList();
            if (booksRead.Count < 1)
            {
                return [];
            }

            // get all the deltas for the books read
            List<BooksDelta> allBookDeltas =
                GetAllBooksDeltas(booksRead);

            // convert the BooksDelta to DeltaBooks and return the list
            return allBookDeltas.Select(GetDeltaBooks).ToList();
        }

        public async Task<List<BooksTotal>> GetBooksTotals()
        {
            // get the books read from the repository
            List<BookRead> booksRead =
                (await _booksRepository.GetAllBooksRead()).OrderBy(b => b.Date).ToList();
            if (booksRead.Count < 1)
            {
                return [];
            }

            // get all the deltas for the books read
            List<BooksDelta> allBookDeltas =
                GetAllBooksDeltas(booksRead);

            // convert the BooksDelta to BooksTotal and return the list
            return allBookDeltas.Select(GetBooksTotal).ToList();
        }

        private BooksTotal GetBooksTotal(BooksDelta delta)
        {
            return new BooksTotal()
            {
                Date = delta.Date,
                StartDate = delta.StartDate,
                DaysSinceStart = delta.DaysSinceStart,
                TotalBooksRead = (int)delta.OverallTally.TotalBooks,
                TotalPagesRead = (int)delta.OverallTally.TotalPages
            };
        }

        private Dictionary<DateTime, DateTime> GetBookReadDates(
            DateTime startDate,
            List<BookRead> booksRead)
        {
            Dictionary<DateTime, DateTime> bookReadDates =
                new Dictionary<DateTime, DateTime>();
            foreach (BookRead book in booksRead)
            {
                if (!bookReadDates.ContainsKey(book.Date))
                {
                    TimeSpan ts = book.Date - startDate;
                    if (ts.Days >= MinimumDays)
                    {
                        bookReadDates.Add(book.Date, book.Date);
                    }
                }
            }
            return bookReadDates;
        }

        private DeltaBooks GetDeltaBooks(BooksDelta booksDelta)
        {
            DeltaBooks item = new DeltaBooks();
            item.Date = booksDelta.Date;
            item.StartDate = booksDelta.StartDate;
            item.DaysSinceStart = booksDelta.DaysSinceStart;
            item.OverallTally = GetTallyDelta(booksDelta.OverallTally);
            item.LastTenTally = GetTallyDelta(booksDelta.LastTenTally);

            int languageTotalsCount = booksDelta.OverallTally.LanguageTotals.Count;
            item.LanguageTotals = new CategoryTotal[languageTotalsCount];
            for (int i = 0; i < languageTotalsCount; i++)
            {
                Tuple<string, uint, double, uint, double> languageTotal =
                    booksDelta.OverallTally.LanguageTotals[i];
                item.LanguageTotals[i] =
                    new CategoryTotal
                    {
                        Name = languageTotal.Item1,
                        TotalBooks = (int)languageTotal.Item2,
                        PercentageBooks = (float)languageTotal.Item3,
                        TotalPages = (int)languageTotal.Item4,
                        PercentagePages = (float)languageTotal.Item5
                    };
            }

            int countryTotalsCount = booksDelta.OverallTally.CountryTotals.Count;
            item.CountryTotals = new CategoryTotal[countryTotalsCount];
            for (int i = 0; i < countryTotalsCount; i++)
            {
                Tuple<string, uint, double, uint, double> countryTotal =
                    booksDelta.OverallTally.CountryTotals[i];
                item.CountryTotals[i] =
                    new CategoryTotal()
                    {
                        Name = countryTotal.Item1,
                        TotalBooks = (int)countryTotal.Item2,
                        PercentageBooks = (float)countryTotal.Item3,
                        TotalPages = (int)countryTotal.Item4,
                        PercentagePages = (float)countryTotal.Item5
                    };
            }
            return item;
        }

        private TallyDelta GetTallyDelta(BooksDelta.DeltaTally lastTenTally)
        {
            return new TallyDelta()
            {
                DaysInTally = lastTenTally.DaysInTally,
                TotalPages = (int)lastTenTally.TotalPages,
                TotalBooks = (int)lastTenTally.TotalBooks,
                TotalBookFormat = (int)lastTenTally.TotalBookFormat,
                TotalComicFormat = (int)lastTenTally.TotalComicFormat,
                TotalAudioFormat = (int)lastTenTally.TotalAudioFormat,
                PercentageInEnglish = (float)lastTenTally.PercentageInEnglish,
                PercentageInTranslation = (float)lastTenTally.PercentageInTranslation,
                PageRate = (float)lastTenTally.PageRate,
                DaysPerBook = (float)lastTenTally.DaysPerBook,
                PagesPerBook = (float)lastTenTally.PagesPerBook,
                BooksPerYear = (float)lastTenTally.BooksPerYear
            };
        }

        private List<BooksDelta> GetAllBooksDeltas(List<BookRead> booksRead)
        {
            // Create a list to hold the book deltas
            List<BooksDelta> bookDeltas = [];

            // clear the list and the counts
            bookDeltas.Clear();
            DateTime startDate = booksRead[0].Date;

            // get all the dates a book has been read (after the first quarter)
            Dictionary<DateTime, DateTime> bookReadDates =
                GetBookReadDates(startDate, booksRead);

            // then add the delta made up of the books up to that date
            foreach (DateTime date in bookReadDates.Keys.ToList())
            {
                BooksDelta delta = new BooksDelta(date, startDate);
                foreach (BookRead book in booksRead)
                {
                    if (book.Date <= date)
                    {
                        delta.BooksReadToDate.Add(book);
                    }
                    else
                    {
                        break;
                    }
                }
                delta.UpdateTallies();
                bookDeltas.Add(delta);
            }

            return bookDeltas;
        }

        public async Task<List<BooksAndPagesRate>> GetAllRates()
        {
            // get the books read from the repository
            List<BookRead> booksRead =
                (await _booksRepository.GetAllBooksRead()).OrderBy(b => b.Date).ToList();
            if (booksRead.Count < 1)
            {
                return new List<BooksAndPagesRate>();
            }

            // create a list to hold the rates
            List<BooksAndPagesRate> rates = [];

            // clear the list and the counts
            DateTime startDate = booksRead[0].Date;

            // get all the dates a book has been read (after the first quarter)
            HashSet<DateTime> uniqueDates =
                booksRead
                    .Where(b => (b.Date - startDate).Days >= MinimumDays)
                    .Select(b => b.Date)
                    .ToHashSet();

            // Loop through the dates and calculate the rates for each date
            foreach (DateTime date in uniqueDates)
            {
                List<BookRead> booksReadToDate =
                    booksRead.Where(b => b.Date <= date).ToList();
                BooksAndPagesRate rate = GetBooksAndPagesRate(startDate, date, booksReadToDate);
                rates.Add(rate);
            }

            return rates;
        }

        private static BooksAndPagesRate GetBooksAndPagesRate(
            DateTime startDate,
            DateTime date,
            List<BookRead> booksReadToDate)
        {
            DateTime lastYearStartDate =
                booksReadToDate.Last().Date.AddDays(PreviousYearDelta);
            List<BookRead> lastYearBooks =
                booksReadToDate.Where(x => x.Date >= lastYearStartDate).ToList();

            List<BookRead> lastTenBooks =
                booksReadToDate.TakeLast(10).ToList();

            return new BooksAndPagesRate()
            {
                Date = date,
                StartDate = startDate,
                DaysSinceStart = (date - startDate).Days,
                OverallRates = GetTallyRate(date, booksReadToDate),
                AnnualRates = GetTallyRate(date, lastYearBooks),
                LastTenRates = GetTallyRate(date, lastTenBooks)
            };
        }

        private static BooksAndPagesRate.TallyRate GetTallyRate(
            DateTime date,
            List<BookRead> booksSet)
        {
            DateTime startDate = booksSet.Min(b => b.Date);
            return new BooksAndPagesRate.TallyRate()
            {
                DailyBooksReadRate = booksSet.Count / (float)(date - startDate).Days,
                PageRate = booksSet.Sum(b => b.Pages) / (float)(date - startDate).Days,
                PagesPerBookRate = booksSet.Sum(b => b.Pages) / (float)booksSet.Count
            };
        }
    }
}
