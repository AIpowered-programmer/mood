import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PlaylistActions = ({ 
  selectedTracks, 
  currentMood,
  onCreatePlaylist, 
  onExportToSpotify, 
  onSaveToFavorites,
  onClearSelection 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const generatePlaylistName = () => {
    const moodNames = {
      happy: 'Happy Vibes',
      sad: 'Melancholy Moments',
      energetic: 'Energy Boost',
      calm: 'Peaceful Mind',
      romantic: 'Love Songs',
      focused: 'Focus Flow',
      nostalgic: 'Memory Lane',
      melancholic: 'Reflective Moods'
    };
    
    const baseName = moodNames?.[currentMood?.toLowerCase()] || 'My Playlist';
    const date = new Date()?.toLocaleDateString();
    return `${baseName} - ${date}`;
  };

  const generatePlaylistDescription = () => {
    return `A personalized playlist based on ${currentMood || 'your'} mood, curated by MoodTunes on ${new Date()?.toLocaleDateString()}.`;
  };

  const handleCreatePlaylist = async () => {
    if (!playlistName?.trim()) return;

    setIsCreating(true);
    try {
      await onCreatePlaylist({
        name: playlistName?.trim(),
        description: playlistDescription?.trim(),
        tracks: selectedTracks,
        mood: currentMood,
        createdAt: new Date()?.toISOString()
      });
      
      setShowCreateForm(false);
      setPlaylistName('');
      setPlaylistDescription('');
    } catch (error) {
      console.error('Failed to create playlist:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleExportToSpotify = async () => {
    setIsExporting(true);
    try {
      await onExportToSpotify(selectedTracks);
    } catch (error) {
      console.error('Failed to export to Spotify:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShowCreateForm = () => {
    setPlaylistName(generatePlaylistName());
    setPlaylistDescription(generatePlaylistDescription());
    setShowCreateForm(true);
  };

  if (selectedTracks?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Icon name="ListMusic" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          No tracks selected
        </h3>
        <p className="text-muted-foreground text-sm">
          Select tracks from the recommendations to create playlists or save to favorites
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Playlist Actions
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear Selection
        </Button>
      </div>
      {/* Selection Summary */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Music" size={16} className="text-primary" />
          <span className="text-sm font-medium text-card-foreground">
            {selectedTracks?.length} track{selectedTracks?.length > 1 ? 's' : ''} selected
          </span>
        </div>
        {currentMood && (
          <div className="text-xs text-muted-foreground">
            Based on <span className="text-primary capitalize">{currentMood}</span> mood
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Create Playlist */}
        <Button
          variant="default"
          onClick={handleShowCreateForm}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="w-full justify-start"
          disabled={showCreateForm}
        >
          Create New Playlist
        </Button>

        {/* Export to Spotify */}
        <Button
          variant="outline"
          onClick={handleExportToSpotify}
          loading={isExporting}
          iconName="ExternalLink"
          iconPosition="left"
          iconSize={16}
          className="w-full justify-start"
        >
          Export to Spotify
        </Button>

        {/* Save to Favorites */}
        <Button
          variant="outline"
          onClick={() => onSaveToFavorites(selectedTracks)}
          iconName="Heart"
          iconPosition="left"
          iconSize={16}
          className="w-full justify-start"
        >
          Save to Favorites
        </Button>
      </div>
      {/* Create Playlist Form */}
      {showCreateForm && (
        <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
          <h4 className="font-medium text-card-foreground">Create New Playlist</h4>
          
          <Input
            label="Playlist Name"
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e?.target?.value)}
            placeholder="Enter playlist name"
            required
            maxLength={100}
          />

          <div>
            <label className="text-sm font-medium text-card-foreground block mb-2">
              Description (optional)
            </label>
            <textarea
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e?.target?.value)}
              placeholder="Describe your playlist..."
              className="w-full p-2 text-sm bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              maxLength={300}
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {playlistDescription?.length}/300
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              onClick={handleCreatePlaylist}
              loading={isCreating}
              iconName="Check"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
              disabled={!playlistName?.trim()}
            >
              Create Playlist
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setShowCreateForm(false)}
              disabled={isCreating}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Total duration: {Math.floor(selectedTracks?.reduce((acc, track) => acc + track?.duration, 0) / 60)} minutes
        </div>
      </div>
    </div>
  );
};

export default PlaylistActions;