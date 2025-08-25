'use client'

import React, { useState, useEffect } from 'react';
import { User, Settings, Bell, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TopBarProps {
  user: any;
  onSidebarToggle?: () => void;
  isSidebarCollapsed?: boolean;
  isMobileNavOpen?: boolean;
}

export default function TopBar({ user, onSidebarToggle, isSidebarCollapsed, isMobileNavOpen }: TopBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show TopBar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past the first 100px
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50
      overflow-hidden bg-gradient-to-r from-brand-charcoal via-brand-paper to-brand-charcoal 
      border-b border-brand-maroon px-3 sm:px-6 py-3 sm:py-4
      transform transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="relative flex items-center justify-between min-w-0">
        {/* Left side - Mobile Sidebar Toggle and Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          {/* Mobile-only Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="md:hidden p-2 text-brand-gold hover:text-white hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm border border-brand-maroon/30 cursor-pointer z-10 relative pointer-events-auto"
            style={{ pointerEvents: 'auto' }}
            aria-label="Toggle mobile sidebar"
          >
            {isMobileNavOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

          {/* Logo - Clickable to dashboard */}
          <Link href="/dashboard" className="hover:scale-105 transition-transform duration-200 flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12">
              <Image 
                src="/logo.png" 
                alt="Salsa Club Logo" 
                fill
                className="drop-shadow-lg"
              />
            </div>
          </Link>
          
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-brand-gold truncate">Dashboard</h2>
            <p className="hidden sm:block text-xs sm:text-sm text-brand-sand truncate">Welcome back, {user.displayName}</p>
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          {/* Notifications - Hidden on mobile */}
          <button
            className="hidden sm:block p-1.5 sm:p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="Notifications"
          >
            <Bell size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Settings */}
          <Link
            href="/settings"
            className="p-1.5 sm:p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="Go to settings"
          >
            <Settings size={18} className="sm:w-5 sm:h-5" />
          </Link>

          {/* User Menu */}
          <Link
            href="/profile"
            className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="Go to profile"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-brand-maroon shadow-lg flex-shrink-0"
              />
            ) : (
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-maroon rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <User size={14} className="sm:w-4 sm:h-4 text-white" />
              </div>
            )}
            <span className="hidden lg:block font-medium truncate max-w-32">{user.displayName}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
