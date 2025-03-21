import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">FreemiumTools</h3>
            <p className="text-sm text-gray-600">Your hub for useful online utilities, both free and premium.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/category/mathematics" className="text-sm text-gray-600 hover:text-gray-900">Math Tools</Link></li>
              <li><Link to="/category/colors" className="text-sm text-gray-600 hover:text-gray-900">Color Tools</Link></li>
              <li><Link to="/category/text" className="text-sm text-gray-600 hover:text-gray-900">Text Tools</Link></li>
              <li><Link to="/category/conversion" className="text-sm text-gray-600 hover:text-gray-900">Conversion Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link to="/suggest" className="text-sm text-gray-600 hover:text-gray-900">Suggest a Tool</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-gray-200">
          <p className="text-sm text-gray-600">© {currentYear} FreemiumTools. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://twitter.com/freemiumtools" className="text-gray-600 hover:text-gray-900">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com/freemiumtools" className="text-gray-600 hover:text-gray-900">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;