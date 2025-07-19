import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-neutral-300 p-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} CampusAssist. All rights reserved.</p>
      <p>Powered by Gemini AI</p>
    </footer>
  );
};

export default Footer;