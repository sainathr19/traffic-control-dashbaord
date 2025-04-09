'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const razorpayPaymentId = searchParams.get('razorpay_payment_id');
  const razorpayPaymentLinkId = searchParams.get('razorpay_payment_link_id');

  useEffect(() => {
    if (razorpayPaymentId && razorpayPaymentLinkId) {
      fetch('/api/update-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentLinkId: razorpayPaymentLinkId,
          paymentId: razorpayPaymentId,
          status: 'PAID'
        })
      });
    }
  }, [razorpayPaymentId, razorpayPaymentLinkId]);

  return (
    <DashboardLayout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center space-y-6">
          <div className="animate-bounce">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <div className="text-green-500 text-5xl">✓</div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h1>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">
              Your payment has been processed successfully. A confirmation email will be sent shortly.
            </p>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p>Payment ID: {razorpayPaymentId}</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-all duration-200"
            >
              Return to Home
            </Button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can safely close this window
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}