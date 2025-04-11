'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Image from 'next/image';
import { Violation } from '@/types';

// Vehicle number format: KA01AB1234
const VEHICLE_NUMBER_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;

export default function SearchPage() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [searchResults, setSearchResults] = useState<Violation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    setLoading(true);
    
    try {
      const res = await fetch(`/api/violations?vehicleNumber=${vehicleNumber}`);
      if (!res.ok) {
        throw new Error('Failed to fetch violations');
      }
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching violations:', error);
      setError('Failed to fetch violation data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Vehicle Search</h2>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter vehicle number (e.g., KA01AB1234)"
                className={`flex-1 p-3 border-2 rounded-lg focus:outline-none
                          ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
                          dark:bg-gray-700`}
                value={vehicleNumber}
                onChange={(e) => {
                  setError(null);
                  setVehicleNumber(e.target.value.toUpperCase());
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg 
                         hover:bg-primary/90 transition-colors duration-200 font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </form>
        </div>

        {/* Results Section */}
        {searchResults && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Violation History</h3>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {searchResults.map((violation: Violation) => (
                  <div 
                    key={violation.id} 
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden 
                             shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 sm:h-64">
                      <img
                        src={violation.imageBase64}
                        alt={`Violation ${violation.id}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 
                                    bg-black dark:bg-white text-white dark:text-black 
                                    px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        {violation.type}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-base sm:text-lg font-semibold">Violation #{violation.id}</p>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium
                            ${violation.status === 'PAID' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'}`}
                          >
                            {violation.status === 'PAID' ? 'PAID' : 'NOT PAID'}
                          </span>
                          <p className="text-base sm:text-lg font-bold">₹{violation.fine}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base flex justify-between">
                        <div className='flex flex-col gap-3'>
                        <p className="flex items-center gap-2">
                          <span className="w-4 h-4">🕒</span>
                          {new Date(violation.timestamp).toLocaleString()}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-4 h-4">📍</span>
                          {violation.location}
                        </p>

                        </div>
                        {violation.status !== 'PAID' && (
                        <a
                          href={violation.paymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-2 rounded-lg transition-colors duration-200 flex justify-center items-center h-max py-2"
                        >
                          Pay Now
                        </a>
                      )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No violations found for vehicle number {vehicleNumber}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}