"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black dark:text-white">
                Traffic Monitor
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
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
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;