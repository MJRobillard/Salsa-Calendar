'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Image as ImageIcon, Info, User, ExternalLink, Clock, Users, Heart, BarChart3, Network } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
  isExternal?: boolean;
  highlight?: boolean;
}

function QuickAction({ icon, label, description, href, isExternal = false, highlight = false }: QuickActionProps) {
  const router = useRouter();

  const handleClick = () => {
    if (isExternal) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-left ${
        highlight
          ? 'bg-gradient-to-br from-accentFrom/20 to-accentTo/20 border-2 border-accentFrom/40 hover:border-accentFrom/60'
          : 'bg-gradient-to-br from-brand-maroon/10 to-brand-maroon/5 border border-brand-maroon/30 hover:border-brand-maroon/50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`text-2xl ${highlight ? 'text-accentFrom' : 'text-brand-gold'}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm ${highlight ? 'text-accentFrom' : 'text-brand-gold'}`}>
            {label}
          </h3>
          <p className="text-brand-sand text-xs mt-1 leading-relaxed">
            {description}
          </p>
          {isExternal && (
            <ExternalLink size={12} className="text-brand-sand mt-1" />
          )}
        </div>
      </div>
    </button>
  );
}

export default function QuickAccess() {
  const { user } = useFirebase();
  
  const getContextualMessage = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    
    if (dayOfWeek === 1 && hour >= 15 && hour <= 17) {
      return "DeCal class happening now!";
    }
    if (dayOfWeek === 2 && hour >= 20 && hour <= 22) {
      return "Open Practica tonight!";
    }
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return "Weekend events coming up!";
    }
    return "Check out what's happening";
  };

  return (
    <div className="mb-6">
      {/* Contextual Message */}
      <div className="bg-gradient-to-r from-brand-maroon/20 to-brand-gold/20 p-4 rounded-xl mb-4 border border-brand-maroon/30">
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-brand-gold" />
          <p className="text-brand-gold font-medium text-sm">{getContextualMessage()}</p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <QuickAction
          icon={<Calendar size={20} />}
          label="Events"
          description="Browse upcoming classes, socials, and workshops"
          href="/events"
          highlight={true}
        />
        
        <QuickAction
          icon={<ImageIcon size={20} />}
          label="Media Gallery"
          description="See photos and videos from our community"
          href="/media"
        />
        
        <QuickAction
          icon={<Info size={20} />}
          label="About Us"
          description="Learn about our community and programs"
          href="/about"
        />
        
        {user ? (
          <QuickAction
            icon={<Network size={20} />}
            label="Network"
            description="Connect with dancers and find partners"
            href="/network"
          />
        ) : (
          <QuickAction
            icon={<User size={20} />}
            label="Sign In for Network"
            description="Connect with dancers and find partners"
            href="/"
          />
        )}
        
        <QuickAction
          icon={<Users size={20} />}
          label="Join Discord"
          description="Connect with fellow dancers online"
          href="https://discord.gg/XVFXVC3rf8"
          isExternal={true}
        />
        
        <QuickAction
          icon={<Heart size={20} />}
          label="Donate"
          description="Support our community and events"
          href="/donate"
        />
        
        {user ? (
          <QuickAction
            icon={<BarChart3 size={20} />}
            label="Your Progress"
            description="View your dance journey and stats"
            href="/dashboard"
          />
        ) : (
          <QuickAction
            icon={<User size={20} />}
            label="Sign In"
            description="Track your progress and RSVP for events"
            href="/"
          />
        )}
      </div>
    </div>
  );
}
