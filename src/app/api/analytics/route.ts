import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7days';
    const type = searchParams.get('type') || 'all';

    await connectDB();

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    switch (range) {
      case '30days':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case '1year':
        startDate.setDate(endDate.getDate() - 365);
        break;
      default: // 7days
        startDate.setDate(endDate.getDate() - 7);
    }

    // Base query with correct timestamp filter
    const baseQuery = {
      timestamp: { 
        $gte: startDate,
        $lte: endDate 
      },
      ...(type !== 'all' && { 
        violationType: type === 'tripleRiding' ? 'Triple Riding' : 'No Helmet' 
      })
    };

    // Get summary data with correct overdue calculation
    const [total, pending, paid, overdue] = await Promise.all([
      Payment.countDocuments(baseQuery),
      Payment.countDocuments({ ...baseQuery, status: 'PENDING' }),
      Payment.countDocuments({ ...baseQuery, status: 'PAID' }),
      Payment.countDocuments({
        ...baseQuery,
        status: 'PENDING',
        timestamp: { 
          $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          $gte: startDate 
        }
      })
    ]);

    // Calculate collection rate
    const collectionRate = total > 0 ? Math.round((paid / total) * 100) : 0;

    // Get location data
    const locations = await Payment.aggregate([
      { $match: baseQuery },
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }  // Limiting to top 5 locations
    ]);

    // Get payment status data
    const paymentStatus = await Payment.aggregate([
      { $match: baseQuery },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    type AggregateResult = {
      _id: string;
      count: number;
    };

    return NextResponse.json({
      summary: {
        total,
        pending,
        overdue,
        collectionRate
      },
      locationData: {
        labels: locations.map((l: AggregateResult) => l._id),
        datasets: [{
          data: locations.map((l: AggregateResult) => l.count),
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ]
        }]
      },
      paymentStatusData: {
        labels: ['Paid', 'Pending', 'Overdue'],
        datasets: [{
          data: [
            paymentStatus.find((s: AggregateResult) => s._id === 'PAID')?.count || 0,
            paymentStatus.find((s: AggregateResult) => s._id === 'PENDING')?.count || 0,
            paymentStatus.find((s: AggregateResult) => s._id === 'OVERDUE')?.count || 0
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(234, 179, 8, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ]
        }]
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}