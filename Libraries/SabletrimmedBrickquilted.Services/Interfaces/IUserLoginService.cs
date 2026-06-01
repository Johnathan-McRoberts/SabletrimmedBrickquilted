using SabletrimmedBrickquilted.Dtos.LoginDtos;

namespace SabletrimmedBrickquilted.Services.Interfaces
{
    public interface IUserLoginService
    {
        public Task<UserLoginResponse> UserLogin(
            UserLoginRequest loginRequest);
    }
}
