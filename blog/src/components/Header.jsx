import { Disclosure } from '@headlessui/react'
import React, { useState, useEffect } from 'react'
import { Scroll, MoonIcon, SunIcon } from 'lucide-react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Return saved theme or default to 'light'
    return savedTheme || 'light';
  });
  
  useEffect(() => {
    // Apply or remove dark mode class on <html> tag
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store user preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Disclosure as="nav" id='navbar' className="bg-black dark:bg-balck absolute w-full z-20">
      <div className="sticky mx-auto max-w-7xl px-2 sm:px-5 lg:px-7 z-20">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-between">
            {/* <Link to={'/'}> */}
            <div className="flex items-center">
                <button>
                    <Scroll className="text-white dark:text-white" />
                </button>
            </div>
            {/* </Link> */}
            {/* <div className="w-full max-w-sm min-w-[200px] mx-6">
              <Msearch/>
            </div> */}
            <Link to={'/'}>
            <button 
            className='text-white dark:text-white hover:text-orange-500 dark:hover:text-teal-500 '>
              blogs
            </button>
            </Link>
            {/* <Link to={'/Favorits'}> */}
            {/* <button 
            className='text-white dark:text-white hover:text-orange-500 dark:hover:text-teal-500 '>
              Favorits
            </button> */}
            {/* </Link>
            <Link to={'/tranding'}> */}
            {/* <button
              className='text-white dark:text-white hover:text-orange-500 dark:hover:text-teal-500 '>
              Tranding
            </button> */}
            {/* </Link> */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6 text-orange-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-teal-500 " />
              )}
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}