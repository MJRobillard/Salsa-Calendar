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
    <header className="relative overflow-hidden bg-gradient-to-r from-brand-charcoal via-brand-paper to-brand-charcoal border-b border-brand-maroon px-6 py-4">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="relative flex items-center justify-between">
        {/* Left side - Logo and Page title */}
        <div className="flex items-center space-x-4">
          {/* Logo - Clickable to dashboard */}
          <Link href="/dashboard" className="hover:scale-105 transition-transform duration-200">
            <div className="relative w-12 h-12">
              <Image 
                src="/logo.png" 
                alt="Salsa Club Logo" 
                fill
                className="drop-shadow-lg"
              />
            </div>
          </Link>
          
          <div>
            <h2 className="text-xl font-semibold text-brand-gold">Dashboard</h2>
            <p className="text-sm text-brand-sand">Welcome back, {user.displayName}</p>
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            className="p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          {/* Settings */}
          <button
            className="p-2 text-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm cursor-not-allowed opacity-50"
            aria-label="Settings (Coming Soon)"
            disabled
          >
            <Settings size={20} />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors backdrop-blur-sm"
              aria-label="User menu"
              aria-expanded={showDropdown}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border-2 border-brand-maroon shadow-lg"
                />
              ) : (
                <div className="w-8 h-8 bg-brand-maroon rounded-full flex items-center justify-center shadow-lg">
                  <User size={16} className="text-white" />
                </div>
              )}
              <span className="hidden md:block font-medium">{user.displayName}</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-48 bg-brand-charcoal/95 backdrop-blur-sm border border-brand-maroon/50 rounded-lg shadow-card z-20">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-brand-maroon/30">
                      <p className="text-sm text-brand-sand">{user.email}</p>
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
