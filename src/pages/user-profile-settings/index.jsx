import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AccountSection from './components/AccountSection';
import PrivacySection from './components/PrivacySection';
import MusicPreferencesSection from './components/MusicPreferencesSection';
import NotificationSection from './components/NotificationSection';
import MoodHistorySection from './components/MoodHistorySection';
import AdvancedSection from './components/AdvancedSection';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    spotifyUsername: 'alex_music_lover',
    lastPasswordChange: 'December 15, 2024'
  });

  const [settings, setSettings] = useState({
    privacy: {
      allowFacialRecognition: true,
      storeBiometricData: false,
      shareAnonymousData: true,
      allowDataAnalytics: true,
      retainMoodHistory: true,
      dataRetentionPeriod: '12months'
    },
    musicPreferences: {
      defaultGenres: ['pop', 'rock', 'electronic'],
      explicitContent: false,
      recommendationSensitivity: 'medium',
      autoPlayPreview: true,
      crossfadeEnabled: false,
      volumeNormalization: true,
      highQualityAudio: false,
      discoverWeeklyStyle: 'balanced'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyRecommendations: true,
      newPlaylistAlerts: true,
      moodTrendUpdates: false,
      spotifyIntegrationAlerts: true,
      securityAlerts: true,
      marketingEmails: false,
      notificationFrequency: 'weekly',
      quietHoursEnabled: false,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00'
    },
    advanced: {
      sessionTimeout: '30',
      offlineMoodSelection: true,
      reducedMotion: false,
      highContrast: false,
      screenReader: false,
      keyboardNavigation: false,
      autoSavePreferences: true,
      debugMode: false,
      betaFeatures: false,
      analyticsOptOut: false,
      cacheSize: '100',
      apiTimeout: '10'
    }
  });

  const [systemStatus, setSystemStatus] = useState({
    spotifyConnected: true,
    cameraPermission: true
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'music', label: 'Music', icon: 'Music' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'history', label: 'Mood History', icon: 'BarChart3' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings' }
  ];

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('moodtunes-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load saved settings:', error);
      }
    }
  }, []);

  const showSaveStatus = (type, message) => {
    setSaveStatus({ type, message });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Account handlers
  const handleUpdateProfile = async (profileData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserData(prev => ({ ...prev, ...profileData }));
      showSaveStatus('success', 'Profile updated successfully');
    } catch (error) {
      showSaveStatus('error', 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (passwordData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserData(prev => ({ 
        ...prev, 
        lastPasswordChange: new Date()?.toLocaleDateString() 
      }));
      showSaveStatus('success', 'Password changed successfully');
    } catch (error) {
      showSaveStatus('error', 'Failed to change password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleConnectSpotify = async () => {
    setLoading(true);
    try {
      // Simulate Spotify OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSystemStatus(prev => ({ ...prev, spotifyConnected: true }));
      showSaveStatus('success', 'Spotify account connected successfully');
    } catch (error) {
      showSaveStatus('error', 'Failed to connect Spotify account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Privacy handlers
  const handleUpdatePrivacySettings = async (privacySettings) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSettings(prev => ({ ...prev, privacy: privacySettings }));
      localStorage.setItem('moodtunes-settings', JSON.stringify({ ...settings, privacy: privacySettings }));
      showSaveStatus('success', 'Privacy settings updated');
    } catch (error) {
      showSaveStatus('error', 'Failed to update privacy settings');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBiometricData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      showSaveStatus('success', 'Biometric data deleted successfully');
    } catch (error) {
      showSaveStatus('error', 'Failed to delete biometric data');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate file download
      const dataBlob = new Blob([JSON.stringify({ userData, settings }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moodtunes-data-export.json';
      a?.click();
      URL.revokeObjectURL(url);
      showSaveStatus('success', 'Data exported successfully');
    } catch (error) {
      showSaveStatus('error', 'Failed to export data');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRequestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ video: true });
      stream?.getTracks()?.forEach(track => track?.stop());
      setSystemStatus(prev => ({ ...prev, cameraPermission: true }));
      showSaveStatus('success', 'Camera permission granted');
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, cameraPermission: false }));
      showSaveStatus('error', 'Camera permission denied');
    }
  };

  // Music preferences handlers
  const handleUpdatePreferences = async (preferences) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSettings(prev => ({ ...prev, musicPreferences: preferences }));
      localStorage.setItem('moodtunes-settings', JSON.stringify({ ...settings, musicPreferences: preferences }));
      showSaveStatus('success', 'Music preferences updated');
    } catch (error) {
      showSaveStatus('error', 'Failed to update preferences');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Notification handlers
  const handleUpdateNotifications = async (notificationSettings) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setSettings(prev => ({ ...prev, notifications: notificationSettings }));
      localStorage.setItem('moodtunes-settings', JSON.stringify({ ...settings, notifications: notificationSettings }));
      showSaveStatus('success', 'Notification settings updated');
    } catch (error) {
      showSaveStatus('error', 'Failed to update notifications');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mood history handlers
  const handleExportHistory = async (period) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate mood history export
      const historyData = {
        period,
        exportDate: new Date()?.toISOString(),
        totalSessions: 47,
        data: 'Mock mood history data...'
      };
      const dataBlob = new Blob([JSON.stringify(historyData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mood-history-${period}.json`;
      a?.click();
      URL.revokeObjectURL(url);
      showSaveStatus('success', 'Mood history exported');
    } catch (error) {
      showSaveStatus('error', 'Failed to export history');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (period) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSaveStatus('success', `Mood history for ${period} deleted`);
    } catch (error) {
      showSaveStatus('error', 'Failed to delete history');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Advanced settings handlers
  const handleUpdateAdvancedSettings = async (advancedSettings) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      setSettings(prev => ({ ...prev, advanced: advancedSettings }));
      localStorage.setItem('moodtunes-settings', JSON.stringify({ ...settings, advanced: advancedSettings }));
      showSaveStatus('success', 'Advanced settings updated');
    } catch (error) {
      showSaveStatus('error', 'Failed to update advanced settings');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('moodtunes-auth');
    localStorage.removeItem('moodtunes-settings');
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <AccountSection
            user={userData}
            onUpdateProfile={handleUpdateProfile}
            onChangePassword={handleChangePassword}
            onConnectSpotify={handleConnectSpotify}
            spotifyConnected={systemStatus?.spotifyConnected}
          />
        );
      case 'privacy':
        return (
          <PrivacySection
            privacySettings={settings?.privacy}
            onUpdatePrivacySettings={handleUpdatePrivacySettings}
            onDeleteBiometricData={handleDeleteBiometricData}
            onExportData={handleExportData}
            cameraPermission={systemStatus?.cameraPermission}
            onRequestCameraPermission={handleRequestCameraPermission}
          />
        );
      case 'music':
        return (
          <MusicPreferencesSection
            preferences={settings?.musicPreferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'notifications':
        return (
          <NotificationSection
            notificationSettings={settings?.notifications}
            onUpdateNotifications={handleUpdateNotifications}
          />
        );
      case 'history':
        return (
          <MoodHistorySection
            moodHistory={[]}
            onExportHistory={handleExportHistory}
            onDeleteHistory={handleDeleteHistory}
          />
        );
      case 'advanced':
        return (
          <AdvancedSection
            advancedSettings={settings?.advanced}
            onUpdateAdvancedSettings={handleUpdateAdvancedSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        user={userData}
        spotifyConnected={systemStatus?.spotifyConnected}
        cameraPermission={systemStatus?.cameraPermission}
        onLogout={handleLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/mood-input-dashboard')}
              iconName="ArrowLeft"
              iconSize={20}
            />
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account, privacy, and music preferences
          </p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg border ${
            saveStatus?.type === 'success' ?'bg-success/10 border-success/20 text-success' :'bg-destructive/10 border-destructive/20 text-destructive'
          }`}>
            <div className="flex items-center space-x-3">
              <Icon 
                name={saveStatus?.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                size={20} 
              />
              <span className="text-sm font-medium">{saveStatus?.message}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs?.map(tab => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-all duration-200 gesture-aware ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span className="text-sm font-medium">{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;