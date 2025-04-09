import { Stats } from '@/types';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';

export async function GET() {
  try {
    await connectDB();

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's stats
    const todayStats = await Promise.all([
      Payment.countDocuments({ 
        violationType: 'Triple Riding',
        timestamp: { $gte: today, $lt: tomorrow }
      }),
      Payment.countDocuments({ 
        violationType: 'No Helmet',
        timestamp: { $gte: today, $lt: tomorrow }
      })
    ]);

    // Get overall stats
    const overallStats = await Promise.all([
      Payment.countDocuments({ violationType: 'Triple Riding' }),
      Payment.countDocuments({ violationType: 'No Helmet' })
    ]);

    const response = {
      today: {
        tripleRiding: todayStats[0],
        noHelmet: todayStats[1],
        totalViolations: todayStats[0] + todayStats[1]
      },
      overall: {
        tripleRiding: overallStats[0],
        noHelmet: overallStats[1],
        totalViolations: overallStats[0] + overallStats[1]
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}