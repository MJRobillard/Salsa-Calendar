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
    
    // Fetch event history for the user using new check-in schema
    const docs = await db.collection('eventHistory')
      .find({ userId })
      .sort({ checkedInAt: -1, eventDate: -1 })
      .limit(50)
      .toArray();

    // Serialize dates and ids for client safety
    const eventHistory = (docs || []).map((doc: any) => ({
      id: doc._id ? String(doc._id) : undefined,
      eventId: doc.eventId ?? doc.event_id ?? '',
      eventDate: doc.eventDate ?? doc.date ?? '',
      checkedInAt: doc.checkedInAt instanceof Date ? doc.checkedInAt.toISOString() : doc.checkedInAt,
      source: doc.source || 'qr',
    }));

    return NextResponse.json({ eventHistory });

  } catch (error) {
    console.error('Error fetching event history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event history' },
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
    
    // Add new event history entry
    const eventEntry = {
      ...body,
      userId,
      createdAt: new Date()
    };

    await db.collection('eventHistory').insertOne(eventEntry);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error adding event history:', error);
    return NextResponse.json(
      { error: 'Failed to add event history' },
      { status: 500 }
    );
  }
}
