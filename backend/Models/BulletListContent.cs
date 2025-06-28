using System.Collections.Generic;

namespace backend.Models
{
    public class BulletListContent
    {
        public int Id { get; set; }
        public int ArticleContentId { get; set; }
        public string ListType { get; set; } // Ordered or Unordered
        public ArticleContent ArticleContent { get; set; }
        public ICollection<BulletListItem> Items { get; set; }
    }
}
