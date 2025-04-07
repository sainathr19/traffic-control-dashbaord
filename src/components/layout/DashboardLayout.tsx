"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black dark:text-white">
                <Link href={"/"}>
                    Traffic Monitor
                </Link>
              </h1>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/search" 
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/search' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Search Vehicle
              </Link>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/search" 
                className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === '/search' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Search Vehicle
              </Link>
            </div>
          )}
        </div>
      </nav>
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;