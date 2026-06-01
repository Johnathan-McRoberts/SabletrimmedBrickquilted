namespace SabletrimmedBrickquilted.Services.Interfaces
{
    public interface IJsonGenerator
    {
        Task<byte[]> Generate<T>(IEnumerable<T> data);
    }
}
