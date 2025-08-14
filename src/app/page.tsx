'use client'

import React from 'react';
import { useFirebase } from './contexts/FirebaseContext';

export default function HomePage() {
  const { user, signIn, signOut } = useFirebase();

  return (
    <div className="min-h-screen bg-brand-paper text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-gold mb-4">
            Salsa @ Cal
          </h1>
          <p className="text-xl text-brand-sand mb-8">
            Join the vibrant salsa community at UC Berkeley
          </p>
          
          {!user ? (
            <button
              onClick={signIn}
              className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-8 py-4 rounded-xl2 font-semibold text-lg shadow-card hover:shadow-glow transition-all duration-300"
            >
              Join Salsa @ Cal
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-brand-sand">Welcome back, {user.displayName}!</p>
              <div className="flex space-x-3">
                <button
                  onClick={signOut}
                  className="bg-brand-charcoal text-brand-gold px-6 py-3 rounded-xl2 border border-brand-gold hover:bg-brand-maroon transition-colors duration-300"
                >
                  Sign Out
                </button>
                <a
                  href="/dashboard"
                  className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-6 py-3 rounded-xl2 font-semibold hover:shadow-glow transition-all duration-300"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
        )}
      </div>

        {/* About Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
            <h3 className="text-xl font-semibold text-brand-gold mb-3">RSO</h3>
            <p className="text-brand-sand">Official student organization for salsa enthusiasts</p>
        </div>
          
          <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
            <h3 className="text-xl font-semibold text-brand-gold mb-3">DeCal</h3>
            <p className="text-brand-sand">Academic course for salsa dance instruction</p>
              </div>
          
          <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
            <h3 className="text-xl font-semibold text-brand-gold mb-3">Competitive Team</h3>
            <p className="text-brand-sand">Performance and competition opportunities</p>
          </div>
        </div>

        {/* Public Calendar Placeholder */}
        <div className="bg-brand-charcoal p-8 rounded-xl2 shadow-card border border-brand-maroon">
          <h2 className="text-2xl font-semibold text-brand-gold mb-4">Upcoming Events</h2>
          <p className="text-brand-sand">Calendar integration coming soon...</p>
          </div>
          </div>
        </div>
  );
}