import React, { useState, useEffect } from 'react';

// Define the shape of a link object
interface Link {
  name: string;
  url: string;
}

// Define the key for local storage
const LINKS_STORAGE_KEY = 'campus-assist-links';

// Default links if none are in storage
const defaultLinks: Link[] = [
  { name: 'Student Portal', url: '#' },
  { name: 'Library Catalog', url: '#' },
  { name: 'Academic Calendar', url: '#' },
  { name: 'Campus Directory', url: '#' },
  { name: 'Bookstore', url: '#' },
];

// Icons
const LinkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const QuickLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Load links from local storage on initial render
  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem(LINKS_STORAGE_KEY);
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      } else {
        setLinks(defaultLinks);
      }
    } catch (error) {
      console.error("Failed to parse links from localStorage", error);
      setLinks(defaultLinks);
    }
  }, []);

  // Save links to local storage whenever they change
  useEffect(() => {
    // only save if it's not the initial default state from first load
    if (links.length > 0) {
      localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
    }
  }, [links]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLinkName.trim() === '' || newLinkUrl.trim() === '') return;
    
    const urlWithProtocol = newLinkUrl.startsWith('http://') || newLinkUrl.startsWith('https://') 
        ? newLinkUrl 
        : `https://${newLinkUrl}`;

    setLinks([...links, { name: newLinkName, url: urlWithProtocol }]);
    setNewLinkName('');
    setNewLinkUrl('');
  };

  const handleDeleteLink = (linkNameToDelete: string) => {
    setLinks(links.filter(link => link.name !== linkNameToDelete));
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pr-2">
        <ul className="space-y-2">
          {links.map(link => (
            <li key={link.name} className="flex items-center group">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-grow flex items-center text-slate-700 hover:text-blue-600 hover:bg-slate-100 p-2 rounded-md transition-colors duration-200 min-w-0">
                <LinkIcon />
                <span className="font-medium text-sm truncate">{link.name}</span>
              </a>
              {isEditing && (
                <button onClick={() => handleDeleteLink(link.name)} className="ml-2 p-1 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeleteIcon />
                </button>
              )}
            </li>
          ))}
          {links.length === 0 && !isEditing && <p className="text-sm text-slate-400 text-center py-4">No links yet. Add one below!</p>}
        </ul>
      </div>

      {isEditing && (
        <form onSubmit={handleAddLink} className="mt-4 p-3 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-600 mb-2">Add New Link</h4>
          <div className="space-y-2">
            <input
              type="text"
              value={newLinkName}
              onChange={e => setNewLinkName(e.target.value)}
              placeholder="Link Name (e.g., Library)"
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-sm"
              required
            />
            <input
              type="url"
              value={newLinkUrl}
              onChange={e => setNewLinkUrl(e.target.value)}
              placeholder="URL (e.g., example.com)"
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full mt-3 bg-green-600 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
            Add Link
          </button>
        </form>
      )}

      <div className="border-t border-slate-200 pt-3 mt-4">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          {isEditing ? 'Done Editing' : 'Edit Links'}
        </button>
      </div>
    </div>
  );
};

export default QuickLinks;
