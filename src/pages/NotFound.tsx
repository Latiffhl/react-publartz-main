import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="text-center animate-fade-in">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">404</div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl animate-pulse"></div>
        </div>

        {/* Error Message */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md mx-auto border border-white/20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in [animation-delay:0.2s]">Alamak! Halamannya gak ada nih...</h1>
          <p className="text-gray-600 mb-2 animate-fade-in [animation-delay:0.4s]">Halaman yang Anda cari sepertinya belum di buat hehe...</p>
          <p className="text-sm text-gray-500 mb-8 animate-fade-in [animation-delay:0.5s]">
            Path: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{location.pathname}</code>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:0.6s]">
            <Link
              to="/"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
            >
              <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Kembali ke Beranda
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Kembali
            </button>

            <button onClick={handleRefresh} className="group bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg">
              <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Refresh
            </button>
          </div>
        </div>

        {/* Pemberitahuan */}
        <div className="mt-8 text-sm text-gray-600 animate-fade-in [animation-delay:0.8s]">
          <p>Tips: Pastikan URL yang Anda masukkan sudah benar atau coba refresh halaman.</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float [animation-delay:1s]"></div>
        <div className="absolute top-40 right-40 w-12 h-12 bg-indigo-500/10 rounded-full animate-float [animation-delay:2s]"></div>
      </div>
    </div>
  );
};

export default NotFound;
