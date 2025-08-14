'use client'

import React, { useState } from 'react';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';

interface TopBarProps {
  user: any;
}

export default function TopBar({ user }: TopBarProps) {
  const { signOut } = useFirebase();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-brand-charcoal border-b border-brand-maroon px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Page title */}
        <div>
          <h2 className="text-xl font-semibold text-brand-gold">Dashboard</h2>
          <p className="text-sm text-brand-sand">Welcome back, {user.displayName}</p>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            className="p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          {/* Settings */}
          <button
            className="p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20 rounded-lg transition-colors"
              aria-label="User menu"
              aria-expanded={showDropdown}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border-2 border-brand-maroon"
                />
              ) : (
                <div className="w-8 h-8 bg-brand-maroon rounded-full flex items-center justify-center">
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
                <div className="absolute right-0 mt-2 w-48 bg-brand-charcoal border border-brand-maroon rounded-lg shadow-card z-20">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-brand-maroon">
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
