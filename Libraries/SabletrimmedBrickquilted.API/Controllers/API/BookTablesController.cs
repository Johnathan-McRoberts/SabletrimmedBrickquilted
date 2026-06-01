using Microsoft.AspNetCore.Mvc;

using SabletrimmedBrickquilted.Dtos.TablesDtos;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.API.Controllers.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookTablesController
    {
        private readonly IBookTablesService _bookTablesService;

        public BookTablesController(IBookTablesService bookTablesService)
        {
            _bookTablesService = bookTablesService;
        }

        [HttpGet]
        [Route("tallied-books")]
        public async Task<List<TalliedBook>> GetTalliedBooks()
        {
            List<TalliedBook> talliedBooks =
                await _bookTablesService.GetTalliedBooks();

            return talliedBooks;
        }

        [HttpGet]
        [Route("read-books")]
        public async Task<List<ReadBook>> GetReadBooks()
        {
            List<ReadBook> readBooks =
                await _bookTablesService.GetReadBooks();

            return readBooks;
        }

        [HttpGet]
        [Route("book-authors")]
        public async Task<List<BookAuthor>> GetBookAuthors()
        {
            List<BookAuthor> bookAuthors =
                await _bookTablesService.GetBookAuthors();

            return bookAuthors;
        }
    }
}
