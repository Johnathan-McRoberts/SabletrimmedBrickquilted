using SabletrimmedBrickquilted.Domain.Books;

using SabletrimmedBrickquilted.Dtos.ImportExportDtos;

using SabletrimmedBrickquilted.Repositories.Mongo;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class ExportService : IExportService
    {
        public const string ExportTypeCsv = "CSV";
        public const string ExportTypeJson = "JSON";

        public const string ExportOptionAllBooks = "All Books";
        public const string ExportOptionThisYear = "This Year";

        public string Name => "ExportService";

        public readonly static DocumentType[] DocumentTypes =
            {
                new DocumentType()
                {
                    Name = ExportTypeCsv,
                    Description = "Comma Separated Values"
                },
                new DocumentType()
                {
                    Name = ExportTypeJson,
                    Description = "JavaScript Object Notation"
                }
            };

        public readonly static ExportOption[] ExportOptions =
            {
                new ExportOption()
                {
                    Name = ExportOptionAllBooks,
                    Description = "Export all books",
                    SupportedDocumentTypes = [ExportTypeCsv, ExportTypeJson]
                },
                new ExportOption()
                {
                    Name = ExportOptionThisYear,
                    Description = "Export only this years books",
                    SupportedDocumentTypes = [ExportTypeCsv]
                }
            };

        private readonly IMongoBooksRepository _booksRepository;
        private readonly IJsonGenerator _jsonGenerator;
        private readonly ICsvGenerator _csvGenerator;

        public ExportService(
                IMongoBooksRepository booksRepository,
                IJsonGenerator jsonGenerator,
                ICsvGenerator csvGenerator)
        {
            _booksRepository = booksRepository;
            _jsonGenerator = jsonGenerator;
            _csvGenerator = csvGenerator;
        }

        public async Task<ExportOptionsResponseDto> GetExportOptions()
        {
            ExportOptionsResponseDto exportOptions =
                new ExportOptionsResponseDto()
                {
                    DocumentTypes = DocumentTypes,
                    ExportOptions = ExportOptions
                };

            return exportOptions;
        }

        public Task<ExportResponseDto?> Export(ExportRequestDto exportRequest)
        {
            if (exportRequest.DocumentType == ExportTypeCsv)
            {
                return ExportToCsv(exportRequest.UserId, exportRequest.Options);
            }

            if (exportRequest.DocumentType == ExportTypeJson)
            {
                return ExportToJson(exportRequest.UserId, exportRequest.Options);
            }

            throw new ArgumentException(
                $"Document type {exportRequest.DocumentType} is not supported.");
        }

        private async Task<ExportResponseDto?> ExportToJson(
            string userId,
            string[] options)
        {
            CheckOptionsValid(options, ExportTypeJson);

            List<BookRead> booksToExport =
                await GetBooksToExport(userId, options);

            byte[] contentBytes =
                await _jsonGenerator.Generate(booksToExport);

            ExportResponseDto exportResponse =
                new ExportResponseDto()
                {
                    ExportContent = new MemoryStream(contentBytes),
                    ContentType = "application/json",
                    FileDownloadName = "books_export.json"
                };

            return exportResponse;
        }

        private async Task<List<BookRead>> GetBooksToExport(
            string userId,
            string[] options)
        {
            List<BookRead> allBooks =
                await _booksRepository.GetAllBooksRead();

            if (options.Contains(ExportOptionThisYear))
            {
                int currentYear = DateTime.Now.Year;

                allBooks =
                    allBooks
                    .Where(b => b.Date.Year == currentYear)
                    .ToList();
            }

            allBooks =
                allBooks.Where(b => b.User == userId).OrderBy(b => b.Date).ToList();

            return allBooks;
        }

        private static void CheckOptionsValid(string[] options, string documentType)
        {
            List<string> allowedOptions =
                ExportOptions
                .Where(o => o.SupportedDocumentTypes.Contains(documentType))
                .Select(o => o.Name)
                .ToList();
            foreach (string option in options)
            {
                if (!allowedOptions.Contains(option))
                {
                    throw new ArgumentException(
                        $"Export option {option} is not supported for {documentType} exports.");
                }
            }
        }

        private async Task<ExportResponseDto?> ExportToCsv(
            string userId,
            string[] options)
        {
            CheckOptionsValid(options, ExportTypeCsv);

            List<BookRead> booksToExport =
                await GetBooksToExport(userId, options);

            byte[] contentBytes =
                await _csvGenerator.Generate(booksToExport);

            ExportResponseDto exportResponse =
                new ExportResponseDto()
                {
                    ExportContent = new MemoryStream(contentBytes),
                    ContentType = "text/csv",
                    FileDownloadName = "books_export.csv"
                };

            return exportResponse;
        }
    }
}
