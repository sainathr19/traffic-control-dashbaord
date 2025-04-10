import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
  },
  violationType: {
    type: String,
    enum: ['Triple Riding', 'No Helmet'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'OVERDUE'],
    default: 'PENDING',
  },
  paymentLinkId: {
    type: String,
    required: true,
  },
  paymentLink: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paidAt: {
    type: Date,
  },
  razorpayPaymentId: {
    type: String,
  },
  remindersSent: [{
    type: Date,
  }],
  email: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);