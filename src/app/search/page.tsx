'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Image from 'next/image';

// Define the type for a violation
type Violation = {
  id: number;
  type: string;
  timestamp: string;
  location: string;
  imageUrl: string;
  fine: number;
};

const mockViolationHistory: Violation[] = [
  {
    id: 1,
    type: "Triple Riding",
    timestamp: "2024-02-20T10:30:00",
    location: "Junction 1",
    imageUrl: "/triple.png",
    fine: 1000
  },
  {
    id: 2,
    type: "Triple Riding",
    timestamp: "2024-02-20T11:15:00",
    location: "Junction 2",
    imageUrl: "/triple.png",
    fine: 1000
  },
  {
    id: 3,
    type: "No Helmet",
    timestamp: "2024-02-20T12:45:00",
    location: "Junction 3",
    imageUrl: "/triple.png",
    fine: 500
  },
  {
    id: 4,
    type: "Triple Riding",
    timestamp: "2024-02-20T13:20:00",
    location: "Junction 4",
    imageUrl: "/triple.png",
    fine: 1000
  },
  {
    id: 5,
    type: "No Helmet",
    timestamp: "2024-02-20T14:10:00",
    location: "Junction 5",
    imageUrl: "/triple.png",
    fine: 500
  }
];

export default function SearchPage() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [searchResults, setSearchResults] = useState<Violation[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults(mockViolationHistory);
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
                className="flex-1 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg 
                          focus:outline-none focus:border-primary dark:bg-gray-700"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg 
                         hover:bg-primary/90 transition-colors duration-200 font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {searchResults && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Violation History</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {mockViolationHistory.map((violation) => (
                <div 
                  key={violation.id} 
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden 
                           shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 sm:h-64">
                    <Image
                      src={violation.imageUrl}
                      alt={`Violation ${violation.id}`}
                      fill
                      className="object-cover"
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
                      <p className="text-base sm:text-lg font-bold">₹{violation.fine}</p>
                    </div>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4">🕒</span>
                        {new Date(violation.timestamp).toLocaleString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4">📍</span>
                        {violation.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}