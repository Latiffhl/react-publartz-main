import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, BarChart3, FileText, Eye, Sparkles } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { BlogPost } from '../types/blog';
import { useToast } from '@/hooks/use-toast';
import { useAdminBlogPosts } from '../hooks/useAdminBlogPosts';
import BlogForm from '../components/BlogForm';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const { blogPosts, isLoading, error, addPost, editPost, deletePost, isAddingPost, isEditingPost, isDeletingPost } = useAdminBlogPosts();

  // Redirect to auth if not signed in
  if (isLoaded && !isSignedIn) {
    navigate('/admin/auth');
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari dashboard admin.',
    });
    navigate('/admin/auth');
  };

  const handleAddPost = (postData: Omit<BlogPost, 'id'>) => {
    addPost(postData);
    setShowForm(false);
  };

  const handleEditPost = (postData: Omit<BlogPost, 'id'>) => {
    if (!editingPost) return;

    editPost({ id: editingPost.id, postData });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleDeletePost = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      deletePost(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const publishedPosts = blogPosts.filter((post) => post.published);
  const draftPosts = blogPosts.filter((post) => !post.published);

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium animate-bounce-subtle">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-fade-in">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-6 shadow-lg">
            <p className="text-red-600 dark:text-red-400 mb-4 font-medium">Error memuat data: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <BlogForm
        post={editingPost}
        onSubmit={editingPost ? handleEditPost : handleAddPost}
        onCancel={() => {
          setShowForm(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 transition-colors duration-300">
      {/* Modern Header dengan gradient */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-white via-white to-white rounded-xl shadow-lg flex items-center justify-center">
                  {/* logo */}
                  <img src="/favicon.ico" alt="Logo Publartz" className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-30 blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Dashboard Admin</h1>
                {user && <span className="text-sm text-gray-600 dark:text-gray-400">Selamat datang, {user.emailAddresses[0]?.emailAddress}</span>}
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Artikel</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{blogPosts.length}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dipublikasikan</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{publishedPosts.length}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Draft</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{draftPosts.length}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Enhanced Add New Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            disabled={isAddingPost}
            className="relative bg-gradient-to-r from-blue-600 via-red-700 to-indigo-600 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-red-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="w-6 h-6 mr-3 relative z-10 group-hover:rotate-180 transition-transform duration-300" />
            <span className="relative z-10">{isAddingPost ? 'Menambahkan...' : 'Tambah Artikel Baru'}</span>
          </button>
        </div>

        {/* Enhanced Blog Posts Table */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daftar Artikel</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Artikel</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {blogPosts.map((post, index) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={post.image} alt={post.title} className="w-12 h-12 rounded-xl object-cover mr-4 shadow-md" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium shadow-sm">{post.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(post.created_at)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                          post.published
                            ? 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300'
                            : 'bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-800 dark:text-orange-300'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setShowForm(true);
                          }}
                          disabled={isEditingPost}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 disabled:opacity-50 transition-colors duration-200 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={isDeletingPost}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50 transition-colors duration-200 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
