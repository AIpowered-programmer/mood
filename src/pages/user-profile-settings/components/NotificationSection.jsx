import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const NotificationSection = ({ notificationSettings, onUpdateNotifications }) => {
  const [settings, setSettings] = useState({
    emailNotifications: notificationSettings?.emailNotifications || true,
    pushNotifications: notificationSettings?.pushNotifications || false,
    weeklyRecommendations: notificationSettings?.weeklyRecommendations || true,
    newPlaylistAlerts: notificationSettings?.newPlaylistAlerts || true,
    moodTrendUpdates: notificationSettings?.moodTrendUpdates || false,
    spotifyIntegrationAlerts: notificationSettings?.spotifyIntegrationAlerts || true,
    securityAlerts: notificationSettings?.securityAlerts || true,
    marketingEmails: notificationSettings?.marketingEmails || false,
    notificationFrequency: notificationSettings?.notificationFrequency || 'weekly',
    quietHoursEnabled: notificationSettings?.quietHoursEnabled || false,
    quietHoursStart: notificationSettings?.quietHoursStart || '22:00',
    quietHoursEnd: notificationSettings?.quietHoursEnd || '08:00'
  });
  const [loading, setLoading] = useState(false);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await onUpdateNotifications(settings);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
    { value: 'daily', label: 'Daily Digest', description: 'Once per day summary' },
    { value: 'weekly', label: 'Weekly Summary', description: 'Weekly roundup of activity' },
    { value: 'monthly', label: 'Monthly Report', description: 'Monthly insights and trends' }
  ];

  return (
    <div className="space-y-6">
      {/* General Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">General Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings?.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-secondary" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Browser notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings?.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e?.target?.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </div>
      {/* Content Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Content & Recommendations</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Weekly Music Recommendations"
            description="Get personalized music suggestions based on your mood patterns"
            checked={settings?.weeklyRecommendations}
            onChange={(e) => handleSettingChange('weeklyRecommendations', e?.target?.checked)}
            disabled={!settings?.emailNotifications}
          />

          <Checkbox
            label="New Playlist Alerts"
            description="Notify when new mood-based playlists are created"
            checked={settings?.newPlaylistAlerts}
            onChange={(e) => handleSettingChange('newPlaylistAlerts', e?.target?.checked)}
            disabled={!settings?.emailNotifications}
          />

          <Checkbox
            label="Mood Trend Updates"
            description="Monthly insights about your emotional patterns and music preferences"
            checked={settings?.moodTrendUpdates}
            onChange={(e) => handleSettingChange('moodTrendUpdates', e?.target?.checked)}
            disabled={!settings?.emailNotifications}
          />

          <Checkbox
            label="Spotify Integration Alerts"
            description="Updates about playlist exports and Spotify account status"
            checked={settings?.spotifyIntegrationAlerts}
            onChange={(e) => handleSettingChange('spotifyIntegrationAlerts', e?.target?.checked)}
            disabled={!settings?.emailNotifications}
          />
        </div>
      </div>
      {/* Security & Account */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Security & Account</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Security Alerts"
            description="Important notifications about account security and login attempts"
            checked={settings?.securityAlerts}
            onChange={(e) => handleSettingChange('securityAlerts', e?.target?.checked)}
          />

          <Checkbox
            label="Marketing Communications"
            description="Updates about new features, tips, and promotional content"
            checked={settings?.marketingEmails}
            onChange={(e) => handleSettingChange('marketingEmails', e?.target?.checked)}
            disabled={!settings?.emailNotifications}
          />
        </div>
      </div>
      {/* Notification Frequency */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Notification Frequency</h3>
        
        <div className="space-y-3">
          {frequencyOptions?.map(option => (
            <div
              key={option?.value}
              onClick={() => handleSettingChange('notificationFrequency', option?.value)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 gesture-aware ${
                settings?.notificationFrequency === option?.value
                  ? 'bg-primary/10 border-primary' :'bg-muted/50 border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  settings?.notificationFrequency === option?.value
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {settings?.notificationFrequency === option?.value && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{option?.label}</p>
                  <p className="text-xs text-muted-foreground">{option?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quiet Hours */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Quiet Hours</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Quiet Hours"
            description="Pause non-urgent notifications during specified hours"
            checked={settings?.quietHoursEnabled}
            onChange={(e) => handleSettingChange('quietHoursEnabled', e?.target?.checked)}
          />

          {settings?.quietHoursEnabled && (
            <div className="ml-6 space-y-4 p-4 bg-muted/50 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={settings?.quietHoursStart}
                    onChange={(e) => handleSettingChange('quietHoursStart', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={settings?.quietHoursEnd}
                    onChange={(e) => handleSettingChange('quietHoursEnd', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Security alerts will still be delivered during quiet hours
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Notification Preview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Preview</h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
            <div className="flex items-start space-x-3">
              <Icon name="Music" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">Weekly Recommendations Ready!</p>
                <p className="text-xs text-muted-foreground">
                  We've found 15 new songs that match your recent happy mood patterns.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-md">
            <div className="flex items-start space-x-3">
              <Icon name="ListMusic" size={16} className="text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-secondary">Playlist Exported to Spotify</p>
                <p className="text-xs text-muted-foreground">
                  Your "Energetic Morning" playlist has been successfully added to your Spotify library.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Save Settings */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSaveNotifications}
          loading={loading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSection;