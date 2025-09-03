import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SpotifyConnection = ({ onConnect, isConnected = false, isLoading = false }) => {
  const [connectionStatus, setConnectionStatus] = useState(isConnected ? 'connected' : 'disconnected');

  const handleSpotifyConnect = async () => {
    try {
      setConnectionStatus('connecting');
      // Simulate Spotify OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus('connected');
      onConnect(true);
    } catch (error) {
      setConnectionStatus('error');
      setTimeout(() => setConnectionStatus('disconnected'), 3000);
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'connecting':
        return { name: 'Loader', color: 'text-warning animate-spin' };
      case 'error':
        return { name: 'AlertCircle', color: 'text-destructive' };
      default:
        return { name: 'Music', color: 'text-muted-foreground' };
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected to Spotify';
      case 'connecting':
        return 'Connecting to Spotify...';
      case 'error':
        return 'Connection failed. Please try again.';
      default:
        return 'Not connected';
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start space-x-4">
        {/* Spotify Logo */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Icon name="Music" size={24} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-card-foreground">
              Connect Spotify Account
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name={statusIcon?.name} size={16} className={statusIcon?.color} />
              <span className={`text-sm font-medium ${
                connectionStatus === 'connected' ? 'text-success' :
                connectionStatus === 'error' ? 'text-destructive' :
                connectionStatus === 'connecting'? 'text-warning' : 'text-muted-foreground'
              }`}>
                {getStatusText()}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Connect your Spotify account to access personalized music recommendations, 
            create mood-based playlists, and sync your music preferences with our emotion detection system.
          </p>

          {/* Features List */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
              <span>Access to 70+ million songs</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
              <span>Create and save mood-based playlists</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
              <span>Personalized recommendations based on your listening history</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
              <span>Seamless music playback and controls</span>
            </div>
          </div>

          {/* Connection Button */}
          {connectionStatus !== 'connected' ? (
            <Button
              onClick={handleSpotifyConnect}
              variant="outline"
              size="default"
              loading={connectionStatus === 'connecting'}
              disabled={connectionStatus === 'connecting'}
              iconName="ExternalLink"
              iconPosition="right"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              {connectionStatus === 'connecting' ? 'Connecting...' : 'Connect with Spotify'}
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-success">
                <Icon name="CheckCircle" size={16} className="mr-2" />
                <span className="font-medium">Successfully connected!</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setConnectionStatus('disconnected');
                  onConnect(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="mt-0.5 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            We only access your Spotify data to provide music recommendations. 
            Your listening history and preferences remain private and are never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotifyConnection;