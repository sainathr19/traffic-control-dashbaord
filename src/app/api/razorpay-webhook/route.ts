import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const { payload: { payment_link, payment } } = JSON.parse(body);

    await connectDB();
    await Payment.findOneAndUpdate(
      { paymentLinkId: payment_link.id },
      { 
        $set: { 
          status: 'PAID',
          razorpayPaymentId: payment.entity.id,
          paidAt: new Date()
        }
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}