import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // Dynamically import to capture configuration errors gracefully
    const mongoModule = await import('@/lib/mongodb');

    // Use exported helper to get DB and ping
    const db = await mongoModule.getDatabase();
    await db.admin().command({ ping: 1 });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[API][MONGO][PING] Error:', error);

    // Provide a clearer error when Mongo configuration is missing
    const message =
      typeof error?.message === 'string' && error.message.includes('MONGODB_URI')
        ? 'MongoDB is not configured. Set MONGODB_URI (and optional MONGODB_DB).'
        : 'Ping failed';

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


