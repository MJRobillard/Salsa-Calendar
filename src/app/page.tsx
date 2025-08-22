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
    <div className="min-h-screen relative bg-[#2D0F0F] text-white overflow-x-hidden">
      {/* Background with blurred salsa dance photo */}
      <div className="absolute inset-0">
        <Image 
          src="/dance_classes.png" 
          alt="Salsa Dance Background" 
          fill
          className="object-cover opacity-15 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-[#2D0F0F]/90"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 sm:mb-24 lg:mb-32">
          {/* Logo */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44">
              <Image 
                src="/logo.png" 
                alt="Salsa Club Logo" 
                fill
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#FFD54F] mb-6 sm:mb-8 drop-shadow-2xl">
            Salsa @ Cal
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 sm:mb-16 max-w-5xl mx-auto leading-relaxed font-light">
            WELCOMING TEXT THAT SOUNDS CHILL BUT PRO BUT ALSO SALSA FAMILIA
          </p>
          
          {!user ? (
            <button
              onClick={signIn}
              className="bg-gradient-to-r from-[#FF6F3C] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF6F3C] text-white px-12 sm:px-16 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-[#FF6F3C]/30 transition-all duration-300 transform hover:scale-105 border-2 border-[#FF6F3C]/30"
            >
              Join Salsa @ Cal
            </button>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <p className="text-white/80 text-lg sm:text-xl">Welcome back, {user.displayName}!</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                <button
                  onClick={signOut}
                  className="bg-[#2D0F0F]/90 backdrop-blur-sm text-[#FFD54F] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-[#FFD54F]/60 hover:bg-[#2D0F0F] hover:border-[#FFD54F]/80 transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold"
                >
                  Sign Out
                </button>
                <a
                  href="/dashboard"
                  className="bg-gradient-to-r from-[#FF6F3C] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF6F3C] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold hover:shadow-[#FF6F3C]/30 transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl shadow-2xl border-2 border-[#FF6F3C]/30"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
        )}
      </div>

        {/* About Preview Cards with Images - Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-20 sm:mb-24 lg:mb-32">
          {/* RSO Section */}
          <a href="/about" className="group">
            <div className="relative overflow-hidden bg-[#2D0F0F]/95 p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-[#FF6F3C]/40 backdrop-blur-sm hover:border-[#FF6F3C]/70 transition-all duration-300 hover:shadow-[#FF6F3C]/30 group-hover:scale-105">
              <div className="relative">
                {/* RSO Group Photo - Top Half */}
                <div className="relative w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden">
                  <Image 
                    src="/dance_classes.png" 
                    alt="Salsa @ Cal RSO Group" 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                {/* Text Content - Lower Half */}
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">RSO</h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">Official student organization for salsa enthusiasts</p>
              <p className="text-white/70 text-sm mt-2">ASUC-sponsored since 2009</p>
                  <div className="mt-4 text-[#FF6F3C] text-sm font-medium group-hover:text-[#FFD54F] transition-colors">
                    Learn More →
                  </div>
                </div>
              </div>
            </div>
          </a>
          
          {/* DeCal Section */}
          <a href="/about" className="group">
            <div className="relative overflow-hidden bg-[#2D0F0F]/95 p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-[#FF6F3C]/40 backdrop-blur-sm hover:border-[#FF6F3C]/70 transition-all duration-300 hover:shadow-[#FF6F3C]/30 group-hover:scale-105">
              <div className="relative">
                {/* DeCal Dance Instruction Photo - Top Half */}
                <div className="relative w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden">
                  <Image 
                    src="/image.png" 
                    alt="Salsa Dance Instruction" 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                {/* Text Content - Lower Half */}
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">DeCal</h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">Academic course for salsa dance instruction</p>
              <p className="text-white/70 text-sm mt-2">1 unit P/NP • Hearst Gym 242</p>
                  <div className="mt-4 text-[#FF6F3C] text-sm font-medium group-hover:text-[#FFD54F] transition-colors">
                    Learn More →
                  </div>
                </div>
              </div>
            </div>
          </a>
          
          {/* Competitive Team Section */}
          <a href="/about" className="group">
            <div className="relative overflow-hidden bg-[#2D0F0F]/95 p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-[#FF6F3C]/40 backdrop-blur-sm hover:border-[#FF6F3C]/70 transition-all duration-300 hover:shadow-[#FF6F3C]/30 md:col-span-2 lg:col-span-1 group-hover:scale-105">
              <div className="relative">
                {/* Competitive Team Performance Photo - Top Half */}
                <div className="relative w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden">
                  <Image 
                    src="/Team.png" 
                    alt="Competitive Salsa Team Performance" 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                {/* Text Content - Lower Half */}
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">Competitive Team</h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">Performance and competition opportunities</p>
              <p className="text-white/70 text-sm mt-2">Established Spring 2015 • Auditions required</p>
                  <div className="mt-4 text-[#FF6F3C] text-sm font-medium group-hover:text-[#FFD54F] transition-colors">
                    Learn More →
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Instagram Reel Section - Commented Out */}
        {/* <div className="relative overflow-hidden bg-[#2D0F0F]/95 p-8 sm:p-10 lg:p-12 rounded-2xl shadow-2xl border-2 border-[#FF6F3C]/40 backdrop-blur-sm mb-20 sm:mb-24 lg:mb-32">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFD54F] mb-8 sm:mb-10 text-center drop-shadow-lg">Experience the Energy</h2>
            <div className="relative w-full flex justify-center">
              <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                <iframe
                  src="https://www.instagram.com/reel/DEi6ajCSNQl/embed"
                  className="w-full h-96 lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem] rounded-2xl"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  title="Salsa @ Cal Instagram Reel"
                />
              </div>
            </div>
            <p className="text-white/90 text-center mt-8 sm:mt-10 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              Recent Postings
            </p>
          </div>
        </div> */}

        {/* Upcoming Events Section */}
        <div className="relative overflow-hidden bg-[#2D0F0F]/95 p-8 sm:p-10 lg:p-12 rounded-2xl shadow-2xl border-2 border-[#FF6F3C]/40 backdrop-blur-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:flex-1 mb-8 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFD54F] mb-6 drop-shadow-lg">Upcoming Events</h2>
              <p className="text-white/90 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl">
                View all upcoming Salsa @ Cal events and activities
              </p>
            </div>
            <div className="lg:flex-shrink-0">
              <a
                href="/events"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#FF6F3C] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF6F3C] text-white px-10 sm:px-12 py-5 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl hover:shadow-[#FF6F3C]/30 transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-[#FF6F3C]/30"
              >
                <span>View Events</span>
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}