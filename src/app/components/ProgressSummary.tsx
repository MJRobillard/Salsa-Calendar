'use client'

import React from 'react';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import ProgressiveAuth from './ProgressiveAuth';

interface StyleData {
  sessions: number;
  minutes: number;
}

interface ProgressSummaryProps {
  styles: string[];
  data: Record<string, StyleData>;
}

export default function ProgressSummary({ styles, data }: ProgressSummaryProps) {
  const getStyleColor = (style: string) => {
    switch (style.toLowerCase()) {
      case 'salsa': return 'from-blue-500 to-blue-600';
      case 'bachata': return 'from-purple-500 to-purple-600';
      case 'cumbia': return 'from-green-500 to-green-600';
      default: return 'from-brand-maroon to-brand-gold';
    }
  };

  const getStyleIcon = (style: string) => {
    switch (style.toLowerCase()) {
      case 'salsa': return '💃';
      case 'bachata': return '🕺';
      case 'cumbia': return '🎭';
      default: return '🎵';
    }
  };

  const calculateWeeklyDelta = (current: number, previous: number) => {
    if (previous === 0) return { value: current, percentage: 100, trend: 'up' };
    const delta = current - previous;
    const percentage = Math.round((delta / previous) * 100);
    return {
      value: Math.abs(delta),
      percentage: Math.abs(percentage),
      trend: delta > 0 ? 'up' : delta < 0 ? 'down' : 'neutral'
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-400" />;
      case 'down': return <TrendingDown size={16} className="text-red-400" />;
      default: return <Minus size={16} className="text-brand-sand" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-brand-sand';
    }
  };

  return (
    <ProgressiveAuth
      feature="Progress Tracking"
      description="Track your dance progress, sessions, and skill development over time"
      className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 sm:p-6 rounded-xl2 shadow-card border border-brand-gold"
    >
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <Target size={20} className="sm:w-6 sm:h-6 text-brand-gold" />
        <h3 className="text-lg sm:text-xl font-semibold text-brand-gold">Progress Summary</h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {styles.map((style) => {
          const styleData = data[style.toLowerCase()] || { sessions: 0, minutes: 0 };
          const weeklyDelta = calculateWeeklyDelta(styleData.sessions, Math.max(0, styleData.sessions - 2)); // Mock previous week data
          
          return (
            <div key={style} className="space-y-2 sm:space-y-3">
              {/* Style Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl">{getStyleIcon(style)}</span>
                  <span className="font-medium text-brand-gold capitalize text-sm sm:text-base">{style}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-brand-sand">This Week</div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(weeklyDelta.trend)}
                    <span className={`text-xs sm:text-sm font-medium ${getTrendColor(weeklyDelta.trend)}`}>
                      {weeklyDelta.trend === 'up' ? '+' : weeklyDelta.trend === 'down' ? '-' : ''}{weeklyDelta.value}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-brand-sand">Sessions</span>
                  <span className="text-brand-gold font-medium">{styleData.sessions}</span>
                </div>
                <div className="w-full bg-brand-maroon/20 rounded-full h-1.5 sm:h-2">
                  <div 
                    className={`h-1.5 sm:h-2 bg-gradient-to-r ${getStyleColor(style)} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((styleData.sessions / 20) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Minutes Progress */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-brand-sand">Minutes</span>
                  <span className="text-brand-gold font-medium">{styleData.minutes}</span>
                </div>
                <div className="w-full bg-brand-maroon/20 rounded-full h-1.5 sm:h-2">
                  <div 
                    className={`h-1.5 sm:h-2 bg-gradient-to-r ${getStyleColor(style)} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((styleData.minutes / 600) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Weekly Goal Indicator */}
              <div className="flex items-center justify-between text-xs text-brand-sand">
                <span>Weekly Goal: 3 sessions</span>
                <span className={`${styleData.sessions >= 3 ? 'text-green-400' : 'text-brand-sand'}`}>
                  {styleData.sessions >= 3 ? '✓ Achieved' : `${3 - styleData.sessions} more needed`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-brand-maroon">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-base sm:text-lg font-medium text-brand-gold">Overall Progress</span>
          <span className="text-xl sm:text-2xl font-bold text-brand-gold">
            {Math.round((styles.reduce((total, style) => {
              const styleData = data[style.toLowerCase()] || { sessions: 0, minutes: 0 };
              return total + styleData.sessions;
            }, 0) / (styles.length * 3)) * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-brand-maroon/20 rounded-full h-2 sm:h-3">
          <div 
            className="h-2 sm:h-3 bg-gradient-to-r from-accentFrom to-accentTo rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min((styles.reduce((total, style) => {
                const styleData = data[style.toLowerCase()] || { sessions: 0, minutes: 0 };
                return total + styleData.sessions;
              }, 0) / (styles.length * 3)) * 100, 100)}%` 
            }}
          />
        </div>
        
        <p className="text-xs text-brand-sand mt-2 text-center">
          {styles.reduce((total, style) => {
            const styleData = data[style.toLowerCase()] || { sessions: 0, minutes: 0 };
            return total + styleData.sessions;
          }, 0)} total sessions this week
        </p>
      </div>
    </ProgressiveAuth>
  );
}
