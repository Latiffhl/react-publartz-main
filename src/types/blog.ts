
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  image: string;
  category: string;
  author: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface AdminUser {
  id: number;
  email: string;
  password: string;
  created_at: string;
}
