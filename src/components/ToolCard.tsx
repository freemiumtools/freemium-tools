import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <tool.icon className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {tool.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
        <p className="text-sm text-gray-500">{tool.description}</p>
        <button
          className="mt-4 w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200"
          onClick={() => console.log(`Opening ${tool.title}`)}
        >
          Open Tool
        </button>
      </div>
    </div>
  );
};

export default ToolCard;