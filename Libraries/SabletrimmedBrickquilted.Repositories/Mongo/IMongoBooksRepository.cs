using SabletrimmedBrickquilted.Domain.Books;

namespace SabletrimmedBrickquilted.Repositories.Mongo
{
    public interface IMongoBooksRepository
    {
        public string Name { get; }

        Task<List<BookRead>> GetAllBooksRead();

        Task<BookRead?> AddBookRead(BookRead newItem);
    }
}
