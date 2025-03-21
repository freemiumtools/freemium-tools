import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, Moon, Search, Sun, X, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useThemeStore } from '../store/theme';
import { useSidebarStore } from '../store/sidebar';

const Header: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();
  const { isOpen, toggleSidebar } = useSidebarStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`${isDark ? 'bg-gray-800' : 'bg-[#E55B4D]'} shadow-sm sticky top-0 z-50`}>
      <div className="max-w-full mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white font-bold text-xl">FREEMIUM TOOLS</Link>
            <button
              onClick={toggleSidebar}
              className="text-white hover:bg-[#c54d41] rounded p-1.5 transition-colors"
              aria-label="Toggle sidebar"
              title={isOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              {isOpen ? 
                <PanelLeftClose className="w-5 h-5" /> : 
                <PanelLeft className="w-5 h-5" />
              }
            </button>
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
        <div className="mt-2 md:hidden">
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
  );
};

export default Header;