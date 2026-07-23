using SabletrimmedBrickquilted.Dtos.ImportExportDtos;

namespace SabletrimmedBrickquilted.Services.Interfaces
{
    public interface IExportService
    {
        public Task<ExportOptionsResponseDto> GetExportOptions();

        public Task<ExportResponseDto?> Export(
            ExportRequestDto exportRequest);

        public Task<ExportDisplayResponseDto?> ExportDisplay(
            ExportRequestDto exportRequest);
    }
}
