import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Twitter, Facebook, Linkedin, Share2, ChevronRight, Download, Bookmark, Copy, History as HistoryIcon } from 'lucide-react';
import { Category } from '../types';
import Layout from '../components/Layout';
import Calculator from '../components/tools/mathematics/Calculator';
import AreaCalculator from '../components/tools/mathematics/AreaCalculator';
import FlamesCalculator from '../components/tools/mathematics/FlamesCalculator';
import AdBanner from '../components/AdBanner';

interface ToolPageProps {
  categories: Category[];
}

const ToolPage: React.FC<ToolPageProps> = ({ categories }) => {
  const { categoryId, toolId } = useParams();
  
  const category = categories.find(c => c.id === categoryId);
  const tool = category?.tools.find(t => t.id === toolId);

  if (!category || !tool) {
    return <div>Tool not found</div>;
  }

  const shareUrl = window.location.href;

  // Define types for supported share platforms
  type SharePlatform = 'twitter' | 'facebook' | 'linkedin';

  // Create a type-safe share URL mapping
  const shareUrls: Record<SharePlatform, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tool.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const handleShare = (platform: SharePlatform) => {
    window.open(shareUrls[platform], '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderTool = () => {
    switch (toolId) {
      case 'calculator':
        return <Calculator />;
      case 'area-calculator':
        return <AreaCalculator />;
      case 'flames-calculator':
        return <FlamesCalculator />;
      default:
        return <div className="text-center text-gray-500">Tool implementation coming soon...</div>;
    }
  };

  // Find related tools from the same category
  const relatedTools = category.tools
    .filter(t => t.id !== toolId)
    .slice(0, 3);

  return (
    <Layout categories={categories}>
      <div className="max-w-full mx-auto px-6 sm:px-8 py-6">
        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {/* Tool title and breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link to={`/category/${category.id}`} className="hover:text-blue-600">{category.title}</Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span>{tool.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{tool.title}</h1>
            <p className="text-gray-600 mt-1">{tool.description}</p>
          </div>

          {/* Top Ad Banner */}
          <AdBanner 
            adSlot="1234567890" 
            format="horizontal" 
            height="90px" 
            className="mb-8"
          />

          {/* Tool Content with Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderTool()}
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div id="tool-output" className="min-h-[200px]"></div>
            </div>
          </div>

          {/* Mid-Content Ad Banner */}
          <AdBanner 
            adSlot="9876543210" 
            format="rectangle" 
            height="250px" 
            className="my-8"
          />

          {/* History Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">History</h2>
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <HistoryIcon className="w-4 h-4 mr-1" />
                View all
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Previous calculation</p>
                    <p className="text-xs text-gray-500">2023-06-15 14:30</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Previous calculation</p>
                    <p className="text-xs text-gray-500">2023-06-14 10:15</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Ad Banner */}
          <AdBanner 
            adSlot="5678901234" 
            format="horizontal" 
            height="90px" 
            className="mb-8"
          />

          {/* Related Tools */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  to={`/tool/${category.id}/${relatedTool.id}`}
                  className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  {React.createElement(relatedTool.icon, { className: "w-5 h-5 text-gray-600 mr-3" })}
                  <span className="text-sm font-medium text-gray-900">{relatedTool.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tool-specific FAQ section */}
          {toolId === 'flames-calculator' && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">What is the Flames Calculator?</h3>
                  <p className="text-sm text-gray-600">
                    The Flames Calculator is a fun and interactive tool that predicts the relationship between two people based on their names. 
                    It uses the classic FLAMES method, where each letter stands for a relationship type: Friends, Love, Affection, Marriage, Enemies, or Siblings.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">How does the Flames Test work?</h3>
                  <p className="text-sm text-gray-600">
                    The FLAMES test works by removing all common letters from both names, counting the remaining letters, and using this count to determine 
                    the relationship type. The count is divided by 6 (representing the 6 letters in FLAMES), and the remainder corresponds to 
                    a specific relationship type in the FLAMES acronym.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Is the Flames Test accurate?</h3>
                  <p className="text-sm text-gray-600">
                    The Flames Test is primarily meant for entertainment and should be taken with a light heart. It's a fun activity that has been popular
                    among young people for generations, but it doesn't have any scientific basis for predicting actual relationships. Real relationships 
                    depend on compatibility, communication, and shared values rather than name calculations.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Can I use full names or nicknames in the Flames Calculator?</h3>
                  <p className="text-sm text-gray-600">
                    Yes, you can use either full names, first names, or nicknames in the Flames Calculator. The results might vary 
                    depending on which version of the names you use, so you can try different combinations for fun. Some people prefer 
                    using first names only, while others use full names including last names.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">What should I do if I get a result I don't like?</h3>
                  <p className="text-sm text-gray-600">
                    Remember that the Flames Test is just for fun and entertainment. If you get a result you don't like (such as "Enemies"), 
                    don't take it too seriously! You can try using different variations of your names (like nicknames or full names) 
                    to see if you get different results. Real relationships are determined by much more complex factors than name calculations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ToolPage;