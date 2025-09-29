"use client";

import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface HeaderProps {
  photoCount: number;
  onToggleAllMonths: () => void;
  allExpanded: boolean;
}

export function Header({
  photoCount,
  onToggleAllMonths,
  allExpanded,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='flex justify-between items-center mb-5'>
      <div>
        <h1 className='text-3xl text-white dark:text-black'>
          Gunnar&apos;s Gallery
        </h1>
        <p className='text-white dark:text-black'>{photoCount} photos</p>
      </div>

      <div className='flex gap-3'>
        <button
          onClick={onToggleAllMonths}
          className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
          aria-label={allExpanded ? "Collapse all months" : "Expand all months"}
        >
          {allExpanded ? (
            <FaChevronUp className='text-white dark:text-black text-xl' />
          ) : (
            <FaChevronDown className='text-white dark:text-black text-xl' />
          )}
        </button>

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
      </div>
    </header>
  );
}
