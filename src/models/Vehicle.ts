import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  type: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);