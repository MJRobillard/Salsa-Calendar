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
    
    // Fetch profile data for the user
    const profileData = await db.collection('profiles').findOne({ userId });
    
    if (!profileData) {
      // Return empty profile structure if no data exists
      return NextResponse.json({
        displayName: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        joinDate: '',
        lastSignIn: '',
        emailVerified: false,
        eventsAttended: 0,
        danceHours: 0,
        badgesEarned: 0
      });
    }

    return NextResponse.json(profileData);

  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    
    // Update or create profile data
    await db.collection('profiles').updateOne(
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
    console.error('Error updating profile data:', error);
    return NextResponse.json(
      { error: 'Failed to update profile data' },
      { status: 500 }
    );
  }
}
