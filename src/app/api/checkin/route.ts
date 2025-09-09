import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyIdToken } from '@/lib/firebase-admin';

type CheckinBody = {
  eventId?: string;
  email?: string;
};

function extractIsoDateFromEventId(eventId: string): string | null {
  // Accept YYYY-MM-DD anywhere in the string
  const dashMatch = eventId.match(/(\d{4}-\d{2}-\d{2})/);
  if (dashMatch) return dashMatch[1];
  // Accept YYYYMMDD and convert to YYYY-MM-DD
  const compactMatch = eventId.match(/(\d{4})(\d{2})(\d{2})/);
  if (compactMatch) {
    const [, y, m, d] = compactMatch;
    return `${y}-${m}-${d}`;
  }
  return null;
}

function getTodayIsoDateUTC(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getWeekRangeUTC(isoDate: string): { start: Date; end: Date } {
  // Treat weeks as Mon-Sun in UTC
  const [y, m, d] = isoDate.split('-').map((v) => parseInt(v, 10));
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDay(); // 0=Sun ... 6=Sat
  const daysSinceMonday = (day + 6) % 7; // Mon=0
  const start = new Date(date);
  start.setUTCDate(start.getUTCDate() - daysSinceMonday);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  return { start, end };
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Expected application/json body' }, { status: 400 });
    }

    const body = (await request.json()) as CheckinBody;
    const eventId = (body.eventId || '').trim();
    const email = (body.email || '').trim().toLowerCase();

    if (!eventId) {
      return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
    }

    const encodedIsoDate = extractIsoDateFromEventId(eventId);
    if (!encodedIsoDate) {
      return NextResponse.json({ error: 'Invalid eventId: no date found' }, { status: 400 });
    }

    const todayIso = getTodayIsoDateUTC();
    if (encodedIsoDate !== todayIso) {
      return NextResponse.json(
        { error: 'DATE_MISMATCH', expectedDate: todayIso, eventDate: encodedIsoDate },
        { status: 400 }
      );
    }

    // Optional auth via Firebase ID token
    const authHeader = request.headers.get('authorization');
    let userId: string | null = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      try {
        const decoded = await verifyIdToken(token);
        userId = decoded.uid;
      } catch {
        // Ignore invalid token and continue as unauthenticated
        userId = null;
      }
    }

    if (!userId && !email) {
      return NextResponse.json({ error: 'Unauthorized: sign in or provide email' }, { status: 401 });
    }

    const now = new Date();

    // Prepare attendance document
    const attendance = {
      eventId,
      eventDate: encodedIsoDate, // YYYY-MM-DD
      userId: userId || null,
      email: userId ? null : email || null,
      checkedInAt: now,
      source: 'qr',
    } as const;

    // Upsert to avoid duplicates per user/email + event
    const dedupeFilter: Record<string, unknown> = { eventId };
    if (userId) dedupeFilter.userId = userId;
    else dedupeFilter.email = email;

    await db.collection('eventHistory').updateOne(
      dedupeFilter,
      {
        $setOnInsert: attendance,
        $set: { lastSeenAt: now },
      },
      { upsert: true }
    );

    // Compute simple weekly streak: attended >= 2 events in same week
    let streakThisWeek = false;
    if (userId) {
      const { start, end } = getWeekRangeUTC(encodedIsoDate);
      const count = await db.collection('eventHistory').countDocuments({
        userId,
        eventDate: { $gte: start.toISOString().slice(0, 10), $lt: end.toISOString().slice(0, 10) },
      });
      streakThisWeek = count >= 2;
    }

    return NextResponse.json({ success: true, streakThisWeek, eventDate: encodedIsoDate });
  } catch (error) {
    console.error('Error handling check-in:', error);
    return NextResponse.json({ error: 'Failed to record check-in' }, { status: 500 });
  }
}



