"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebase';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  hasVisitedLanding: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  markLandingVisited: () => void;
  redirectToSignIn: () => void;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  hasVisitedLanding: false,
  signIn: async () => {},
  signOut: async () => {},
  markLandingVisited: () => {},
  redirectToSignIn: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false);

  useEffect(() => {
    // Check if user has visited landing page from cookie
    const checkLandingVisit = () => {
      if (typeof document !== 'undefined') {
        const visited = document.cookie.includes('hasVisitedLanding=true');
        setHasVisitedLanding(visited);
      }
    };

    checkLandingVisit();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markLandingVisited = () => {
    // Set cookie to expire in 30 days
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `hasVisitedLanding=true; expires=${expires.toUTCString()}; path=/`;
    setHasVisitedLanding(true);
  };

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const redirectToSignIn = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/signin';
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Clear user state immediately
      setUser(null);
      // Clear the landing page visit cookie
      document.cookie = 'hasVisitedLanding=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setHasVisitedLanding(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ 
      user, 
      loading, 
      hasVisitedLanding, 
      signIn, 
      signOut: handleSignOut,
      markLandingVisited,
      redirectToSignIn
    }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}; 