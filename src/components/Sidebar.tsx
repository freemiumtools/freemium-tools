import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Category } from '../types';
import { useThemeStore } from '../store/theme';
import { useSidebarStore } from '../store/sidebar';
import { X, ChevronRight, ChevronDown } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, onClose }) => {
  const location = useLocation();
  const { categoryId } = useParams();
  const { isDark } = useThemeStore();
  const { isOpen, closeSidebar } = useSidebarStore();

  const isActive = (path: string) => location.pathname.includes(path);

  const handleLinkClick = () => {
    if (window.innerWidth < 640) { // Only close on mobile
      closeSidebar();
    }
  };

  return (
    <div className={`
      w-full h-full
      ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
      border-r
      overflow-hidden
      transition-all duration-200
    `}>
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 sm:hidden">
        <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Categories
        </h2>
        <button
          onClick={onClose}
          className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-500'}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="h-full overflow-y-auto p-4">
        {categories.map((category) => {
          const isCategoryActive = categoryId === category.id;
          
          return (
            <div key={category.id} className="mb-2">
              <Link
                to={`/category/${category.id}`}
                className={`
                  flex items-center justify-between p-2 rounded-lg
                  ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                  ${isCategoryActive ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}
                  transition-colors duration-150
                `}
              >
                <div className="flex items-center">
                  {React.createElement(category.icon, { 
                    className: `w-5 h-5 mr-3 ${
                      isCategoryActive
                        ? isDark
                          ? 'text-blue-400'
                          : 'text-blue-500'
                        : isDark
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`
                  })}
                  <span className={`
                    font-medium
                    ${isCategoryActive
                      ? isDark
                        ? 'text-white'
                        : 'text-gray-900'
                      : isDark
                      ? 'text-gray-300'
                      : 'text-gray-700'
                    }
                  `}>
                    {category.title}
                  </span>
                </div>
                {isCategoryActive ? (
                  <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </Link>

              {/* Show tools only for active category */}
              {isCategoryActive && (
                <div className="mt-1 ml-4 space-y-1">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tool/${category.id}/${tool.id}`}
                      onClick={handleLinkClick}
                      className={`
                        flex items-center px-3 py-2 rounded-lg text-sm
                        transition-colors duration-150
                        ${isActive(`/tool/${category.id}/${tool.id}`)
                          ? isDark
                            ? 'bg-gray-800 text-white'
                            : 'bg-blue-50 text-blue-600'
                          : isDark
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      {React.createElement(tool.icon, { 
                        className: `w-4 h-4 mr-2 ${
                          isActive(`/tool/${category.id}/${tool.id}`)
                            ? isDark
                              ? 'text-white'
                              : 'text-blue-500'
                            : isDark
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`
                      })}
                      {tool.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;