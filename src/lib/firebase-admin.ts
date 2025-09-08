import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

type ServiceAccountLike = {
  project_id: string;
  client_email: string;
  private_key: string;
};

function loadServiceAccount(): ServiceAccountLike | null {
  // Prefer a single JSON blob via FIREBASE_SERVICE_ACCOUNT (stringified JSON or base64)
  const fromJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (fromJson) {
    try {
      const jsonString = isProbablyBase64(fromJson)
        ? Buffer.from(fromJson, 'base64').toString('utf8')
        : fromJson;
      const parsed = JSON.parse(jsonString);
      if (parsed.project_id && parsed.client_email && parsed.private_key) {
        return parsed as ServiceAccountLike;
      }
    } catch {
      // fall through to split vars
    }
  }

  // Fallback to split env vars
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    return {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  // Final fallback: try to load from a local JSON file
  // Useful for local development when env vars aren't configured yet
  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'FIREBASE_SERVICE_ACCOUNT.json';
    const resolvedPath = path.isAbsolute(serviceAccountPath)
      ? serviceAccountPath
      : path.join(process.cwd(), serviceAccountPath);

    if (fs.existsSync(resolvedPath)) {
      const fileContents = fs.readFileSync(resolvedPath, 'utf8');
      const parsed = JSON.parse(fileContents);
      if (parsed.project_id && parsed.client_email && parsed.private_key) {
        return parsed as ServiceAccountLike;
      }
    }
  } catch {
    // Ignore and fall through to null
  }

  return null;
}

function isProbablyBase64(value: string): boolean {
  // Quick heuristic: base64 strings are often long and only contain base64 charset
  return /^[A-Za-z0-9+/=\s]+$/.test(value) && value.length > 100;
}

// Initialize Firebase Admin SDK only if credentials are available
const serviceAccount = loadServiceAccount();
const app = serviceAccount
  ? (getApps().length === 0
      ? initializeApp({
          credential: cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
          }),
        })
      : getApps()[0])
  : undefined;

export async function verifyIdToken(token: string) {
  if (!app) {
    throw new Error(
      'Firebase Admin credentials are missing. Set FIREBASE_SERVICE_ACCOUNT (JSON or base64) or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.'
    );
  }

  const auth = getAuth(app);
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    throw new Error('Invalid token');
  }
}
