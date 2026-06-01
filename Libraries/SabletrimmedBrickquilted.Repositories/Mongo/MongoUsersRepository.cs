using MongoDB.Driver;

using SabletrimmedBrickquilted.Core.Configuration;

using SabletrimmedBrickquilted.Domain.Users;

namespace SabletrimmedBrickquilted.Repositories.Mongo
{
    public class MongoUsersRepository : IMongoUsersRepository
    {
        public string Name =>
            "MongoUsers: " + _collection.CollectionNamespace.CollectionName;

        MongoClient _client;
        IMongoDatabase _database;
        IMongoCollection<User> _collection;

        public MongoUsersRepository(MongoDatabaseConfig config)
        {
            // Initialize the repository with the provided connection strings
            _client = new MongoClient(config.DatabaseConnectionString);
            _database = _client.GetDatabase("books_read");
            _collection = _database.GetCollection<User>("users");
        }

        public async Task<User?> GetUser(string name)
        {
            FilterDefinition<User> filter =
                Builders<User>.Filter.Eq("name", name);

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUserById(string id)
        {
            // This is a query to get everything. 
            FilterDefinition<User> filter =
                Builders<User>.Filter.Empty;

            return (await _collection.Find(filter).ToListAsync())
                        .FirstOrDefault(x => x.Id.ToString() == id);
        }
    }
}
