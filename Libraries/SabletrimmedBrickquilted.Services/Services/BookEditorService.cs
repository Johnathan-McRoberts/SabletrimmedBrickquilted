using SabletrimmedBrickquilted.Domain.Books;
using SabletrimmedBrickquilted.Domain.Geography;
using SabletrimmedBrickquilted.Domain.Users;

using SabletrimmedBrickquilted.Dtos.BookEditorDtos;

using SabletrimmedBrickquilted.Repositories.Mongo;

using SabletrimmedBrickquilted.Services.Interfaces;
using SabletrimmedBrickquilted.Services.Utilities;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class BookEditorService : IBookEditorService
    {
        private readonly IMongoGeographyRepository _geography;
        private readonly IMongoBooksRepository _booksRepository;
        private readonly IMongoUsersRepository _usersRepository;

        public readonly DateTime EarliestDate = new DateTime(2001, 1, 1);// DateTime.Now.AddYears(-20);

        public readonly string[] SuffixedDaysOfMonths =
        {
            "0th",  "1st",  "2nd",  "3rd",  "4th",  "5th",  "6th",  "7th",  "8th",  "9th",
            "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th",
            "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th",
            "30th", "31st"
        };

        public BookEditorService(
                IMongoBooksRepository booksRepository,
                IMongoGeographyRepository geography,
                IMongoUsersRepository usersRepository)
        {
            _booksRepository = booksRepository;
            _geography = geography;
            _usersRepository = usersRepository;
        }

        public async Task<EditorDetailsDto> GetEditorDetails()
        {
            List<string> authorNames = new List<string>();
            List<string> countryNames = new List<string>();
            List<string> languages = new List<string>();
            List<string> tags = new List<string>();

            List<BookRead> allBooks = await _booksRepository.GetAllBooksRead();

            foreach (BookRead book in allBooks)
            {
                authorNames.Add(book.Author);
                languages.Add(book.OriginalLanguage);
                tags.AddRange(book.Tags);
            }

            List<Nation> nations = await _geography.GetNations();

            foreach (Nation nation in nations)
            {
                countryNames.Add(nation.Name);
            }

            return
                new EditorDetailsDto()
                {
                    AuthorNames = GetSortedDistinct(authorNames),
                    CountryNames = GetSortedDistinct(countryNames),
                    Languages = GetSortedDistinct(languages),
                    Tags = GetSortedDistinct(tags),
                };
        }

        private static string[] GetSortedDistinct(List<string> items)
        {
            List<string> trimmed = new List<string>();
            foreach (string item in items)
            {
                trimmed.Add(item.Trim());
            }

            return trimmed.Distinct().OrderBy(x => x).ToList().ToArray();
        }

        public async Task<AddBookResponseDto> AddNewBookRead(
            AddBookRequestDto bookReadAddRequest)
        {
            AddBookResponseDto response =
                new AddBookResponseDto
                {
                    ErrorCode = (int)BookReadAddResponseCode.Success,
                    FailReason = "",
                    UserId = bookReadAddRequest.UserId
                };

            // First check that the user exists
            User? userLogin =
                await _usersRepository.GetUserById(bookReadAddRequest.UserId);

            if (userLogin == null)
            {
                response.ErrorCode = (int)BookReadAddResponseCode.UnknownUser;
                response.FailReason = "Could not find this user.";
                return response;
            }

            // Check the book data is valid
            if (!GetBookRead(bookReadAddRequest, out BookRead newBook))
            {
                response.ErrorCode = (int)BookReadAddResponseCode.InvalidItem;
                response.FailReason = "Invalid book data please try again.";
                return response;
            }

            // Check if this is duplicate
            BookRead? existingBook =
                (await _booksRepository.GetAllBooksRead())
                            .FirstOrDefault(
                                x =>
                                    x.DateString == newBook.DateString &&
                                    x.Author == newBook.Author &&
                                    x.Title == newBook.Title &&
                                    x.Pages == newBook.Pages);
            if (existingBook != null)
            {
                response.ErrorCode = (int)BookReadAddResponseCode.Duplicate;
                response.FailReason = "This book has already been added.";
                return response;
            }

            // Add the book read to the database
            newBook.User = userLogin.Name;
            BookRead? newItem =
                await _booksRepository.AddBookRead(newBook);

            if (newItem != null)
            {
                response.NewItem = BooksUtilities.GetReadBook(newItem);
                return response;
            }

            response.ErrorCode = (int)BookReadAddResponseCode.UnknownItem;
            response.FailReason = "This book could not be added.";
            return response;
        }

        /// <summary>
        /// Gets if there is a valid new book read based on the request.
        /// </summary>
        /// <param name="addRequest">The request to add a book read.</param>
        /// <param name="newBook">The new book  to add on exit.</param>
        /// <returns>True if a valid new book, false otherwise.</returns>
        private bool GetBookRead(AddBookRequestDto addRequest, out BookRead newBook)
        {
            newBook = new BookRead
            {
                Author = addRequest.Author,
                Title = addRequest.Title,
                Pages = addRequest.Pages,
                Note = addRequest.Note,
                Nationality = addRequest.Nationality,
                OriginalLanguage = addRequest.OriginalLanguage,
                ImageUrl = addRequest.ImageUrl,
                Tags = addRequest.Tags.ToList()
            };

            // Check the required strings are ok.
            if (string.IsNullOrWhiteSpace(newBook.Author)
                || string.IsNullOrWhiteSpace(newBook.Title)
                || string.IsNullOrWhiteSpace(newBook.Nationality)
                || string.IsNullOrWhiteSpace(newBook.OriginalLanguage))
            {
                return false;
            }

            // Check the format is valid
            switch (addRequest.Format)
            {
                case "Book":
                    newBook.Format = BookFormat.Book;
                    break;
                case "Comic":
                    newBook.Format = BookFormat.Comic;
                    break;
                case "Audio":
                    newBook.Format = BookFormat.Audio;
                    break;
                default:
                    return false;
            }

            // Check the date
            if (DateTime.Now < addRequest.Date || addRequest.Date < EarliestDate)
            {
                return false;
            }

            // Set the date string 
            newBook.Date = addRequest.Date;
            newBook.DateString =
                SuffixedDaysOfMonths[newBook.Date.Day] + newBook.Date.ToString(" MMMM yyyy");

            return true;
        }
    }
}
