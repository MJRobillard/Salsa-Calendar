'use client'

import React from 'react';
import SalsaCalEvents from '../../components/SalsaCalEvents';

export default function EventsDemoPage() {
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
            <li>Click "View Details" to open the event in Google Calendar</li>
            <li>Click "Add to Calendar Now" to download an ICS file</li>
            <li>Below shows all upcoming events from the calendar feed</li>
          </ol>
        </div>
        
        <SalsaCalEvents maxEvents={5} />
      </div>
    </div>
  );
}
