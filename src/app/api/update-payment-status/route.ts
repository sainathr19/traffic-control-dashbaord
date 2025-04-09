import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function POST(request: Request) {
  try {
    const { paymentLinkId, paymentId, status } = await request.json();

    await connectDB();

    const updatedPayment = await Payment.findOneAndUpdate(
      { paymentLinkId },
      { 
        $set: { 
          status,
          paymentId
        }
      },
      { new: true }
    );

    if (!updatedPayment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, payment: updatedPayment });

  } catch (error) {
    console.error('Payment update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}