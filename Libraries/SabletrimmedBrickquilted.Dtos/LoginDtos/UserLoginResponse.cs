namespace SabletrimmedBrickquilted.Dtos.LoginDtos
{
    public class UserLoginResponse
    {
        public string Name { get; set; } = string.Empty;

        public int ErrorCode { get; set; } = (int)UserLoginResponseCode.Success;

        public string FailReason { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
    }
}
