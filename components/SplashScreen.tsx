import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Call onFinished to remove the component from the DOM after the fade-out animation completes (500ms)
    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2500); // 2000ms delay + 500ms animation

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-blue-900 text-white transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={isFadingOut}
      role="status"
      aria-live="polite"
    >
      <div className="flex space-x-3">
        <div className="w-6 h-6 bg-white rounded-md animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-6 h-6 bg-white rounded-md animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-6 h-6 bg-white rounded-md animate-bounce"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
