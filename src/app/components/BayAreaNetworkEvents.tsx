'use client'

import React from 'react';

interface NetworkEvent {
  id: string;
  title: string;
  category: 'tech' | 'consulting' | 'business' | 'startup';
  description: string;
  status: 'coming-soon' | 'active';
}

const networkEvents: NetworkEvent[] = [
  {
    id: '1',
    title: 'Tech Networking Mixer',
    category: 'tech',
    description: 'Connect with Bay Area tech professionals and explore career opportunities',
    status: 'coming-soon'
  },
  {
    id: '2',
    title: 'Consulting Career Panel',
    category: 'consulting',
    description: 'Learn from experienced consultants about breaking into the industry',
    status: 'coming-soon'
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    category: 'startup',
    description: 'Watch entrepreneurs pitch their ideas and network with founders',
    status: 'coming-soon'
  },
  {
    id: '4',
    title: 'Business Strategy Workshop',
    category: 'business',
    description: 'Interactive workshop on business development and strategic planning',
    status: 'coming-soon'
  }
];

const categoryColors = {
  tech: 'from-blue-500 to-cyan-500',
  consulting: 'from-purple-500 to-indigo-500',
  business: 'from-green-500 to-emerald-500',
  startup: 'from-orange-500 to-red-500'
};

const categoryIcons = {
  tech: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  consulting: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  business: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  startup: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

export default function BayAreaNetworkEvents() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1939]/95 to-[#000000]/95 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl border-2 border-[#FFD54F]/60 backdrop-blur-sm">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFD54F] mb-4 drop-shadow-lg">
          Bay Area Network Events
        </h2>
        <p className="text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
          Connect with professionals across tech, consulting, business, and startup communities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {networkEvents.map((event) => (
          <div
            key={event.id}
            className="group relative overflow-hidden bg-gradient-to-br from-[#0b1939]/80 to-[#000000]/60 p-4 sm:p-6 rounded-xl border-2 border-[#FFD54F]/40 hover:border-[#FFD54F]/70 transition-all duration-300 hover:shadow-[#FFD54F]/30"
          >
            {/* Coming Soon Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-[#0b1939] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Coming Soon
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              {/* Category Icon */}
              <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${categoryColors[event.category]} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                {categoryIcons[event.category]}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-[#FFD54F] mb-2 group-hover:text-[#FFB300] transition-colors">
                  {event.title}
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {event.description}
                </p>
                
                {/* Category Tag */}
                <div className="mt-3">
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryColors[event.category]} text-white text-xs font-medium rounded-full shadow-sm`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD54F]/5 to-[#FFB300]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
      
      {/* Bottom CTA */}
      <div className="text-center mt-8 sm:mt-10">
        <p className="text-white/80 text-sm sm:text-base mb-4">
          Stay tuned for updates on these exciting networking opportunities!
        </p>
        <div className="inline-flex items-center space-x-2 text-[#FFD54F] text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
          </svg>
          <span>More events coming soon</span>
        </div>
      </div>
    </div>
  );
}
