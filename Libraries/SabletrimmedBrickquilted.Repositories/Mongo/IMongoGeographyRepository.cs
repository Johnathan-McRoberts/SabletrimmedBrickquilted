using SabletrimmedBrickquilted.Domain.Geography;

namespace SabletrimmedBrickquilted.Repositories.Mongo
{
    public interface IMongoGeographyRepository
    {
        public string Name { get; }

        Task<List<Nation>> GetNations();
    }
}
