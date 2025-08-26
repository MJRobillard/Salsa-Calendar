'use client'

import React, { useEffect } from 'react';
import { useFirebase } from '../../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import SalsaCalEvents from '../../components/SalsaCalEvents';

export default function EventsDemoPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
        // If user is signed in but hasn't visited landing page, redirect them
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !hasVisitedLanding) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-brand-paper p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-gold mb-8 text-center">
          Events Page Demo
        </h1>
        
        <div className="mb-8 p-4 bg-brand-charcoal rounded-xl border border-brand-maroon">
          <h2 className="text-xl font-semibold text-brand-gold mb-4">How to Use:</h2>
          <ol className="text-white space-y-2 list-decimal list-inside">
            <li>Navigate to <code className="bg-brand-maroon px-2 py-1 rounded">/events</code> in your app</li>
            <li>The page will show the next upcoming event from the Salsa @ Cal calendar</li>
            <li>Use RSVP buttons to indicate your attendance</li>
            <li>Click "Add event to Calendar" to open the event in Google Calendar</li>
            <li>Click "Download Calendar Now" to download an ICS file</li>
            <li>Below shows all upcoming events from the calendar feed</li>
          </ol>
        </div>
        
        <SalsaCalEvents maxEvents={5} />
      </div>
    </div>
  );
}
