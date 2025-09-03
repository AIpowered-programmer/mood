import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuth = ({ onSocialLogin }) => {
  const navigate = useNavigate();
  const [isSpotifyLoading, setIsSpotifyLoading] = useState(false);

  const handleSpotifyLogin = async () => {
    setIsSpotifyLoading(true);
    
    try {
      // Mock Spotify authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSpotifyUser = {
        id: 'spotify_user_123',
        name: 'Alex Johnson',
        email: 'alex.johnson@spotify.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        provider: 'spotify',
        spotifyConnected: true
      };

      await onSocialLogin(mockSpotifyUser);
      navigate('/mood-input-dashboard');
    } catch (error) {
      console.error('Spotify login failed:', error);
    } finally {
      setIsSpotifyLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Spotify Login Button */}
      <Button
        variant="outline"
        size="lg"
        onClick={handleSpotifyLogin}
        loading={isSpotifyLoading}
        fullWidth
        className="w-full border-success/20 hover:border-success/40 hover:bg-success/5 transition-all duration-200"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
            <Icon name="Music" size={12} className="text-white" />
          </div>
          <span className="font-medium">Continue with Spotify</span>
        </div>
      </Button>

      {/* Benefits Text */}
      <div className="mt-4 p-3 bg-muted/30 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Why connect Spotify?</p>
            <ul className="space-y-1">
              <li>• Access your personal music library</li>
              <li>• Create mood-based playlists instantly</li>
              <li>• Get personalized recommendations</li>
              <li>• Sync playlists across devices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;