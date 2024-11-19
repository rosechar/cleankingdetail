import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const OfferToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem('hasSeenDiscountToast');

    if (!hasSeenToast) {
      const showDelay = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenDiscountToast', 'true');

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
      className={`fixed inset-x-4 bottom-16 mx-auto flex w-auto cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-900 to-gray-800 p-4 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-800 md:left-1/2 md:right-auto md:w-full md:max-w-md md:-translate-x-1/2 ${
        isLeaving ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <Phone className="size-7 shrink-0 text-red-600" strokeWidth={2} />

      <div className="min-w-0">
        <div className="font-semibold text-white">Limited Time Offer!</div>
        <div className="text-white">
          Call today and mention this banner for $10 off your first detail!
        </div>
      </div>

      <button
        onClick={handleClose}
        className="absolute right-2 top-2 shrink-0 text-gray-400 hover:text-gray-600"
      >
        <svg
          className="size-8"
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
    </div>
  );
};

export default OfferToast;
