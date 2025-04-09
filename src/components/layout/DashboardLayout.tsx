'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black dark:text-white">
                <Link href="/">Traffic Monitor</Link>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
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
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      pathname === '/dashboard' 
                        ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/analytics" 
                    className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                      pathname === '/analytics' 
                        ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    Analytics
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4">
              <Link 
                href="/search"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Search Vehicle
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/analytics"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Analytics
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}