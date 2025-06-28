export interface Article {
  id?: number;
  headline: string;
  subHeadline: string;
  createdAt?: string;
  contents: ArticleContent[];
}

export interface ArticleContent {
  id?: number;
  articleId?: number;
  contentType: 'Paragraph' | 'BulletList' | 'Image' | 'YouTubeVideo' | 'ServerVideo';
  sortOrder: number;
  paragraphContent?: ParagraphContent;
  bulletListContent?: BulletListContent;
  imageContent?: ImageContent;
  videoContent?: VideoContent;
}

export interface ParagraphContent {
  id?: number;
  articleContentId?: number;
  text: string;
}

export interface BulletListContent {
  id?: number;
  articleContentId?: number;
  listType: 'Ordered' | 'Unordered';
  items: BulletListItem[];
}

export interface BulletListItem {
  id?: number;
  bulletListContentId?: number;
  text: string;
}

export interface ImageContent {
  id?: number;
  articleContentId?: number;
  imageUrl: string;
  caption?: string;
}

export interface VideoContent {
  id?: number;
  articleContentId?: number;
  videoType: 'YouTube' | 'Server';
  videoUrl: string;
}
