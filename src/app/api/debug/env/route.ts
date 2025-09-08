import { NextRequest, NextResponse } from 'next/server';

// Temporary: reports presence (not values) of important env vars for server runtime
export async function GET(_req: NextRequest) {
  const present = (key: string) => Boolean(process.env[key] && process.env[key]!.length > 0);
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV || 'undefined',
    has_MONGODB_URI: present('MONGODB_URI'),
    has_MONGODB_DB: present('MONGODB_DB'),
    has_FIREBASE_SERVICE_ACCOUNT: present('FIREBASE_SERVICE_ACCOUNT'),
    has_FIREBASE_PROJECT_ID: present('FIREBASE_PROJECT_ID'),
    has_FIREBASE_CLIENT_EMAIL: present('FIREBASE_CLIENT_EMAIL'),
    has_FIREBASE_PRIVATE_KEY: present('FIREBASE_PRIVATE_KEY'),
    has_FIREBASE_SERVICE_ACCOUNT_PATH: present('FIREBASE_SERVICE_ACCOUNT_PATH'),
  });
}


