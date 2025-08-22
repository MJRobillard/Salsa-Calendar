'use client'

import React, { useState, useEffect } from 'react';
import { Image, Plus, Eye, Download, Heart, MessageCircle, Share2, Upload, Camera } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  caption: string;
  uploadedBy: string;
  uploadedAt: string;
  likes: number;
  comments: number;
  tags: string[];
}

interface LatestPhotosProps {
  thumbnails: string[];
  onOpenGallery?: () => void;
}

export default function LatestPhotos({ thumbnails, onOpenGallery }: LatestPhotosProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [latestPhotos, setLatestPhotos] = useState<Photo[]>([]);

  // Get the latest 3 photos from the media section
  useEffect(() => {
    // Mock media data from the media section - in production this would come from Firestore
    const mediaPhotos = [
      {
        id: '1',
        url: '/dance_classes.png',
        caption: 'Beginner Salsa Class - Fall 2024',
        uploadedBy: 'Sofia Cielak',
        uploadedAt: new Date('2024-09-15').toISOString(),
        likes: 24,
        comments: 8,
        tags: ['decal', 'beginner', 'salsa']
      },
      {
        id: '2',
        url: '/Team.png',
        caption: 'Performance Team Practice',
        uploadedBy: 'Kathy Reyes',
        uploadedAt: new Date('2024-09-10').toISOString(),
        likes: 18,
        comments: 5,
        tags: ['performance', 'team', 'practice']
      },
      {
        id: '3',
        url: '/image.png',
        caption: 'Open Practica Session',
        uploadedBy: 'Tristan Soto Moreno',
        uploadedAt: new Date('2024-09-08').toISOString(),
        likes: 31,
        comments: 12,
        tags: ['open-practica', 'social', 'dancing']
      }
    ];

    // Sort by upload date and take the last 3
    const sortedPhotos = mediaPhotos
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, 3);

    setLatestPhotos(sortedPhotos);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    try {
      // TODO: Implement actual file upload to Firebase Storage
      // TODO: Save photo metadata to Firestore
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Photo uploaded:', {
        file: uploadFile.name,
        caption: uploadCaption,
        tags: uploadTags.split(',').map(tag => tag.trim()).filter(Boolean)
      });

      // Reset form
      setUploadFile(null);
      setUploadCaption('');
      setUploadTags('');
      setShowUploadModal(false);
      
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Image size={24} className="text-brand-gold" />
            <h3 className="text-xl font-semibold text-brand-gold">Latest Photos</h3>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="p-2 bg-brand-maroon/20 text-brand-gold hover:bg-brand-maroon/30 rounded-lg transition-colors"
            aria-label="Upload photo"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          {latestPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative aspect-video bg-brand-maroon/20 rounded-lg overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="text-sm font-medium truncate">{photo.caption}</p>
                    <div className="flex items-center justify-between text-xs opacity-75 mt-1">
                      <span>{photo.uploadedBy}</span>
                      <span>{formatTimeAgo(photo.uploadedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                    <Heart size={14} />
                  </button>
                  <button className="p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                    <MessageCircle size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button
          onClick={onOpenGallery}
          className="w-full py-3 text-brand-gold hover:text-white hover:bg-brand-maroon/20 rounded-lg border border-brand-maroon transition-all duration-300"
        >
          View All Photos
        </button>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-brand-gold">Upload Photo</h4>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-brand-sand hover:text-brand-gold transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* File Upload */}
                <div className="border-2 border-dashed border-brand-maroon/30 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer block"
                  >
                    {uploadFile ? (
                      <div className="space-y-2">
                        <img
                          src={URL.createObjectURL(uploadFile)}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded mx-auto"
                        />
                        <p className="text-sm text-brand-gold">{uploadFile.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload size={32} className="text-brand-sand mx-auto" />
                        <p className="text-brand-sand">Click to select photo</p>
                        <p className="text-xs text-brand-sand opacity-75">JPG, PNG up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm text-brand-sand mb-2">Caption</label>
                  <textarea
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="Describe your photo..."
                    className="w-full px-3 py-2 bg-brand-maroon/10 border border-brand-maroon rounded text-brand-sand placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
                    rows={3}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm text-brand-sand mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="salsa, social, dance..."
                    className="w-full px-3 py-2 bg-brand-maroon/10 border border-brand-maroon rounded text-brand-sand placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || isUploading}
                  className="w-full py-3 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Camera size={16} />
                      <span>Upload Photo</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-brand-gold">Photo Details</h4>
                <button
                  onClick={closePhotoModal}
                  className="text-brand-sand hover:text-brand-gold transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full rounded-lg"
                />
                
                <div className="space-y-3">
                  <p className="text-brand-gold">{selectedPhoto.caption}</p>
                  
                  <div className="flex items-center justify-between text-sm text-brand-sand">
                    <span>By {selectedPhoto.uploadedBy}</span>
                    <span>{formatTimeAgo(selectedPhoto.uploadedAt)}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart size={16} className="text-red-400" />
                      <span className="text-brand-sand">{selectedPhoto.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={16} className="text-blue-400" />
                      <span className="text-brand-sand">{selectedPhoto.comments}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-brand-maroon/20 text-brand-sand text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 py-2 bg-brand-maroon/20 text-brand-gold rounded-lg hover:bg-brand-maroon/30 transition-colors">
                      <Heart size={16} className="inline mr-2" />
                      Like
                    </button>
                    <button className="flex-1 py-2 bg-brand-maroon/20 text-brand-gold rounded-lg hover:bg-brand-maroon/30 transition-colors">
                      <MessageCircle size={16} className="inline mr-2" />
                      Comment
                    </button>
                    <button className="py-2 px-4 bg-brand-maroon/20 text-brand-gold rounded-lg hover:bg-brand-maroon/30 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
