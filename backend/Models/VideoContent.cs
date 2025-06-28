namespace backend.Models
{
    public class VideoContent
    {
        public int Id { get; set; }
        public int ArticleContentId { get; set; }
        public string VideoType { get; set; } // YouTube or Server
        public string VideoUrl { get; set; }
        public ArticleContent ArticleContent { get; set; }
    }
}
