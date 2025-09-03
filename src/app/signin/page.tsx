"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '../contexts/FirebaseContext';
import FirebaseUIAuth from '../components/FirebaseUIAuth';
import Image from 'next/image';

const SignInPage: React.FC = () => {
  const { user, loading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if user is already signed in
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignInSuccess = () => {
    // Redirect to dashboard after successful sign in
    router.push('/dashboard');
  };

  const handleSignInError = (error: any) => {
    console.error('Sign in error:', error);
    // You can add toast notifications or error handling here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] flex items-center justify-center">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Custom Header with Logo */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Salsa at Cal Logo"
              width={120}
              height={120}
              className="mx-auto rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Salsa @ Cal
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            UC Berkeley's Premier Salsa Dancing Community
          </p>
          <p className="text-sm text-gray-400">
            Sign in to access your dashboard, events, and community features
          </p>
        </div>

        {/* FirebaseUI Auth Component */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-300">
              Choose your preferred sign-in method
            </p>
          </div>
          
          <FirebaseUIAuth 
            onSignInSuccess={handleSignInSuccess}
            onSignInError={handleSignInError}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            By signing in, you agree to our{' '}
            <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
