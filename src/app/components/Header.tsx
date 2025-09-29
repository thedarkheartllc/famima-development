"use client";

import { useTheme } from "../contexts/ThemeContext";
import {
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronUp,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";

interface HeaderProps {
  photoCount: number;
  onToggleAllMonths: () => void;
  allExpanded: boolean;
  personName?: string;
}

export function Header({
  photoCount,
  onToggleAllMonths,
  allExpanded,
  personName,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='flex justify-between items-center mb-5'>
      <div>
        <h1 className='text-3xl text-white dark:text-black'>
          {personName ? `${personName}'s Gallery` : "Photo Gallery"}
        </h1>
        <p className='text-white dark:text-black'>{photoCount} photos</p>
      </div>

      <div className='flex gap-3'>
        <Link
          href='/'
          className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
          aria-label='Go to home'
        >
          <FaHome className='text-white dark:text-black text-xl' />
        </Link>

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
