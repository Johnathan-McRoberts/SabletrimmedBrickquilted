using SabletrimmedBrickquilted.Domain.Books;

using SabletrimmedBrickquilted.Dtos.TablesDtos;

using SabletrimmedBrickquilted.Repositories.Mongo;

using SabletrimmedBrickquilted.Services.Interfaces;
using SabletrimmedBrickquilted.Services.Utilities;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class BookTablesService : IBookTablesService
    {
        public string Name => "BookTablesService";

        private readonly IMongoBooksRepository _booksRepository;

        public BookTablesService(
                IMongoBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }

        public async Task<List<TalliedBook>> GetTalliedBooks()
        {
            // Get the sorted books
            List<BookRead> allBooks =
                (await _booksRepository.GetAllBooksRead())
                    .OrderBy(b => b.Date)
                    .ThenBy(b => b.Author)
                    .ThenBy(b => b.Title)
                    .ToList();

            // convert to tallied books
            List<TalliedBook> talliedBooks = new List<TalliedBook>();

            uint totalBooks = 0;
            uint totalBookFormat = 0;
            uint totalComicFormat = 0;
            uint totalAudioFormat = 0;
            uint totalPagesRead = 0;

            foreach (BookRead book in allBooks)
            {
                UpdateTalliedBooksTotals(
                    ref totalBooks,
                    ref totalPagesRead,
                    ref totalBookFormat,
                    ref totalComicFormat,
                    ref totalAudioFormat,
                    book);

                talliedBooks.Add(
                    new TalliedBook()
                    {
                        DateString = book.Date.ToString("yyyy-MM-dd"),
                        Date = book.Date,
                        Author = book.Author,
                        Title = book.Title,
                        Pages = book.Pages,
                        Format = book.Format.ToString(),
                        TotalBooks = totalBooks,
                        TotalPagesRead = totalPagesRead,
                        TotalBookFormat = totalBookFormat,
                        TotalComicFormat = totalComicFormat,
                        TotalAudioFormat = totalAudioFormat,
                    });
            }

            // Reverse the list to have the most recent books first
            talliedBooks.Reverse();

            // Return the tallied books
            return talliedBooks;
        }

        private static void UpdateTalliedBooksTotals(
            ref uint totalBooks,
            ref uint totalPagesRead,
            ref uint totalBookFormat,
            ref uint totalComicFormat,
            ref uint totalAudioFormat,
            BookRead book)
        {
            totalBooks++;
            totalPagesRead += book.Pages;

            if (book.Format == BookFormat.Book)
            {
                totalBookFormat++;
            }
            else if (book.Format == BookFormat.Comic)
            {
                totalComicFormat++;
            }
            else
            {
                totalAudioFormat++;
            }
        }

        public async Task<List<ReadBook>> GetReadBooks()
        {
            // Get the sorted books
            List<BookRead> allBooks =
                (await _booksRepository.GetAllBooksRead())
                    .OrderBy(b => b.Date)
                    .ThenBy(b => b.Author)
                    .ThenBy(b => b.Title)
                    .ToList();

            List<ReadBook> booksRead = new List<ReadBook>();

            foreach (BookRead book in allBooks)
            {
                booksRead.Add(BooksUtilities.GetReadBook(book));
            }

            return booksRead;

        }

        public async Task<List<BookAuthor>> GetBookAuthors()
        {
            // Get the books
            List<BookRead> allBooks =
                await _booksRepository.GetAllBooksRead();

            Dictionary<string, BookAuthor> authorsByName = new Dictionary<string, BookAuthor>();

            foreach (BookRead book in allBooks)
            {
                if (authorsByName.TryGetValue(book.Author, out BookAuthor? author))
                {
                    AddBookToAuthor(book, author);
                }
                else
                {
                    BookAuthor newAuthor = new BookAuthor()
                    {
                        Name = book.Author,
                        Nationality = book.Nationality,
                        Language = book.OriginalLanguage
                    };
                    AddBookToAuthor(book, newAuthor);
                    authorsByName.Add(book.Author, newAuthor);
                }
            }

            return authorsByName.Values.OrderBy(author => author.Name).ToList();
        }

        private static void AddBookToAuthor(BookRead book, BookAuthor author)
        {
            author.TotalBooksReadBy++;
            author.TotalPages += book.Pages;

            List<ReadBook> books = author.Books.ToList();
            books.Add(BooksUtilities.GetReadBook(book));
            author.Books = books.ToArray();
        }
    }
}
