using Books.Store.Models;

namespace Books.Store.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetBooks();

        Task<int> CreateBook(Book book);
    }
}