'use client'

import React from 'react';
import GoldGradientCard, { GoldGradientCardInline, GoldGradientBorder } from '../components/GoldGradientCard';
import { Heart, DollarSign, Users, Calendar, Gift, Star, ArrowRight } from 'lucide-react';

export default function GoldGradientDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-brand-gold mb-12">
          Gold Gradient Card Styles Demo
        </h1>

        {/* CSS Class Implementation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">CSS Class Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoldGradientCard>
              <h3 className="text-xl font-bold text-brand-gold mb-4">Quick Donation</h3>
              <p className="text-brand-sand mb-4">Support our mission with a direct contribution</p>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-brand-maroon/20 p-3 rounded-lg border border-brand-maroon/30">
                  <DollarSign className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                  <p className="text-brand-gold font-semibold text-sm">Venmo</p>
                  <p className="text-brand-sand text-xs">@SALSAATCAL09</p>
                </div>
                <div className="bg-brand-maroon/20 p-3 rounded-lg border border-brand-maroon/30">
                  <Gift className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                  <p className="text-brand-gold font-semibold text-sm">Big Give</p>
                  <p className="text-brand-sand text-xs">Fundraiser</p>
                </div>
              </div>
            </GoldGradientCard>

            <GoldGradientCard>
              <h3 className="text-xl font-bold text-brand-gold mb-4">Event Information</h3>
              <p className="text-brand-sand mb-4">Join us for our next salsa event</p>
              <div className="flex items-center gap-3 text-brand-sand">
                <Calendar className="w-5 h-5 text-brand-gold" />
                <span>Every Friday</span>
              </div>
              <div className="flex items-center gap-3 text-brand-sand">
                <Users className="w-5 h-5 text-brand-gold" />
                <span>All levels welcome</span>
              </div>
            </GoldGradientCard>
          </div>
        </section>

        {/* Inline Style Implementation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">Inline Style Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoldGradientCardInline>
              <h3 className="text-xl font-bold text-brand-gold mb-4">Performance Team</h3>
              <p className="text-brand-sand mb-4">Join our competitive dance team</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brand-sand">
                  <Star className="w-4 h-4 text-brand-gold" />
                  <span>Weekly practices</span>
                </div>
                <div className="flex items-center gap-2 text-brand-sand">
                  <Star className="w-4 h-4 text-brand-gold" />
                  <span>Competition opportunities</span>
                </div>
                <div className="flex items-center gap-2 text-brand-sand">
                  <Star className="w-4 h-4 text-brand-gold" />
                  <span>Professional coaching</span>
                </div>
              </div>
            </GoldGradientCardInline>

            <GoldGradientCardInline>
              <h3 className="text-xl font-bold text-brand-gold mb-4">Workshop Series</h3>
              <p className="text-brand-sand mb-4">Advanced techniques and styling</p>
              <div className="bg-brand-maroon/20 p-3 rounded-lg border border-brand-maroon/30">
                <p className="text-brand-gold font-semibold">Next Workshop</p>
                <p className="text-brand-sand text-sm">Intermediate Bachata</p>
                <p className="text-brand-sand text-xs">Saturday, 2:00 PM</p>
              </div>
            </GoldGradientCardInline>
          </div>
        </section>

        {/* Border Only Implementation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">Border Only Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoldGradientBorder>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-gold mb-4">Community Outreach</h3>
                <p className="text-brand-sand mb-4">Building connections beyond campus</p>
                <div className="flex items-center gap-2 text-brand-sand">
                  <Heart className="w-4 h-4 text-brand-gold" />
                  <span>Free beginner lessons</span>
                </div>
              </div>
            </GoldGradientBorder>

            <GoldGradientBorder>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-gold mb-4">Merchandise</h3>
                <p className="text-brand-sand mb-4">Show your salsa pride</p>
                <div className="bg-brand-charcoal/50 p-3 rounded-lg">
                  <p className="text-brand-gold font-semibold">New Collection</p>
                  <p className="text-brand-sand text-sm">Limited edition designs</p>
                </div>
              </div>
            </GoldGradientBorder>
        </div>
        </section>

        {/* Custom Variations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">Custom Variations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Angled Gradient */}
            <div 
              className="rounded-xl2 p-[2px] relative"
              style={{
                background: 'linear-gradient(45deg, #FFD966, #B8860B)',
                boxShadow: '0 0 8px 3px #FFD966, 0 0 16px 6px #B8860B'
              }}
            >
              <div className="bg-[#0A0F1C] rounded-xl2 p-6 relative z-10">
                <h3 className="text-xl font-bold text-brand-gold mb-4">45° Gradient</h3>
                <p className="text-brand-sand">Custom angle with enhanced glow</p>
              </div>
            </div>

            {/* Thicker Border */}
            <div 
              className="rounded-xl2 p-[4px] relative"
              style={{
                background: 'linear-gradient(135deg, #FFD966, #B8860B)',
                boxShadow: '0 0 10px 4px #FFD966, 0 0 20px 8px #B8860B'
              }}
            >
              <div className="bg-[#0A0F1C] rounded-xl2 p-6 relative z-10">
                <h3 className="text-xl font-bold text-brand-gold mb-4">Thick Border</h3>
                <p className="text-brand-sand">4px border with stronger glow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">Usage Instructions</h2>
          
          <GoldGradientCard>
            <h3 className="text-xl font-bold text-brand-gold mb-4">How to Use</h3>
            <div className="space-y-4 text-brand-sand">
              <div>
                <h4 className="font-semibold text-brand-gold">1. CSS Classes (Recommended)</h4>
                <p className="text-sm">Use <code className="bg-brand-charcoal/50 px-2 py-1 rounded">card-gold-gradient</code> and <code className="bg-brand-charcoal/50 px-2 py-1 rounded">card-gold-gradient-content</code></p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-gold">2. Component Import</h4>
                <p className="text-sm">Import and use <code className="bg-brand-charcoal/50 px-2 py-1 rounded">GoldGradientCard</code> component</p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-gold">3. Inline Styles</h4>
                <p className="text-sm">Use <code className="bg-brand-charcoal/50 px-2 py-1 rounded">GoldGradientCardInline</code> for custom styling</p>
              </div>
              <div>
                <h4 className="font-semibold text-brand-gold">4. Border Only</h4>
                <p className="text-sm">Use <code className="bg-brand-charcoal/50 px-2 py-1 rounded">GoldGradientBorder</code> for existing content</p>
              </div>
            </div>
          </GoldGradientCard>
        </section>
      </div>
    </div>
  );
}
