import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyIdToken } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    // Verify Firebase token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyIdToken(token);
    const userId = decodedToken.uid;

    const db = await getDatabase();
    
    // Fetch dashboard data for the user
    const dashboardData = await db.collection('dashboard').findOne({ userId });
    
    if (!dashboardData) {
      // Return empty data structure if no data exists
      return NextResponse.json({
        progressData: {},
        thumbnails: [],
        attendanceData: [],
        styleData: [],
        eventHistory: []
      });
    }

    return NextResponse.json({
      progressData: dashboardData.progressData || {},
      thumbnails: dashboardData.thumbnails || [],
      attendanceData: dashboardData.attendanceData || [],
      styleData: dashboardData.styleData || [],
      eventHistory: dashboardData.eventHistory || []
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const db = await getDatabase();
    
    // Update or create dashboard data
    await db.collection('dashboard').updateOne(
      { userId },
      { 
        $set: { 
          ...body,
          userId,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to update dashboard data' },
      { status: 500 }
    );
  }
}
