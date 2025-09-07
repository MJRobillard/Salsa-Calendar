'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Camera, QrCode, Scan, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import QRCode from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ProgressiveAuth from './ProgressiveAuth';

interface QRCheckinCardProps {
  mode: 'scan' | 'show';
  userId: string;
}

export default function QRCheckinCard({ mode, userId }: QRCheckinCardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanTime, setScanTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Detect if user is on mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    
    return () => {
      stopScanning();
    };
  }, []);

  const getCurrentTime = async (): Promise<string> => {
    try {
      // Using World Time API to get current time
      const response = await fetch('http://worldtimeapi.org/api/ip');
      const data = await response.json();
      return new Date(data.datetime).toLocaleString();
    } catch (error) {
      // Fallback to local time if API fails
      return new Date().toLocaleString();
    }
  };

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // First, explicitly request camera permission
      try {
        await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment', // Use back camera on mobile
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      } catch (permissionError: any) {
        if (permissionError.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access in your browser settings and try again.');
          setIsScanning(false);
          return;
        } else if (permissionError.name === 'NotFoundError') {
          setError('No camera found on this device.');
          setIsScanning(false);
          return;
        } else {
          setError('Failed to access camera. Please check your device and try again.');
          setIsScanning(false);
          return;
        }
      }

      // Now create the QR scanner
      scannerRef.current = new Html5QrcodeScanner(
        "qr-checkin-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scannerRef.current.render(
        async (decodedText) => {
          // Stop scanning
          if (scannerRef.current) {
            await scannerRef.current.clear();
            setIsScanning(false);
          }

          // Get current time
          const currentTime = await getCurrentTime();
          setScanTime(currentTime);
          setScanResult(decodedText);
          
          // Process the scan
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Handle scan errors silently
          console.log('QR scan error:', errorMessage);
        }
      );
    } catch (error) {
      console.error('Scanner error:', error);
      setError('Failed to start camera. Please check camera permissions and try again.');
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
        scannerRef.current = null;
      } catch (error) {
        console.error('Error stopping scanner:', error);
      }
    }
    setIsScanning(false);
  };



  const handleScanSuccess = async (qrData: string) => {
    try {
      // Parse QR data format: SALSA@CAL|eventId|isoDate|nonce
      const parts = qrData.split('|');
      if (parts.length !== 4 || parts[0] !== 'SALSA@CAL') {
        setError('Invalid QR code format');
        return;
      }

      const [, eventId, isoDate, nonce] = parts;
      
      // TODO: Validate event exists and is within ±6h window
      // TODO: Check nonce hasn't been used
      // TODO: Write to attendance collection
      
      console.log('QR Scan successful:', { eventId, isoDate, nonce });
      
      // Show success state briefly
      setTimeout(() => {
        setScanResult(null);
        setError(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error processing scan:', err);
      setError('Failed to process scan');
    }
  };

  const generatePersonalQR = () => {
    // Generate a personal QR code for the user
    const qrData = `SALSA@CAL|USER|${userId}|${Date.now()}`;
    return qrData;
  };

  if (mode === 'show') {
    const qrData = generatePersonalQR();
    return (
      <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 sm:p-6 rounded-xl2 shadow-card border border-brand-gold">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <QrCode size={20} className="sm:w-6 sm:h-6 text-brand-gold" />
            <h3 className="text-lg sm:text-xl font-semibold text-brand-gold">Your QR Code</h3>
          </div>
          
          <div className="bg-white p-3 sm:p-4 rounded-lg inline-block mb-3 sm:mb-4">
            <QRCode 
              value={qrData} 
              size={96} 
              className="sm:w-32 sm:h-32"
              level="M"
              includeMargin={true}
              renderAs="svg"
            />
          </div>
          
          <p className="text-xs sm:text-sm text-brand-sand mb-2">Show this to event organizers</p>
          <p className="text-xs text-brand-sand opacity-75">ID: {userId.slice(0, 8)}...</p>
        </div>
      </div>
    );
  }

  return (
    <ProgressiveAuth
      feature="QR Check-in"
      description="Scan QR codes at events to check in and track your attendance"
      className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 sm:p-6 rounded-xl2 shadow-card border border-brand-gold"
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
          <Camera size={20} className="sm:w-6 sm:h-6 text-brand-gold" />
          <h3 className="text-lg sm:text-xl font-semibold text-brand-gold">QR Check-in</h3>
        </div>

        {!isScanning && !scanResult && !error && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-brand-maroon/20 p-3 sm:p-4 rounded-lg">
              <Scan size={36} className="sm:w-12 sm:h-12 text-brand-gold mx-auto mb-2" />
              <p className="text-brand-sand text-xs sm:text-sm">Scan event QR codes to check in</p>

            </div>
            
            <button
              onClick={startScanning}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 text-sm sm:text-base"
            >
              Start Scanning
            </button>
            
            
          </div>
        )}

        {isScanning && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-brand-paper rounded-lg p-4 mb-4">
              <p className="text-brand-sand mb-2">📹 Camera is active</p>
              <p className="text-white text-sm mb-2">
                Point your camera at a QR code to scan
              </p>
              {isMobile && (
                <p className="text-brand-sand text-xs opacity-75">
                  📱 Mobile: Use back camera for best results
                </p>
              )}
            </div>
            
            <div id="qr-checkin-reader" className="mb-4"></div>
            
            <button
              onClick={stopScanning}
              className="px-4 py-2 bg-brand-maroon text-white rounded-lg hover:bg-brand-maroon/80 transition-colors"
            >
              Stop Scanner
            </button>
          </div>
        )}

        {scanResult && scanTime && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-green-500/20 p-3 sm:p-4 rounded-lg border border-green-500/30">
              <CheckCircle size={36} className="sm:w-12 sm:h-12 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-medium text-sm sm:text-base">Check-in Successful!</p>
              <p className="text-green-300 text-xs sm:text-sm mt-1">Event: {scanResult.split('|')[1] || 'Unknown'}</p>
            </div>
            
            <div className="bg-brand-paper rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-gold font-medium">Check-in Time:</span>
              </div>
              <p className="text-white font-mono text-sm">
                {scanTime}
              </p>
            </div>
            
            <button
              onClick={() => {
                setScanResult(null);
                setScanTime(null);
              }}
              className="px-3 sm:px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors text-sm sm:text-base"
            >
              Scan Another
            </button>
          </div>
        )}

        {error && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-red-500/20 p-3 sm:p-4 rounded-lg border border-red-500/30">
              <AlertCircle size={36} className="sm:w-12 sm:h-12 text-red-400 mx-auto mb-2" />
              <p className="text-red-400 font-medium text-sm sm:text-base">Scan Failed</p>
              <p className="text-red-300 text-xs sm:text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="px-3 sm:px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </ProgressiveAuth>
  );
}
