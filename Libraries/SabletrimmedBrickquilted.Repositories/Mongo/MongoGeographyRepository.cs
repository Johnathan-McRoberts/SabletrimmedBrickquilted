using MongoDB.Driver;

using SabletrimmedBrickquilted.Core.Configuration;

using SabletrimmedBrickquilted.Domain.Geography;

namespace SabletrimmedBrickquilted.Repositories.Mongo
{
    public class MongoGeographyRepository : IMongoGeographyRepository
    {
        public string Name => "MongoBooks: " + _collection.CollectionNamespace.CollectionName;

        private MongoClient _client;
        private IMongoDatabase _database;
        private IMongoCollection<Nation> _collection;

        public MongoGeographyRepository(MongoDatabaseConfig config)
        {
            // Initialize the repository with the provided connection strings
            _client = new MongoClient(config.DatabaseConnectionString);
            _database = _client.GetDatabase("books_read");
            _collection = _database.GetCollection<Nation>("nations");
        }

        public async Task<List<Nation>> GetNations()
        {
            // This is a query to get everything. 
            FilterDefinition<Nation> filter =
                Builders<Nation>.Filter.Empty;

            // Retrieve all nations from the collection based on the filter
            List<Nation> nations = await _collection.Find(filter).ToListAsync();

            return nations;
        }
    }
}
