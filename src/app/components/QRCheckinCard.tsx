'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Camera, QrCode, Scan, X, CheckCircle, AlertCircle } from 'lucide-react';
import QRCode from 'qrcode.react';

interface QRCheckinCardProps {
  mode: 'scan' | 'show';
  userId: string;
}

export default function QRCheckinCard({ mode, userId }: QRCheckinCardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Check camera permission on mount
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'camera' as PermissionName })
        .then((result) => {
          setPermission(result.state);
        })
        .catch(() => {
          // Fallback for browsers that don't support camera permissions
          setPermission('granted');
        });
    } else {
      setPermission('granted');
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setError(null);
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
    } catch (err: any) {
      console.error('Error starting camera:', err);
      if (err.name === 'NotAllowedError') {
        setPermission('denied');
        setError('Camera permission denied. Please enable camera access.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Failed to start camera. Please try again.');
      }
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setScanResult(null);
  };

  const handleMockScan = () => {
    // Mock QR scan for demonstration
    const mockResult = 'SALSA@CAL|event123|2024-01-22T18:00:00Z|abc123';
    setScanResult(mockResult);
    stopScanning();
    
    // Simulate attendance write
    setTimeout(() => {
      console.log('Attendance recorded:', mockResult);
      setScanResult(null);
    }, 3000);
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
      <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <QrCode size={24} className="text-brand-gold" />
            <h3 className="text-xl font-semibold text-brand-gold">Your QR Code</h3>
          </div>
          
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            <QRCode 
              value={qrData} 
              size={128} 
              level="M"
              includeMargin={true}
              renderAs="svg"
            />
          </div>
          
          <p className="text-sm text-brand-sand mb-2">Show this to event organizers</p>
          <p className="text-xs text-brand-sand opacity-75">ID: {userId.slice(0, 8)}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Camera size={24} className="text-brand-gold" />
          <h3 className="text-xl font-semibold text-brand-gold">QR Check-in</h3>
        </div>

        {!isScanning && !scanResult && !error && (
          <div className="space-y-4">
            <div className="bg-brand-maroon/20 p-4 rounded-lg">
              <Scan size={48} className="text-brand-gold mx-auto mb-2" />
              <p className="text-brand-sand text-sm">Scan event QR codes to check in</p>
            </div>
            
            <button
              onClick={startScanning}
              disabled={permission === 'denied'}
              className="px-6 py-3 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Scanning
            </button>
            
            {permission === 'denied' && (
              <p className="text-red-400 text-sm">Camera permission denied. Please enable in browser settings.</p>
            )}
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full max-w-sm mx-auto rounded-lg border border-brand-maroon"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute inset-0 border-2 border-brand-gold rounded-lg pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-brand-gold rounded-lg"></div>
              </div>
              <button
                onClick={stopScanning}
                className="absolute top-2 right-2 p-2 bg-brand-charcoal rounded-full text-brand-gold hover:bg-brand-maroon/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              <p className="text-brand-sand text-sm">Position QR code within the frame</p>
              <button
                onClick={handleMockScan}
                className="bg-brand-gold text-brand-charcoal px-4 py-2 rounded-lg font-medium hover:bg-brand-gold/90 transition-colors"
              >
                Simulate Scan
              </button>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="space-y-4">
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-medium">Check-in Successful!</p>
              <p className="text-green-300 text-sm mt-1">Event: {scanResult.split('|')[1]}</p>
            </div>
            <button
              onClick={() => setScanResult(null)}
              className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors"
            >
              Scan Another
            </button>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
              <AlertCircle size={48} className="text-red-400 mx-auto mb-2" />
              <p className="text-red-400 font-medium">Scan Failed</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
