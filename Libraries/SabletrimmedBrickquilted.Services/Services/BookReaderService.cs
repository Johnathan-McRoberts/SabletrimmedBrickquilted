using SabletrimmedBrickquilted.Repositories.Mongo;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class BookReaderService : IBookReaderService
    {
        public string Name => "Repo[" + _booksRepository.Name + "]";

        IMongoBooksRepository _booksRepository;

        public BookReaderService(
            IMongoBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }
    }
}
