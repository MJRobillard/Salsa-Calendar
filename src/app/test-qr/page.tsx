'use client'

import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import { QrCode, Clock } from 'lucide-react';

export default function TestQRPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  const handleScanComplete = (scanTime: string) => {
    setLastScanTime(scanTime);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-gold mb-4">QR Scanner Test</h1>
          <p className="text-brand-sand text-lg">
            Test the QR code scanner functionality
          </p>
        </div>

        <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-8 mb-8">
          <div className="text-center">
            <QrCode className="w-16 h-16 text-brand-maroon mx-auto mb-4" />

            
            <button
              onClick={() => setShowScanner(true)}
              className="px-8 py-4 bg-brand-gold text-brand-charcoal rounded-lg hover:bg-brand-gold/80 transition-colors font-semibold text-lg"
            >
              Start QR Scanner
            </button>
          </div>
        </div>

        {lastScanTime && (
          <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
            <h3 className="text-xl font-semibold text-brand-gold mb-4 flex items-center space-x-2">
              <Clock className="w-6 h-6" />
              <span>Last Scan Result</span>
            </h3>
            <div className="bg-brand-paper rounded-lg p-4">
              <p className="text-brand-sand mb-2">Scan Time:</p>
              <p className="text-white font-mono text-lg">{lastScanTime}</p>
            </div>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanComplete={handleScanComplete}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
