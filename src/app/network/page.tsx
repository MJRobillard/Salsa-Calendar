'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import BottomNavigation from '../components/BottomNavigation';
import { 
  Users, 
  Globe, 
  MapPin, 
  Calendar, 
  ExternalLink,
  Construction,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function NetworkPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [networkData, setNetworkData] = useState({
    connections: [],
    interests: [],
    skills: [],
    events: [],
    messages: []
  });
  const [loadingNetwork, setLoadingNetwork] = useState(true);

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
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  // Fetch network data from MongoDB
  useEffect(() => {
    const fetchNetworkData = async () => {
      if (!user) return;
      
      try {
        setLoadingNetwork(true);
        const response = await fetch('/api/network', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setNetworkData(data);
        } else {
          console.error('Failed to fetch network data');
        }
      } catch (error) {
        console.error('Error fetching network data:', error);
      } finally {
        setLoadingNetwork(false);
      }
    };

    fetchNetworkData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !hasVisitedLanding) {
    return null;
  }

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
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileNavOpen} 
          onToggle={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className={`flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen}
          />
          
          {/* Network Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                  Network
                </h1>
                <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                </p>
              </div>

              {/* Under Development Banner */}
              <div className="bg-gradient-to-br from-brand-maroon/20 to-brand-gold/20 p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Construction className="w-10 h-10 text-brand-gold" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-4">
                    Under Development
                  </h2>
                  
                  <p className="text-brand-sand text-lg sm:text-xl mb-6 max-w-3xl mx-auto leading-relaxed">
                    We're building network opportunities for the broader bay area professional industries, including tech, finance, media, medical, and more to connecteach others and build lasting relationships in our community. Please reach out if you are interested!
                  </p>
                  
                  <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/30">
                    <h3 className="text-brand-gold font-semibold text-lg mb-3">Coming Soon Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-brand-gold flex-shrink-0" />
                        <span className="text-brand-sand">Dance Partner Matching</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-brand-gold flex-shrink-0" />
                        <span className="text-brand-sand">Community Directory</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                        <span className="text-brand-sand">Local Dance Events</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-brand-gold flex-shrink-0" />
                        <span className="text-brand-sand">Practice Sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Community Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                  <h3 className="text-2xl font-bold text-brand-gold mb-4">Join Our Discord</h3>
                  <p className="text-brand-sand mb-4">
                    Connect with fellow dancers in real-time on our Discord server
                  </p>
                  <a
                    href="https://discord.gg/XVFXVC3rf8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Join Discord</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                  <h3 className="text-2xl font-bold text-brand-gold mb-4">Follow Us</h3>
                  <p className="text-brand-sand mb-4">
                    Stay updated with our latest events and community news
                  </p>
                  <div className="flex space-x-3">
                    <a
                      href="https://instagram.com/salsaatcalberkeley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                    >
                      <span className="text-purple-400 font-medium">Instagram</span>
                    </a>
                    <a
                      href="https://linktr.ee/salsa_at_cal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 hover:from-brand-maroon/30 hover:to-accentTo/30 rounded-xl transition-all duration-300 border border-brand-maroon/30 hover:border-brand-maroon/50"
                    >
                      <span className="text-brand-gold font-medium">Linktree</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation Help */}
              <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <h3 className="text-2xl font-bold text-brand-gold mb-4 text-center">Explore Other Sections</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => router.push('/events')}
                    className="flex flex-col items-center space-y-2 p-4 bg-brand-maroon/10 hover:bg-brand-maroon/20 rounded-xl transition-all duration-300 border border-brand-maroon/30 hover:border-brand-maroon/50"
                  >
                    <Calendar className="w-8 h-8 text-brand-gold" />
                    <span className="text-brand-sand font-medium">Events</span>
                  </button>
                  
                  <button
                    onClick={() => router.push('/media')}
                    className="flex flex-col items-center space-y-2 p-4 bg-brand-maroon/10 hover:bg-brand-maroon/20 rounded-xl transition-all duration-300 border border-brand-maroon/30 hover:border-brand-maroon/50"
                  >
                    <Users className="w-8 h-8 text-brand-gold" />
                    <span className="text-brand-sand font-medium">Media</span>
                  </button>
                  
                  <button
                    onClick={() => router.push('/about')}
                    className="flex flex-col items-center space-y-2 p-4 bg-brand-maroon/10 hover:bg-brand-maroon/20 rounded-xl transition-all duration-300 border border-brand-maroon/30 hover:border-brand-maroon/50"
                  >
                    <Globe className="w-8 h-8 text-brand-gold" />
                    <span className="text-brand-sand font-medium">About</span>
                  </button>
                  
                  <button
                    onClick={() => router.push('/contact')}
                    className="flex flex-col items-center space-y-2 p-4 bg-brand-maroon/10 hover:bg-brand-maroon/20 rounded-xl transition-all duration-300 border border-brand-maroon/30 hover:border-brand-maroon/50"
                  >
                    <MapPin className="w-8 h-8 text-brand-gold" />
                    <span className="text-brand-sand font-medium">Contact</span>
                  </button>
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
