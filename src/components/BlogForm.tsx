import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { categories } from '../data/blogData';

interface BlogFormProps {
  post?: BlogPost | null;
  onSubmit: (postData: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
}

const BlogForm = ({ post, onSubmit, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    summary: '',
    image: '',
    category: '',
    author: '',
    published: false,
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        summary: post.summary,
        image: post.image,
        category: post.category,
        author: post.author,
        published: post.published,
      });
      setImagePreview(post.image);
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImagePreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      ...formData,
      created_at: post?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSubmit(postData);
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => setPreviewMode(false)} className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Editor
          </button>

          <article className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50">
            {imagePreview && <img src={imagePreview} alt={formData.title} className="w-full h-64 object-cover rounded-xl mb-8 shadow-lg" />}

            <div className="mb-6">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm">{formData.category}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{formData.title}</h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{formData.summary}</p>

            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex items-center space-x-4">
              <span>Oleh: {formData.author}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('id-ID')}</span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: formData.content }} />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onCancel} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Dashboard
          </button>

          <div className="flex space-x-4">
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50">
            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Gambar Artikel</label>

              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-xl shadow-lg" />
                  <button type="button" onClick={removeImage} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <div className="space-y-2">
                    <label className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                      Pilih gambar
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">atau masukkan URL gambar di field di bawah</p>
                  </div>
                </div>
              )}

              <input
                type="url"
                value={formData.image}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, image: e.target.value }));
                  setImagePreview(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                className="mt-4 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul Artikel *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Masukkan judul artikel..."
              />
            </div>

            {/* Slug */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug URL *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="judul-artikel-dalam-url"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Penulis *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Nama penulis..."
              />
            </div>

            {/* Summary */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ringkasan *</label>
              <textarea
                required
                rows={3}
                value={formData.summary}
                onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tulis ringkasan artikel..."
              />
            </div>

            {/* Content */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konten Artikel *</label>
              <textarea
                required
                rows={20}
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none font-mono text-sm"
                placeholder="Tulis konten artikel dalam HTML..."
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Gunakan HTML tags untuk formatting: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, dll.</p>
            </div>

            {/* Published Toggle */}
            <div className="mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                  className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Publikasikan artikel</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-red-700 to-indigo-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 hover:from-blue-700 hover:via-red-800 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {post ? 'Perbarui Artikel' : 'Simpan Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
