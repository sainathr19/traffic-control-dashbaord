'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Stats, Violation } from "@/types";

export default function Home() {
  const [stats, setStats] = useState<{ today: Stats; overall: Stats } | null>(null);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, violationsRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/violations')
        ]);
        
        const statsData = await statsRes.json();
        const violationsData = await violationsRes.json();

        setStats(statsData);
        setViolations(violationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              Today's Violations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stats.today.tripleRiding}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Triple Riding</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stats.today.noHelmet}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">No Helmet</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stats.today.totalViolations}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              Overall Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stats.overall.tripleRiding}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Triple Riding</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stats.overall.noHelmet}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">No Helmet</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stats.overall.totalViolations}</p>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Violations */}
        <div className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            Recent Violations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {violations.map((violation: Violation) => (
              <div 
                key={violation.id} 
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={violation.imageUrl}
                    alt={`Violation ${violation.id}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black dark:bg-white 
                                text-white dark:text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {violation.type}
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-base sm:text-lg text-black dark:text-white">
                      {violation.vehicleNumber}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${violation.status === 'PAID' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : violation.status === 'OVERDUE'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {violation.status}
                      </span>
                      <p className="text-sm font-semibold">₹{violation.fine}</p>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2 text-xs sm:text-sm">
                      <span>🕒</span>
                      {new Date(violation.timestamp).toLocaleString()}
                    </p>
                    <p className="flex items-center gap-2 text-xs sm:text-sm">
                      <span>📍</span>
                      {violation.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
