using System.Collections.Generic;

namespace backend.Models
{
    public class ArticleContent
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public string ContentType { get; set; } // Paragraph, BulletList, Image, YouTubeVideo, ServerVideo
        public int SortOrder { get; set; }
        public Article Article { get; set; }
    }
}
