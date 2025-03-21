import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'freemium-tools-cookie-consent';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    // If no consent is stored, show the banner after a short delay
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Store the consent in localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Even when declining, we need to store this choice
    localStorage.setItem(COOKIE_CONSENT_KEY, 'false');
    setIsVisible(false);
    
    // You might want to disable certain functionality or cookies here
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 p-4">
      <div className="max-w-full mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 sm:mr-4 text-sm text-gray-600">
          <p>
            We use cookies to enhance your experience on our website. By continuing to browse, you agree to our{' '}
            <Link to="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</Link>.
            See our{' '}
            <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>{' '}
            for more information.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 