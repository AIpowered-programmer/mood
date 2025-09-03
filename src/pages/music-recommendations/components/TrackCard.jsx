import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrackCard = ({ 
  track, 
  isPlaying, 
  onPlay, 
  onPause, 
  onAddToFavorites, 
  onAddToPlaylist,
  isFavorite = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(track);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:bg-card/80 transition-colors group">
      <div className="flex items-center space-x-4">
        {/* Album Artwork */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={track?.albumArt}
            alt={`${track?.title} album cover`}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Music" size={24} className="text-muted-foreground" />
            </div>
          )}
          
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white"
              iconName={isPlaying ? "Pause" : "Play"}
              iconSize={16}
            />
          </div>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground truncate">
            {track?.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {track?.artist}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {track?.album}
          </p>
        </div>

        {/* Duration */}
        <div className="text-sm text-muted-foreground hidden sm:block">
          {formatDuration(track?.duration)}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddToFavorites(track)}
            className={`w-8 h-8 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
            iconName={isFavorite ? "Heart" : "Heart"}
            iconSize={16}
          />

          {/* Add to Playlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddToPlaylist(track)}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            iconName="Plus"
            iconSize={16}
          />

          {/* More Options */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            iconName="MoreHorizontal"
            iconSize={16}
          />
        </div>
      </div>
      {/* Mobile Duration */}
      <div className="sm:hidden mt-2 text-xs text-muted-foreground">
        Duration: {formatDuration(track?.duration)}
      </div>
      {/* Mood Match Indicator */}
      {track?.moodMatch && (
        <div className="mt-3 flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={12} className="text-primary" />
            <span className="text-xs text-primary font-medium">
              {track?.moodMatch}% mood match
            </span>
          </div>
          <div className="flex-1 bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full"
              style={{ width: `${track?.moodMatch}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackCard;