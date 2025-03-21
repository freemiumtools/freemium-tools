import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import Layout from '../components/Layout';
import { useThemeStore } from '../store/theme';

interface HomePageProps {
  categories: Category[];
}

type CategoryColors = {
  [key: string]: {
    light: string;
    dark: string;
  };
};

const HomePage: React.FC<HomePageProps> = ({ categories }) => {
  const { isDark } = useThemeStore();

  // Define category colors for both light and dark modes
  const categoryColors: CategoryColors = {
    mathematics: { light: 'bg-emerald-500', dark: 'bg-emerald-400' },
    colors: { light: 'bg-[#E55B4D]', dark: 'bg-[#ff6b5b]' },
    'text-and-lists': { light: 'bg-blue-500', dark: 'bg-blue-400' },
    numbers: { light: 'bg-orange-500', dark: 'bg-orange-400' },
    'date-and-time': { light: 'bg-[#E55B4D]', dark: 'bg-[#ff6b5b]' },
    images: { light: 'bg-red-500', dark: 'bg-red-400' },
    randomness: { light: 'bg-emerald-500', dark: 'bg-emerald-400' },
    files: { light: 'bg-[#E55B4D]', dark: 'bg-[#ff6b5b]' },
    programming: { light: 'bg-purple-500', dark: 'bg-purple-400' },
    videos: { light: 'bg-violet-500', dark: 'bg-violet-400' }
  };

  return (
    <Layout categories={categories}>
      <div className="max-w-full mx-auto">
        {/* Subheader */}
        <div className={`px-6 py-4 border-b ${
          isDark 
            ? 'border-gray-700 bg-gray-800/50' 
            : 'border-gray-200 bg-white'
        }`}>
          <h2 className={`text-lg font-medium ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}>
            FREE ONLINE TOOLS
          </h2>
        </div>

        {/* Categories and Tools */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`relative ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-sm`}
            >
              {/* Category color bar */}
              <div 
                className={`absolute left-0 top-0 w-1 h-full rounded-l-lg ${
                  categoryColors[category.id]?.[isDark ? 'dark' : 'light'] || 'bg-gray-300'
                }`} 
              />
              
              <div className="pl-6 pr-4 py-4">
                <h2 className={`font-medium mb-2 ${
                  isDark ? 'text-gray-100' : 'text-[#E55B4D]'
                }`}>
                  {category.title}
                </h2>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {category.tools.map(tool => (
                    <Link
                      key={tool.id}
                      to={`/tool/${category.id}/${tool.id}`}
                      className={`block text-sm transition-colors duration-200 ${
                        isDark 
                          ? 'text-gray-400 hover:text-[#ff6b5b]' 
                          : 'text-gray-600 hover:text-[#E55B4D]'
                      }`}
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-2">
                  <Link
                    to={`/category/${category.id}`}
                    className={`text-sm transition-colors duration-200 ${
                      isDark 
                        ? 'text-[#ff6b5b] hover:text-[#ff8d82]' 
                        : 'text-[#E55B4D] hover:text-[#c54d41]'
                    }`}
                  >
                    More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;