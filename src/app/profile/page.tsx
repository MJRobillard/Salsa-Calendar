'use client'

import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import QRScanner from '../components/QRScanner';
import BottomNavigation from '../components/BottomNavigation';
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
  QrCode,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function ProfilePage() {
  const { user, signOut, loading } = useFirebase();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  // Mock profile data - in a real app, this would come from your backend
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || 'John Doe',
    email: user?.email || 'john.doe@berkeley.edu',
    phone: '+1 (555) 123-4567',
    location: 'Berkeley, CA',
    bio: 'Passionate salsa dancer and UC Berkeley student. Love connecting with the dance community!',
    joinDate: 'September 2023',
    lastSignIn: 'Today',
    emailVerified: true
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

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

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleQRScanComplete = (result: string) => {
    console.log('QR Code scanned:', result);
    setLastScanTime(new Date().toLocaleString());
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
      
      <div className="flex w-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileNavOpen} 
          onToggle={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className={`flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen}
          />
          
          {/* Profile Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-2">Profile</h1>
                <p className="text-brand-sand text-lg">Manage your account and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Main Profile Card */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                      {/* Profile Picture */}
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-brand-gold to-accentTo rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-brand-charcoal shadow-lg">
                          {profileData.displayName.charAt(0).toUpperCase()}
                        </div>
                        {!isEditing && (
                          <button className="absolute bottom-0 right-0 bg-brand-gold text-brand-charcoal p-2 rounded-full hover:bg-brand-gold/80 transition-colors shadow-lg">
                            <Edit3 size={16} />
                          </button>
                        )}
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editData.displayName}
                              onChange={(e) => setEditData({...editData, displayName: e.target.value})}
                              className="bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg px-3 py-2 text-brand-gold w-full"
                            />
                          ) : (
                            profileData.displayName
                          )}
                        </h2>
                        <p className="text-brand-sand text-sm sm:text-base">
                          {isEditing ? (
                            <input
                              type="email"
                              value={editData.email}
                              onChange={(e) => setEditData({...editData, email: e.target.value})}
                              className="bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg px-3 py-2 text-brand-sand w-full"
                            />
                          ) : (
                            profileData.email
                          )}
                        </p>
                      </div>

                      {/* Edit Button */}
                      <div className="flex space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-gold to-accentTo text-brand-charcoal rounded-lg hover:shadow-glow transition-all duration-300"
                            >
                              <Save size={16} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancel}
                              className="flex items-center space-x-2 px-4 py-2 bg-brand-maroon/20 text-brand-sand border border-brand-maroon/30 rounded-lg hover:bg-brand-maroon/30 transition-all duration-300"
                            >
                              <X size={16} />
                              <span>Cancel</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={handleEdit}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 text-brand-gold border border-brand-maroon/30 rounded-lg hover:from-brand-maroon/30 hover:to-accentTo/30 transition-all duration-300"
                          >
                            <Edit3 size={16} />
                            <span>Edit Profile</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-brand-gold font-semibold mb-2">Phone</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={editData.phone}
                              onChange={(e) => setEditData({...editData, phone: e.target.value})}
                              className="w-full bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg px-3 py-2 text-brand-sand"
                            />
                          ) : (
                            <div className="flex items-center space-x-2 text-brand-sand">
                              <Phone size={16} />
                              <span>{profileData.phone}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-brand-gold font-semibold mb-2">Location</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editData.location}
                              onChange={(e) => setEditData({...editData, location: e.target.value})}
                              className="w-full bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg px-3 py-2 text-brand-sand"
                            />
                          ) : (
                            <div className="flex items-center space-x-2 text-brand-sand">
                              <MapPin size={16} />
                              <span>{profileData.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-brand-gold font-semibold mb-2">Bio</label>
                        {isEditing ? (
                          <textarea
                            value={editData.bio}
                            onChange={(e) => setEditData({...editData, bio: e.target.value})}
                            rows={3}
                            className="w-full bg-brand-charcoal/50 border border-brand-maroon/30 rounded-lg px-3 py-2 text-brand-sand resize-none"
                          />
                        ) : (
                          <p className="text-brand-sand">{profileData.bio}</p>
                        )}
                      </div>

                      {isEditing && (
                        <div className="pt-4 border-t border-brand-maroon/20">
                          <p className="text-brand-sand text-sm">
                            Changes will be saved to your profile. Some information may require verification.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Account Statistics */}
                    <div className="mt-8 pt-6 border-t border-brand-maroon/20">
                      <h3 className="text-xl font-bold text-brand-gold mb-4">Account Statistics</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-brand-gold">8</div>
                          <div className="text-brand-sand text-sm">Events Attended</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-brand-gold">480</div>
                          <div className="text-brand-sand text-sm">Dance Hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-brand-gold">3</div>
                          <div className="text-brand-sand text-sm">Badges Earned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h3 className="text-xl font-bold text-brand-gold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowQRScanner(true)}
                        className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 hover:from-brand-maroon/30 hover:to-accentTo/30 rounded-lg transition-all duration-300 border border-brand-maroon/30"
                      >
                        <QrCode size={20} className="text-brand-gold" />
                        <span className="text-brand-sand">QR Check-in</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 hover:from-brand-maroon/30 hover:to-accentTo/30 rounded-lg transition-all duration-300 border border-brand-maroon/30">
                        <Calendar size={20} className="text-brand-gold" />
                        <span className="text-brand-sand">View Events</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 hover:from-brand-maroon/30 hover:to-accentTo/30 rounded-lg transition-all duration-300 border border-brand-maroon/30">
                        <BarChart3 size={20} className="text-brand-gold" />
                        <span className="text-brand-sand">View Progress</span>
                      </button>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h3 className="text-xl font-bold text-brand-gold mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-brand-maroon/20 to-accentTo/20 hover:from-brand-maroon/30 hover:to-accentTo/30 rounded-lg transition-all duration-300 border border-brand-maroon/30">
                        <Settings size={20} className="text-brand-gold" />
                        <span className="text-brand-sand">Settings</span>
                      </button>
                      <button
                        onClick={signOut}
                        className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 rounded-lg transition-all duration-300 border border-red-500/30"
                      >
                        <LogOut size={20} className="text-red-400" />
                        <span className="text-red-400">Sign Out</span>
                      </button>
                    </div>
                  </div>

                  {/* Account Metadata */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h3 className="text-xl font-bold text-brand-gold mb-4">Account Info</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-brand-sand">Member Since:</span>
                        <div className="text-brand-gold font-semibold">{profileData.joinDate}</div>
                      </div>
                      <div>
                        <span className="text-brand-sand">Last Sign In:</span>
                        <div className="text-brand-gold font-semibold">{profileData.lastSignIn}</div>
                      </div>
                      <div>
                        <span className="text-brand-sand">Email Verified:</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-green-400 font-semibold">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Check-in History */}
                  <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                    <h3 className="text-xl font-bold text-brand-gold mb-4">Recent Check-ins</h3>
                    {lastScanTime ? (
                      <div className="flex items-center space-x-3 p-3 bg-brand-maroon/10 rounded-lg border border-brand-maroon/20">
                        <Clock size={20} className="text-brand-gold" />
                        <div>
                          <div className="text-brand-sand text-sm">Last Check-in</div>
                          <p className="text-white font-mono text-sm">
                            {lastScanTime}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <QrCode size={32} className="text-brand-maroon/50 mx-auto mb-2" />
                        <p className="text-brand-sand text-sm">No recent check-ins</p>
                        <p className="text-brand-sand text-xs">Use QR Check-in to track your attendance</p>
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

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
}