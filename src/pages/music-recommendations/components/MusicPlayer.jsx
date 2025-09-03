import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MusicPlayer = ({ 
  currentTrack, 
  isPlaying, 
  onPlay, 
  onPause, 
  onNext, 
  onPrevious,
  onSeek,
  currentTime = 0,
  duration = 0,
  volume = 50,
  onVolumeChange
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [localVolume, setLocalVolume] = useState(volume);

  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e?.target?.value);
    setLocalVolume(newVolume);
    onVolumeChange(newVolume);
  };

  const getVolumeIcon = () => {
    if (localVolume === 0) return 'VolumeX';
    if (localVolume < 50) return 'Volume1';
    return 'Volume2';
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Icon name="Music" size={20} />
            <span className="text-sm">Select a track to start playing</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="w-full bg-muted rounded-full h-1 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-100"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={currentTrack?.albumArt}
                alt={`${currentTrack?.title} album cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-card-foreground truncate">
                {currentTrack?.title}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack?.artist}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-2 mx-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="w-10 h-10"
              iconName="SkipBack"
              iconSize={20}
            />
            
            <Button
              variant="default"
              size="icon"
              onClick={isPlaying ? onPause : onPlay}
              className="w-12 h-12"
              iconName={isPlaying ? "Pause" : "Play"}
              iconSize={24}
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="w-10 h-10"
              iconName="SkipForward"
              iconSize={20}
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="w-10 h-10"
                iconName={getVolumeIcon()}
                iconSize={20}
              />
              
              {showVolumeSlider && (
                <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Volume1" size={16} className="text-muted-foreground" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={localVolume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                    <Icon name="Volume2" size={16} className="text-muted-foreground" />
                  </div>
                  <div className="text-xs text-center text-muted-foreground mt-1">
                    {localVolume}%
                  </div>
                </div>
              )}
            </div>

            {/* Additional Controls */}
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hidden sm:flex"
              iconName="Repeat"
              iconSize={16}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hidden sm:flex"
              iconName="Shuffle"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="sm:hidden mt-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            iconName="SkipBack"
            iconSize={20}
          />
          
          <Button
            variant="default"
            size="icon"
            onClick={isPlaying ? onPause : onPlay}
            className="w-14 h-14"
            iconName={isPlaying ? "Pause" : "Play"}
            iconSize={28}
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            iconName="SkipForward"
            iconSize={20}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;