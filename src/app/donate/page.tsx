'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import BottomNavigation from '../components/BottomNavigation';
import { Heart, DollarSign, ArrowRight } from 'lucide-react';

export default function DonatePage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Unified sidebar toggle function
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // Mobile: toggle mobile nav
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      // Desktop: toggle sidebar collapse
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  useEffect(() => {
    if (!loading) {
      // Allow both authenticated users and guests to access donate page
      // Only redirect if user is signed in but hasn't visited landing page
      if (user && !hasVisitedLanding) {
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

  // Remove the redirect for non-authenticated users
  // Allow guests to access the donate page

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="flex w-full overflow-hidden relative z-10">
        {/* Sidebar - Only show for authenticated users */}
        {user && (
          <Sidebar 
            isOpen={isMobileNavOpen} 
            onToggle={() => setIsMobileNavOpen(false)}
            isCollapsed={isSidebarCollapsed}
            onCollapseToggle={toggleSidebar}
          />
        )}
        
        {/* Main Content */}
        <div className={`flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out ${user ? (isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64') : ''}`}>
          {user ? (
            <TopBar 
              user={user} 
              onSidebarToggle={toggleSidebar}
              isSidebarCollapsed={isSidebarCollapsed}
              isMobileNavOpen={isMobileNavOpen}
            />
          ) : (
            <header className="bg-brand-charcoal border-b border-brand-maroon px-3 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between min-w-0">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-gold">Donate</h2>
                  <p className="text-xs sm:text-sm text-brand-sand">Support our community</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 ml-2 flex-shrink-0">
                  <button
                    onClick={() => router.push('/')}
                    className="px-2 sm:px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors text-sm sm:text-base"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-2 sm:px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors text-sm sm:text-base"
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            </header>
          )}
          
          {/* Donate Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-6xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] rounded-xl p-6 sm:p-8 border border-brand-gold">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Heart className="w-12 h-12 text-brand-gold mr-4" />
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold drop-shadow-lg">
                        Support Salsa @ Cal
                      </h1>
                    </div>
                    <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl mx-auto leading-relaxed">
                      Help us continue building a vibrant Latin dance community at Berkeley
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Donation Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] rounded-xl p-6 sm:p-8 border border-brand-gold">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-4">Make a Quick Donation</h2>
                    <p className="text-brand-sand mb-6">Support our mission with a direct contribution</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                      <div className="bg-brand-maroon/20 p-4 rounded-xl border border-brand-maroon/30">
                        <DollarSign className="w-8 h-8 text-brand-gold mx-auto mb-2" />
                        <p className="text-brand-gold font-semibold">Venmo</p>
                        <p className="text-brand-sand text-sm">@SALSAATCAL09</p>
                      </div>
                    </div>
                    
                    <a
                      href="https://linktr.ee/salsa_at_cal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Visit Our Linktree</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Financial Summary Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] rounded-xl p-6 sm:p-8 border border-brand-gold">
                  <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-8 text-center">
                    Financial Summary
                  </h2>
                  
                  {/* Amount Raised */}
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-brand-gold mb-4">How Much We've Raised</h3>
                    <div className="bg-brand-maroon/20 p-6 rounded-xl border border-brand-maroon/30">
                      <p className="text-4xl font-bold text-brand-gold mb-2">$3,450.07</p>
                      <p className="text-brand-sand">Total Actual Income (Current Semester)</p>
                    </div>
                  </div>

                  {/* Where Money Goes */}
                  <div>
                    <h3 className="text-2xl font-bold text-brand-gold mb-6 text-center">Where Your Money Goes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-brand-maroon/30">
                        <thead>
                          <tr className="bg-brand-maroon/20">
                            <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold">Category</th>
                            <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold">Description</th>
                            <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="text-brand-sand">
                          <tr className="border-b border-brand-maroon/20">
                            <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Events & Socials</td>
                            <td className="border border-brand-maroon/30 p-3">Salsaween, social dances, venue rentals, DJs, decorations</td>
                            <td className="border border-brand-maroon/30 p-3">$3,000</td>
                          </tr>
                          <tr className="border-b border-brand-maroon/20">
                            <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">
                              Performance Team
                              <span className="ml-2 align-middle text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30">Ideal</span>
                            </td>
                            <td className="border border-brand-maroon/30 p-3">Costumes, coaching, competition expenses, studio rentals</td>
                            <td className="border border-brand-maroon/30 p-3">$2,580</td>
                          </tr>
                          <tr className="border-b border-brand-maroon/20">
                            <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Club Operations</td>
                            <td className="border border-brand-maroon/30 p-3">Equipment, retreat, promotional materials, general expenses</td>
                            <td className="border border-brand-maroon/30 p-3">$1,800</td>
                          </tr>
                          <tr>
                            <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Total Projected Expenses</td>
                            <td className="border border-brand-maroon/30 p-3"></td>
                            <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$7,380</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-brand-sand text-xs italic">Rows marked "Ideal" indicate target budgets rather than confirmed expenses.</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <div className="golden-border">
                  <div className="bg-darkBg rounded-xl p-6 sm:p-8 text-center">
                  <h3 className="text-2xl font-bold text-brand-gold mb-4">Ready to Support Our Mission?</h3>
                  <p className="text-brand-sand mb-6 text-lg">
                    Every contribution helps us continue building a vibrant Latin dance community at UC Berkeley
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://linktr.ee/salsa_at_cal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Visit Our Linktree
                    </a>
                    <div className="text-brand-gold font-semibold">
                      Venmo: @SALSAATCAL09
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
}
