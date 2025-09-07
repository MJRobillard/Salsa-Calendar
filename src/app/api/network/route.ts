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
    
    // Fetch network data for the user
    const networkData = await db.collection('network').findOne({ userId });
    
    if (!networkData) {
      // Return empty network structure if no data exists
      return NextResponse.json({
        connections: [],
        interests: [],
        skills: [],
        events: [],
        messages: []
      });
    }

    return NextResponse.json(networkData);

  } catch (error) {
    console.error('Error fetching network data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch network data' },
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
    
    // Update or create network data
    await db.collection('network').updateOne(
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
    console.error('Error updating network data:', error);
    return NextResponse.json(
      { error: 'Failed to update network data' },
      { status: 500 }
    );
  }
}
