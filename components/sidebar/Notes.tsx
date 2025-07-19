import React, { useState, useEffect, useCallback } from 'react';

// A simple debounce function to avoid saving on every keystroke
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced;
};

const NOTES_STORAGE_KEY = 'campus-assist-notes';

const Notes: React.FC = () => {
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const savedNote = localStorage.getItem(NOTES_STORAGE_KEY);
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const saveNote = useCallback((value: string) => {
    localStorage.setItem(NOTES_STORAGE_KEY, value);
  }, []);

  const debouncedSave = useCallback(debounce(saveNote, 500), [saveNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    debouncedSave(newNote);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Type your notes here... They are saved automatically."
        className="w-full flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow resize-none text-sm"
        aria-label="Notes area"
      />
    </div>
  );
};

export default Notes;
