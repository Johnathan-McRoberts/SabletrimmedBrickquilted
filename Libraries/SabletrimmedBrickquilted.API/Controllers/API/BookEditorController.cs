using Microsoft.AspNetCore.Mvc;

using SabletrimmedBrickquilted.Dtos.BookEditorDtos;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.API.Controllers.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookEditorController : ControllerBase
    {
        private readonly IBookEditorService _bookEditorService;

        public BookEditorController(IBookEditorService bookEditorService)
        {
            _bookEditorService = bookEditorService;
        }

        [HttpGet]
        [Route("editor-details")]
        public async Task<IActionResult> GetEditorDetails()
        {
            EditorDetailsDto editorDetails =
                await _bookEditorService.GetEditorDetails();

            return Ok(editorDetails);
        }

        /// <summary>
        /// Adds a new user book read.
        /// </summary>
        /// <param name="bookReadAddRequest">The new book read to try to add.</param>
        /// <returns>The action result.</returns>
        [HttpPost]
        [Route("add-book")]
        public async Task<IActionResult> Post([FromBody] AddBookRequestDto bookReadAddRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AddBookResponseDto response =
                await _bookEditorService.AddNewBookRead(bookReadAddRequest);

            return Ok(response);
        }
    }
}
