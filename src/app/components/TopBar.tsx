'use client'

import React, { useState } from 'react';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  user: any;
}

export default function TopBar({ user }: TopBarProps) {
  const { signOut } = useFirebase();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowDropdown(false);
      // Redirect to home page after successful sign out
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-brand-charcoal via-brand-paper to-brand-charcoal border-b border-brand-maroon px-3 sm:px-6 py-3 sm:py-4">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="relative flex items-center justify-between min-w-0">
        {/* Left side - Logo and Page title */}
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
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
            <p className="text-xs sm:text-sm text-brand-sand truncate">Welcome back, {user.displayName}</p>
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          {/* Notifications */}
          <button
            className="p-1.5 sm:p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="Notifications"
          >
            <Bell size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Settings */}
          <button
            className="p-1.5 sm:p-2 text-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm cursor-not-allowed opacity-50"
            aria-label="Settings (Coming Soon)"
            disabled
          >
            <Settings size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
              aria-label="User menu"
              aria-expanded={showDropdown}
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
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-brand-charcoal/95 backdrop-blur-sm border border-brand-maroon/50 rounded-lg shadow-card z-20">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-brand-maroon/30">
                      <p className="text-sm text-brand-sand break-words">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-brand-sand hover:bg-brand-maroon/20 hover:text-brand-gold transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
