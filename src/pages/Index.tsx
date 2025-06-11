import { useState, useMemo } from 'react';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { categories } from '../data/blogData';
import { Search, Calendar, Tag, Loader } from 'lucide-react';

const Index = () => {
  const { data: blogPosts = [], isLoading, error } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  // Use predefined categories and add empty option for "All"
  const allCategories = ['', ...categories];

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchTerm, selectedCategory]);

  // Paginate filtered posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center animate-pulse">
            <Loader className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-gray-600 dark:text-gray-400 animate-fade-in">Memuat artikel...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 animate-scale-in">Terjadi Kesalahan</h2>
            <p className="text-gray-600 dark:text-gray-400 animate-slide-in">Gagal memuat artikel. Silakan coba lagi nanti.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />

      {/* Hero Section with Publartz branding */}
      <section className="bg-gradient-to-r from-blue-600 via-red-600 to-indigo-600 dark:from-blue-800 dark:via-red-800 dark:to-indigo-800 text-white overflow-hidden relative transition-colors duration-300">
        {/* Floating Elements dengan animasi */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-40 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Publartz Title with Animation */}
            <div className="relative mb-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-red-100 bg-clip-text animate-scale-in">
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0s' }}>
                  P
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.1s' }}>
                  u
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
                  b
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
                  l
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.4s' }}>
                  a
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                  r
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.6s' }}>
                  t
                </span>
                <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.7s' }}>
                  z
                </span>
              </h1>
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-red-400/20 blur-3xl animate-pulse"></div>
            </div>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-blue-200 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Platform Blog Profesional - Temukan artikel terbaru tentang teknologi, bisnis, dan inovasi
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm animate-slide-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <Calendar className="w-4 h-4 mr-2 animate-pulse" />
                <span className="text-white/90">{blogPosts.length} Artikel</span>
              </div>
              <div className="flex items-center hover:scale-110 transition-transform duration-300">
                <Tag className="w-4 h-4 mr-2 animate-pulse" />
                <span className="text-white/90">{categories.length} Kategori</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto animate-slide-in" style={{ animationDelay: '0.9s' }}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={allCategories} />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 pb-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post, index) => (
                  <div key={post.id} className="animate-fade-in hover:scale-105 transition-all duration-300" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                    <BlogCard post={post} index={index} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 animate-fade-in" style={{ animationDelay: '1.8s' }}>
                  <div className="flex space-x-2 bg-black">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-md'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4 animate-bounce-subtle" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2 animate-scale-in">Tidak ada artikel ditemukan</h3>
              <p className="text-gray-500 dark:text-gray-500 animate-slide-in">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
