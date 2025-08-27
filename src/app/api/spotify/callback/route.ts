import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookieState = request.cookies.get('spotify_oauth_state')?.value;

  if (!state || !cookieState || state !== cookieState) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: 'Missing Spotify env vars' }, { status: 500 });
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: 'Token exchange failed', details: data }, { status: 400 });
    }

    const { access_token, refresh_token, expires_in, scope, token_type } = data as any;

    // Clear state cookie
    const response = NextResponse.json({
      message: 'Success. Copy SPOTIFY_REFRESH_TOKEN from this response and add to your .env.local',
      SPOTIFY_REFRESH_TOKEN: refresh_token,
      note: 'Do not share this token. After storing it, you can remove or disable this route.',
    });
    response.cookies.set('spotify_oauth_state', '', { maxAge: 0, path: '/' });
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error', details: String(err) }, { status: 500 });
  }
}



