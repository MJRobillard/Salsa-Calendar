'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  Music,
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function ContactPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // EmailJS configuration - you'll need to replace these with your actual IDs
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Salsa @ Cal Team'
      };

      // Send email using EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

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
          
          {/* Contact Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                  Contact Us
                </h1>
                <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                  Get in touch with our team, officers, and community. We're here to help and answer your questions!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Contact Form */}
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Send className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Send us a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-brand-sand font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-brand-sand font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                          placeholder="your.email@berkeley.edu"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-brand-sand font-medium mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="decal">DeCal Course Questions</option>
                        <option value="events">Event Information</option>
                        <option value="membership">Membership Questions</option>
                        <option value="performance">Performance Team</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-brand-sand font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>

                    {/* Form Status Messages */}
                    {formStatus === 'success' && (
                      <div className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className="text-green-400">Message sent successfully! We'll get back to you within 24 hours.</span>
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <AlertCircle className="w-6 h-6 text-red-400" />
                        <span className="text-red-400">Something went wrong. Please try again.</span>
                      </div>
                    )}
                  </form>

                  <div className="mt-6 p-4 bg-brand-maroon/10 rounded-xl">
                                            <div className="flex items-center space-x-2 text-brand-sand text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Response Time: We aim to respond within 24 hours</span>
                        </div>
                        <div className="flex items-center space-x-2 text-brand-sand text-sm mt-2">
                          <Mail className="w-4 h-4" />
                          <span>Listserv: salsadanceatcal@lists.berkeley.edu</span>
                        </div>
                  </div>
                </div>

                {/* Contact Information & Officer Directory */}
                <div className="space-y-8">
                  {/* General Contact Info */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h2 className="text-2xl font-bold text-brand-gold mb-6">General Contact</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-brand-maroon/20 rounded-lg">
                          <Mail className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-brand-sand font-medium">General Inquiries</p>
                          <a href="mailto:salsaatcal@gmail.com" className="text-brand-gold hover:text-white transition-colors">
                            salsaatcal@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-brand-maroon/20 rounded-lg">
                          <Mail className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-brand-sand font-medium">DeCal Questions</p>
                          <a href="mailto:salsadecal@gmail.com" className="text-brand-gold hover:text-white transition-colors">
                            salsadecal@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-brand-maroon/20 rounded-lg">
                          <MapPin className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-brand-sand font-medium">LEAD Center</p>
                          <p className="text-brand-sand">4th Floor, Eshleman Hall</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Officer Directory */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h2 className="text-2xl font-bold text-brand-gold mb-6">Current Officers</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-brand-maroon/20 rounded-xl">
                        <h3 className="text-lg font-semibold text-brand-gold mb-2">President</h3>
                        <p className="text-brand-sand">Kian Asgharzadeh</p>
                        <a href="mailto:kian-asgh@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                          kian-asgh@berkeley.edu
                        </a>
                      </div>

                      <div className="p-4 bg-brand-maroon/20 rounded-xl">
                        <h3 className="text-lg font-semibold text-brand-gold mb-2">DeCal Directors</h3>
                        <p className="text-brand-sand mb-1">Sofia Cielak</p>
                        <a href="mailto:sof.ck12@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                          sof.ck12@berkeley.edu
                        </a>
                        <p className="text-brand-sand mt-2 mb-1">Tristan Soto Moreno</p>
                        <a href="mailto:tsoto25@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                          tsoto25@berkeley.edu
                        </a>
                      </div>

                      <div className="p-4 bg-brand-maroon/20 rounded-xl">
                        <h3 className="text-lg font-semibold text-brand-gold mb-2">DeCal Advisor</h3>
                        <p className="text-brand-sand">Professor Mary Kelsey</p>
                        <p className="text-brand-sand text-sm">Sociology Department</p>
                        <a href="mailto:mkelsey@berkeley.edu" className="text-brand-gold hover:text-white transition-colors text-sm">
                          mkelsey@berkeley.edu
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h2 className="text-2xl font-bold text-brand-gold mb-6">Follow Us</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href="https://instagram.com/salsaatcalberkeley"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-xl transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                      >
                        <Instagram className="w-6 h-6 text-purple-400" />
                        <span className="text-brand-sand font-medium">Instagram</span>
                      </a>

                      <a
                        href="https://facebook.com/salsaatcal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 rounded-xl transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                      >
                        <Facebook className="w-6 h-6 text-blue-400" />
                        <span className="text-brand-sand font-medium">Facebook</span>
                      </a>

                      <a
                        href="https://open.spotify.com/user/salsadanceatcal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 rounded-xl transition-all duration-300 border border-green-500/30 hover:border-green-500/50"
                      >
                        <Music className="w-6 h-6 text-green-400" />
                        <span className="text-brand-sand font-medium">Spotify</span>
                      </a>

                      <a
                        href="https://linktr.ee/salsa_at_cal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 hover:from-brand-maroon/30 hover:to-accentTo/30 rounded-xl transition-all duration-300 border border-brand-maroon/30 hover:border-brand-maroon/50"
                      >
                        <MapPin className="w-6 h-6 text-brand-gold" />
                        <span className="text-brand-sand font-medium">Linktree</span>
                      </a>
                    </div>

                                         <div className="mt-6 p-4 bg-brand-maroon/10 rounded-xl">
                       <p className="text-brand-sand text-sm text-center">
                         Join our Discord for real-time community updates and discussions!
                       </p>
                       <p className="text-brand-sand text-sm text-center mt-2">
                         Venmo: @SALSAATCAL09 for payments and donations
                       </p>
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
