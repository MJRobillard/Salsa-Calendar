'use client'

import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Image from 'next/image';
import { 
  Image as ImageIcon, 
  Upload, 
  Filter, 
  Eye, 
  Download, 
  Share2, 
  Lock, 
  Unlock,
  Calendar,
  Users,
  Video,
  Camera
} from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  caption: string;
  event: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  public: boolean;
  type: 'photo' | 'video';
}

export default function MediaPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Mock data - replace with real Firestore data
  const mockMedia: MediaItem[] = [
    {
      id: '1',
      url: '/dance_classes.png',
      caption: 'Beginner Salsa Class - Fall 2024',
      event: 'DeCal Classes',
      uploadedBy: 'Sofia Cielak',
      uploadedAt: new Date('2024-09-15'),
      tags: ['decal', 'beginner', 'salsa'],
      public: true,
      type: 'photo'
    },
    {
      id: '2',
      url: '/Team.png',
      caption: 'Performance Team Practice',
      event: 'Performance Team',
      uploadedBy: 'Kathy Reyes',
      uploadedAt: new Date('2024-09-10'),
      tags: ['performance', 'team', 'practice'],
      public: true,
      type: 'photo'
    },
    {
      id: '3',
      url: '/image.png',
      caption: 'Open Practica Session',
      event: 'Open Practica',
      uploadedBy: 'Tristan Soto Moreno',
      uploadedAt: new Date('2024-09-08'),
      tags: ['open-practica', 'social', 'dancing'],
      public: true,
      type: 'photo'
    }
  ];

  const events = ['all', 'DeCal Classes', 'Performance Team', 'Open Practica', 'Salsa on Sproul', 'Salsaween', 'El Mercadito', 'Salsa Tropi-Cal', 'Valentine\'s Dance', 'Club Socials'];

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !hasVisitedLanding) {
    return null;
  }

  const filteredMedia = mockMedia.filter(item => {
    if (selectedFilter !== 'all' && item.type !== selectedFilter) return false;
    if (selectedEvent !== 'all' && item.event !== selectedEvent) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="flex flex-row w-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <TopBar user={user} />
          
          {/* Media Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                      Media Gallery
                    </h1>
                    <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                      Relive the energy and excitement of our events through photos and videos
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload Media</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-8 bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-4 sm:p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-brand-gold" />
                    <span className="text-brand-sand font-medium">Filters:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-2 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                    >
                      <option value="all">All Types</option>
                      <option value="photo">Photos</option>
                      <option value="video">Videos</option>
                    </select>
                    
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="px-4 py-2 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                    >
                      {events.map(event => (
                        <option key={event} value={event}>{event === 'all' ? 'All Events' : event}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal rounded-2xl shadow-card border border-brand-maroon/30 overflow-hidden hover:shadow-glow transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {/* Media Preview */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.url}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Media Type Badge */}
                      <div className="absolute top-2 left-2">
                        <div className="p-2 bg-brand-charcoal/80 rounded-lg">
                          {item.type === 'photo' ? (
                            <Camera className="w-4 h-4 text-brand-gold" />
                          ) : (
                            <Video className="w-4 h-4 text-brand-gold" />
                          )}
                        </div>
                      </div>
                      
                      {/* Privacy Badge */}
                      <div className="absolute top-2 right-2">
                        <div className="p-2 bg-brand-charcoal/80 rounded-lg">
                          {item.public ? (
                            <Unlock className="w-4 h-4 text-brand-gold" />
                          ) : (
                            <Lock className="w-4 h-4 text-brand-gold" />
                          )}
                        </div>
                      </div>
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center justify-between">
                            <button className="p-2 bg-brand-gold/20 rounded-lg hover:bg-brand-gold/30 transition-colors">
                              <Eye className="w-4 h-4 text-brand-gold" />
                            </button>
                            <button className="p-2 bg-brand-gold/20 rounded-lg hover:bg-brand-gold/30 transition-colors">
                              <Download className="w-4 h-4 text-brand-gold" />
                            </button>
                            <button className="p-2 bg-brand-gold/20 rounded-lg hover:bg-brand-gold/30 transition-colors">
                              <Share2 className="w-4 h-4 text-brand-gold" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Media Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-brand-gold mb-2 line-clamp-2">
                        {item.caption}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-brand-sand">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{item.event}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{item.uploadedBy}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{item.uploadedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-brand-maroon/20 text-brand-sand text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="px-2 py-1 bg-brand-maroon/20 text-brand-sand text-xs rounded-md">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredMedia.length === 0 && (
                <div className="text-center py-16">
                  <ImageIcon className="w-24 h-24 text-brand-maroon/30 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-brand-gold mb-2">No media found</h3>
                  <p className="text-brand-sand text-lg">
                    Try adjusting your filters or be the first to upload media from an event!
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-2xl border border-brand-maroon/30 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-gold">Upload Media</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 text-brand-sand hover:text-brand-gold transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-brand-sand font-medium mb-2">Select Files</label>
                <div className="border-2 border-dashed border-brand-maroon/30 rounded-xl p-8 text-center hover:border-brand-maroon/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-brand-maroon/50 mx-auto mb-4" />
                  <p className="text-brand-sand">Click to select or drag and drop</p>
                                     <p className="text-brand-sand text-sm mt-2">Photos: JPG, PNG • Videos: MP4, MOV</p>
                   <p className="text-brand-sand text-xs mt-1">Photo release waivers required for all participants</p>
                </div>
              </div>
              
              <div>
                <label className="block text-brand-sand font-medium mb-2">Event</label>
                <select className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent">
                  <option value="">Select an event</option>
                  {events.slice(1).map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-brand-sand font-medium mb-2">Caption</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                  placeholder="Describe your media..."
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="public" className="rounded border-brand-maroon/30" />
                <label htmlFor="public" className="text-brand-sand">Make this media public</label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-3 bg-brand-charcoal/50 text-brand-sand rounded-xl hover:bg-brand-charcoal/70 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-full overflow-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-brand-charcoal/80 text-brand-gold rounded-lg hover:bg-brand-charcoal hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal rounded-2xl overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.caption}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-brand-gold mb-4">{selectedMedia.caption}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-brand-gold mb-2">Details</h3>
                      <div className="space-y-2 text-brand-sand">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span><strong>Event:</strong> {selectedMedia.event}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span><strong>Uploaded by:</strong> {selectedMedia.uploadedBy}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span><strong>Date:</strong> {selectedMedia.uploadedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-brand-gold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedia.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-brand-maroon/20 text-brand-sand rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold/30 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
