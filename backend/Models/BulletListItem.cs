namespace backend.Models
{
    public class BulletListItem
    {
        public int Id { get; set; }
        public int BulletListContentId { get; set; }
        public string Text { get; set; }
        public BulletListContent BulletListContent { get; set; }
    }
}
