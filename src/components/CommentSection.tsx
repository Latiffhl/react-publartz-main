import React, { useState } from 'react';
import { useComments } from '@/hooks/useComments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Calendar, AlertCircle } from 'lucide-react';
import { CommentFormData } from '@/types/comment';

interface CommentSectionProps {
  blogPostId: number;
}

const CommentSection = ({ blogPostId }: CommentSectionProps) => {
  const { comments, isLoading, addComment, isAddingComment, error } = useComments(blogPostId);
  const [formData, setFormData] = useState<CommentFormData>({
    author_name: '',
    author_email: '',
    content: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.author_name.trim()) {
      errors.author_name = 'Nama wajib diisi';
    }

    if (!formData.content.trim()) {
      errors.content = 'Komentar wajib diisi';
    }

    if (formData.content.trim().length > 1000) {
      errors.content = 'Komentar terlalu panjang (maksimal 1000 karakter)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    if (!validateForm()) {
      console.log('Form validation failed:', formErrors);
      return;
    }

    // Send comment data
    addComment({
      author_name: formData.author_name,
      author_email: formData.author_email || undefined, // Send undefined if empty
      content: formData.content,
      blog_post_id: blogPostId,
    });

    // Reset form after submission
    setFormData({
      author_name: '',
      author_email: '',
      content: '',
    });
    setFormErrors({});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-fade-in hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-6 animate-slide-in">
        <MessageCircle className="w-5 h-5 text-blue-600 mr-2 animate-bounce-subtle" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Komentar ({comments.length})</h3>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <p className="text-red-700">Gagal memuat komentar. Silakan refresh halaman.</p>
        </div>
      )}

      {/* Comment Form */}
      <Card className="mb-8 animate-scale-in bg-white dark:bg-black hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-base bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Tulis Komentar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-fade-in">
              <Input
                placeholder="Nama Anda *"
                value={formData.author_name}
                onChange={(e) => {
                  setFormData({ ...formData, author_name: e.target.value });
                  if (formErrors.author_name) {
                    setFormErrors({ ...formErrors, author_name: '' });
                  }
                }}
                required
                disabled={isAddingComment}
                className={`transition-all duration-300 focus:scale-[1.02] focus:shadow-md ${formErrors.author_name ? 'border-red-500' : ''}`}
              />
              {formErrors.author_name && <p className="text-red-500 text-sm mt-1">{formErrors.author_name}</p>}
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.05s' }}>
              <Input
                placeholder="Email (opsional)"
                type="email"
                value={formData.author_email}
                onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                disabled={isAddingComment}
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Textarea
                placeholder="Tulis komentar Anda... *"
                value={formData.content}
                onChange={(e) => {
                  setFormData({ ...formData, content: e.target.value });
                  if (formErrors.content) {
                    setFormErrors({ ...formErrors, content: '' });
                  }
                }}
                rows={4}
                required
                disabled={isAddingComment}
                className={`transition-all duration-300 focus:scale-[1.02] focus:shadow-md ${formErrors.content ? 'border-red-500' : ''}`}
              />
              {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
              <p className="text-gray-500 text-xs mt-1">{formData.content.length}/1000 karakter</p>
            </div>

            <Button
              type="submit"
              disabled={isAddingComment || !formData.author_name.trim() || !formData.content.trim()}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {isAddingComment ? (
                <>
                  <Send className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Komentar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 animate-pulse">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2 animate-fade-in">Memuat komentar...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment, index) => (
            <Card key={comment.id} className="border border-gray-200 animate-fade-in hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Avatar className="w-10 h-10 animate-scale-in">
                    <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600">{getInitials(comment.author_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2 animate-slide-in">
                      <h4 className="font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 transition-colors duration-300">{comment.author_name}</h4>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3 mr-1 animate-pulse" />
                        <span>{formatDate(comment.created_at)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed animate-fade-in">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 animate-fade-in">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-bounce-subtle" />
            <p className="text-gray-600">Belum ada komentar. Jadilah yang pertama!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
