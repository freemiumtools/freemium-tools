import React from 'react';
import { Category } from '../types';

interface ToolsGridProps {
  category: Category;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ category }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2" id={category.id}>
        {category.title}
      </h2>
      <p className="text-gray-600 mb-6">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.tools.map(tool => (
          <div
            key={tool.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
            <button
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200"
              onClick={() => console.log(`Opening ${tool.title}`)}
            >
              Open Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;