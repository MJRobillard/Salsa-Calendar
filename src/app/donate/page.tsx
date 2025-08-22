'use client'

import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Heart, DollarSign, Users, Calendar, Gift, Star, ArrowRight } from 'lucide-react';

export default function DonatePage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
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

  if (!user || !hasVisitedLanding) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="flex flex-row w-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <TopBar user={user} />
          
          {/* Donate Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-6xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12 text-center">
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

              {/* Quick Donation Section */}
              <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30 mb-8">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-4">Make a Quick Donation</h2>
                  <p className="text-brand-sand mb-6">Support our mission with a direct contribution</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <div className="bg-brand-maroon/20 p-4 rounded-xl border border-brand-maroon/30">
                      <DollarSign className="w-8 h-8 text-brand-gold mx-auto mb-2" />
                      <p className="text-brand-gold font-semibold">Venmo</p>
                      <p className="text-brand-sand text-sm">@SALSAATCAL09</p>
                    </div>
                    
                    <div className="bg-brand-maroon/20 p-4 rounded-xl border border-brand-maroon/30">
                      <Gift className="w-8 h-8 text-brand-gold mx-auto mb-2" />
                      <p className="text-brand-gold font-semibold">The Big Give</p>
                      <p className="text-brand-sand text-sm">Annual Fundraiser</p>
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

              {/* Donation FAQ */}
              <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-8 text-center">
                  Salsa at Cal Donation FAQ
                </h2>

                {/* Funding Sources */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-brand-gold mb-6 flex items-center">
                    <DollarSign className="w-6 h-6 mr-3" />
                    Where does Salsa at Cal get its funding?
                  </h3>
                  <p className="text-brand-sand mb-6 text-lg">
                    Salsa at Cal acquires funding from a variety of sources to support its mission and activities:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">ASUC Grants and Allocations</h4>
                      <p className="text-brand-sand">
                        We regularly apply for and receive grants from the Associated Students of the University of California (ASUC). 
                        These funds, typically around $700, are primarily designated for on-campus costs such as printing, decorations, 
                        and event venues. We also apply for larger grants like the Multicultural Initiative Fund (MIF).
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">The Big Give Fundraiser</h4>
                      <p className="text-brand-sand">
                        We participate in "The Big Give," an annual university-wide 24-hour fundraiser. This event allows us to 
                        receive donations from our supportive network of family, friends, and alumni. For example, in Spring 2025, 
                        we received donations from eleven donors through this initiative.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Direct Contributions & Venmo Funds</h4>
                      <p className="text-brand-sand">
                        The club manages a Venmo account for general funds. Money raised directly by the club is categorized as 
                        "Miscellaneous" funds, offering flexibility for various needs. We aim to maintain a balance of around 
                        $1,500-$2,000 in this account.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Fundraising Events & Merchandise Sales</h4>
                      <ul className="text-brand-sand space-y-2 ml-4">
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-brand-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Ticketed Social Events:</strong> Events like "Salsaween," "Salsa Tropi-Cal," and other 
                          social dances (historically at venues like Gio's) generate revenue through presale and at-the-door ticket sales.</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-brand-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Merchandise:</strong> Our Sales and Merchandise Chair is responsible for designing and 
                          selling club merchandise, such as T-shirts and stickers, which helps generate funds.</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-brand-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Food Sales:</strong> We have organized fundraisers by selling items like water and sodas, 
                          and have plans to sell esquites.</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-brand-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span><strong>Private Lessons:</strong> Offering private dance lessons, sometimes to fraternities, 
                          has been considered as a fundraising opportunity.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Partnerships and Sponsorships</h4>
                      <p className="text-brand-sand">
                        We actively seek sponsorships and engage in joint ventures with other organizations and businesses. 
                        Historically, partnerships with venues like Kipps have provided a percentage of sales from our events held there.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How Money is Used */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-gold mb-6 flex items-center">
                    <Heart className="w-6 h-6 mr-3" />
                    How does Salsa at Cal use its money?
                  </h3>
                  <p className="text-brand-sand mb-6 text-lg">
                    Your generous contributions allow Salsa at Cal to foster a vibrant Latin dance community and achieve its goals. 
                    Here's how we utilize our funds:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Enhancing Social Events</h4>
                      <p className="text-brand-sand">
                        We use funds to organize and host diverse social events, covering costs for DJs, venue rentals, decorations, 
                        and promotional materials (flyers). This includes events like "Salsa Prom" aimed at bringing together salsa 
                        and bachata lovers from diverse backgrounds.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Supporting DeCal and Open Practica</h4>
                      <p className="text-brand-sand">
                        Funds are crucial for our educational offerings, including purchasing and maintaining equipment (speakers, 
                        lights, microphones) for classes and open practicas. This ensures a high-quality learning environment for all students.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Developing Merchandise</h4>
                      <p className="text-brand-sand">
                        We invest in designing and producing club merchandise to promote our brand and create a sense of community among members.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Workshops and Performance Team Activities</h4>
                      <p className="text-brand-sand">
                        Donations help us fund workshops to further develop dance skills. For our CAL Latin Fusion Team, funds assist 
                        with costumes and studio rentals for performances. We have also considered a scholarship fund for performance team members.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Club Operations and Growth</h4>
                      <p className="text-brand-sand">
                        A portion of our funds goes towards general operational expenses, including board member reimbursements for 
                        club-related purchases, and organizing club retreats for bonding and planning. We also use funds for essential 
                        items like speakers, banners, and other equipment to support club activities.
                      </p>
                    </div>

                    <div className="bg-brand-charcoal/50 p-4 rounded-xl border border-brand-maroon/20">
                      <h4 className="text-lg font-semibold text-brand-gold mb-2">Community Engagement</h4>
                      <p className="text-brand-sand">
                        Ultimately, our financial resources enable us to provide a safe, inclusive space for Latine students to celebrate 
                        their culture and for all students to learn about Latin music, culture, and dance. We strive to offer many free 
                        events and dance lessons to the community to promote widespread participation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-br from-brand-maroon/20 to-brand-gold/20 p-8 rounded-2xl border border-brand-maroon/30">
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
          </main>
        </div>
      </div>
    </div>
  );
}
