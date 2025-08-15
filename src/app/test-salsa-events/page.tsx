'use client'

import React, { useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import SalsaCalEvents from '../components/SalsaCalEvents';

export default function TestSalsaEventsPage() {
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
          Salsa @ Cal Events - Component Test
        </h1>
        
        <SalsaCalEvents maxEvents={8} />
        
        <div className="mt-8 p-4 bg-brand-charcoal rounded-xl border border-brand-maroon">
          <h2 className="text-xl font-semibold text-brand-gold mb-4">Component Features:</h2>
          <ul className="text-white space-y-2">
            <li>✅ Fetches events from public ICS feed</li>
            <li>✅ Displays upcoming events with brand styling</li>
            <li>✅ Calendar subscription prompt (dismissible)</li>
            <li>✅ Responsive grid layout</li>
            <li>✅ Loading and error states</li>
            <li>✅ Fade-in animations</li>
            <li>✅ Mobile-first design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
