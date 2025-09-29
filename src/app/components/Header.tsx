"use client";

import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

interface HeaderProps {
  photoCount: number;
}

export function Header({ photoCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='flex justify-between items-center mb-5'>
      <div>
        <h1 className='text-3xl mb-2 text-white dark:text-black'>
          Gunnar&apos;s Photo Gallery
        </h1>
        <p className='text-white dark:text-black'>{photoCount} photos</p>
      </div>

      <button
        onClick={toggleTheme}
        className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
        aria-label='Toggle theme'
      >
        {theme === "dark" ? (
          <FaSun className='text-yellow-400 text-xl' />
        ) : (
          <FaMoon className='text-blue-600 text-xl' />
        )}
      </button>
    </header>
  );
}
