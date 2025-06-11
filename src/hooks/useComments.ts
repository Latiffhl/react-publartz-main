
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Comment, CommentFormData } from '@/types/comment';
import { useToast } from '@/hooks/use-toast';

export const useComments = (blogPostId: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comments', blogPostId],
    queryFn: async (): Promise<Comment[]> => {
      console.log('Fetching comments for blog post:', blogPostId);
      
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        // Remove the is_approved filter to show all comments
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }

      console.log('Comments fetched successfully:', data);
      return data || [];
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (commentData: CommentFormData & { blog_post_id: number }) => {
      console.log('Adding comment with data:', commentData);
      
      // Validate required fields
      if (!commentData.author_name?.trim()) {
        throw new Error('Nama tidak boleh kosong');
      }
      
      if (!commentData.content?.trim()) {
        throw new Error('Komentar tidak boleh kosong');
      }

      // Prepare data for insertion - no user authentication required
      const dataToInsert = {
        blog_post_id: commentData.blog_post_id,
        author_name: commentData.author_name.trim(),
        author_email: commentData.author_email?.trim() || null,
        content: commentData.content.trim(),
        is_approved: false, // Comments need approval by default
      };

      console.log('Inserting comment data:', dataToInsert);

      const { data, error } = await supabase
        .from('comments')
        .insert([dataToInsert])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(`Gagal menyimpan komentar: ${error.message}`);
      }

      console.log('Comment inserted successfully:', data);
      return data;
    },
    onSuccess: () => {
      console.log('Comment added successfully, refreshing comments list');
      // Refresh comments list
      queryClient.invalidateQueries({ queryKey: ['comments', blogPostId] });
      toast({
        title: 'Komentar Berhasil Dikirim',
        description: 'Komentar Anda akan ditampilkan setelah disetujui oleh admin.',
      });
    },
    onError: (error: Error) => {
      console.error('Add comment error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Gagal mengirim komentar. Silakan coba lagi.',
        variant: 'destructive',
      });
    },
  });

  return {
    comments,
    isLoading,
    error,
    addComment: addCommentMutation.mutate,
    isAddingComment: addCommentMutation.isPending,
  };
};
