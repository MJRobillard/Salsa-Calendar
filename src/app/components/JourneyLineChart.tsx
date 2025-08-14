'use client'

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  GridLineOptions
} from 'chart.js';
import { TrendingUp, Calendar, Users } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AttendanceData {
  date: string;
  attended: boolean;
}

interface JourneyLineChartProps {
  data: AttendanceData[];
}

export default function JourneyLineChart({ data }: JourneyLineChartProps) {
  // Process data for chart
  const processChartData = () => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    // Group by week and count attendance
    const weeklyData = data.reduce((acc, item) => {
      const date = new Date(item.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!acc[weekKey]) {
        acc[weekKey] = { attended: 0, total: 0 };
      }
      
      acc[weekKey].total += 1;
      if (item.attended) {
        acc[weekKey].attended += 1;
      }
      
      return acc;
    }, {} as Record<string, { attended: number; total: number }>);

    // Convert to chart format
    const labels = Object.keys(weeklyData).sort();
    const attendanceCounts = labels.map(week => weeklyData[week].attended);
    const totalCounts = labels.map(week => weeklyData[week].total);

    return {
      labels: labels.map(week => {
        const date = new Date(week);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Attendance',
          data: attendanceCounts,
          borderColor: '#FFD700',
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: '#FFD700',
          pointBorderColor: '#800000',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Total Events',
          data: totalCounts,
          borderColor: '#800000',
          backgroundColor: 'rgba(128, 0, 0, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: '#800000',
          pointBorderColor: '#FFD700',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.2,
          fill: false,
          yAxisID: 'y'
        }
      ]
    };
  };

  const chartData = processChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#F5E6C8',
          font: {
            size: 12,
            family: 'Inter'
          },
          usePointStyle: true,
          pointStyle: 'circle'
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
          title: (context: any) => {
            return `Week of ${context[0].label}`;
          },
          label: (context: any) => {
            if (context.datasetIndex === 0) {
              return `Attended: ${context.parsed.y} events`;
            } else {
              return `Total: ${context.parsed.y} events`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(128, 0, 0, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: '#F5E6C8',
          font: {
            size: 11,
            family: 'Inter'
          }
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(128, 0, 0, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: '#F5E6C8',
          font: {
            size: 11,
            family: 'Inter'
          },
          stepSize: 1,
          callback: (value: number) => Math.round(value)
        },
        min: 0
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    },
    elements: {
      point: {
        hoverBorderWidth: 3
      }
    }
  };

  // Calculate summary statistics
  const totalEvents = data.length;
  const attendedEvents = data.filter(item => item.attended).length;
  const attendanceRate = totalEvents > 0 ? Math.round((attendedEvents / totalEvents) * 100) : 0;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].attended) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  if (!data || data.length === 0) {
    return (
      <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp size={24} className="text-brand-gold" />
          <h3 className="text-xl font-semibold text-brand-gold">Attendance Journey</h3>
        </div>
        
        <div className="text-center py-12">
          <Calendar size={48} className="text-brand-sand mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-semibold text-brand-gold mb-2">No Attendance Data</h4>
          <p className="text-brand-sand text-sm">Start attending events to see your journey!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp size={24} className="text-brand-gold" />
        <h3 className="text-xl font-semibold text-brand-gold">Attendance Journey</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-brand-maroon/20 rounded-lg">
          <div className="text-2xl font-bold text-brand-gold">{totalEvents}</div>
          <div className="text-xs text-brand-sand">Total Events</div>
        </div>
        <div className="text-center p-3 bg-brand-maroon/20 rounded-lg">
          <div className="text-2xl font-bold text-brand-gold">{attendanceRate}%</div>
          <div className="text-xs text-brand-sand">Attendance Rate</div>
        </div>
        <div className="text-center p-3 bg-brand-maroon/20 rounded-lg">
          <div className="text-2xl font-bold text-brand-gold">{currentStreak}</div>
          <div className="text-xs text-brand-sand">Current Streak</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-4">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-brand-gold rounded-full"></div>
          <span className="text-brand-sand">Attendance</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-brand-maroon rounded-full"></div>
          <span className="text-brand-sand">Total Events</span>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-brand-maroon">
        <h4 className="text-sm font-medium text-brand-gold mb-2">This Week's Insight</h4>
        <div className="flex items-center space-x-2 text-brand-sand text-sm">
          <Users size={16} />
          <span>
            {attendedEvents > 0 
              ? `You've attended ${attendedEvents} out of ${totalEvents} events this period.`
              : 'Keep up the great attendance!'
            }
          </span>
        </div>
      </div>
    </div>
  );
}
