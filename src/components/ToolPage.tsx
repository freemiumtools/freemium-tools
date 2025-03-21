import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2, ChevronRight } from 'lucide-react';

interface ToolPageProps {
  toolId: string;
  title: string;
  description: string;
  category: string;
}

const ToolPage: React.FC<ToolPageProps> = ({ toolId, title, description, category }) => {
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform in shareUrls) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-gray-900">Home</a>
          <ChevronRight className="w-4 h-4" />
          <a href={`/category/${category.toLowerCase()}`} className="hover:text-gray-900">{category}</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{title}</span>
        </nav>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          
          {/* Social Share Buttons */}
          <div className="flex items-center space-x-4 mb-6">
            <button 
              onClick={() => handleShare('twitter')}
              className="flex items-center space-x-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span>Tweet</span>
            </button>
            
            <button 
              onClick={() => handleShare('facebook')}
              className="flex items-center space-x-2 bg-[#4267B2] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button 
              onClick={() => handleShare('linkedin')}
              className="flex items-center space-x-2 bg-[#0077B5] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button 
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Link2 className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Tool Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tool</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            {/* Tool content will be rendered here */}
            <p className="text-gray-500 text-center">Tool interface will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;