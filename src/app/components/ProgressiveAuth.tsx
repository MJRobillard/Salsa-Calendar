'use client'

import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { User, Lock, ArrowRight } from 'lucide-react';

interface ProgressiveAuthProps {
  children: React.ReactNode;
  feature: string;
  description: string;
  onAuthSuccess?: () => void;
  className?: string;
}

export default function ProgressiveAuth({ 
  children, 
  feature, 
  description, 
  onAuthSuccess,
  className = ""
}: ProgressiveAuthProps) {
  const { user, signIn } = useFirebase();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleAuthPrompt = () => {
    if (!user) {
      setShowAuthPrompt(true);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn();
      setShowAuthPrompt(false);
      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleClose = () => {
    setShowAuthPrompt(false);
  };

  if (user) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <div 
        className={`${className} cursor-pointer`}
        onClick={handleAuthPrompt}
      >
        {children}
      </div>

      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 sm:p-8 rounded-2xl shadow-2xl border border-brand-gold max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-brand-gold" />
              </div>
              
              <h2 className="text-2xl font-bold text-brand-gold mb-3">
                Sign In Required
              </h2>
              
              <p className="text-brand-sand mb-2">
                To use <strong>{feature}</strong>, you need to sign in with your Google account.
              </p>
              
              <p className="text-brand-sand text-sm mb-6">
                {description}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Sign In with Google</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 text-brand-sand hover:text-brand-gold transition-colors text-sm"
                >
                  Maybe Later
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-brand-maroon/10 rounded-lg">
                <p className="text-brand-sand text-xs">
                  <User className="w-4 h-4 inline mr-1" />
                  Your account helps us personalize your experience and track your progress
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
