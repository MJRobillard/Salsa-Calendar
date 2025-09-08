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
    console.log('[API][PROFILE][GET] Begin', { path: request.nextUrl.pathname });

    // Ensure a profile exists and keep server-truthy fields synced from Firebase token
    const now = new Date();
    const insertDefaults = {
      userId,
      phone: '',
      location: '',
      bio: '',
      dancePreferences: {
        Salsa: { role: 'none' },
        Bachata: { role: 'none' }
      },
      joinDate: now.toISOString().slice(0, 10),
      eventsAttended: 0,
      danceHours: 0,
      badgesEarned: 0,
      createdAt: now
    } as const;

    const upsertResult = await db.collection('profiles').updateOne(
      { userId },
      {
        $setOnInsert: insertDefaults,
        $set: {
          // Keep these in sync on access (do not duplicate in $setOnInsert)
          displayName: decodedToken.name || '',
          email: decodedToken.email || '',
          emailVerified: Boolean((decodedToken as any).email_verified),
          lastSignIn: now.toISOString(),
          updatedAt: now
        }
      },
      { upsert: true }
    );
    console.log('[API][PROFILE][GET] Upsert result', {
      matchedCount: upsertResult.matchedCount,
      modifiedCount: upsertResult.modifiedCount,
      upsertedId: (upsertResult as any).upsertedId || null
    });

    const profileData = await db.collection('profiles').findOne({ userId });
    console.log('[API][PROFILE][GET] Fetched profile', {
      userId,
      hasProfile: Boolean(profileData)
    });

    // Ensure JSON-serializable response (ObjectId/Date safety)
    if (profileData) {
      const { _id, createdAt, updatedAt, lastSignIn, ...rest } = profileData as any;
      const serialized = {
        ...rest,
        id: _id ? String(_id) : undefined,
        createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
        updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
        lastSignIn:
          lastSignIn instanceof Date ? lastSignIn.toISOString() : lastSignIn,
      } as const;
      return NextResponse.json(serialized);
    }

    // No existing profile – return safe defaults (already serializable)
    return NextResponse.json({
      ...insertDefaults,
      displayName: decodedToken.name || '',
      email: decodedToken.email || '',
      emailVerified: Boolean((decodedToken as any).email_verified),
      lastSignIn: now.toISOString(),
      updatedAt: now.toISOString(),
      createdAt: insertDefaults.createdAt instanceof Date
        ? insertDefaults.createdAt.toISOString()
        : insertDefaults.createdAt,
    });

  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : String(error);
    const isAuthError = message.includes('Invalid token') || message.includes('Firebase Admin credentials are missing');
    console.error('[API][PROFILE][GET] Error fetching profile data:', message);
    const body: Record<string, unknown> = { error: isAuthError ? 'Unauthorized' : 'Failed to fetch profile data' };
    if (process.env.NODE_ENV === 'development') {
      body.details = message;
    }
    return NextResponse.json(
      body,
      { status: isAuthError ? 401 : 500 }
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
    console.log('[API][PROFILE][PUT] Begin', { path: request.nextUrl.pathname, userId });

    // Whitelist editable fields per MONGODB_SETUP.md
    const allowedUpdates: Record<string, unknown> = {};
    const editableFields = ['displayName', 'phone', 'location', 'bio'] as const;
    for (const key of editableFields) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        allowedUpdates[key] = body[key];
      }
    }

    // Validate and include dancePreferences if provided
    const supportedStyles = ['Salsa', 'Bachata'] as const;
    const allowedRoles = new Set(['leader', 'follower', 'both', 'none']);
    if (body && typeof body.dancePreferences === 'object' && body.dancePreferences !== null) {
      for (const style of supportedStyles) {
        const incoming = body.dancePreferences[style as keyof typeof body.dancePreferences];
        if (incoming && typeof incoming === 'object') {
          const role = incoming.role;
          if (typeof role === 'string' && allowedRoles.has(role)) {
            (allowedUpdates as any)[`dancePreferences.${style}.role`] = role;
          }
        }
      }
    }
    console.log('[API][PROFILE][PUT] Allowed updates summary', {
      hasDisplayName: Object.prototype.hasOwnProperty.call(allowedUpdates, 'displayName'),
      hasPhone: Object.prototype.hasOwnProperty.call(allowedUpdates, 'phone'),
      hasLocation: Object.prototype.hasOwnProperty.call(allowedUpdates, 'location'),
      hasBio: Object.prototype.hasOwnProperty.call(allowedUpdates, 'bio'),
      salsaRole: (allowedUpdates as any)['dancePreferences.Salsa.role'] || null,
      bachataRole: (allowedUpdates as any)['dancePreferences.Bachata.role'] || null
    });

    // Never allow client to change these server-managed fields
    const now = new Date();

    const updateResult = await db.collection('profiles').updateOne(
      { userId },
      {
        $set: {
          ...allowedUpdates,
          userId,
          updatedAt: now
        }
      },
      { upsert: true }
    );
    console.log('[API][PROFILE][PUT] Update result', {
      matchedCount: updateResult.matchedCount,
      modifiedCount: updateResult.modifiedCount,
      upsertedId: (updateResult as any).upsertedId || null
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : String(error);
    const isAuthError = message.includes('Invalid token') || message.includes('Firebase Admin credentials are missing');
    console.error('[API][PROFILE][PUT] Error updating profile data:', message);
    const body: Record<string, unknown> = { error: isAuthError ? 'Unauthorized' : 'Failed to update profile data' };
    if (process.env.NODE_ENV === 'development') {
      body.details = message;
    }
    return NextResponse.json(
      body,
      { status: isAuthError ? 401 : 500 }
    );
  }
}
