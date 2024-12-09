using Books.Store.Models;
using Books.Store.Services;
using Microsoft.AspNetCore.Mvc;

namespace Books.Store.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ILogger<BooksController> _logger;

        private readonly IBookService _bookService;

        public BooksController(ILogger<BooksController> logger, IBookService bookService)
        {
            _logger = logger;
            _bookService = bookService;
        }

        [HttpGet("Book")]
        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await _bookService.GetBooks();
        }

        [HttpGet("Book/{id}")]
        public async Task<Book> GetBook(int id)
        {
            return await _bookService.GetBook(id);
        }

        [HttpPost("Book")]
        public async Task<IActionResult> CreateBook(Book book)
        {
            var result = await _bookService.CreateBook(book);

            return Ok(result);
        }

        [HttpDelete("Book")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var result = await _bookService.DeleteBook(id);

            return Ok(result);
        }

        [HttpPut("Book/{id}")]
        public async Task<IActionResult> EditBook(int id, Book book)
        {
            var result = await _bookService.EditBook(id, book);

            return Ok(result);
        }
    }
}