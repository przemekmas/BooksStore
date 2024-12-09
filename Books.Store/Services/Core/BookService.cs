using Books.Store.Contexts;
using Books.Store.Models;

namespace Books.Store.Services.Core
{
    public class BookService : IBookService
    {
        private readonly AppDbContext _appDbContext;

        public BookService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return _appDbContext.Book.ToList();
        }


        public async Task<Book> GetBook(int id)
        {
            var result = await _appDbContext.Book.FindAsync(id);

            return result;
        }

        public async Task<int> CreateBook(Book book)
        {
            var result = await _appDbContext.Book.AddAsync(new Book()
            {
                Name = book.Name,
                Description = book.Description,
            });
            await _appDbContext.SaveChangesAsync();
            return result.Entity.Id;
        }

        public async Task<bool> EditBook(int id, Book book)
        {
            var existingBook = await _appDbContext.Book.FindAsync(id);

            if (existingBook == null)
            {
                return false;
            }

            existingBook.Name = book.Name;
            existingBook.Description = book.Description;
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBook(int id)
        {
            var book = await _appDbContext.Book.FindAsync(id);

            if (book == null)
            {
                return false;
            }

            var result = _appDbContext.Book.Remove(book);
            await _appDbContext.SaveChangesAsync();
            return true;
        }
    }
}