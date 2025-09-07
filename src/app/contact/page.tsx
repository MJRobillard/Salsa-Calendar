'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import BottomNavigation from '../components/BottomNavigation';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function ContactPage() {
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
      // Allow both authenticated users and guests to access contact page
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
  // Allow guests to access the contact page

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
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-gold">Contact Us</h2>
                  <p className="text-xs sm:text-sm text-brand-sand">Get in touch with our team</p>
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
          
          {/* Contact Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                  Contact Us
                </h1>
                <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                  Get in touch with our team. We're here to help with any questions about classes, events, or our community.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Contact Information */}
                <div className="space-y-8">
                  {/* General Contact */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-6">Get in Touch</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-brand-maroon/20 rounded-xl">
                          <Mail className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-brand-gold">General Inquiries</h3>
                          <a href="mailto:salsaatcal@gmail.com" className="text-brand-sand hover:text-brand-gold transition-colors">
                            salsaatcal@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-brand-maroon/20 rounded-xl">
                          <Calendar className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-brand-gold">Class Information</h3>
                          <a href="mailto:salsaatcal@gmail.com" className="text-brand-sand hover:text-brand-gold transition-colors">
                            salsaatcal@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-brand-maroon/20 rounded-xl">
                          <MapPin className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-brand-gold">Location</h3>
                          <p className="text-brand-sand">Hearst Gymnasium, UC Berkeley</p>
                          <p className="text-brand-sand text-sm">Mondays 4-6 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-brand-maroon/20 rounded-xl">
                          <ExternalLink className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-brand-gold">Social Media</h3>
                          <div className="space-y-1">
                            <a href="https://instagram.com/salsaatcalberkeley" target="_blank" rel="noopener noreferrer" className="block text-brand-sand hover:text-brand-gold transition-colors">
                              @salsaatcalberkeley
                            </a>
                            <a href="https://linktr.ee/salsa_at_cal" target="_blank" rel="noopener noreferrer" className="block text-brand-sand hover:text-brand-gold transition-colors">
                              Linktree
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Leadership Structure */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h2 className="text-2xl font-bold text-brand-gold mb-6">Leadership Structure</h2>
                    
                    <div className="space-y-6">
                      {/* Executive Committee */}
                      <div>
                        <h3 className="text-xl font-semibold text-brand-gold mb-4">Executive Committee</h3>
                        <div className="space-y-3">
                          <div className="p-4 bg-brand-maroon/20 rounded-xl">
                            <h4 className="font-semibold text-brand-gold">President</h4>
                            <p className="text-brand-sand">Kian Asgharzadeh</p>
                            <a href="mailto:kian-asgh@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                              kian-asgh@berkeley.edu
                            </a>
                          </div>
                          
                          <div className="p-4 bg-brand-maroon/20 rounded-xl">
                            <h4 className="font-semibold text-brand-gold">DeCal Director</h4>
                            <p className="text-brand-sand">Sofia Cielak</p>
                            <a href="mailto:sofia.cielak@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                              sofia.cielak@berkeley.edu
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Marketing Branch */}
                      <div>
                        <h3 className="text-xl font-semibold text-brand-gold mb-4">Marketing Branch</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-4 bg-brand-maroon/20 rounded-xl">
                            <h4 className="font-semibold text-brand-gold">Marketing Branch</h4>
                            <p className="text-brand-sand">Led by Kacey Yoe</p>
                            <a href="mailto:kacey.yoe@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                              kacey.yoe@berkeley.edu
                            </a>
                          </div>
                          
                          <div className="p-4 bg-brand-maroon/20 rounded-xl">
                            <h4 className="font-semibold text-brand-gold">Finance Chair</h4>
                            <p className="text-brand-sand">Daniela V</p>
                            <a href="mailto:daniela.v@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                              daniela.v@berkeley.edu
                            </a>
                          </div>
                          
                          <div className="p-4 bg-brand-maroon/20 rounded-xl">
                            <h4 className="font-semibold text-brand-gold">Internal Affairs Officer & Lead Full Stack Developer</h4>
                            <p className="text-brand-sand">Matthew Robillard</p>
                            <a href="mailto:matthew.robillard22@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                              matthew.robillard22@berkeley.edu
                            </a>
                          </div>
                          
                          <div className="p-4 bg-brand-maroon/20 rounded-xl">
                            <h4 className="font-semibold text-brand-gold">External Affairs Officers</h4>
                            <p className="text-brand-sand">Emmanuel Ceja and Rene Gallegos</p>
                            <div className="space-y-1">
                              <a href="mailto:emmanuel.ceja@berkeley.edu" className="block text-brand-gold hover:text-white transition-colors text-sm">
                                emmanuel.ceja@berkeley.edu
                              </a>
                              <a href="mailto:rene.gallegos@berkeley.edu" className="block text-brand-gold hover:text-white transition-colors text-sm">
                                rene.gallegos@berkeley.edu
                              </a>
                            </div>
                          </div>
                        </div>
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