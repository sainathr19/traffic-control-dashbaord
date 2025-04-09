'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentLinkId = searchParams.get('razorpay_payment_link_id');
    const paymentId = searchParams.get('razorpay_payment_id');

    if (paymentLinkId && paymentId) {
      // Update payment status
      fetch('/api/update-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentLinkId,
          paymentId,
          status: 'PAID',
        }),
      });
    }
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your payment has been processed successfully.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Processing payment...</p>
          </div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </DashboardLayout>
  );
}