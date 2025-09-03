import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const MusicPreferencesSection = ({ preferences, onUpdatePreferences }) => {
  const [settings, setSettings] = useState({
    defaultGenres: preferences?.defaultGenres || [],
    explicitContent: preferences?.explicitContent || false,
    recommendationSensitivity: preferences?.recommendationSensitivity || 'medium',
    autoPlayPreview: preferences?.autoPlayPreview || true,
    crossfadeEnabled: preferences?.crossfadeEnabled || false,
    volumeNormalization: preferences?.volumeNormalization || true,
    highQualityAudio: preferences?.highQualityAudio || false,
    discoverWeeklyStyle: preferences?.discoverWeeklyStyle || 'balanced'
  });
  const [loading, setLoading] = useState(false);

  const genres = [
    { id: 'pop', name: 'Pop', icon: 'Music' },
    { id: 'rock', name: 'Rock', icon: 'Zap' },
    { id: 'jazz', name: 'Jazz', icon: 'Music2' },
    { id: 'classical', name: 'Classical', icon: 'Music3' },
    { id: 'electronic', name: 'Electronic', icon: 'Radio' },
    { id: 'hip-hop', name: 'Hip Hop', icon: 'Mic' },
    { id: 'country', name: 'Country', icon: 'Guitar' },
    { id: 'r&b', name: 'R&B', icon: 'Heart' },
    { id: 'indie', name: 'Indie', icon: 'Headphones' },
    { id: 'folk', name: 'Folk', icon: 'Music4' },
    { id: 'reggae', name: 'Reggae', icon: 'Sun' },
    { id: 'blues', name: 'Blues', icon: 'CloudRain' }
  ];

  const sensitivityOptions = [
    { value: 'low', label: 'Conservative', description: 'Stick to familiar music styles' },
    { value: 'medium', label: 'Balanced', description: 'Mix of familiar and new discoveries' },
    { value: 'high', label: 'Adventurous', description: 'Explore diverse and experimental music' }
  ];

  const discoveryStyles = [
    { value: 'mood-focused', label: 'Mood-Focused', description: 'Prioritize emotion-matching tracks' },
    { value: 'balanced', label: 'Balanced', description: 'Mix mood matching with variety' },
    { value: 'discovery-heavy', label: 'Discovery-Heavy', description: 'Emphasize new music exploration' }
  ];

  const handleGenreToggle = (genreId) => {
    setSettings(prev => ({
      ...prev,
      defaultGenres: prev?.defaultGenres?.includes(genreId)
        ? prev?.defaultGenres?.filter(id => id !== genreId)
        : [...prev?.defaultGenres, genreId]
    }));
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      await onUpdatePreferences(settings);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Genre Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Preferred Genres</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your favorite music genres to improve mood-based recommendations
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {genres?.map(genre => (
            <div
              key={genre?.id}
              onClick={() => handleGenreToggle(genre?.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 gesture-aware ${
                settings?.defaultGenres?.includes(genre?.id)
                  ? 'bg-primary/10 border-primary text-primary' :'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={genre?.icon} size={16} />
                <span className="text-sm font-medium">{genre?.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          Selected: {settings?.defaultGenres?.length} genres
        </p>
      </div>
      {/* Content Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Content Settings</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Allow Explicit Content"
            description="Include songs with explicit lyrics in recommendations"
            checked={settings?.explicitContent}
            onChange={(e) => handleSettingChange('explicitContent', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-play Previews"
            description="Automatically play song previews when browsing recommendations"
            checked={settings?.autoPlayPreview}
            onChange={(e) => handleSettingChange('autoPlayPreview', e?.target?.checked)}
          />

          <Checkbox
            label="Enable Crossfade"
            description="Smooth transitions between songs during playback"
            checked={settings?.crossfadeEnabled}
            onChange={(e) => handleSettingChange('crossfadeEnabled', e?.target?.checked)}
          />

          <Checkbox
            label="Volume Normalization"
            description="Maintain consistent volume levels across different tracks"
            checked={settings?.volumeNormalization}
            onChange={(e) => handleSettingChange('volumeNormalization', e?.target?.checked)}
          />

          <Checkbox
            label="High Quality Audio"
            description="Stream music at higher bitrates (requires premium Spotify)"
            checked={settings?.highQualityAudio}
            onChange={(e) => handleSettingChange('highQualityAudio', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Recommendation Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recommendation Algorithm</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">
              Recommendation Sensitivity
            </label>
            <div className="space-y-3">
              {sensitivityOptions?.map(option => (
                <div
                  key={option?.value}
                  onClick={() => handleSettingChange('recommendationSensitivity', option?.value)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 gesture-aware ${
                    settings?.recommendationSensitivity === option?.value
                      ? 'bg-primary/10 border-primary' :'bg-muted/50 border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      settings?.recommendationSensitivity === option?.value
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                    }`}>
                      {settings?.recommendationSensitivity === option?.value && (
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

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">
              Discovery Style
            </label>
            <div className="space-y-3">
              {discoveryStyles?.map(style => (
                <div
                  key={style?.value}
                  onClick={() => handleSettingChange('discoverWeeklyStyle', style?.value)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 gesture-aware ${
                    settings?.discoverWeeklyStyle === style?.value
                      ? 'bg-secondary/10 border-secondary' :'bg-muted/50 border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      settings?.discoverWeeklyStyle === style?.value
                        ? 'border-secondary bg-secondary' :'border-muted-foreground'
                    }`}>
                      {settings?.discoverWeeklyStyle === style?.value && (
                        <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{style?.label}</p>
                      <p className="text-xs text-muted-foreground">{style?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mood Matching Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Mood Matching</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">Emotion Accuracy</span>
              <span className="text-sm text-primary">85%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on your recent mood detection sessions
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-md text-center">
              <p className="text-2xl font-bold text-primary">247</p>
              <p className="text-xs text-muted-foreground">Songs Discovered</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-md text-center">
              <p className="text-2xl font-bold text-secondary">18</p>
              <p className="text-xs text-muted-foreground">Playlists Created</p>
            </div>
          </div>
        </div>
      </div>
      {/* Save Settings */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSavePreferences}
          loading={loading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save Music Preferences
        </Button>
      </div>
    </div>
  );
};

export default MusicPreferencesSection;