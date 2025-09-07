'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission - replace with actual EmailJS implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal text-white overflow-x-hidden relative">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Contact Form */}
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-brand-gold font-semibold mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg text-white placeholder-brand-sand/60 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-brand-gold font-semibold mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg text-white placeholder-brand-sand/60 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300"
                          placeholder="your.email@berkeley.edu"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-brand-gold font-semibold mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg text-white placeholder-brand-sand/60 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-brand-gold font-semibold mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg text-white placeholder-brand-sand/60 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us more about your question or concern..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-brand-gold to-accentTo hover:from-accentTo hover:to-brand-gold text-brand-charcoal rounded-lg font-bold text-lg shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center space-x-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <CheckCircle size={20} className="text-green-400" />
                        <span className="text-green-400">Message sent successfully! We'll get back to you soon.</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <AlertCircle size={20} className="text-red-400" />
                        <span className="text-red-400">Failed to send message. Please try again or contact us directly.</span>
                      </div>
                    )}
                  </form>
                </div>

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