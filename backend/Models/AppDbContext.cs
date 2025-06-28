using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleContent> ArticleContents { get; set; }
        public DbSet<ParagraphContent> ParagraphContents { get; set; }
        public DbSet<BulletListContent> BulletListContents { get; set; }
        public DbSet<BulletListItem> BulletListItems { get; set; }
        public DbSet<ImageContent> ImageContents { get; set; }
        public DbSet<VideoContent> VideoContents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Add any custom configuration here if needed
        }
    }
}
