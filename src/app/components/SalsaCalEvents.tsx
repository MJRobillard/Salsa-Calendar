'use client'

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, X, Plus, ExternalLink } from 'lucide-react';
import ICAL from 'ical.js';

interface SalsaEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  metaTag?: string;
  meta?: string;
}

interface SalsaCalEventsProps {
  maxEvents?: number;
  onEventsLoaded?: (events: SalsaEvent[]) => void;
}

export default function SalsaCalEvents({ maxEvents = 5, onEventsLoaded }: SalsaCalEventsProps) {
  const [events, setEvents] = useState<SalsaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCalendarCard, setShowCalendarCard] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // Check if user has dismissed the calendar card
    const dismissed = localStorage.getItem('salsa-calendar-dismissed');
    if (dismissed) {
      setShowCalendarCard(false);
    }
    
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/calendar');
      
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Calendar service temporarily unavailable');
        } else {
          throw new Error(`Failed to fetch events (${response.status})`);
        }
      }
      
      const icsData = await response.text();
      const parsedEvents = parseICSEvents(icsData);
      console.log(parsedEvents);
      
      // Sort by start date and take the next events
      const sortedEvents = parsedEvents
        .filter(event => event.start > new Date())
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .slice(0, maxEvents);
      
      setEvents(sortedEvents);
      console.log(sortedEvents);
      const tags = Array.from(new Set(sortedEvents.map(e => e.meta || e.metaTag).filter((t): t is string => Boolean(t))));
      setAvailableTags(tags);
      setRetryCount(0); // Reset retry count on success
      console.log(parsedEvents[0]?.description, parsedEvents[0]?.meta, parsedEvents[0]?.metaTag);
      // Notify parent component that events have been loaded
      if (onEventsLoaded) {
        onEventsLoaded(sortedEvents);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to fetch events. Please try again later.');
      }
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const parseICSEvents = (icsData: string): SalsaEvent[] => {
    try {
      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');
      
      return vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        const description: string | undefined = getDescriptionFromVevent(vevent, event) || undefined;
        const titleText: string = event.summary || 'Untitled Event';
        const metaFromTitle = extractMetaFromTitle(titleText);
        const metaTag = metaFromTitle || extractMetaTag(description);
        console.log(event.summary ,description,  event.startDate.toJSDate());
        return {
          id: event.uid,
          title: titleText,
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate(),
          location: event.location,
          description: description,
          metaTag,
          meta: metaTag
        };
      });
    } catch (err) {
      console.error('Error parsing ICS data:', err);
      return [];
    }
  };

  const extractMetaTag = (description?: string): string | undefined => {
    if (!description) return undefined;
    // Normalize possible escaped newlines from ICS payloads
    const normalized = description.replace(/\\n/g, '\n');
    const lines = normalized
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l.length > 0);
    if (lines.length < 2) return undefined;
    const secondLine = lines[1];
    const match = secondLine.match(/^[^\s.,;:!?#()\[\]{}\-_/]+/);
    const firstWord = match?.[0];
    return firstWord || undefined;
  };

  const extractMetaFromTitle = (title: string): string | undefined => {
    if (!title) return undefined;
    // Matches "Word:" at the beginning (allow letters/digits/&-)
    const match = title.match(/^([A-Za-z0-9&-]+):/);
    return match?.[1] || undefined;
  };

  const decodeIcsText = (text: string): string => {
    if (!text) return text;
    let t = text;
    t = t.replace(/\\\\/g, '\\'); // \\\\ -> \\
    t = t.replace(/\\n/gi, '\n'); // \n -> newline
    t = t.replace(/\\,/g, ','); // \, -> ,
    t = t.replace(/\\;/g, ';'); // \; -> ;
    return t;
  };

  const htmlToText = (html: string): string => {
    try {
      const el = document.createElement('div');
      el.innerHTML = html;
      return (el.textContent || el.innerText || '').trim();
    } catch {
      return html.replace(/<[^>]+>/g, ' ').trim();
    }
  };

  const getDescriptionFromVevent = (vevent: any, eventObj: any): string | undefined => {
    // Prefer plain DESCRIPTION
    const titleCandidate: string | undefined = (eventObj?.summary || (typeof vevent?.getFirstPropertyValue === 'function' ? vevent.getFirstPropertyValue('summary') : undefined)) as string | undefined;
    const isTarget = titleCandidate?.trim() === 'Potential Infosession#2';

    if (isTarget) {
      console.log('[getDescriptionFromVevent] title match:', titleCandidate);
      console.log('[getDescriptionFromVevent] eventObj.description:', eventObj?.description);
    }

    let desc: string | undefined = eventObj?.description;
    if (!desc && typeof vevent?.getFirstPropertyValue === 'function') {
      const direct = vevent.getFirstPropertyValue('description') as string | undefined;
      if (isTarget) {
        console.log('[getDescriptionFromVevent] vevent.getFirstPropertyValue("description"):', direct);
      }
      desc = direct;
    }
    if (!desc && typeof vevent?.getFirstProperty === 'function') {
      const descProp = vevent.getFirstProperty('description');
      const val = descProp?.getFirstValue?.() ?? descProp?.getValues?.()?.[0] ?? descProp?.getValue?.();
      if (isTarget) {
        console.log('[getDescriptionFromVevent] descProp values:', {
          firstValue: descProp?.getFirstValue?.(),
          values0: descProp?.getValues?.()?.[0],
          value: descProp?.getValue?.()
        });
      }
      if (typeof val === 'string') desc = val;
    }
    // Fallback to X-ALT-DESC (HTML)
    if (!desc && typeof vevent?.getFirstProperty === 'function') {
      const alt = vevent.getFirstProperty('x-alt-desc');
      const html = alt?.getFirstValue?.() ?? alt?.getValues?.()?.[0] ?? alt?.getValue?.();
      if (typeof html === 'string') {
        if (isTarget) {
          console.log('[getDescriptionFromVevent] x-alt-desc (html):', html);
        }
        desc = htmlToText(html);
      }
    }
    const decoded = typeof desc === 'string' ? decodeIcsText(desc) : undefined;
    if (isTarget) {
      console.log('[getDescriptionFromVevent] decoded description:', decoded);
    }
    return decoded;
  };

  const dismissCalendarCard = () => {
    setShowCalendarCard(false);
    localStorage.setItem('salsa-calendar-dismissed', 'true');
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const addToGoogleCalendar = () => {
    window.open('https://calendar.google.com/calendar/u/0/r?cid=salsaatcal@gmail.com', '_blank');
  };

  const openEventInGoogleCalendar = (event: SalsaEvent) => {
    // Create a Google Calendar event creation URL with event details
    const startDate = event.start.toISOString().slice(0, 16).replace(/:/g, '');
    const endDate = event.end.toISOString().slice(0, 16).replace(/:/g, '');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(event.location || '')}&details=${encodeURIComponent(event.description || '')}`;
    window.open(googleCalendarUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-brand-maroon p-6 rounded-xl2 shadow-card">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-gold text-lg">Loading Salsa @ Cal events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl2 shadow-card border border-brand-gold">
        <div className="text-center py-12">
          <Calendar size={48} className="text-brand-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-brand-gold mb-2">Unable to Load Events</h3>
          <p className="text-white text-sm mb-4">{error}</p>
          {retryCount > 0 && (
            <p className="text-brand-sand text-xs mb-4">
              Attempt {retryCount} of 3
            </p>
          )}
          <button
            onClick={fetchEvents}
            disabled={retryCount >= 3}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              retryCount >= 3
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-tr from-accentFrom to-accentTo text-white hover:shadow-glow'
            }`}
          >
            {retryCount >= 3 ? 'Max Retries Reached' : 'Try Again'}
          </button>
          {retryCount >= 3 && (
            <p className="text-brand-sand text-xs mt-2">
              Please refresh the page or try again later
            </p>
          )}
        </div>
      </div>
    );
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => setSelectedTags([]);

  const displayedEvents = selectedTags.length > 0
    ? events.filter(e => (e.meta || e.metaTag) && selectedTags.includes((e.meta || e.metaTag) as string))
    : events;

  return (
    <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl2 shadow-card border border-brand-gold">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Calendar size={24} className="text-brand-gold" />
        <h3 className="text-xl font-semibold text-brand-gold">Salsa @ Cal Events</h3>
      </div>

      {/* Filters */}
      {availableTags.length > 0 && (
        <div className="mb-6 p-4 rounded-xl border border-brand-gold/40 bg-brand-maroon/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-brand-gold font-semibold">Filter by tag</h4>
            {selectedTags.length > 0 && (
              <button onClick={clearFilters} className="text-xs text-brand-sand hover:text-brand-gold">Clear</button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {availableTags.map(tag => (
              <label key={tag} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors ${selectedTags.includes(tag) ? 'border-brand-gold text-brand-gold bg-brand-maroon/20' : 'border-brand-maroon/40 text-brand-sand hover:border-brand-gold/60'}`}>
                <input
                  type="checkbox"
                  className="accent-brand-gold"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Subscription Card */}
      {showCalendarCard && (
        <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 rounded-xl mb-6 border border-brand-gold animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-white text-sm mb-3">🎉 Never miss a beat! Add the Salsa @ Cal calendar to your Google Calendar.</p>
              <button
                onClick={addToGoogleCalendar}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 text-sm"
              >
                <Plus size={16} />
                <span>Add Calendar</span>
                <ExternalLink size={14} />
              </button>
            </div>
            <button
              onClick={dismissCalendarCard}
              className="ml-4 p-1 text-brand-sand hover:text-brand-gold transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💃</div>
          <h4 className="text-lg font-semibold text-brand-gold mb-2">New events coming soon — stay tuned!</h4>
          <p className="text-white text-sm">Check back later for upcoming Salsa @ Cal events.</p>
        </div>
      ) : displayedEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💃</div>
          <h4 className="text-lg font-semibold text-brand-gold mb-2">No matching events</h4>
          <p className="text-white text-sm">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-4 rounded-xl border border-brand-gold hover:border-brand-gold/80 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-brand-gold font-semibold line-clamp-2 flex-1">{event.title}</h4>
                {event.metaTag && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-brand-gold text-brand-gold whitespace-nowrap">
                    {event.metaTag}
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-brand-gold" />
                  <span>{formatDate(event.start)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-brand-gold" />
                  <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                </div>
                
                {event.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-brand-gold" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
              </div>

              {/* Add event to Calendar Button */}
              <div className="mt-3 pt-3 border-t border-brand-maroon/30">
                <button
                  onClick={() => openEventInGoogleCalendar(event)}
                  className="w-full px-3 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white text-sm rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ExternalLink size={14} />
                  <span>Add event to Calendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Events Link */}
      {events.length > 0 && (
        <div className="text-center mt-6 pt-4 border-t border-brand-gold/20">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/events"
              className="text-brand-gold hover:text-white transition-colors text-sm flex items-center space-x-2"
            >
              <span>View all events on our site</span>
              <ExternalLink size={14} />
            </a>
            <span className="text-brand-sand text-xs hidden sm:block">•</span>
            <button
              onClick={addToGoogleCalendar}
              className="text-brand-gold hover:text-white transition-colors text-sm flex items-center space-x-2"
            >
              <span>View in Google Calendar</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
