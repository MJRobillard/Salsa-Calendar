'use client'

import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import QRScanner from '../components/QRScanner';
import { 
  User, 
  LogOut, 
  Settings, 
  Calendar, 
  BarChart3, 
  Image as ImageIcon,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  QrCode,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, signOut } = useFirebase();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    location: '',
    bio: ''
  });
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Unified sidebar toggle function
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // Mobile: toggle mobile nav
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      // Desktop: toggle sidebar collapse
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
    if (user) {
      setEditData({
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: '', // These are custom fields not in Firebase User
        location: '',    // These are custom fields not in Firebase User
        bio: ''         // These are custom fields not in Firebase User
      });
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSave = async () => {
    // TODO: Implement profile update logic
    console.log('Saving profile data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      displayName: user?.displayName || '',
      email: user?.email || '',
      phoneNumber: '', // These are custom fields not in Firebase User
      location: '',    // These are custom fields not in Firebase User
      bio: ''         // These are custom fields not in Firebase User
    });
    setIsEditing(false);
  };

  const handleQRScanComplete = (scanTime: string) => {
    setLastScanTime(scanTime);
    setShowQRScanner(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className={`grid grid-cols-1 w-full overflow-hidden relative z-10 ${
        isSidebarCollapsed ? 'md:grid-cols-[48px_1fr]' : 'md:grid-cols-[256px_1fr]'
      }`}>
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileNavOpen} 
          onToggle={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className="flex flex-col min-w-0 w-full pt-topbar">
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen}
          />
          
          {/* Profile Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto w-full">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-brand-charcoal to-brand-paper rounded-lg border border-brand-maroon p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-brand-maroon shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-brand-maroon rounded-full flex items-center justify-center shadow-lg">
                        <User size={48} className="text-white" />
                      </div>
                    )}
                    <button className="absolute bottom-0 right-0 bg-brand-gold text-brand-charcoal p-2 rounded-full hover:bg-brand-gold/80 transition-colors shadow-lg">
                      <Camera size={16} />
                    </button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-2">
                      {user.displayName || 'User'}
                    </h1>
                    <p className="text-brand-sand mb-4">{user.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="px-3 py-1 bg-brand-maroon/20 text-brand-gold rounded-full text-sm border border-brand-maroon/30">
                        Member since {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                      </span>
                      <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold rounded-full text-sm border border-brand-gold/30">
                        Active User
                      </span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-brand-maroon text-white rounded-lg hover:bg-brand-maroon/80 transition-colors flex items-center space-x-2"
                  >
                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
                    <h3 className="text-xl font-semibold text-brand-gold mb-4 flex items-center space-x-2">
                      <User size={20} />
                      <span>Personal Information</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-sand mb-1">Display Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.displayName}
                            onChange={(e) => setEditData({...editData, displayName: e.target.value})}
                            className="w-full px-3 py-2 bg-brand-paper border border-brand-maroon/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                          />
                        ) : (
                          <p className="text-white">{user.displayName || 'Not set'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-sand mb-1">Email</label>
                        <p className="text-white">{user.email}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-sand mb-1">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editData.phoneNumber}
                            onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
                            className="w-full px-3 py-2 bg-brand-paper border border-brand-maroon/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                          />
                        ) : (
                          <p className="text-white">{editData.phoneNumber || 'Not set'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-sand mb-1">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.location}
                            onChange={(e) => setEditData({...editData, location: e.target.value})}
                            className="w-full px-3 py-2 bg-brand-paper border border-brand-maroon/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                          />
                        ) : (
                          <p className="text-white">{editData.location || 'Not set'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-sand mb-1">Bio</label>
                        {isEditing ? (
                          <textarea
                            value={editData.bio}
                            onChange={(e) => setEditData({...editData, bio: e.target.value})}
                            rows={3}
                            className="w-full px-3 py-2 bg-brand-paper border border-brand-maroon/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
                          />
                        ) : (
                          <p className="text-white">{editData.bio || 'No bio added yet'}</p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-3 mt-6">
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-brand-gold text-brand-charcoal rounded-lg hover:bg-brand-gold/80 transition-colors flex items-center space-x-2"
                        >
                          <Save size={16} />
                          <span>Save Changes</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-brand-maroon/20 text-brand-sand rounded-lg hover:bg-brand-maroon/30 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Account Statistics */}
                  <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
                    <h3 className="text-xl font-semibold text-brand-gold mb-4 flex items-center space-x-2">
                      <BarChart3 size={20} />
                      <span>Account Statistics</span>
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-gold">12</div>
                        <div className="text-sm text-brand-sand">Classes Attended</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-gold">8</div>
                        <div className="text-sm text-brand-sand">Social Events</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-gold">480</div>
                        <div className="text-sm text-brand-sand">Total Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-gold">3</div>
                        <div className="text-sm text-brand-sand">Dance Styles</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
                    <h3 className="text-lg font-semibold text-brand-gold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 p-3 bg-brand-maroon/20 text-brand-sand hover:bg-brand-maroon/30 hover:text-brand-gold rounded-lg transition-colors"
                      >
                        <BarChart3 size={18} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/events"
                        className="flex items-center space-x-3 p-3 bg-brand-maroon/20 text-brand-sand hover:bg-brand-maroon/30 hover:text-brand-gold rounded-lg transition-colors"
                      >
                        <Calendar size={18} />
                        <span>Events</span>
                      </Link>
                      <Link
                        href="/media"
                        className="flex items-center space-x-3 p-3 bg-brand-maroon/20 text-brand-sand hover:bg-brand-maroon/30 hover:text-brand-gold rounded-lg transition-colors"
                      >
                        <ImageIcon size={18} />
                        <span>Media</span>
                      </Link>
                      <button
                        onClick={() => setShowQRScanner(true)}
                        className="w-full flex items-center space-x-3 p-3 bg-brand-maroon/20 text-brand-sand hover:bg-brand-maroon/30 hover:text-brand-gold rounded-lg transition-colors"
                      >
                        <QrCode size={18} />
                        <span>Scan QR Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
                    <h3 className="text-lg font-semibold text-brand-gold mb-4">Account</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 p-3 bg-brand-maroon/20 text-brand-sand hover:bg-brand-maroon/30 hover:text-brand-gold rounded-lg transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-brand-maroon/20 text-brand-sand hover:bg-brand-maroon/30 hover:text-brand-gold rounded-lg transition-colors">
                        <Mail size={18} />
                        <span>Contact Support</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 p-3 bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 rounded-lg transition-colors"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>

                  {/* Account Metadata */}
                  <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
                    <h3 className="text-lg font-semibold text-brand-gold mb-4">Account Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-brand-sand">User ID:</span>
                        <p className="text-white font-mono text-xs break-all">{user.uid}</p>
                      </div>
                      <div>
                        <span className="text-brand-sand">Created:</span>
                        <p className="text-white">
                          {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-brand-sand">Last Sign In:</span>
                        <p className="text-white">
                          {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-brand-sand">Email Verified:</span>
                        <p className="text-white">{user.emailVerified ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Check-in History */}
                  <div className="bg-brand-charcoal rounded-lg border border-brand-maroon p-6">
                    <h3 className="text-lg font-semibold text-brand-gold mb-4 flex items-center space-x-2">
                      <QrCode size={20} />
                      <span>QR Check-in History</span>
                    </h3>
                    {lastScanTime ? (
                      <div className="bg-brand-paper rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-brand-gold" />
                          <span className="text-brand-gold font-medium">Last Check-in:</span>
                        </div>
                        <p className="text-white font-mono text-sm">
                          {lastScanTime}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <QrCode className="w-12 h-12 text-brand-maroon/50 mx-auto mb-3" />
                        <p className="text-brand-sand text-sm">
                          No QR check-ins yet
                        </p>
                        <p className="text-brand-sand text-xs mt-1">
                          Use the QR scanner to check in
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onScanComplete={handleQRScanComplete}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}
