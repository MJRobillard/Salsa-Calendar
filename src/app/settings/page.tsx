'use client'

import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Image from 'next/image';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UserSettings {
  role: 'lead' | 'follow' | 'both';
  styles: string[];
  notifications: {
    email: boolean;
    calendar: boolean;
    events: boolean;
    updates: boolean;
  };
  profile: {
    displayName: string;
    photoURL: string;
  };
  privacy: {
    showProgress: boolean;
    showAttendance: boolean;
    allowContact: boolean;
  };
}

export default function SettingsPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({
    role: 'both',
    styles: ['salsa'],
    notifications: {
      email: true,
      calendar: true,
      events: true,
      updates: false
    },
    profile: {
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    },
    privacy: {
      showProgress: true,
      showAttendance: true,
      allowContact: true
    }
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
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



  const danceStyles = [
    { id: 'salsa', label: 'Salsa', description: 'LA Style Salsa (on "the one")' },
    { id: 'bachata', label: 'Bachata', description: 'Dominican Bachata' },
    { id: 'cumbia', label: 'Cumbia', description: 'Colombian Cumbia' },
    { id: 'merengue', label: 'Merengue', description: 'Dominican Merengue' },
    { id: 'rueda', label: 'Rueda', description: 'Cuban Rueda' },
    { id: 'kizomba', label: 'Kizomba', description: 'Angolan Partner Dance' }
  ];

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  useEffect(() => {
    if (user) {
      setSettings(prev => ({
        ...prev,
        profile: {
          displayName: user.displayName || '',
          photoURL: user.photoURL || ''
        }
      }));
    }
  }, [user]);

  const handleRoleChange = (role: 'lead' | 'follow' | 'both') => {
    setSettings(prev => ({ ...prev, role }));
  };

  const handleStyleToggle = (styleId: string) => {
    setSettings(prev => ({
      ...prev,
      styles: prev.styles.includes(styleId)
        ? prev.styles.filter(s => s !== styleId)
        : [...prev.styles, styleId]
    }));
  };

  const handleNotificationToggle = (key: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyToggle = (key: keyof UserSettings['privacy']) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handleProfileChange = (key: keyof UserSettings['profile'], value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simulate saving to Firestore
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

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
        <div className="flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out">
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen} 
          />
          
          {/* Settings Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                      Settings
                    </h1>
                    <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                      Customize your experience and manage your preferences
                    </p>
                  </div>
                  
                  <button
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className="bg-gradient-to-r from-accentFrom to-accentTo hover:from-accentTo hover:to-accentFrom text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Save Status Messages */}
                {saveStatus === 'success' && (
                  <div className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl mt-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-green-400">Settings saved successfully!</span>
                  </div>
                )}

                {saveStatus === 'error' && (
                  <div className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl mt-4">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <span className="text-red-400">Failed to save settings. Please try again.</span>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                {/* Profile Settings */}
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <User className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Profile Settings</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-brand-sand font-medium mb-2">Display Name</label>
                      <input
                        type="text"
                        value={settings.profile.displayName}
                        onChange={(e) => handleProfileChange('displayName', e.target.value)}
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl text-white placeholder-brand-sand/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                        placeholder="Your display name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-brand-sand font-medium mb-2">Profile Photo</label>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-maroon/30">
                          {settings.profile.photoURL ? (
                            <Image
                              src={settings.profile.photoURL}
                              alt="Profile"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-brand-maroon/20 flex items-center justify-center">
                              <User className="w-8 h-8 text-brand-maroon/50" />
                            </div>
                          )}
                        </div>
                        <button className="px-4 py-2 bg-brand-maroon/20 text-brand-gold rounded-lg hover:bg-brand-maroon/30 transition-colors">
                          Change Photo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dance Preferences */}
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Palette className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Dance Preferences</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Role Selection */}
                    <div>
                      <h3 className="text-xl font-semibold text-brand-gold mb-4">Preferred Role</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(['lead', 'follow', 'both'] as const).map((role) => (
                          <button
                            key={role}
                            onClick={() => handleRoleChange(role)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              settings.role === role
                                ? 'border-brand-gold bg-brand-gold/20 text-brand-gold'
                                : 'border-brand-maroon/30 bg-brand-charcoal/50 text-brand-sand hover:border-brand-maroon/50 hover:bg-brand-charcoal/70'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-2xl font-bold mb-2 capitalize">{role}</div>
                              <div className="text-sm opacity-80">
                                {role === 'lead' && 'I prefer to lead'}
                                {role === 'follow' && 'I prefer to follow'}
                                {role === 'both' && 'I can do both'}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dance Styles */}
                    <div>
                      <h3 className="text-xl font-semibold text-brand-gold mb-4">Dance Styles</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {danceStyles.map((style) => (
                          <label
                            key={style.id}
                            className="flex items-start space-x-3 p-4 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl cursor-pointer hover:bg-brand-charcoal/70 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={settings.styles.includes(style.id)}
                              onChange={() => handleStyleToggle(style.id)}
                              className="mt-1 w-4 h-4 text-brand-gold bg-brand-charcoal border-brand-maroon/30 rounded focus:ring-brand-gold focus:ring-2"
                            />
                            <div>
                              <div className="font-medium text-brand-gold">{style.label}</div>
                              <div className="text-sm text-brand-sand">{style.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Bell className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Notifications</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-4 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl cursor-pointer hover:bg-brand-charcoal/70 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-brand-gold capitalize">
                            {key === 'email' && 'Email Notifications'}
                            {key === 'calendar' && 'Calendar Reminders'}
                            {key === 'events' && 'Event Updates'}
                            {key === 'updates' && 'Club Updates'}
                          </div>
                          <div className="text-sm text-brand-sand">
                            {key === 'email' && 'Receive updates via email'}
                            {key === 'calendar' && 'Get reminders for upcoming events'}
                            {key === 'events' && 'Stay informed about event changes'}
                            {key === 'updates' && 'Get club news and announcements'}
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationToggle(key as keyof UserSettings['notifications'])}
                            className="sr-only"
                          />
                          <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                            value ? 'bg-brand-gold' : 'bg-brand-maroon/30'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 sm:p-8 rounded-2xl shadow-card border border-brand-maroon/30">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-brand-maroon/20 rounded-xl">
                      <Shield className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-gold">Privacy Settings</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.privacy).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-4 bg-brand-charcoal/50 border border-brand-maroon/30 rounded-xl cursor-pointer hover:bg-brand-charcoal/70 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-brand-gold capitalize">
                            {key === 'showProgress' && 'Show Progress'}
                            {key === 'showAttendance' && 'Show Attendance'}
                            {key === 'allowContact' && 'Allow Contact'}
                          </div>
                          <div className="text-sm text-brand-sand">
                            {key === 'showProgress' && 'Other members can see your dance progress'}
                            {key === 'showAttendance' && 'Other members can see your event attendance'}
                            {key === 'allowContact' && 'Other members can contact you directly'}
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handlePrivacyToggle(key as keyof UserSettings['privacy'])}
                            className="sr-only"
                          />
                          <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                            value ? 'bg-brand-gold' : 'bg-brand-maroon/30'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
