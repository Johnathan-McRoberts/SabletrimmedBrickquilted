using Microsoft.AspNetCore.Mvc;

using SabletrimmedBrickquilted.Dtos.ChartDataDtos;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.API.Controllers.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChartDataController
    {
        private readonly IChartDataService _chartDataService;

        public ChartDataController(IChartDataService chartDataService)
        {
            _chartDataService = chartDataService;
        }

        [HttpGet]
        [Route("books-deltas")]
        public async Task<List<DeltaBooks>> GetBooksDeltas()
        {
            List<DeltaBooks> booksDeltas =
                await _chartDataService.GetBooksDeltas();
            return booksDeltas;
        }

        [HttpGet]
        [Route("totals")]
        public async Task<List<BooksTotal>> GetBooksTotals()
        {
            List<BooksTotal> booksTotals =
                await _chartDataService.GetBooksTotals();
            return booksTotals;
        }

        [HttpGet]
        [Route("all-rates")]
        public async Task<List<BooksAndPagesRate>> GetAllRates()
        {
            List<BooksAndPagesRate> rates =
                await _chartDataService.GetAllRates();
            return rates;
        }
    }
}
