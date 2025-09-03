"use client"

import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../utils/firebase';
import dynamic from 'next/dynamic';

interface FirebaseUIAuthProps {
  onSignInSuccess?: () => void;
  onSignInError?: (error: any) => void;
}

const FirebaseUIAuth: React.FC<FirebaseUIAuthProps> = ({ 
  onSignInSuccess, 
  onSignInError 
}) => {
  const uiRef = useRef<HTMLDivElement>(null);
  const uiInstanceRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !uiRef.current || typeof window === 'undefined') return;

    // Dynamically import FirebaseUI only on client side
    const initializeFirebaseUI = async () => {
      try {
        const firebaseui = await import('firebaseui');
        
        // Dynamically load CSS
        if (typeof document !== 'undefined') {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css';
          document.head.appendChild(link);
        }

        // Initialize FirebaseUI
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        uiInstanceRef.current = ui;

        // FirebaseUI configuration with custom branding
        const uiConfig: firebaseui.auth.Config = {
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              // Handle successful sign in
              if (onSignInSuccess) {
                onSignInSuccess();
              }
              // Return false to prevent redirect
              return false;
            },
            signInFailure: (error) => {
              // Handle sign in failure
              if (onSignInError) {
                onSignInError(error);
              }
              return Promise.resolve();
            },
            uiShown: () => {
              // The widget is rendered and ready to use
              console.log('FirebaseUI is ready');
            }
          },
          // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
          signInFlow: 'popup',
          signInSuccessUrl: '/dashboard',
          signInOptions: [
            {
              provider: 'google.com',
              providerName: 'Google',
              buttonColor: '#4285f4',
              iconUrl: 'https://developers.google.com/identity/images/g-logo.png',
              customParameters: {
                prompt: 'select_account'
              }
            },
            {
              provider: 'email',
              requireDisplayName: true,
              buttonColor: '#007bff'
            }
          ],
          // Terms of service and privacy policy URLs
          tosUrl: '/contact',
          privacyPolicyUrl: '/contact',
          // Custom styling
          credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
        };

        // Start the UI
        if (uiRef.current) {
          ui.start(uiRef.current, uiConfig);
        }
      } catch (error) {
        console.error('Error initializing FirebaseUI:', error);
        if (onSignInError) {
          onSignInError(error);
        }
      }
    };

    initializeFirebaseUI();

    // Cleanup function
    return () => {
      if (uiInstanceRef.current) {
        uiInstanceRef.current.reset();
      }
    };
  }, [isClient, onSignInSuccess, onSignInError]);

  if (!isClient) {
    return (
      <div className="firebaseui-auth-container">
        <div 
          className="firebaseui-auth-wrapper flex items-center justify-center"
          style={{ minHeight: '400px' }}
        >
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="firebaseui-auth-container">
      <div 
        ref={uiRef} 
        className="firebaseui-auth-wrapper"
        style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );
};

export default FirebaseUIAuth;
