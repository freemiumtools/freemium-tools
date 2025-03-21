import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Category } from '../types';
import { useThemeStore } from '../store/theme';
import { Menu, Moon, Sun, Search } from 'lucide-react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  categories: Category[];
}

const Layout: React.FC<LayoutProps> = ({ children, categories }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isDesktopView = window.innerWidth >= 1024;
      setIsDesktop(isDesktopView);
      if (!isDesktopView) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? 'bg-gray-800' : 'bg-[#E55B4D]'
      } shadow-sm`}>
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white hover:bg-[#c54d41] rounded p-1.5 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="text-white font-bold text-xl">
                PINETOOLS
              </Link>
            </div>

            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for tools..."
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-[#c54d41]`}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="text-white hover:bg-[#c54d41] rounded p-2 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link
                to="/suggest"
                className={`hidden sm:block px-3 py-1 rounded text-sm ${
                  isDark ? 'text-white hover:bg-gray-700' : 'text-white hover:bg-[#c54d41]'
                } transition-colors`}
              >
                Suggest a tool
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-2 pb-2 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className={`w-full px-4 py-2 rounded-lg text-sm ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#c54d41]`}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex pt-16 md:pt-[4.5rem]">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 w-64 z-30 transform transition-transform duration-300 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } ${!isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}
          style={{ top: 'var(--header-height, 4rem)' }}
        >
          <Sidebar 
            categories={categories} 
            onClose={() => !isDesktop && setIsSidebarOpen(false)} 
          />
        </aside>

        {/* Overlay for mobile */}
        {!isDesktop && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <main className={`flex-1 min-w-0 transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;