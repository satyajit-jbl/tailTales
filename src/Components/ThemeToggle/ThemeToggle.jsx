import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all duration-300"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default ThemeToggle;
