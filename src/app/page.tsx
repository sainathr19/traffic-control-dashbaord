import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";

const todayStats = {
  tripleRiding: 15,
  noHelmet: 23,
  totalViolations: 38
};

const overallStats = {
  tripleRiding: 1250,
  noHelmet: 1876,
  totalViolations: 3126
};

const recentViolations = [
  {
    id: 1,
    type: "Triple Riding",
    vehicleNumber: "KA01AB1234",
    timestamp: "2024-02-20T10:30:00",
    location: "Junction 1",
    imageUrl: "/triple.png"
  },
  {
    id: 2,
    type: "Triple Riding",
    vehicleNumber: "KA02CD5678",
    timestamp: "2024-02-20T11:15:00",
    location: "Junction 2",
    imageUrl: "/triple.png"
  },
  {
    id: 3,
    type: "No Helmet",
    vehicleNumber: "KA03EF9012",
    timestamp: "2024-02-20T12:45:00",
    location: "Junction 3",
    imageUrl: "/triple.png"
  },
  // {
  //   id: 4,
  //   type: "Triple Riding",
  //   vehicleNumber: "KA04GH3456",
  //   timestamp: "2024-02-20T13:20:00",
  //   location: "Junction 4",
  //   imageUrl: "/triple.png"
  // },
  // {
  //   id: 5,
  //   type: "No Helmet",
  //   vehicleNumber: "KA05IJ7890",
  //   timestamp: "2024-02-20T14:10:00",
  //   location: "Junction 5",
  //   imageUrl: "/triple.png"
  // },
  // {
  //   id: 6,
  //   type: "Triple Riding",
  //   vehicleNumber: "KA06KL1234",
  //   timestamp: "2024-02-20T15:30:00",
  //   location: "Junction 6",
  //   imageUrl: "/triple.png"
  // }
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Today's Violations
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-3xl font-bold text-black dark:text-white">{todayStats.tripleRiding}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Triple Riding</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-3xl font-bold text-black dark:text-white">{todayStats.noHelmet}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">No Helmet</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-3xl font-bold text-black dark:text-white">{todayStats.totalViolations}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Overall Statistics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-3xl font-bold text-black dark:text-white">{overallStats.tripleRiding}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Triple Riding</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-3xl font-bold text-black dark:text-white">{overallStats.noHelmet}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">No Helmet</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-3xl font-bold text-black dark:text-white">{overallStats.totalViolations}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Violations */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
           Recent Violations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentViolations.map((violation) => (
              <div 
                key={violation.id} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={violation.imageUrl}
                    alt={`Violation ${violation.id}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm">
                    {violation.type}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg text-black dark:text-white">{violation.vehicleNumber}</p>
                  </div>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2 text-sm">
                      <span>🕒</span>
                      {new Date(violation.timestamp).toLocaleString()}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
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
