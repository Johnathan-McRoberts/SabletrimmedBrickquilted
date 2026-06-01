namespace SabletrimmedBrickquilted.Services.Interfaces
{
    public interface ICsvGenerator
    {
        Task<byte[]> Generate<T>(IEnumerable<T> data);
    }
}
