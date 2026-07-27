using SabletrimmedBrickquilted.Dtos.ChartDataDtos;

namespace SabletrimmedBrickquilted.Services.Interfaces
{
    public interface IChartDataService
    {
        Task<List<DeltaBooks>> GetBooksDeltas();

        Task<List<BooksTotal>> GetBooksTotals();

        Task<List<BooksAndPagesRate>> GetAllRates();
    }
}
