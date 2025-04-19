import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import { sendViolationNotification } from '@/lib/emailService';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    // Ensure database connection
    await connectDB();

    let body;
    try {
      const text = await request.text();
      body = JSON.parse(text);
    } catch (jsonError) {
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }

    const { vehicleNumber, type, location, imageBase64, email } = body;

    // Validate required fields
    if (!vehicleNumber || !type || !location || !imageBase64) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

        // Validate image
        if (!imageBase64 || !imageBase64.startsWith('data:image/')) {
          return NextResponse.json(
            { error: 'Invalid image format' },
            { status: 400 }
          );
        }

    // Determine fine amount based on violation type
    const fineAmount = type === 'Triple Riding' ? 1000 : 500;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // Create Razorpay payment link
    const paymentLink = await razorpay.paymentLink.create({
      amount: fineAmount * 100,
      currency: 'INR',
      description: `Traffic Violation Fine - ${type}`,
      customer: {
        name: vehicleNumber,
        email: email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      notes: {
        vehicleNumber,
        violationType: type,
        location,
        timestamp : new Date().toISOString(),
      },
      callback_url: `${baseUrl}/payment/success`,
      callback_method: 'get',
      options: {
        checkout: {
          name: "Traffic Control Department",
          description: "Traffic Violation Payment"
        }
      }
    });

    // Store in DB
    const payment = await Payment.create({
      vehicleNumber,
      violationType: type,
      amount: fineAmount,
      location,
      timestamp: new Date(),
      imageBase64,
      status: 'PENDING',
      paymentLinkId: paymentLink.id,
      paymentLink: paymentLink.short_url,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      email, // Store email in payment record
    });

    // Send email notification
    if (email) {
      await sendViolationNotification(email, {
        vehicleNumber,
        violationType: type,
        amount: fineAmount,
        paymentLink: paymentLink.short_url
      });
    }

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}