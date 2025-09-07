'use client'

import React, { useEffect } from 'react';
import { useFirebase } from './contexts/FirebaseContext';
import Image from 'next/image';
import BayAreaNetworkEvents from './components/BayAreaNetworkEvents';
import BottomNavigation from './components/BottomNavigation';

export default function HomePage() {
  const { user, signIn, signOut, markLandingVisited, redirectToSignIn } = useFirebase();

  useEffect(() => {
    // Mark that user has visited the landing page
    markLandingVisited();
  }, [markLandingVisited]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden">
      {/* Background with blurred salsa dance photo */}
      <div className="absolute inset-0">
        <Image 
          src="/dance_classes.png" 
          alt="Salsa dancing background" 
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-[#0b1939]/60 to-[#000000]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FFD54F] to-[#FFB300] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-[#0b1939] font-bold text-lg sm:text-xl">S</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Salsa @ Cal</h1>
                <p className="text-xs sm:text-sm text-[#FFD54F]">UC Berkeley</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm text-white font-medium">{user.displayName || 'User'}</p>
                    <p className="text-xs text-[#FFD54F]">{user.email}</p>
                  </div>
                  <button
                    onClick={signOut}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#FFD54F]/20 to-[#FFB300]/20 hover:from-[#FFB300]/30 hover:to-[#FFD54F]/30 text-[#FFD54F] rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 border border-[#FFD54F]/40"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-[#FFD54F]/40"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Welcome to Salsa @ Cal
              </h1>
              <p className="text-lg sm:text-xl text-[#FFD54F] mb-8 max-w-3xl mx-auto leading-relaxed">
                Join Berkeley's premier salsa community. Learn, dance, and connect with passionate dancers from across the Bay Area.
              </p>
              
              {!user ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/events" className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-[#FFD54F]/40 transition-all duration-300 transform hover:scale-105 border-2 border-[#FFD54F]/50 backdrop-blur-sm">
                      <span>Browse Events</span>
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/dashboard" className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#0b1939]/90 to-[#000000]/90 backdrop-blur-sm text-[#FFD54F] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-[#FFD54F]/60 hover:border-[#FFD54F]/80 hover:bg-gradient-to-r hover:from-[#0b1939] hover:to-[#000000] transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold hover:scale-105 transform">
                      <span>Explore Dashboard</span>
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 text-sm sm:text-base mb-3">Want to track your progress and RSVP for events?</p>
                    <button onClick={redirectToSignIn} className="bg-gradient-to-r from-[#FFD54F]/20 to-[#FFB300]/20 hover:from-[#FFB300]/30 hover:to-[#FFD54F]/30 text-[#FFD54F] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-[#FFD54F]/20 transition-all duration-300 transform hover:scale-105 border border-[#FFD54F]/40 backdrop-blur-sm">
                      Sign In with Google
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/dashboard" className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-[#FFD54F]/40 transition-all duration-300 transform hover:scale-105 border-2 border-[#FFD54F]/50 backdrop-blur-sm">
                      <span>Go to Dashboard</span>
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/events" className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#0b1939]/90 to-[#000000]/90 backdrop-blur-sm text-[#FFD54F] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-[#FFD54F]/60 hover:border-[#FFD54F]/80 hover:bg-gradient-to-r hover:from-[#0b1939] hover:to-[#000000] transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold hover:scale-105 transform">
                      <span>View Events</span>
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="bg-gradient-to-br from-[#0b1939]/80 to-[#000000]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#FFD54F]/20 shadow-xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFD54F] to-[#FFB300] rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0b1939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Weekly Classes</h3>
                <p className="text-[#FFD54F] text-sm sm:text-base leading-relaxed">
                  Join our beginner-friendly classes every week. Learn from experienced instructors and build your salsa foundation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0b1939]/80 to-[#000000]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#FFD54F]/20 shadow-xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFD54F] to-[#FFB300] rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0b1939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Community Events</h3>
                <p className="text-[#FFD54F] text-sm sm:text-base leading-relaxed">
                  Connect with dancers across the Bay Area. Attend socials, workshops, and special events throughout the semester.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0b1939]/80 to-[#000000]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#FFD54F]/20 shadow-xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFD54F] to-[#FFB300] rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0b1939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Track Progress</h3>
                <p className="text-[#FFD54F] text-sm sm:text-base leading-relaxed">
                  Monitor your dance journey with our progress tracking system. See your improvement over time and celebrate milestones.
                </p>
              </div>
            </div>

            {/* Bay Area Network Events */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
                Bay Area Network Events
              </h2>
              <BayAreaNetworkEvents />
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-br from-[#0b1939]/80 to-[#000000]/80 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-[#FFD54F]/20 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                Ready to Start Your Salsa Journey?
              </h2>
              <p className="text-[#FFD54F] text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join hundreds of students who have discovered the joy of salsa dancing at Berkeley.
              </p>
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={redirectToSignIn}
                    className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-[#FFD54F]/40 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started Today
                  </button>
                  <a
                    href="/events"
                    className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#0b1939]/90 to-[#000000]/90 backdrop-blur-sm text-[#FFD54F] rounded-2xl border-2 border-[#FFD54F]/60 hover:border-[#FFD54F]/80 hover:bg-gradient-to-r hover:from-[#0b1939] hover:to-[#000000] transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold hover:scale-105 transform"
                  >
                    Browse Events
                  </a>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/dashboard"
                    className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-[#FFD54F]/40 transition-all duration-300 transform hover:scale-105"
                  >
                    Go to Dashboard
                  </a>
                  <a
                    href="/events"
                    className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#0b1939]/90 to-[#000000]/90 backdrop-blur-sm text-[#FFD54F] rounded-2xl border-2 border-[#FFD54F]/60 hover:border-[#FFD54F]/80 hover:bg-gradient-to-r hover:from-[#0b1939] hover:to-[#000000] transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold hover:scale-105 transform"
                  >
                    View Events
                  </a>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
}