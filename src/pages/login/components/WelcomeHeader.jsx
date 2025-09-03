import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center emotion-pulse shadow-lg">
            <Icon name="Music" size={32} className="text-primary-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to MoodTunes
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Discover music that matches your emotions through AI-powered mood detection
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Camera" size={16} className="text-primary" />
          <span>Facial Recognition</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={16} className="text-secondary" />
          <span>Mood Analysis</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Music" size={16} className="text-accent" />
          <span>Smart Playlists</span>
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-success/10 border border-success/20 rounded-full">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        <span className="text-xs text-success font-medium">Service Online</span>
      </div>
    </div>
  );
};

export default WelcomeHeader;