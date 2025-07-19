import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TODO_STORAGE_KEY = 'campus-assist-todos';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
        console.error("Failed to parse todos from localStorage", error);
        setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="p-4">
      <form onSubmit={handleAddTodo} className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-sm"
        />
        <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">+</button>
      </form>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 p-2 rounded-md transition-colors">
            <div className="flex items-center flex-1 min-w-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3 flex-shrink-0"
              />
              <span className={`text-sm break-words ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{todo.text}</span>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="p-1 ml-2 flex-shrink-0">
              <DeleteIcon />
            </button>
          </li>
        ))}
        {todos.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No tasks yet. Add one above!</p>}
      </ul>
    </div>
  );
};

export default TodoList;
