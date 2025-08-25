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
    <div className="min-h-screen relative bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden">
      {/* Background with blurred salsa dance photo */}
      <div className="absolute inset-0">
        <Image 
          src="/dance_classes.png" 
          alt="Salsa Dance Background" 
          fill
          className="object-cover opacity-10 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-[#0b1939]/70 to-[#000000]/80"></div>
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
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 mb-12 sm:mb-16 max-w-5xl mx-auto leading-relaxed font-light">
            WELCOMING TEXT THAT SOUNDS CHILL BUT PRO BUT ALSO SALSA FAMILIA
          </p>
          
          {!user ? (
            <div className="space-y-6">
              <button
                onClick={signIn}
                className="bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] px-12 sm:px-16 py-5 sm:py-6 rounded-2xl font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-[#FFD54F]/40 transition-all duration-300 transform hover:scale-105 border-2 border-[#FFD54F]/50 backdrop-blur-sm"
              >
                Sign in to see your dashboard
              </button>
              <div>
                <a
                  href="/events"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#0b1939]/90 to-[#000000]/90 backdrop-blur-sm text-[#FFD54F] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-[#FFD54F]/60 hover:border-[#FFD54F]/80 hover:bg-gradient-to-r hover:from-[#0b1939] hover:to-[#000000] transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold hover:scale-105 transform"
                >
                  <span>View Events</span>
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <p className="text-white/95 text-lg sm:text-xl">Welcome back, {user.displayName}!</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                <button
                  onClick={signOut}
                  className="bg-gradient-to-br from-[#0b1939]/90 to-[#000000]/90 backdrop-blur-sm text-[#FFD54F] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-[#FFD54F]/60 hover:border-[#FFD54F]/80 hover:bg-gradient-to-br hover:from-[#0b1939] hover:to-[#000000] transition-all duration-300 shadow-lg text-lg sm:text-xl font-semibold"
                >
                  Sign Out
                </button>
                <a
                  href="/dashboard"
                  className="bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFD54F] text-[#0b1939] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold hover:shadow-[#FFD54F]/40 transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl shadow-2xl border-2 border-[#FFD54F]/50 backdrop-blur-sm"
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
            <div className="overflow-hidden">
              <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 sm:p-8 rounded-xl shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border border-brand-gold">
                <div className="relative">
                  {/* RSO Group Photo - Top Half */}
                  <div className="relative w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden">
                    <Image 
                      src="/dance_classes.png" 
                      alt="Salsa @ Cal RSO Group" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Text Content - Lower Half */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">RSO</h3>
                    <p className="text-white/95 text-base sm:text-lg leading-relaxed">Official student organization for salsa enthusiasts</p>
                    <p className="text-white/80 text-sm mt-2">ASUC-sponsored since 2009</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          
          {/* DeCal Section */}
          <a href="/about" className="group">
            <div className="overflow-hidden">
              <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 sm:p-8 rounded-xl shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border border-brand-gold">
                <div className="relative">
                  {/* DeCal Dance Instruction Photo - Top Half */}
                  <div className="relative w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden">
                    <Image 
                      src="/image.png" 
                      alt="Salsa Dance Instruction" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Text Content - Lower Half */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">DeCal</h3>
                    <p className="text-white/95 text-base sm:text-lg leading-relaxed">Academic course for salsa dance instruction</p>
                    <p className="text-white/80 text-sm mt-2">1 unit P/NP • Hearst Gym 242</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          
          {/* Competitive Team Section */}
          <a href="/about" className="group">
            <div className="overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 sm:p-8 rounded-xl shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border border-brand-gold">
                <div className="relative">
                  {/* Competitive Team Performance Photo - Top Half */}
                  <div className="relative w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden">
                    <Image 
                      src="/Team.png" 
                      alt="Competitive Salsa Team Performance" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Text Content - Lower Half */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">Competitive Team</h3>
                    <p className="text-white/95 text-base sm:text-lg leading-relaxed">Performance and competition opportunities</p>
                    <p className="text-white/80 text-sm mt-2">Established Spring 2015 • Auditions required</p>
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



        {/* Community Links Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1939]/95 to-[#000000]/95 p-8 sm:p-10 lg:p-12 rounded-2xl shadow-2xl border-2 border-[#FFD54F]/60 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFD54F] mb-6 drop-shadow-lg">Join Our Community</h2>
            <p className="text-white/95 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
              Stay connected with Salsa @ Cal and never miss an update
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Email Signup */}
            <a 
              href="https://forms.gle/bkFe31xxN9opn9SC6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-[#0b1939]/80 to-[#000000]/60 p-6 sm:p-8 rounded-2xl border-2 border-[#FFD54F]/40 hover:border-[#FFD54F]/70 transition-all duration-300 hover:shadow-[#FFD54F]/30 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFD54F]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFD54F]/30 transition-colors">
                    <svg className="w-8 h-8 text-[#FFD54F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FFD54F] mb-3">Email Signup</h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
                    Get announcements about club events, DeCal classes, and socials
                  </p>
                  <div className="text-[#FFD54F] text-sm font-medium group-hover:text-[#FFB300] transition-colors">
                    Sign Up →
                  </div>
                </div>
              </div>
            </a>

            {/* Discord */}
            <a 
              href="https://discord.gg/XVFXVC3rf8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-[#2D0F0F]/80 to-[#2D0F0F]/60 p-6 sm:p-8 rounded-2xl border-2 border-[#FF6F3C]/40 hover:border-[#FF6F3C]/70 transition-all duration-300 hover:shadow-[#FF6F3C]/30 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF6F3C]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6F3C]/30 transition-colors">
                    <svg className="w-8 h-8 text-[#FF6F3C]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5499-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FFD54F] mb-3">Join Our Discord</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                    Connect with fellow dancers, share music, and stay updated
                  </p>
                  <div className="text-[#FF6F3C] text-sm font-medium group-hover:text-[#FFD54F] transition-colors">
                    Join Server →
                  </div>
                </div>
              </div>
            </a>

            {/* Linktree */}
            <a 
              href="https://linktr.ee/salsa_at_cal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gradient-to-br from-[#2D0F0F]/80 to-[#2D0F0F]/60 p-6 sm:p-8 rounded-2xl border-2 border-[#FF6F3C]/40 hover:border-[#FF6F3C]/70 transition-all duration-300 hover:shadow-[#FF6F3C]/30 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF6F3C]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6F3C]/30 transition-colors">
                    <svg className="w-8 h-8 text-[#FF6F3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FFD54F] mb-3">All Our Links</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                    Find everything you need in one place - social media, events, and more
                  </p>
                  <div className="text-[#FF6F3C] text-sm font-medium group-hover:text-[#FFD54F] transition-colors">
                    Visit Linktree →
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}