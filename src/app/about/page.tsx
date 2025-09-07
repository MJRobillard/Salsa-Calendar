'use client'

import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Image from 'next/image';
import { 
  Users, 
  GraduationCap, 
  Trophy, 
  Calendar, 
  MapPin, 
  Clock, 
  BookOpen,
  Star,
  Award,
  Heart
} from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

export default function AboutPage() {
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
      // Allow both authenticated users and guests to access about page
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
  // Allow guests to access the about page

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
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-gold">About Us</h2>
                  <p className="text-xs sm:text-sm text-brand-sand">Learn about our community</p>
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
          
          {/* About Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                  About Salsa @ Cal
                </h1>
                <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                  More about us!.
                </p>
              </div>

              {/* RSO Information Section */}
              <div className="mb-12 sm:mb-16">
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30 mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Users className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">RSO Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Our Story</h3>
                      <p className="text-brand-sand text-lg leading-relaxed mb-4">
                        Founded in 2009 by dancers who branched off from the Ballroom team at Cal, Salsa at Cal has grown into a vibrant Latin dancing community on campus.
                      </p>
                      <p className="text-brand-sand text-lg leading-relaxed mb-4">
                        We're ASUC-sponsored and adhere to ASUC Bylaw 2201, Schedule A, ensuring our non-profit operation and commitment to student welfare.
                      </p>
                      <div className="flex items-center space-x-2 text-brand-sand">
                        <Calendar className="w-5 h-5" />
                        <span>Founded: 2009</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Mission & Values</h3>
                      <ul className="space-y-3 text-brand-sand text-lg">
                        <li className="flex items-start space-x-3">
                          <Star className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                          <span>Spread appreciation and knowledge of salsa and Latin dances</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Heart className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                          <span>Create safe, inclusive spaces for Latine students and all dancers</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                          <span>Provide free activities with minimal barriers to entry</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Users className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                          <span>Build a supportive "family" of dancers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* DeCal Course Section */}
              <div className="mb-12 sm:mb-16">
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30 mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <GraduationCap className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">DeCal Course</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Course Details</h3>
                      <div className="space-y-4 text-brand-sand text-lg">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-brand-gold" />
                          <span><strong>Title:</strong> History, Culture and Practice of Salsa Dance</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-brand-gold" />
                          <span><strong>Instructor:</strong> Professor Mary Kelsey (Sociology Department)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-brand-gold" />
                          <span><strong>Units:</strong> 1 unit, Pass/No Pass (P/NP)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-brand-gold" />
                          <span><strong>Prerequisites:</strong> None - no prior experience or partner needed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-brand-gold" />
                          <span><strong>Location:</strong> Hearst Gymnasium</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Class Structure</h3>
                      <div className="space-y-4 text-brand-sand text-lg">
                        <div>
                          <h4 className="text-xl font-semibold text-brand-gold mb-2">Beginner Section</h4>
                          <p>Learn basic steps, weight shifts, partner communication, tension, and responsiveness. Goal: feel comfortable dancing a full salsa song in a social setting.</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-brand-gold mb-2">Intermediate Section</h4>
                          <p>Practice fundamental basic steps and variations with deeper understanding, emphasis on technique, body movement for styling, identifying rhythms, and expanding repertoire of moves.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-brand-gold" />
                          <span><strong>Schedule:</strong> Mondays 4-5 PM (Beginner), 5-6 PM (Intermediate) in Hearst Gym 242</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Team Section */}
              <div className="mb-12 sm:mb-16">
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30 mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Trophy className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Competitive Team</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Performance Team</h3>
                      <p className="text-brand-sand text-lg leading-relaxed mb-4">
                        Established in Spring 2015, our Performance Team is for intermediate and advanced dancers who want to advance their skills in a performance setting.
                      </p>
                      <p className="text-brand-sand text-lg leading-relaxed mb-4">
                        We emphasize dancing technique and fundamentals over social dancing, with members committing significant time to mastering choreography.
                      </p>
                                              <div className="bg-brand-maroon/20 p-4 rounded-xl">
                          <h4 className="text-xl font-semibold text-brand-gold mb-2">Current Teams</h4>
                          <ul className="space-y-2 text-brand-sand">
                            <li>• Latin Fusion Team (led by Kathy Reyes)</li>
                            <li>• Rueda Team</li>
                            <li>• Colombian Salsa Team</li>
                            <li>• Bachata Team</li>
                          </ul>
                          <p className="text-sm text-brand-sand mt-2">
