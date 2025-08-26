'use client'

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, ExternalLink, X } from 'lucide-react';

export default function AddCalendarCard() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('salsa-calendar-dashboard-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleAddCalendar = () => {
    window.open('https://calendar.google.com/calendar/u/0/r?cid=salsaatcal@gmail.com', '_blank');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('salsa-calendar-dashboard-dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 sm:p-6 rounded-xl2 shadow-card border border-brand-gold h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-brand-gold" />
          <h3 className="text-lg font-semibold text-brand-gold">Add Salsa @ Cal Calendar</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 text-brand-sand hover:text-brand-gold transition-colors"
          aria-label="Dismiss add calendar card"
        >
          <X size={16} />
        </button>
      </div>

      <p className="text-white text-sm mb-4 flex-1">Never miss a beat! Add the Salsa @ Cal calendar to your Google Calendar.</p>

      <button
        onClick={handleAddCalendar}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300"
      >
        <Plus size={16} />
        <span>Add Calendar</span>
        <ExternalLink size={14} />
      </button>
    </div>
  );
}


