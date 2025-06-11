import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [isSignUp, setIsSignUp] = useState(false);

  // Redirect if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-red-600 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-float [animation-delay:1s]"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-float [animation-delay:2s]"></div>
        <div className="absolute bottom-40 right-40 w-16 h-16 bg-white/5 rounded-full animate-float [animation-delay:0.5s]"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in relative border border-white/20">
        {/* Logo with Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center hover-scale relative overflow-hidden group">
            <div className="w-10 h-10 bg-white rounded-xl transition-transform group-hover:rotate-12"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">{isSignUp ? 'Daftar Admin' : 'Admin Login'}</h1>
          <p className="text-gray-600 mt-2 animate-fade-in [animation-delay:0.2s]">{isSignUp ? 'Buat akun admin baru untuk mengelola blog' : 'Masuk ke dashboard admin untuk mengelola konten'}</p>
        </div>

        {/* Clerk Auth Components with Custom Styling */}
        <div className="flex flex-col items-center animate-fade-in [animation-delay:0.4s]">
          {isSignUp ? (
            <SignUp
              forceRedirectUrl="/admin/dashboard"
              fallbackRedirectUrl="/admin/dashboard"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 bg-transparent',
                  headerTitle: 'text-2xl font-bold text-gray-900',
                  headerSubtitle: 'text-gray-600',
                  socialButtonsBlockButton: 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all duration-200 hover:scale-105',
                  formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition-all duration-200 hover:scale-105',
                  formFieldInput: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200',
                  footerActionLink: 'text-blue-600 hover:text-blue-700 transition-colors',
                },
              }}
            />
          ) : (
            <SignIn
              forceRedirectUrl="/admin/dashboard"
              fallbackRedirectUrl="/admin/dashboard"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 bg-transparent',
                  headerTitle: 'text-2xl font-bold text-gray-900',
                  headerSubtitle: 'text-gray-600',
                  socialButtonsBlockButton: 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all duration-200 hover:scale-105',
                  formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition-all duration-200 hover:scale-105',
                  formFieldInput: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200',
                  footerActionLink: 'text-blue-600 hover:text-blue-700 transition-colors',
                },
              }}
            />
          )}
        </div>

        {/* Toggle between Sign In and Sign Up */}
        <div className="mt-8 text-center animate-fade-in [animation-delay:0.6s]">
          <button onClick={() => setIsSignUp(!isSignUp)} className="group text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 relative">
            <span className="relative z-10">{isSignUp ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar di sini'}</span>
            <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 -z-0"></div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full animate-bounce-subtle"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-red-500 to-indigo-500 rounded-full animate-bounce-subtle [animation-delay:1s]"></div>
      </div>
    </div>
  );
};

export default Auth;
