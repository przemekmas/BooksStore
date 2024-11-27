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

        public async Task<int> CreateBook(Book book)
        {
            var result = await _appDbContext.Book.AddAsync(book);
            await _appDbContext.SaveChangesAsync();
            return result.Entity.Id;
        }
    }
}
