import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuickRecommendations = ({ detectedEmotion, onNavigateToRecommendations }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock music recommendations based on emotion
  const mockRecommendations = {
    happy: [
      {
        id: 1,
        title: "Good as Hell",
        artist: "Lizzo",
        album: "Cuz I Love You",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        duration: "2:39",
        genre: "Pop",
        matchScore: 0.95
      },
      {
        id: 2,
        title: "Can\'t Stop the Feeling!",
        artist: "Justin Timberlake",
        album: "Trolls Soundtrack",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        duration: "3:56",
        genre: "Pop",
        matchScore: 0.92
      }
    ],
    calm: [
      {
        id: 3,
        title: "Weightless",
        artist: "Marconi Union",
        album: "Ambient Works",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
        duration: "8:10",
        genre: "Ambient",
        matchScore: 0.98
      },
      {
        id: 4,
        title: "River",
        artist: "Leon Bridges",
        album: "Coming Home",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        duration: "4:12",
        genre: "Soul",
        matchScore: 0.89
      }
    ],
    energetic: [
      {
        id: 5,
        title: "Thunder",
        artist: "Imagine Dragons",
        album: "Evolve",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        duration: "3:07",
        genre: "Rock",
        matchScore: 0.94
      },
      {
        id: 6,
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        duration: "4:30",
        genre: "Funk",
        matchScore: 0.91
      }
    ],
    romantic: [
      {
        id: 7,
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        duration: "4:23",
        genre: "Pop",
        matchScore: 0.96
      },
      {
        id: 8,
        title: "All of Me",
        artist: "John Legend",
        album: "Love in the Future",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
        duration: "4:29",
        genre: "R&B",
        matchScore: 0.93
      }
    ],
    melancholy: [
      {
        id: 9,
        title: "Mad World",
        artist: "Gary Jules",
        album: "Trading Snakeoil for Wolftickets",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        duration: "3:07",
        genre: "Alternative",
        matchScore: 0.97
      },
      {
        id: 10,
        title: "Hurt",
        artist: "Johnny Cash",
        album: "American IV: The Man Comes Around",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        duration: "3:38",
        genre: "Country",
        matchScore: 0.94
      }
    ]
  };

  useEffect(() => {
    if (detectedEmotion) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const emotionKey = detectedEmotion?.emotion?.toLowerCase();
        const tracks = mockRecommendations?.[emotionKey] || mockRecommendations?.happy;
        setRecommendations(tracks);
        setIsLoading(false);
      }, 1500);
    }
  }, [detectedEmotion]);

  if (!detectedEmotion) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Music" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Ready for Music Discovery
          </h3>
          <p className="text-sm text-muted-foreground">
            Select your mood using any method above to get personalized recommendations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
            <Icon name="Music" size={20} className="text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Quick Recommendations</h3>
            <p className="text-sm text-muted-foreground capitalize">
              Based on your {detectedEmotion?.emotion} mood
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs font-medium text-success">Live Match</span>
        </div>
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2]?.map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg animate-pulse">
              <div className="w-12 h-12 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="w-8 h-8 bg-muted rounded-full" />
            </div>
          ))}
        </div>
      )}
      {/* Recommendations List */}
      {!isLoading && recommendations?.length > 0 && (
        <div className="space-y-3">
          {recommendations?.map((track) => (
            <div key={track?.id} className="flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors group">
              <div className="relative">
                <Image
                  src={track?.image}
                  alt={`${track?.title} album cover`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon name="Play" size={16} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {track?.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {track?.artist} • {track?.genre}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={10} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{track?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={10} className="text-success" />
                    <span className="text-xs text-success">
                      {Math.round(track?.matchScore * 100)}% match
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="Heart" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="MoreVertical" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Action Buttons */}
      {!isLoading && recommendations?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="default"
              onClick={onNavigateToRecommendations}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={14}
              className="flex-1"
            >
              View All Recommendations
            </Button>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Create Playlist
            </Button>
          </div>
        </div>
      )}
      {/* Mood Match Indicator */}
      {detectedEmotion && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Mood Analysis</span>
            <span className="text-xs text-muted-foreground">
              {Math.round(detectedEmotion?.confidence * 100)}% confidence
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-foreground capitalize">
              {detectedEmotion?.emotion}
            </span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${detectedEmotion?.confidence * 100}%` }}
              />
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Detected via {detectedEmotion?.method} • {recommendations?.length} tracks matched
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickRecommendations;