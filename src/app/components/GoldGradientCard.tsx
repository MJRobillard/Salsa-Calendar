import React from 'react';

interface GoldGradientCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function GoldGradientCard({ 
  children, 
  className = '', 
  contentClassName = '' 
}: GoldGradientCardProps) {
  return (
    <div className={`card-gold-gradient ${className}`}>
      <div className={`card-gold-gradient-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

// Alternative implementation using inline styles for more control
export function GoldGradientCardInline({ 
  children, 
  className = '', 
  contentClassName = '' 
}: GoldGradientCardProps) {
  return (
    <div 
      className={`rounded-xl2 p-[2px] relative ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FFD966, #B8860B)',
        boxShadow: '0 0 6px 2px #FFD966, 0 0 12px 4px #B8860B'
      }}
    >
      <div 
        className={`bg-[#0A0F1C] rounded-xl2 p-4 sm:p-6 relative z-10 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

// Utility component for gold gradient borders on existing elements
export function GoldGradientBorder({ 
  children, 
  className = '' 
}: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={`border-2 border-transparent rounded-xl2 ${className}`}
      style={{
        background: 'linear-gradient(#0A0F1C, #0A0F1C) padding-box, linear-gradient(135deg, #FFD966, #B8860B) border-box',
        boxShadow: '0 0 6px 2px #FFD966, 0 0 12px 4px #B8860B'
      }}
    >
      {children}
    </div>
  );
}
