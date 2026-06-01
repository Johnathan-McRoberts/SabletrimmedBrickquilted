using SabletrimmedBrickquilted.Domain.Common;

namespace SabletrimmedBrickquilted.Domain.Geography
{
    public class CountryCodeIso3166 : BaseMongoEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Alpha_2 { get; set; } = string.Empty;
        public string Alpha_3 { get; set; } = string.Empty;
        public int CountryCode { get; set; }
        public string Iso_3166_2 { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public string SubRegion { get; set; } = string.Empty;
        public string IntermediateRegion { get; set; } = string.Empty;
        public int RegionCode { get; set; }
        public int SubRegionCode { get; set; }
        public int IntermediateRegionCode { get; set; }

        /// <summary>
        /// Gets the name to use for equivalence checks.
        /// </summary>
        public override string EquivalenceName => Name + " " + Alpha_2 + " " + Alpha_3;

    }
}
