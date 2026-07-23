using Microsoft.AspNetCore.Mvc;

using SabletrimmedBrickquilted.Dtos.ImportExportDtos;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.API.Controllers.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExportController : ControllerBase
    {
        private readonly IExportService _exportService;
        private ILogger<UserLoginController> _logger;

        public ExportController(
            IExportService exportService,
            ILogger<UserLoginController> logger)
        {
            _exportService = exportService;
            _logger = logger;
        }

        [HttpGet]
        [Route("options")]
        public async Task<ExportOptionsResponseDto> GetOptions()
        {
            ExportOptionsResponseDto options =
                await _exportService.GetExportOptions();

            return options;
        }

        [HttpPost]
        [Route("export")]
        public async Task<IActionResult> GetExport(
            [FromBody] ExportRequestDto request)
        {
            _logger.LogInformation(
                $"Exporting to {request.DocumentType} for type user id: {request.UserId}");

            ExportResponseDto? result =
                await _exportService.Export(request);

            if (result == null)
            {
                string error =
                    $"Export of type {request.DocumentType} " +
                    $"with options = {string.Join(" ", request.Options)} could not be created.";

                _logger.LogError(error);
                return NotFound(error);
            }

            _logger.LogInformation(
                $"Export OK of {request.DocumentType} for type user id: {request.UserId}");

            // Set the headers to allow a file byte stream and return the file.
            Response.Headers.Append("Access-Control-Expose-Headers", "Content-Disposition");
            return File(result.ExportContent, result.ContentType, result.FileDownloadName);
        }

        [HttpGet]
        [Route("export-display")]
        public async Task<ExportDisplayResponseDto> GetExportDisplay(
            [FromQuery] ExportRequestDto request)
        {
            ExportDisplayResponseDto? result =
                await _exportService.ExportDisplay(request);

            return result ?? new ExportDisplayResponseDto()
            { 
                DisplayContent = "No content available", 
                ContentType = "text/plain" 
            };
        }
    }
}
