using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Headline { get; set; }
        public string SubHeadline { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<ArticleContent> Contents { get; set; }
    }
}
