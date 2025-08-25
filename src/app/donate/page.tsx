'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Heart, DollarSign, Users, Calendar, Gift, Star, ArrowRight } from 'lucide-react';

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

  // Debug logging
  console.log('DonatePage render - isMobileNavOpen:', isMobileNavOpen, 'toggleMobileNav function:', !!toggleSidebar);

  // Debug: Log the props being passed to TopBar
  console.log('Passing to TopBar:', { 
    user: !!user, 
    onMobileNavToggle: !!toggleSidebar, 
    isMobileNavOpen 
  });

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
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className={`grid grid-cols-1 w-full overflow-hidden relative z-10 ${
        isSidebarCollapsed ? 'md:grid-cols-[48px_1fr]' : 'md:grid-cols-[256px_1fr]'
      }`}>
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileNavOpen} 
          onToggle={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className="flex flex-col min-w-0 w-full pt-16 sm:pt-20">
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen}
          />
          
          {/* Donate Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
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
              </div>

              {/* Donation FAQ */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] rounded-xl p-6 sm:p-8 border border-brand-gold">
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
                    <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 rounded-xl border border-brand-gold">
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
              </div>

              {/* Financial Tables Section */}
              <div className="golden-border mb-8">
                <div className="bg-darkBg rounded-xl p-6 sm:p-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-8 text-center">
                  Financial Transparency
                </h2>
                
                                 {/* Income Table */}
                 <div className="mb-8">
                   <h3 className="text-2xl font-bold text-brand-gold mb-4">Income Sources</h3>
                                      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-brand-maroon/30 scrollbar-track-transparent">
                     <table className="w-full border-collapse border border-brand-maroon/30 table-fixed" style={{ minWidth: '800px' }}>
                       <thead>
                         <tr className="bg-brand-maroon/20">
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/6">Income Source</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Type</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/3">Notes</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Date</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Projected</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Actual</th>
                         </tr>
                       </thead>
                      <tbody className="text-brand-sand">
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">ASUC Funds</td>
                          <td className="border border-brand-maroon/30 p-3">ASUC</td>
                          <td className="border border-brand-maroon/30 p-3">Funds for the fiscal year are 5000, I am only displaying for this semester</td>
                          <td className="border border-brand-maroon/30 p-3">8/3/2025</td>
                          <td className="border border-brand-maroon/30 p-3">$2,500.00</td>
                          <td className="border border-brand-maroon/30 p-3">$2,500.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">ASUC Contingency Funding</td>
                          <td className="border border-brand-maroon/30 p-3">ASUC</td>
                          <td className="border border-brand-maroon/30 p-3">For ASUC RSOs that haven't received funding</td>
                          <td className="border border-brand-maroon/30 p-3">8/3/2025</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Tabling?</td>
                          <td className="border border-brand-maroon/30 p-3">Donation</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Performance Dues</td>
                          <td className="border border-brand-maroon/30 p-3">Dues</td>
                          <td className="border border-brand-maroon/30 p-3">$200x6 - Helps covers cost of lessons, congress, ticket, hotel, transport</td>
                          <td className="border border-brand-maroon/30 p-3">9/6/2025</td>
                          <td className="border border-brand-maroon/30 p-3">$1,200.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">RSO Dues</td>
                          <td className="border border-brand-maroon/30 p-3">Dues</td>
                          <td className="border border-brand-maroon/30 p-3">$25x20 - Helps cover cost of retreat, internal events, etc.</td>
                          <td className="border border-brand-maroon/30 p-3">9/6/2025</td>
                          <td className="border border-brand-maroon/30 p-3">$500.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Big Give</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">8/3/2025</td>
                          <td className="border border-brand-maroon/30 p-3">$788.92</td>
                          <td className="border border-brand-maroon/30 p-3">$788.92</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Kathy Reyes Funding</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">What does this entail? (WILL TALK TO KATHY TOMORROW)</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Oski Bear-A-Thon</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeH2FW5CY4JCgkl8QC0nHb4NPYk1_KSpoJe3lB51MEpLq_b2w/viewform" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-sand underline">Oski Bear-A-Thon Form</a>
                          </td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">"October Cohort Crowdfunding"</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">
                            <a href="https://berkeleydigital.typeform.com/berkeleycf" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-sand underline">Berkeley Crowdfunding</a>
                          </td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Sports Crowdfunding</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">
                            <a href="https://berkeleydigital.typeform.com/berkeleycf" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-sand underline">Berkeley Crowdfunding</a>
                          </td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">FUND OUR ORG</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">
                            <a href="https://lead.berkeley.edu/student-orgs/manage-your-org/fund-your-org/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-sand underline">Fund Your Org Guide</a>
                          </td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">MIF FUNDING</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">Only for Spring semester</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Black Box</td>
                          <td className="border border-brand-maroon/30 p-3">Miscellaneous</td>
                          <td className="border border-brand-maroon/30 p-3">"Money in the black box Daniela has it"</td>
                          <td className="border border-brand-maroon/30 p-3">8/3/2025</td>
                          <td className="border border-brand-maroon/30 p-3">$161.15</td>
                          <td className="border border-brand-maroon/30 p-3">$161.15</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Workshops</td>
                          <td className="border border-brand-maroon/30 p-3">Miscellaneous</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Salsaween tickets</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">Assuming we break even</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3">$3,000.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Mercadito</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3">$400.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Unicorn Box</td>
                          <td className="border border-brand-maroon/30 p-3">Miscellaneous</td>
                          <td className="border border-brand-maroon/30 p-3">Eddie has it</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                                 {/* Budget Table */}
                 <div className="mb-8">
                   <h3 className="text-2xl font-bold text-brand-gold mb-4">Budget Expenses</h3>
                                      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-brand-maroon/30 scrollbar-track-transparent">
                     <table className="w-full border-collapse border border-brand-maroon/30 table-fixed" style={{ minWidth: '800px' }}>
                       <thead>
                         <tr className="bg-brand-maroon/20">
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/6">Expenses</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/6">Type of payment</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Projected</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Actual</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/12">Difference</th>
                           <th className="border border-brand-maroon/30 p-3 text-left text-brand-gold font-semibold w-1/3">Notes</th>
                         </tr>
                       </thead>
                      <tbody className="text-brand-sand">
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Congress Tickets</td>
                          <td className="border border-brand-maroon/30 p-3">Competition</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">For 6 students</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Hotel Tickets</td>
                          <td className="border border-brand-maroon/30 p-3">Competition</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">Projected for 6 students</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Travel Accommodations</td>
                          <td className="border border-brand-maroon/30 p-3">Competition</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">Baypass, if in the bay</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Salsaween</td>
                          <td className="border border-brand-maroon/30 p-3">Event</td>
                          <td className="border border-brand-maroon/30 p-3">$3,000.00</td>
                          <td className="border border-brand-maroon/30 p-3">$3,000.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">On average</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Chairs, Tables</td>
                          <td className="border border-brand-maroon/30 p-3">Fundraising</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Retreat</td>
                          <td className="border border-brand-maroon/30 p-3">Internal</td>
                          <td className="border border-brand-maroon/30 p-3">$1,600.00</td>
                          <td className="border border-brand-maroon/30 p-3">$1,600.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">On average</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Food/Water</td>
                          <td className="border border-brand-maroon/30 p-3">Miscellaneous</td>
                          <td className="border border-brand-maroon/30 p-3">$50.00</td>
                          <td className="border border-brand-maroon/30 p-3">$50.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Kathy Reyes Coaching</td>
                          <td className="border border-brand-maroon/30 p-3">Personal</td>
                          <td className="border border-brand-maroon/30 p-3">$1,800.00</td>
                          <td className="border border-brand-maroon/30 p-3">$1,800.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">This projects for 6 students in 5 months</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Camera</td>
                          <td className="border border-brand-maroon/30 p-3">Promotional</td>
                          <td className="border border-brand-maroon/30 p-3">$50.00</td>
                          <td className="border border-brand-maroon/30 p-3">$50.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Fliers</td>
                          <td className="border border-brand-maroon/30 p-3">Promotional</td>
                          <td className="border border-brand-maroon/30 p-3">$100.00</td>
                          <td className="border border-brand-maroon/30 p-3">$100.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3"></td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3">Costumes</td>
                          <td className="border border-brand-maroon/30 p-3">Uniform</td>
                          <td className="border border-brand-maroon/30 p-3">$780.00</td>
                          <td className="border border-brand-maroon/30 p-3">$780.00</td>
                          <td className="border border-brand-maroon/30 p-3">$0.00</td>
                          <td className="border border-brand-maroon/30 p-3">For 6 students, assuming 130 for costumes, shoes, etc.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary Table */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-gold mb-4">Financial Summary</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-brand-maroon/30">
                      <tbody className="text-brand-sand">
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Total Projected Income</td>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$8,550.07</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Total of Projected Expenses</td>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$7,380.00</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Budget Balance based on Projections</td>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$1,170.07</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Total Actual Income</td>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$3,450.07</td>
                        </tr>
                        <tr className="border-b border-brand-maroon/20">
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Total of Actual Expenses</td>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$0.00</td>
                        </tr>
                        <tr>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">Actual Budget Balance Realtime</td>
                          <td className="border border-brand-maroon/30 p-3 font-semibold text-brand-gold">$3,450.07</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Important Note */}
                  <div className="mt-6 p-4 bg-brand-maroon/20 rounded-xl border border-brand-maroon/30">
                    <p className="text-brand-sand text-sm italic">
                      <strong>Important Note:</strong> We cannot afford Kathy Reyes coaching because we as a club cannot afford to go to congresses and other expenses. There is also the issue of UC's being on the chopping block because of federal administration, as well as we don't have the money. Things that could offset this: Negotiating price of Kathy Reyes, negotiating exactly how much her fundraising covers. Otherwise, we could wait for next year.
                    </p>
                  </div>
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
    </div>
  );
}
