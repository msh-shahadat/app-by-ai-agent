namespace backend.Models
{
    public class ImageContent
    {
        public int Id { get; set; }
        public int ArticleContentId { get; set; }
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
        public ArticleContent ArticleContent { get; set; }
    }
}
