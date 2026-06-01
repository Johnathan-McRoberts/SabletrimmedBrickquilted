using SabletrimmedBrickquilted.Domain.Users;

namespace SabletrimmedBrickquilted.Repositories.Mongo
{
    public interface IMongoUsersRepository
    {
        Task<User?> GetUser(string name);

        Task<User?> GetUserById(string id);
    }
}
