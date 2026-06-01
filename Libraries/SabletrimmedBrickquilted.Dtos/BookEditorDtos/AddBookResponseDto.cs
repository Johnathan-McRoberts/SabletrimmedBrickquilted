using SabletrimmedBrickquilted.Dtos.TablesDtos;

namespace SabletrimmedBrickquilted.Dtos.BookEditorDtos
{
    public enum BookReadAddResponseCode
    {
        Success = 0,
        Duplicate,
        UnknownUser,
        InvalidItem,
        UnknownItem
    };

    public class AddBookResponseDto
    {
        public ReadBook? NewItem { get; set; } = null;

        public int ErrorCode { get; set; } = (int)BookReadAddResponseCode.InvalidItem;

        public string FailReason { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;
    }
}
