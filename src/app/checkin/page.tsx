'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFirebase } from '../contexts/FirebaseContext';
import { auth } from '../utils/firebase';

export default function CheckinPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading, signIn } = useFirebase();

  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [streak, setStreak] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const eventId = useMemo(() => searchParams.get('e') || searchParams.get('event') || '', [searchParams]);

  useEffect(() => {
    const attemptCheckin = async () => {
      if (!eventId) return;
      setStatus('checking');
      setMessage('');
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };

        // Attach Firebase ID token if logged in
        if (user) {
          const idToken = await auth.currentUser?.getIdToken();
          if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
        }

        const res = await fetch('/api/checkin', {
          method: 'POST',
          headers,
          body: JSON.stringify({ eventId })
        });

        const data = await res.json();
        if (!res.ok) {
          if (data?.error === 'Unauthorized: sign in or provide email') {
            setStatus('idle'); // show email prompt below
            return;
          }
          if (data?.error === 'DATE_MISMATCH') {
            setStatus('error');
            setMessage(`This code is for ${data.eventDate}. Today is ${data.expectedDate}.`);
            return;
          }
          throw new Error(data?.error || 'Failed to check in');
        }

        setStatus('success');
        setStreak(Boolean(data?.streakThisWeek));
      } catch (err: any) {
        setStatus('error');
        setMessage(err?.message || 'Failed to check in');
      }
    };

    if (!loading && eventId) {
      void attemptCheckin();
    }
  }, [eventId, loading, user]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !eventId) return;
    setStatus('checking');
    setMessage('');
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, email })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to check in');
      }
      setStatus('success');
      setStreak(Boolean(data?.streakThisWeek));
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Failed to check in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 border border-brand-gold rounded-2xl p-6">
        {!eventId && (
          <div className="text-center text-white">
            <p>Missing event identifier.</p>
          </div>
        )}

        {eventId && (
          <div>
            <h1 className="text-2xl text-brand-gold font-semibold text-center mb-2">Event Check-in</h1>
            <p className="text-brand-sand text-center mb-6">Event: {eventId}</p>

            {status === 'checking' && (
              <div className="text-center text-white">Checking you in…</div>
            )}

            {status === 'success' && (
              <div className="text-center">
                <div className="text-green-400 text-xl font-semibold mb-2">Checked in!</div>
                {streak && (
                  <div className="mt-2 text-brand-gold">🔥 Streak this week! Keep it going!</div>
                )}
                <button
                  className="mt-6 px-4 py-2 bg-brand-gold text-brand-charcoal rounded-lg"
                  onClick={() => router.push('/dashboard')}
                >
                  Go to Dashboard
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center">
                <div className="text-red-400 font-medium mb-2">We couldn't check you in</div>
                <p className="text-brand-sand text-sm">{message}</p>
              </div>
            )}

            {status === 'idle' && !user && (
              <div className="space-y-4">
                <div className="text-center text-white">
                  <p className="mb-2">Sign in for one-tap check-in, or enter your email.</p>
                </div>
                <button
                  onClick={() => signIn()}
                  className="w-full px-4 py-2 bg-gradient-to-r from-accentFrom to-accentTo text-white rounded-lg"
                >
                  Sign in with Google
                </button>
                <div className="text-center text-brand-sand">or</div>
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/20"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-brand-gold text-brand-charcoal rounded-lg"
                  >
                    Continue with Email
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



