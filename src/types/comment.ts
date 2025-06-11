
export interface Comment {
  id: string;
  blog_post_id: number;
  author_name: string;
  author_email?: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommentFormData {
  author_name: string;
  author_email?: string;
  content: string;
}
