import { Violation } from '@/types';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleNumber = searchParams.get('vehicleNumber');

    await connectDB();

    const query = vehicleNumber 
      ? { 
          vehicleNumber: { 
            $regex: vehicleNumber, 
            $options: 'i' 
          }
        } 
      : {};

    const violations = await Payment.find(query)
      .sort({ timestamp: -1 })
      .limit(vehicleNumber ? 0 : 10);

    const formattedViolations = violations.map((violation, index) => ({
      id: index + 1,
      type: violation.violationType,
      vehicleNumber: violation.vehicleNumber,
      timestamp: violation.timestamp.toISOString(),
      location: violation.location,
      imageBase64: violation.imageBase64,
      fine: violation.amount,
      status: violation.status,
      paymentLink: violation.paymentLink
    }));

    return NextResponse.json(formattedViolations);

  } catch (error) {
    console.error('Error fetching violations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch violations' },
      { status: 500 }
    );
  }
}