We’re a group that loves performing and pushing ourselves through competitions and conferences. We focus focus on choreography, and an artistic musicality experience.
</p>
                        </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Auditions & Commitment</h3>
                      <div className="space-y-4 text-brand-sand text-lg">
                        <div>
                          <h4 className="text-xl font-semibold text-brand-gold mb-2">Audition Process</h4>
                          <p>Auditions are held after the first month of the semester, with a limit of 2 absences allowed for team members. Performance interviews assess commitment to practicing choreography for performances, rather than just social dancing.</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-brand-gold mb-2">Catch us at one of our events!</h4>
                          <ul className="space-y-2">
                            <li>• Club events (Salsaween, El Mercadito, Salsa Tropi-Cal)</li>
                            <li>• External events and showcases</li>
                            <li>• Private bookings and performances</li>
                            <li>• University functions and programs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Semester Information */}
              <div className="mb-12 sm:mb-16">
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Calendar className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Current Semester Details</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Spring 2025 Schedule</h3>
                      <div className="space-y-3 text-brand-sand text-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-brand-gold" />
                          <span><strong>DeCal:</strong> Mondays 4-5 PM (Beginner), 5-6 PM (Intermediate)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-brand-gold" />
                          <span><strong>Location:</strong> Hearst Gym 242</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-brand-gold" />
                          <span><strong>Open Practica:</strong> Mondays 8:30-10 PM by Social Sciences Building</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-gold mb-4">Class Capacity</h3>
                      <div className="space-y-3 text-brand-sand text-lg">
                        <div className="bg-brand-maroon/20 p-4 rounded-xl">
                          <h4 className="text-xl font-semibold text-brand-gold mb-2">DeCal Enrollment</h4>
                          <p>Beginner: 26 students (13 leads, 13 follows)</p>
                          <p>Intermediate: 26 students (13 leads, 13 follows)</p>
                          <p className="text-sm mt-2">High demand - competitive application process</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Structure */}
              <div className="mb-12 sm:mb-16">
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-8 text-center">Leadership Structure</h2>
                  
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Executive Committee */}
                     <div className="text-center">
                       <h3 className="text-2xl font-semibold text-brand-gold mb-4">Executive Committee</h3>
                       <div className="space-y-3 text-brand-sand">
                         <div className="bg-brand-maroon/20 p-3 rounded-xl">
                           <h4 className="font-semibold text-brand-gold">President</h4>
                           <p>Kian Asgharzadeh</p>
                           <p className="text-sm">kian-asgh@berkeley.edu</p>
                         </div>
                       </div>
                     </div>

                     {/* Operations Branch */}
                     <div className="text-center">
                       <h3 className="text-2xl font-semibold text-brand-gold mb-4">Operations</h3>
                       <div className="space-y-3 text-brand-sand">
                         <div className="bg-brand-maroon/20 p-3 rounded-xl">
                           <h4 className="font-semibold text-brand-gold">DeCal Director</h4>
                           <p>Sofia Cielak</p>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div className="mt-8">
                     {/* Marketing Branch */}
                     <div className="text-center">
                       <h3 className="text-2xl font-semibold text-brand-gold mb-4">Marketing Branch</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="bg-brand-maroon/20 p-3 rounded-xl">
                           <h4 className="font-semibold text-brand-gold">Marketing Branch</h4>
                           <p>Led by Kacey Yoe</p>
                         </div>
                         <div className="bg-brand-maroon/20 p-3 rounded-xl">
                           <h4 className="font-semibold text-brand-gold">Finance Chair</h4>
                           <p>Daniela V</p>
                         </div>
                         <div className="bg-brand-maroon/20 p-3 rounded-xl">
                           <h4 className="font-semibold text-brand-gold">Internal Affairs Officer</h4>
                           <p>Matthew Robillard</p>
                         </div>
                         <div className="bg-brand-maroon/20 p-3 rounded-xl">
                           <h4 className="font-semibold text-brand-gold">External Affairs Officers</h4>
                           <p>Emmanuel Ceja and Rene Gallegos</p>
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
