import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in border border-gray-100 dark:border-gray-600"
      style={{ animationDelay: `${index * 0.1}s`, direction: 'ltr', textAlign: 'left' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6" style={{ direction: 'ltr', textAlign: 'left' }}>
        {/* Meta Info */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="mr-4">{formatDate(post.created_at)}</span>
          <User className="w-4 h-4 mr-1" />
          <span>{post.author || 'Admin'}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ direction: 'ltr', textAlign: 'left' }}>
          {post.title}
        </h2>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" style={{ direction: 'ltr', textAlign: 'left' }}>
          {post.summary}
        </p>

        {/* Read More Link */}
        <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/link">
          Baca Selengkapnya
          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
