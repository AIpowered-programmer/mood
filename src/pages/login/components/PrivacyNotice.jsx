import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyNotice = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const privacyPoints = [
    {
      icon: "Camera",
      title: "Facial Recognition",
      description: "We use your camera to detect emotions for music recommendations. Images are processed locally and never stored."
    },
    {
      icon: "Shield",
      title: "Data Protection",
      description: "Your personal data is encrypted and protected according to industry standards. We never share your information."
    },
    {
      icon: "Music",
      title: "Spotify Integration",
      description: "We only access your Spotify data to create playlists and provide recommendations. You control all permissions."
    },
    {
      icon: "Eye",
      title: "Emotion Data",
      description: "Emotion detection data is used only for music matching and is automatically deleted after each session."
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* Privacy Header */}
      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Privacy & Security</h3>
            <p className="text-xs text-muted-foreground">Your data is protected</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
          className="text-xs"
        >
          {isExpanded ? 'Less' : 'More'}
        </Button>
      </div>
      {/* Expanded Privacy Details */}
      {isExpanded && (
        <div className="mt-4 space-y-3 animate-slide-down">
          {privacyPoints?.map((point, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-card/30 rounded-md border border-border/30">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={point?.icon} size={12} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{point?.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{point?.description}</p>
              </div>
            </div>
          ))}
          
          {/* Privacy Policy Link */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our{' '}
              <button className="text-primary hover:text-primary/80 underline transition-colors">
                Privacy Policy
              </button>
              {' '}and{' '}
              <button className="text-primary hover:text-primary/80 underline transition-colors">
                Terms of Service
              </button>
            </p>
          </div>
        </div>
      )}
      {/* Quick Privacy Summary */}
      {!isExpanded && (
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Facial recognition data processed locally • 🎵 Spotify integration optional • 🛡️ No data sharing
          </p>
        </div>
      )}
    </div>
  );
};

export default PrivacyNotice;