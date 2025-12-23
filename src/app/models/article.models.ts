export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  authorId: number;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  imageUrl: string;
}
