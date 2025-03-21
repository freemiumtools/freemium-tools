import React, { useEffect, useRef } from 'react';

// Declare global types for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  adSlot?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  width?: string;
  height?: string;
  className?: string;
}

/**
 * AdBanner Component for Google AdSense
 * 
 * This component implements Google AdSense ads following best practices:
 * - Clearly labeled as "Advertisement"
 * - Properly spaced from content
 * - Responsive design options
 * - Fallback display for development
 * - Complies with AdSense policies:
 *   - No deceptive placement
 *   - Clear labeling
 *   - Good content-to-ad ratio
 */
const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  format = 'auto',
  width = '100%',
  height = 'auto',
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    // Only inject ads in production and if adSlot is provided
    if (isProduction && adSlot) {
      try {
        // Push ad when component mounts
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adSlot, isProduction]);

  // If we're in development or no adSlot is provided, show a placeholder
  if (!isProduction || !adSlot) {
    return (
      <div className={`ad-container ${className}`}>
        <div className="text-xs text-gray-500 mb-1 font-medium">Advertisement</div>
        <div 
          className="bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center"
          style={{ width, height: height !== 'auto' ? height : '90px' }}
        >
          <span className="text-gray-400 text-sm">Ad Placeholder</span>
        </div>
      </div>
    );
  }

  // In production with valid adSlot, render the actual AdSense code
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-500 mb-1 font-medium">Advertisement</div>
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width, height }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual AdSense Publisher ID
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdBanner; 