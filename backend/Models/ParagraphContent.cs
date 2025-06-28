namespace backend.Models
{
    public class ParagraphContent
    {
        public int Id { get; set; }
        public int ArticleContentId { get; set; }
        public string Text { get; set; } // Can include basic HTML for formatting
        public ArticleContent ArticleContent { get; set; }
    }
}
