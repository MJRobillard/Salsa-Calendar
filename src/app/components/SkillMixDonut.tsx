'use client'

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { PieChart, Target, TrendingUp } from 'lucide-react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface StyleData {
  style: string;
  minutes: number;
}

interface SkillMixDonutProps {
  data: StyleData[];
}

export default function SkillMixDonut({ data }: SkillMixDonutProps) {
  const getStyleColor = (style: string, index: number) => {
    const colors = [
      '#FFD700', // Gold
      '#FF9A3E', // Orange
      '#800000', // Maroon
      '#4A90E2', // Blue
      '#9B59B6', // Purple
      '#E74C3C'  // Red
    ];
    return colors[index % colors.length];
  };

  const getStyleIcon = (style: string) => {
    switch (style.toLowerCase()) {
      case 'salsa': return '💃';
      case 'bachata': return '🕺';
      case 'cumbia': return '🎭';
      case 'merengue': return '🎪';
      case 'cha-cha': return '🎯';
      default: return '🎵';
    }
  };

  const processChartData = () => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    const totalMinutes = data.reduce((sum, item) => sum + item.minutes, 0);
    
    return {
      labels: data.map(item => item.style.charAt(0).toUpperCase() + item.style.slice(1)),
      datasets: [
        {
          data: data.map(item => item.minutes),
          backgroundColor: data.map((item, index) => getStyleColor(item.style, index)),
          borderColor: data.map((item, index) => getStyleColor(item.style, index)),
          borderWidth: 2,
          hoverBorderWidth: 4,
          hoverOffset: 8,
          cutout: '65%'
        }
      ]
    };
  };

  const chartData = processChartData();

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#F5E6C8',
          font: {
            size: 12,
            family: 'Inter'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets[0].data) {
              return data.labels.map((label, index) => {
                const value = data.datasets[0].data[index] as number;
                const total = (data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: getStyleColor(label as string, index),
                  strokeStyle: getStyleColor(label as string, index),
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: index
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: '#1A1A1A',
        titleColor: '#FFD700',
        bodyColor: '#F5E6C8',
        borderColor: '#800000',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context) => {
            return context[0].label;
          },
          label: (context) => {
            const value = context.parsed;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            
            if (hours > 0) {
              return `${hours}h ${minutes}m (${percentage}%)`;
            }
            return `${minutes}m (${percentage}%)`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  // Calculate summary statistics
  const totalMinutes = data.reduce((sum, item) => sum + item.minutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const topStyle = data.length > 0 ? data.reduce((prev, current) => 
    (prev.minutes > current.minutes) ? prev : current
  ) : null;
  const averageMinutesPerStyle = data.length > 0 ? Math.round(totalMinutes / data.length) : 0;

  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl2 shadow-card border border-brand-gold">
        <div className="flex items-center space-x-2 mb-6">
          <PieChart size={24} className="text-brand-gold" />
          <h3 className="text-xl font-semibold text-brand-gold">Skill Mix</h3>
        </div>
        
        <div className="text-center py-12">
          <Target size={48} className="text-brand-sand mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-semibold text-brand-gold mb-2">No Practice Data</h4>
          <p className="text-brand-sand text-sm">Start practicing to see your skill distribution!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl2 shadow-card border border-brand-gold">
      <div className="flex items-center space-x-2 mb-6">
        <PieChart size={24} className="text-brand-gold" />
        <h3 className="text-xl font-semibold text-brand-gold">Skill Mix</h3>
      </div>

      {/* Chart Container */}
      <div className="relative h-64 mb-6">
        <Doughnut data={chartData} options={chartOptions} />
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-gold">
              {totalHours > 0 ? `${totalHours}h` : ''}{remainingMinutes}m
            </div>
            <div className="text-sm text-brand-sand">Total Practice</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-brand-maroon/20 rounded-lg">
          <div className="text-lg font-bold text-brand-gold">{data.length}</div>
          <div className="text-xs text-brand-sand">Styles Practiced</div>
        </div>
        <div className="text-center p-3 bg-brand-maroon/20 rounded-lg">
          <div className="text-lg font-bold text-brand-gold">{averageMinutesPerStyle}m</div>
          <div className="text-xs text-brand-sand">Avg per Style</div>
        </div>
      </div>

      {/* Top Style Highlight */}
      {topStyle && (
        <div className="mb-6 p-4 bg-gradient-to-r from-accentFrom/20 to-accentTo/20 rounded-lg border border-brand-maroon/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getStyleIcon(topStyle.style)}</span>
              <div>
                <div className="text-sm text-brand-sand">Top Style</div>
                <div className="font-semibold text-brand-gold capitalize">{topStyle.style}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-brand-gold">
                {Math.floor(topStyle.minutes / 60) > 0 
                  ? `${Math.floor(topStyle.minutes / 60)}h ${topStyle.minutes % 60}m`
                  : `${topStyle.minutes}m`
                }
              </div>
              <div className="text-xs text-brand-sand">
                {Math.round((topStyle.minutes / totalMinutes) * 100)}% of total
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Insights */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-brand-gold">Practice Insights</h4>
        
        {data.map((item, index) => {
          const percentage = totalMinutes > 0 ? Math.round((item.minutes / totalMinutes) * 100) : 0;
          const isTopStyle = topStyle && item.style === topStyle.style;
          
          return (
            <div key={item.style} className="flex items-center justify-between p-2 bg-brand-maroon/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getStyleIcon(item.style)}</span>
                <span className="text-sm text-brand-sand capitalize">{item.style}</span>
                {isTopStyle && <TrendingUp size={14} className="text-brand-gold" />}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-brand-gold">
                  {Math.floor(item.minutes / 60) > 0 
                    ? `${Math.floor(item.minutes / 60)}h ${item.minutes % 60}m`
                    : `${item.minutes}m`
                  }
                </div>
                <div className="text-xs text-brand-sand">{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Goal Progress */}
      <div className="mt-6 pt-4 border-t border-brand-maroon">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-brand-gold">Weekly Goal Progress</span>
          <span className="text-sm text-brand-sand">
            {Math.round((totalMinutes / (data.length * 120)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-brand-maroon/20 rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-accentFrom to-accentTo rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min((totalMinutes / (data.length * 120)) * 100, 100)}%` 
            }}
          />
        </div>
        <p className="text-xs text-brand-sand mt-2 text-center">
          Goal: 2 hours per style per week
        </p>
      </div>
    </div>
  );
}
