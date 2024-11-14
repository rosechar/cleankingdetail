import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const OfferToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Check if user has seen the toast this session
    const hasSeenToast = sessionStorage.getItem('hasSeenDiscountToast');
    
    if (!hasSeenToast) {
      // Delay showing the toast by 1 second
      const showDelay = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenDiscountToast', 'true');
        
        // Start the auto-close timer after showing the toast
        const hideTimer = setTimeout(() => {
          handleClose();
        }, 10000);

        return () => clearTimeout(hideTimer);
      }, 3000);

      return () => clearTimeout(showDelay);
    }
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleClick = (e) => {
    if (e.target.closest('button')) return;
    window.location.href = 'tel:+1234567890';
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleClick}
      className={`
        fixed bottom-16 left-4 right-4 md:left-1/2 md:-translate-x-1/2
        bg-gray-900 
        shadow-lg 
        rounded-lg 
        p-4 
        w-auto
        md:max-w-md
        border 
        border-gray-200
        flex 
        items-center 
        gap-3
        transition-all duration-300 ease-in-out
        hover:bg-gray-800
        cursor-pointer
        mx-auto
        ${isLeaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
      `}
    >
      {/* Phone Icon */}
      <Phone className="w-7 h-7 flex-shrink-0 text-red-600" strokeWidth={2} />

      {/* Toast Content */}
      <div className="min-w-0">
        <div className="font-semibold text-white">Limited Time Offer!</div>
        <div className="text-white">
          Call today and mention this banner for $10 off your first detail!
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fixed {
          animation: slideIn 0.3s ease-out;
        }
        @media (min-width: 768px) {
          @keyframes slideIn {
            from { opacity: 0; transform: translate(-50%, 1rem); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        }
      `}</style>
    </div>
  );
};

export default OfferToast;