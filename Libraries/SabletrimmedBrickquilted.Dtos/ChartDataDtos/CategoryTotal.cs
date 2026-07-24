namespace SabletrimmedBrickquilted.Dtos.ChartDataDtos
{
    public class CategoryTotal
    {
        public string Name { get; set; }
        public int TotalPages { get; set; }
        public int TotalBooks { get; set; }
        public float PercentagePages { get; set; }
        public float PercentageBooks { get; set; }

        public CategoryTotal()
        {
            Name = string.Empty;
            TotalPages = 0;
            TotalBooks = 0;
            PercentagePages = 0f;
            PercentageBooks = 0f;
        }

        public CategoryTotal(CategoryTotal src)
        {
            Name = src.Name;
            TotalPages = src.TotalPages;
            TotalBooks = src.TotalBooks;
            PercentagePages = src.PercentagePages;
            PercentageBooks = src.PercentageBooks;
        }
    }
}
