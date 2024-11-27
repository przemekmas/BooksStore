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

        [HttpPost("Book")]
        public async Task<IActionResult> CreateBook(Book book)
        {
            var result = await _bookService.CreateBook(book);

            return Ok(result);
        }
    }
}