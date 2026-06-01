using System.Globalization;
using System.Text;

using CsvHelper;
using CsvHelper.Configuration;

using SabletrimmedBrickquilted.Domain.Books;

using SabletrimmedBrickquilted.Services.Interfaces;

namespace SabletrimmedBrickquilted.Services.Services
{
    public class CsvGenerator : ICsvGenerator
    {
        public async Task<byte[]> Generate<T>(IEnumerable<T> data)
        {
            Type itemType = typeof(T);
            if (itemType == typeof(BookRead))
            {
                return await ExportToCsvFile(data.Cast<BookRead>().ToList());
            }

            CsvConfiguration configuration =
                new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = true,
                    ShouldQuote = (args) => true
                };

            using MemoryStream stream = new MemoryStream();
            await using StreamWriter streamWriter = new StreamWriter(stream);
            await using CsvWriter csv = new CsvWriter(streamWriter, configuration);

            csv.WriteHeader<T>();

            await csv.NextRecordAsync();

            await csv.WriteRecordsAsync(data);

            await streamWriter.FlushAsync();

            return Encoding.UTF8.GetPreamble().Concat(stream.ToArray()).ToArray();
        }

        public static async Task<byte[]> ExportToCsvFile(List<BookRead> books)
        {
            CsvConfiguration configuration =
                new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = true,
                    ShouldQuote = (args) => true
                };

            using MemoryStream stream = new MemoryStream();
            await using StreamWriter streamWriter = new StreamWriter(stream);
            await using CsvWriter csv = new CsvWriter(streamWriter, configuration);

            StringBuilder stringBuilder = new StringBuilder();

            ExtendedStringWriter sw = new ExtendedStringWriter(stringBuilder, Encoding.UTF8);

            // write the header
            streamWriter.WriteLine(
                "Date,DD/MM/YYYY,Author,Title,Pages,Note,Nationality,Original Language,Book,Comic,Audio,Image,Tags"
            );

            // write the records
            foreach (BookRead book in books)
            {
                csv.WriteField(book.DateString);
                csv.WriteField(book.Date.ToString("d/M/yyyy"));
                csv.WriteField(book.Author);
                csv.WriteField(book.Title);
                csv.WriteField(book.Pages > 0 ? book.Pages.ToString() : "");
                csv.WriteField(book.Note);
                csv.WriteField(book.Nationality);
                csv.WriteField(book.OriginalLanguage);
                csv.WriteField(book.Format == BookFormat.Book ? "x" : "");
                csv.WriteField(book.Format == BookFormat.Comic ? "x" : "");
                csv.WriteField(book.Format == BookFormat.Audio ? "x" : "");
                csv.WriteField(book.ImageUrl);
                csv.WriteField(book.DisplayTags);
                csv.NextRecord();
            }


            await streamWriter.FlushAsync();

            return Encoding.UTF8.GetPreamble().Concat(stream.ToArray()).ToArray();

        }


        public sealed class ExtendedStringWriter : StringWriter
        {
            private readonly Encoding _stringWriterEncoding;

            public ExtendedStringWriter(StringBuilder builder, Encoding desiredEncoding)
                : base(builder)
            {
                _stringWriterEncoding = desiredEncoding;
            }

            public override Encoding Encoding => _stringWriterEncoding;


            public static string GetSafeString(string fieldValue)
            {
                if (string.IsNullOrWhiteSpace(fieldValue))
                {
                    return string.Empty;
                }

                return fieldValue;
            }
        }
    }
}
