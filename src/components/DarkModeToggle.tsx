import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Toggle dark mode"
    >
      {/* Toggle background */}
      <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-red-600 dark:to-indigo-600 rounded-full transition-all duration-300 ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`} />

      {/* Toggle circle */}
      <div className={`relative z-10 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-3' : '-translate-x-3'}`}>
        {/* Icons */}
        <Sun className={`w-3 h-3 text-yellow-500 absolute transition-all duration-300 ease-in-out ${isDark ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
        <Moon className={`w-3 h-3 text-blue-600 absolute transition-all duration-300 ease-in-out ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`} />
      </div>
    </button>
  );
};

export default DarkModeToggle;
