using MongoDB.Bson.Serialization.Attributes;

namespace SabletrimmedBrickquilted.Domain.Common
{
    public class BaseEntity : BaseMongoEntity
    {
        /// <summary>
        /// Gets or sets the entity name.
        /// </summary>
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Gets the name to use for equivalence checks.
        /// </summary>
        public override string EquivalenceName => Name;
    }
}
