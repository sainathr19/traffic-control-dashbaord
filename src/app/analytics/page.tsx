'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [violationType, setViolationType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, violationType]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/analytics?range=${dateRange}&type=${violationType}`);
      const data = await res.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <div className="flex flex-wrap gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            <select
              value={violationType}
              onChange={(e) => setViolationType(e.target.value)}
              className="p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Violations</option>
              <option value="tripleRiding">Triple Riding</option>
              <option value="noHelmet">No Helmet</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Violations</h3>
            <p className="text-3xl font-bold">{analyticsData?.summary.total || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">{analyticsData?.summary.pending || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Overdue (30 days)</h3>
            <p className="text-3xl font-bold text-red-500">{analyticsData?.summary.overdue || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Collection Rate</h3>
            <p className="text-3xl font-bold text-green-500">{analyticsData?.summary.collectionRate || 0}%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
          {/* Location Distribution */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Top Violation Locations</h3>
            <div className="h-64 md:h-80 flex items-center justify-center">
              {analyticsData?.locationData?.datasets[0]?.data?.length > 0 ? (
                <Pie
                  data={analyticsData.locationData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                          font: {
                            size: window.innerWidth < 768 ? 10 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No data available</p>
              )}
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Payment Status Distribution</h3>
            <div className="h-64 md:h-80 flex items-center justify-center">
              {analyticsData?.paymentStatusData?.datasets[0]?.data?.some((d: number) => d > 0) ? (
                <Pie
                  data={analyticsData.paymentStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                          font: {
                            size: window.innerWidth < 768 ? 10 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}