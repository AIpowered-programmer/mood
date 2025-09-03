import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlaylistCard = ({ 
  playlist, 
  onPlay, 
  onEdit, 
  onDelete, 
  onExport, 
  onSelect,
  isSelected = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'from-yellow-500 to-orange-500',
      sad: 'from-blue-500 to-indigo-600',
      energetic: 'from-red-500 to-pink-500',
      calm: 'from-green-500 to-teal-500',
      romantic: 'from-pink-500 to-rose-500',
      focused: 'from-purple-500 to-violet-500',
      nostalgic: 'from-amber-500 to-yellow-600',
      angry: 'from-red-600 to-red-700',
      excited: 'from-orange-500 to-red-500',
      melancholic: 'from-gray-500 to-slate-600'
    };
    return moodColors?.[mood?.toLowerCase()] || 'from-primary to-secondary';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div 
      className={`relative bg-card border border-border rounded-lg p-4 transition-all duration-300 gesture-aware ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(playlist?.id, e?.target?.checked)}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
        />
      </div>
      {/* Playlist Artwork Grid */}
      <div className="relative mb-4 mt-2">
        <div className="aspect-square rounded-md overflow-hidden bg-muted">
          {playlist?.tracks && playlist?.tracks?.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 h-full">
              {playlist?.tracks?.slice(0, 4)?.map((track, index) => (
                <div key={index} className="relative overflow-hidden">
                  <Image
                    src={track?.artwork || track?.album?.images?.[0]?.url}
                    alt={track?.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ))}
              {playlist?.tracks?.length < 4 && (
                Array.from({ length: 4 - playlist?.tracks?.length })?.map((_, index) => (
                  <div key={`empty-${index}`} className="bg-muted flex items-center justify-center">
                    <Icon name="Music" size={16} className="text-muted-foreground" />
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="Music" size={32} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Play Button Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
            <Button
              variant="default"
              size="icon"
              onClick={() => onPlay(playlist)}
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
              iconName="Play"
              iconSize={20}
            />
          </div>
        )}

        {/* Mood Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getMoodColor(playlist?.mood)}`}>
          {playlist?.mood}
        </div>
      </div>
      {/* Playlist Info */}
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-foreground truncate" title={playlist?.name}>
            {playlist?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {playlist?.trackCount} tracks • {formatDuration(playlist?.duration)}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {formatDate(playlist?.createdAt)}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{formatDate(playlist?.lastPlayed)}</span>
          </div>
        </div>

        {/* Mood History Indicator */}
        {playlist?.moodHistory && playlist?.moodHistory?.length > 1 && (
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={12} className="text-accent" />
            <span className="text-xs text-accent">
              Mixed from {playlist?.moodHistory?.length} moods
            </span>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(playlist)}
            className="w-8 h-8"
            iconName="Edit"
            iconSize={14}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onExport(playlist)}
            className="w-8 h-8"
            iconName="Share"
            iconSize={14}
          />
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(playlist)}
            className="w-8 h-8 text-destructive hover:text-destructive"
            iconName="Trash2"
            iconSize={14}
          />
        </div>
      </div>
      {/* Export Status */}
      {playlist?.exportedToSpotify && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-2 h-2 bg-success rounded-full" title="Exported to Spotify" />
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;