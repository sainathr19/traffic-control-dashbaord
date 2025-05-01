import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import mongoose from 'mongoose';
import connectDB from '../src/lib/mongodb';
import Vehicle from '../src/models/Vehicle';

// const sampleVehicles = [
//   {
//     vehicleNumber: 'KA01AB1234',
//     type: 'Two Wheeler',
//     ownerName: 'John Doe',
//     mobile: '9876543210',
//     email: 'john.doe@example.com'
//   },
//   {
//     vehicleNumber: 'KA02CD5678',
//     type: 'Four Wheeler',
//     ownerName: 'Jane Smith',
//     mobile: '9876543211',
//     email: 'jane.smith@example.com'
//   },
//   {
//     vehicleNumber: 'KA03EF9012',
//     type: 'Two Wheeler',
//     ownerName: 'Mike Johnson',
//     mobile: '9876543212',
//     email: 'mike.johnson@example.com'
//   },
//   {
//     vehicleNumber: 'KA04GH3456',
//     type: 'Four Wheeler',
//     ownerName: 'Sarah Williams',
//     mobile: '9876543213',
//     email: 'sarah.williams@example.com'
//   },
//   {
//     vehicleNumber: 'KA05IJ7890',
//     type: 'Two Wheeler',
//     ownerName: 'David Brown',
//     mobile: '9876543214',
//     email: 'david.brown@example.com'
//   },
//   {
//     vehicleNumber: 'KA05IJ7890',
//     type: 'Two Wheeler',
//     ownerName: 'David Brown',
//     mobile: '9876543214',
//     email: 'david.brown@example.com'
//   }
// ];

const sampleVehicles = [
  {
    vehicleNumber: 'TSO7ER3778',
    type: 'Two Wheeler',
    ownerName: 'Nandasree',
    mobile: '7981182708',
    email: 'nandasree3408@gmail.com'
  }
];

async function populateVehicles() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing vehicles
    await Vehicle.deleteMany({});
    console.log('Cleared existing vehicles');

    // Insert sample vehicles
    const result = await Vehicle.insertMany(sampleVehicles);
    console.log(`Successfully inserted ${result.length} vehicles`);

    // Display inserted vehicles
    console.log('\nInserted Vehicles:');
    result.forEach(vehicle => {
      console.log(`- ${vehicle.vehicleNumber} (${vehicle.type}) - ${vehicle.ownerName}`);
    });

  } catch (error) {
    console.error('Error populating vehicles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the population script
populateVehicles();