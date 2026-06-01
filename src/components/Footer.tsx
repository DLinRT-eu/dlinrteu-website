
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RSSIcon from './RSSIcon';
import CookieSettings from './CookieSettings';

const Footer = () => {
  const rssUrl = "https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/rss-feed";
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  const handleCookieSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCookieSettings(true);
  };

  const handleCookieSettingsClose = () => {
    setShowCookieSettings(false);
  };

  return (
    <>
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                Terms of Use
              </Link>
              <button 
                onClick={handleCookieSettingsClick}
                className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200"
              >
                Cookie Settings
              </button>
              <Link to="/security" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                Security
              </Link>
              <Link to="/changelog" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                Changelog
              </Link>
              <a href="https://github.com/DLinRT-eu/dlinrteu-website" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200">
                GitHub
              </a>
              <a href="https://www.linkedin.com/company/dlinrt-eu/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200 flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
            
            <div className="flex items-center">
              <a 
                href={rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#00A6D6] transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <RSSIcon className="h-4 w-4" />
                RSS Feed
              </a>
            </div>
            
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} DLinRT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showCookieSettings && (
        <CookieSettings onClose={handleCookieSettingsClose} />
      )}
    </>
  );
};

export default Footer;
