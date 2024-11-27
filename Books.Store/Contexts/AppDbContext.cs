using Books.Store.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.Store.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Book> Book { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
