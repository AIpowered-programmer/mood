import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CameraEmotionCard from './components/CameraEmotionCard';
import TextMoodCard from './components/TextMoodCard';
import EmojiMoodCard from './components/EmojiMoodCard';
import SessionMoodTracker from './components/SessionMoodTracker';
import QuickRecommendations from './components/QuickRecommendations';

const MoodInputDashboard = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState(null);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  });
  const [spotifyConnected, setSpotifyConnected] = useState(true);
  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    // Check camera permission on component mount
    navigator.mediaDevices?.getUserMedia({ video: true })?.then(() => setCameraPermission(true))?.catch(() => setCameraPermission(false));
  }, []);

  const handleEmotionDetected = (emotionData) => {
    setCurrentEmotion(emotionData);
    setEmotionHistory(prev => [emotionData, ...prev?.slice(0, 9)]); // Keep last 10 entries
    
    // Auto-scroll to recommendations on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.getElementById('recommendations-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 500);
    }
  };

  const handleMethodActivate = (method) => {
    setActiveMethod(method);
  };

  const handleNavigateToRecommendations = () => {
    navigate('/music-recommendations', { 
      state: { 
        emotion: currentEmotion,
        history: emotionHistory 
      } 
    });
  };

  const handleLogout = () => {
    // Clear session data
    setCurrentEmotion(null);
    setEmotionHistory([]);
    setActiveMethod(null);
    navigate('/login');
  };

  const handleConnectSpotify = () => {
    // Mock Spotify connection
    setSpotifyConnected(true);
    // In real app, this would redirect to Spotify OAuth
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        user={user}
        spotifyConnected={spotifyConnected}
        cameraPermission={cameraPermission}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name?.split(' ')?.[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                How are you feeling today? Choose your preferred method to discover music that matches your mood.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{emotionHistory?.length}</p>
                <p className="text-xs text-muted-foreground">Moods Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">
                  {currentEmotion ? Math.round(currentEmotion?.confidence * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">Confidence</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">
                  {spotifyConnected ? '✓' : '✗'}
                </p>
                <p className="text-xs text-muted-foreground">Spotify</p>
              </div>
            </div>
          </div>

          {/* Spotify Connection Alert */}
          {!spotifyConnected && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-warning mb-1">
                    Connect Spotify for Better Recommendations
                  </h3>
                  <p className="text-xs text-warning/80 mb-3">
                    Link your Spotify account to get personalized music recommendations and create playlists directly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleConnectSpotify}
                    iconName="Music"
                    iconPosition="left"
                    iconSize={14}
                    className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  >
                    Connect Spotify
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Emotion Input Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
              {/* Camera Emotion Detection */}
              <CameraEmotionCard
                onEmotionDetected={handleEmotionDetected}
                isActive={activeMethod === 'camera'}
                onActivate={() => handleMethodActivate('camera')}
              />

              {/* Text Mood Analysis */}
              <TextMoodCard
                onEmotionDetected={handleEmotionDetected}
                isActive={activeMethod === 'text'}
                onActivate={() => handleMethodActivate('text')}
              />

              {/* Emoji Selection */}
              <EmojiMoodCard
                onEmotionDetected={handleEmotionDetected}
                isActive={activeMethod === 'emoji'}
                onActivate={() => handleMethodActivate('emoji')}
              />
            </div>

            {/* Mobile Quick Recommendations */}
            <div className="lg:hidden" id="recommendations-section">
              <QuickRecommendations
                detectedEmotion={currentEmotion}
                onNavigateToRecommendations={handleNavigateToRecommendations}
              />
            </div>
          </div>

          {/* Right Column - Session Tracker & Recommendations */}
          <div className="space-y-6">
            {/* Session Mood Tracker */}
            <SessionMoodTracker
              currentEmotion={currentEmotion}
              emotionHistory={emotionHistory}
            />

            {/* Desktop Quick Recommendations */}
            <div className="hidden lg:block">
              <QuickRecommendations
                detectedEmotion={currentEmotion}
                onNavigateToRecommendations={handleNavigateToRecommendations}
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        {currentEmotion && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 lg:hidden">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {currentEmotion?.emoji || '🎵'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {currentEmotion?.emotion} detected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(currentEmotion?.confidence * 100)}% confidence
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="default"
                  onClick={handleNavigateToRecommendations}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Find Music
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Spacer for mobile bottom bar */}
        {currentEmotion && <div className="h-20 lg:hidden" />}
      </main>
    </div>
  );
};

export default MoodInputDashboard;