using SabletrimmedBrickquilted.Dtos.BookEditorDtos;

namespace SabletrimmedBrickquilted.Services.Interfaces
{
    public interface IBookEditorService
    {
        Task<AddBookResponseDto> AddNewBookRead(
            AddBookRequestDto bookReadAddRequest);

        Task<EditorDetailsDto> GetEditorDetails();
    }
}
