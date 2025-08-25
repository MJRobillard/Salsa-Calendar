'use client'

import React, { useState, useMemo } from 'react';
import { History, Calendar, MapPin, User, Download, Filter, SortAsc, SortDesc, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventHistoryItem {
  date: string;
  type: 'lesson' | 'social' | 'performance';
  role: 'lead' | 'follow' | 'both';
  location: string;
  duration?: number;
  partner?: string;
  notes?: string;
}

interface EventHistoryProps {
  items: EventHistoryItem[];
}

export default function EventHistory({ items }: EventHistoryProps) {
  const [sortField, setSortField] = useState<keyof EventHistoryItem>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const itemsPerPage = 10;

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'social': return '💃';
      case 'performance': return '🎭';
      default: return '🎵';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'text-blue-400';
      case 'social': return 'text-purple-400';
      case 'performance': return 'text-pink-400';
      default: return 'text-brand-sand';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'lead': return '👨‍💼';
      case 'follow': return '👩‍💼';
      case 'both': return '🔄';
      default: return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'lead': return 'text-blue-400';
      case 'follow': return 'text-pink-400';
      case 'both': return 'text-green-400';
      default: return 'text-brand-sand';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Filter and sort data
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      const typeMatch = filterType === 'all' || item.type === filterType;
      const roleMatch = filterRole === 'all' || item.role === filterRole;
      return typeMatch && roleMatch;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [items, sortField, sortDirection, filterType, filterRole]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(startIndex, endIndex);

  const handleSort = (field: keyof EventHistoryItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'type') {
      setFilterType(value);
    } else if (filterType === 'role') {
      setFilterRole(value);
    }
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Type', 'Role', 'Location', 'Duration', 'Partner', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedItems.map(item => [
        formatDate(item.date),
        formatTime(item.date),
        item.type,
        item.role,
        item.location,
        item.duration || '',
        item.partner || '',
        item.notes || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salsa-event-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl2 shadow-card border border-brand-gold">
        <div className="flex items-center space-x-2 mb-6">
          <History size={24} className="text-brand-gold" />
          <h3 className="text-xl font-semibold text-brand-gold">Event History</h3>
        </div>
        
        <div className="text-center py-12">
          <Calendar size={48} className="text-brand-sand mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-semibold text-brand-gold mb-2">No Event History</h4>
          <p className="text-brand-sand text-sm">Start attending events to build your history!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl2 shadow-card border border-brand-gold">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History size={24} className="text-brand-gold" />
          <h3 className="text-xl font-semibold text-brand-gold">Event History</h3>
        </div>
        
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-brand-maroon/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-brand-gold" />
          <span className="text-sm text-brand-sand">Type:</span>
          <select
            value={filterType}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-3 py-1 bg-brand-charcoal border border-brand-maroon rounded text-brand-sand text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="all">All Types</option>
            <option value="lesson">Lessons</option>
            <option value="social">Socials</option>
            <option value="performance">Performances</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <User size={16} className="text-brand-gold" />
          <span className="text-sm text-brand-sand">Role:</span>
          <select
            value={filterRole}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="px-3 py-1 bg-brand-charcoal border border-brand-maroon rounded text-brand-sand text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="all">All Roles</option>
            <option value="lead">Lead</option>
            <option value="follow">Follow</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="text-sm text-brand-sand">
          Showing {filteredAndSortedItems.length} of {items.length} events
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-maroon">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold/80 transition-colors"
                >
                  <span>Date & Time</span>
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold/80 transition-colors"
                >
                  <span>Type</span>
                  {sortField === 'type' && (
                    sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold/80 transition-colors"
                >
                  <span>Role</span>
                  {sortField === 'role' && (
                    sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold/80 transition-colors"
                >
                  <span>Location</span>
                  {sortField === 'location' && (
                    sortDirection === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                  )}
                </button>
              </th>
              <th className="text-left py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="border-b border-brand-maroon/30 hover:bg-brand-maroon/10 transition-colors">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-brand-gold">{formatDate(item.date)}</div>
                    <div className="text-sm text-brand-sand">{formatTime(item.date)}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getEventTypeIcon(item.type)}</span>
                    <span className={`capitalize ${getEventTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getRoleIcon(item.role)}</span>
                    <span className={`capitalize ${getRoleColor(item.role)}`}>
                      {item.role}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-brand-sand" />
                    <span className="text-brand-sand">{item.location}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    {item.duration && (
                      <div className="text-sm text-brand-sand">
                        Duration: {item.duration} min
                      </div>
                    )}
                    {item.partner && (
                      <div className="text-sm text-brand-sand">
                        Partner: {item.partner}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-sm text-brand-sand">
                        Notes: {item.notes}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-maroon">
          <div className="text-sm text-brand-sand">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedItems.length)} of {filteredAndSortedItems.length} events
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-brand-sand hover:text-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-brand-gold text-brand-charcoal'
                    : 'text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/20'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-brand-sand hover:text-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
