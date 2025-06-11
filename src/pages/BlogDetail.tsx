import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Loader } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import CommentSection from '../components/CommentSection';
import SocialShare from '../components/SocialShare';
import Footer from '../components/Footer';
import ImagePreviewModal from '../components/ImagePreviewModal';
import { useBlogPost, useBlogPosts } from '../hooks/useBlogPosts';

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useBlogPost(slug || '');
  const { data: allPosts = [] } = useBlogPosts();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleImageClick = (imageSrc: string) => {
    setPreviewImage(imageSrc);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center animate-pulse">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600 animate-fade-in">Memuat artikel...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-scale-in">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8 animate-slide-in">Maaf, artikel yang Anda cari tidak tersedia.</p>
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 mr-2 animate-bounce" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Create proper URL for sharing
  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  // Function to add click handlers to images in content
  const enhanceContentImages = (content: string) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Find all images and add click handlers
    const images = tempDiv.querySelectorAll('img');
    images.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.style.transition = 'transform 0.3s ease';
      img.setAttribute('data-image-index', index.toString());
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.02)';
      });
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });

    return tempDiv.innerHTML;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-black transition-colors duration-300">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6 animate-slide-in">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 animate-scale-in">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
            onClick={() => handleImageClick(post.image)}
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 mb-8 animate-fade-in hover:shadow-lg transition-all duration-300">
            {/* Category Badge */}
            <div className="mb-4 animate-slide-in">
              <span className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">{post.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 animate-slide-in">
              <div className="flex items-center mr-6 hover:text-blue-600 transition-colors duration-300">
                <Calendar className="w-5 h-5 mr-2 animate-pulse" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center hover:text-blue-600 transition-colors duration-300">
                <User className="w-5 h-5 mr-2 animate-pulse" />
                <span>{post.author || 'Admin'}</span>
              </div>
            </div>

            {/* Content with enhanced images */}
            <div
              className="prose prose-lg text-gray-900 dark:text-gray-200 max-w-none animate-fade-in"
              style={{ animationDelay: '0.3s', direction: 'ltr', textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: enhanceContentImages(post.content) }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'IMG') {
                  const img = target as HTMLImageElement;
                  handleImageClick(img.src);
                }
              }}
            />
          </div>

          {/* Social Share */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <SocialShare title={post.title} url={shareUrl} description={post.summary} />
          </div>

          {/* Comments Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <CommentSection blogPostId={post.id} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 pb-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-scale-in bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <div key={relatedPost.id} className="animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${1 + index * 0.1}s` }}>
                  <BlogCard post={relatedPost} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Preview Modal */}
      <ImagePreviewModal isOpen={isPreviewOpen} imageUrl={previewImage} onClose={closePreview} />

      <Footer />
    </div>
  );
};

export default BlogDetail;
