using Books.Store.Models;

namespace Books.Store.Services
{
    public interface IBookService
    {
        Task<Book> GetBook(int id);

        Task<IEnumerable<Book>> GetBooks();

        Task<int> CreateBook(Book book);

        Task<bool> EditBook(int id, Book book);

        Task<bool> DeleteBook(int id);
    }
}