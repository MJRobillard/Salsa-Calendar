'use client'

import React, { useEffect } from 'react';
import { useFirebase } from './contexts/FirebaseContext';
import Image from 'next/image';

export default function HomePage() {
  const { user, signIn, signOut, markLandingVisited } = useFirebase();

  useEffect(() => {
    // Mark that user has visited the landing page
    markLandingVisited();
  }, [markLandingVisited]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-paper via-brand-charcoal to-brand-paper text-white">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/10 via-transparent to-brand-gold/10 pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <Image 
                src="/logo.png" 
                alt="Salsa Club Logo" 
                fill
                className="drop-shadow-2xl"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
            Salsa @ Cal
          </h1>
          <p className="text-xl text-brand-sand mb-8">
            Join the vibrant salsa community at UC Berkeley
          </p>
          
          {!user ? (
            <button
              onClick={signIn}
              className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-8 py-4 rounded-xl2 font-semibold text-lg shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-brand-sand">Welcome back, {user.displayName}!</p>
              <div className="flex space-x-3">
                <button
                  onClick={signOut}
                  className="bg-brand-charcoal/80 backdrop-blur-sm text-brand-gold px-6 py-3 rounded-xl2 border border-brand-gold hover:bg-brand-maroon transition-colors duration-300 shadow-lg"
                >
                  Sign Out
                </button>
                <a
                  href="/dashboard"
                  className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-6 py-3 rounded-xl2 font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
        )}
      </div>

        {/* About Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-brand-gold mb-3">RSO</h3>
              <p className="text-brand-sand">Official student organization for salsa enthusiasts</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-brand-gold mb-3">DeCal</h3>
              <p className="text-brand-sand">Academic course for salsa dance instruction</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-brand-gold mb-3">Competitive Team</h3>
              <p className="text-brand-sand">Performance and competition opportunities</p>
            </div>
          </div>
        </div>

        {/* Public Calendar Placeholder */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-8 rounded-xl2 shadow-card border border-brand-maroon/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
          <div className="relative">
            <h2 className="text-2xl font-semibold text-brand-gold mb-4">Upcoming Events</h2>
            <p className="text-brand-sand mb-4">View all upcoming Salsa @ Cal events and activities</p>
            <a
              href="/events"
              className="inline-flex items-center space-x-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white px-6 py-3 rounded-xl2 font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              <span>View Events</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}