'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Camera, X, CheckCircle, Clock } from 'lucide-react';

interface QRScannerProps {
  onScanComplete: (scanTime: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScanComplete, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanTime, setScanTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const startScanner = async () => {
    try {
      setIsScanning(true);
      setError(null);

      // Try to get available cameras and prioritize front camera
      let videoConstraints = { 
        facingMode: 'user', // Prioritize front camera
        width: { ideal: 1280 },
        height: { ideal: 720 }
      };

      // First, try to get camera permission with front camera preference
      try {
        await navigator.mediaDevices.getUserMedia({ 
          video: videoConstraints
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
        } else if (permissionError.name === 'OverconstrainedError') {
          // If front camera fails, try any available camera
          try {
            await navigator.mediaDevices.getUserMedia({ 
              video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
              } 
            });
          } catch (fallbackError: any) {
            setError('Failed to access any camera. Please check your device and try again.');
            setIsScanning(false);
            return;
          }
        } else {
          setError('Failed to access camera. Please check your device and try again.');
          setIsScanning(false);
          return;
        }
      }

      if (containerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader",
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
            
            // Call the callback with the scan time
            onScanComplete(currentTime);
          },
          (errorMessage) => {
            // Handle scan errors silently
            console.log('QR scan error:', errorMessage);
          }
        );
      }
    } catch (error) {
      setError('Failed to start camera. Please check camera permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
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

  useEffect(() => {
    // Auto-start scanner when component mounts
    startScanner();
    
    return () => {
      stopScanner();
    };
  }, []);

  const handleStartScan = () => {
    startScanner();
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  if (scanResult && scanTime) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] rounded-lg border border-brand-gold p-6 max-w-md w-full">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-gold mb-2">
              QR Code Scanned Successfully!
            </h3>
            <p className="text-brand-sand mb-4">
              You have successfully signed in
            </p>
            
            <div className="bg-brand-paper rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-brand-gold" />
                <span className="text-brand-gold font-semibold">Sign-in Time:</span>
              </div>
              <p className="text-white text-lg font-mono">
                {scanTime}
              </p>
            </div>

            <div className="bg-brand-paper rounded-lg p-4 mb-6">
              <p className="text-brand-sand text-sm mb-1">QR Code Content:</p>
              <p className="text-white font-mono text-xs break-all">
                {scanResult}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full px-4 py-2 bg-brand-gold text-brand-charcoal rounded-lg hover:bg-brand-gold/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] rounded-lg border border-brand-gold p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-brand-gold flex items-center space-x-2">
            <QrCode className="w-6 h-6" />
            <span>QR Code Scanner</span>
          </h3>
          <button
            onClick={handleClose}
            className="text-brand-sand hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!isScanning ? (
          <div className="text-center">
            <div className="bg-brand-paper rounded-lg p-8 mb-6">
              <Camera className="w-16 h-16 text-brand-maroon mx-auto mb-4" />
              <p className="text-brand-sand mb-4">
                Click the button below to start scanning QR codes
              </p>
              <p className="text-white text-sm mb-2">
                This will request permission to access your camera
              </p>
              <p className="text-brand-sand text-xs opacity-75">
                📱 Mobile: Camera will open automatically
              </p>
            </div>
            
            <button
              onClick={handleStartScan}
              className="px-6 py-3 bg-brand-gold text-brand-charcoal rounded-lg hover:bg-brand-gold/80 transition-colors font-semibold"
            >
              Start Camera Scanner
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-brand-paper rounded-lg p-4 mb-6">
              <p className="text-brand-sand mb-2">Camera is active</p>
              <p className="text-white text-sm">
                Point your camera at a QR code to scan
              </p>
            </div>
            
            <div id="qr-reader" className="mb-4"></div>
            
            <button
              onClick={stopScanner}
              className="px-4 py-2 bg-brand-maroon text-white rounded-lg hover:bg-brand-maroon/80 transition-colors"
            >
              Stop Scanner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
