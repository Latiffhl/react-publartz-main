
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

export const useAdminBlogPosts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all blog posts (including drafts) for admin
  const {
    data: blogPosts = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin blog posts:', error);
        throw error;
      }

      return data || [];
    },
  });

  // Add new blog post
  const addPostMutation = useMutation({
    mutationFn: async (postData: Omit<BlogPost, 'id'>) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) {
        console.error('Error adding blog post:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Artikel Berhasil Ditambahkan",
        description: "Artikel baru telah dipublikasikan.",
      });
    },
    onError: (error) => {
      console.error('Add post error:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan artikel. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  // Edit blog post
  const editPostMutation = useMutation({
    mutationFn: async ({ id, postData }: { id: number; postData: Omit<BlogPost, 'id'> }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...postData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Artikel Berhasil Diperbarui",
        description: "Perubahan telah disimpan.",
      });
    },
    onError: (error) => {
      console.error('Edit post error:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui artikel. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  // Delete blog post
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Artikel Berhasil Dihapus",
        description: "Artikel telah dihapus dari database.",
      });
    },
    onError: (error) => {
      console.error('Delete post error:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus artikel. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  return {
    blogPosts,
    isLoading,
    error,
    addPost: addPostMutation.mutate,
    editPost: editPostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isAddingPost: addPostMutation.isPending,
    isEditingPost: editPostMutation.isPending,
    isDeletingPost: deletePostMutation.isPending,
  };
};
