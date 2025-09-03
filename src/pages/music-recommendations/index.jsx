import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MoodSummaryPanel from './components/MoodSummaryPanel';
import TrackCard from './components/TrackCard';
import MusicPlayer from './components/MusicPlayer';
import GenreFilter from './components/GenreFilter';
import FeedbackSystem from './components/FeedbackSystem';
import PlaylistActions from './components/PlaylistActions';

const MusicRecommendations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State from mood detection
  const [currentMood, setCurrentMood] = useState(location?.state?.mood || 'happy');
  const [confidenceScore, setConfidenceScore] = useState(location?.state?.confidence || 85);
  const [detectionMethod, setDetectionMethod] = useState(location?.state?.method || 'facial');
  
  // Music state
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  
  // Filter and selection state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});
  
  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: 'track-1',
      title: 'Sunshine State of Mind',
      artist: 'The Happy Collective',
      album: 'Positive Vibes',
      duration: 245,
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      moodMatch: 95,
      genres: ['pop', 'dance'],
      previewUrl: 'https://example.com/preview1.mp3'
    },
    {
      id: 'track-2',
      title: 'Electric Dreams',
      artist: 'Neon Nights',
      album: 'Digital Emotions',
      duration: 198,
      albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
      moodMatch: 88,
      genres: ['electronic', 'dance'],
      previewUrl: 'https://example.com/preview2.mp3'
    },
    {
      id: 'track-3',
      title: 'Feel Good Anthem',
      artist: 'Upbeat Orchestra',
      album: 'Mood Lifters',
      duration: 267,
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      moodMatch: 92,
      genres: ['pop', 'funk'],
      previewUrl: 'https://example.com/preview3.mp3'
    },
    {
      id: 'track-4',
      title: 'Joyful Journey',
      artist: 'Melody Makers',
      album: 'Happy Trails',
      duration: 223,
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
      moodMatch: 90,
      genres: ['indie', 'pop'],
      previewUrl: 'https://example.com/preview4.mp3'
    },
    {
      id: 'track-5',
      title: 'Bright Side',
      artist: 'Optimistic Souls',
      album: 'Silver Linings',
      duration: 189,
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      moodMatch: 87,
      genres: ['acoustic', 'folk'],
      previewUrl: 'https://example.com/preview5.mp3'
    },
    {
      id: 'track-6',
      title: 'Dancing in the Light',
      artist: 'Rhythm & Joy',
      album: 'Celebration',
      duration: 234,
      albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
      moodMatch: 94,
      genres: ['dance', 'reggae'],
      previewUrl: 'https://example.com/preview6.mp3'
    }
  ];

  // Initialize recommendations based on mood
  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter recommendations based on mood
      const moodBasedRecommendations = mockRecommendations?.map(track => ({
        ...track,
        moodMatch: Math.max(70, Math.floor(Math.random() * 30) + 70)
      }));
      
      setRecommendations(moodBasedRecommendations);
      setFilteredRecommendations(moodBasedRecommendations);
      setIsLoading(false);
    };

    loadRecommendations();
  }, [currentMood]);

  // Filter recommendations by genre
  useEffect(() => {
    if (selectedGenres?.length === 0) {
      setFilteredRecommendations(recommendations);
    } else {
      const filtered = recommendations?.filter(track =>
        track?.genres?.some(genre => selectedGenres?.includes(genre))
      );
      setFilteredRecommendations(filtered);
    }
  }, [selectedGenres, recommendations]);

  // Music player functions
  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
    
    const trackIndex = filteredRecommendations?.findIndex(t => t?.id === track?.id);
    setCurrentTrackIndex(trackIndex);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % filteredRecommendations?.length;
    const nextTrack = filteredRecommendations?.[nextIndex];
    handlePlay(nextTrack);
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex === 0 
      ? filteredRecommendations?.length - 1 
      : currentTrackIndex - 1;
    const prevTrack = filteredRecommendations?.[prevIndex];
    handlePlay(prevTrack);
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  // Track selection functions
  const handleTrackSelection = (track) => {
    const isSelected = selectedTracks?.some(t => t?.id === track?.id);
    if (isSelected) {
      setSelectedTracks(prev => prev?.filter(t => t?.id !== track?.id));
    } else {
      setSelectedTracks(prev => [...prev, track]);
    }
  };

  const handleAddToFavorites = (track) => {
    const isFavorite = favorites?.some(t => t?.id === track?.id);
    if (isFavorite) {
      setFavorites(prev => prev?.filter(t => t?.id !== track?.id));
    } else {
      setFavorites(prev => [...prev, track]);
    }
  };

  const handleAddToPlaylist = (track) => {
    handleTrackSelection(track);
  };

  // Genre filter functions
  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => 
      prev?.includes(genreId)
        ? prev?.filter(g => g !== genreId)
        : [...prev, genreId]
    );
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
  };

  // Feedback functions
  const handleFeedback = async (feedbackData) => {
    setFeedbackData(prev => ({
      ...prev,
      [feedbackData?.trackId]: feedbackData
    }));
    
    // Simulate API call
    console.log('Feedback submitted:', feedbackData);
  };

  // Playlist functions
  const handleCreatePlaylist = async (playlistData) => {
    console.log('Creating playlist:', playlistData);
    // Simulate playlist creation
    navigate('/playlist-management', { 
      state: { 
        newPlaylist: playlistData,
        message: 'Playlist created successfully!' 
      }
    });
  };

  const handleExportToSpotify = async (tracks) => {
    console.log('Exporting to Spotify:', tracks);
    // Simulate Spotify export
    alert('Playlist exported to Spotify successfully!');
  };

  const handleSaveToFavorites = (tracks) => {
    const newFavorites = tracks?.filter(track => 
      !favorites?.some(fav => fav?.id === track?.id)
    );
    setFavorites(prev => [...prev, ...newFavorites]);
    setSelectedTracks([]);
  };

  const handleClearSelection = () => {
    setSelectedTracks([]);
  };

  // Navigation functions
  const handleChangeMood = () => {
    navigate('/mood-input-dashboard');
  };

  // Simulate music playback progress
  useEffect(() => {
    let interval;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= currentTrack?.duration) {
            handleNext();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={true}
        user={{ name: 'Alex Johnson', email: 'alex@example.com' }}
        spotifyConnected={true}
        cameraPermission={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <button 
              onClick={() => navigate('/mood-input-dashboard')}
              className="hover:text-primary transition-colors"
            >
              Mood Detection
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Music Recommendations</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Your Music Recommendations
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover music that matches your current mood and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mood Summary */}
            <MoodSummaryPanel
              currentMood={currentMood}
              confidenceScore={confidenceScore}
              detectionMethod={detectionMethod}
              onChangeMood={handleChangeMood}
            />

            {/* Genre Filter */}
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              currentMood={currentMood}
              onClearFilters={handleClearFilters}
            />

            {/* Playlist Actions */}
            <PlaylistActions
              selectedTracks={selectedTracks}
              currentMood={currentMood}
              onCreatePlaylist={handleCreatePlaylist}
              onExportToSpotify={handleExportToSpotify}
              onSaveToFavorites={handleSaveToFavorites}
              onClearSelection={handleClearSelection}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Recommended Tracks
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredRecommendations?.length} tracks found
                  {selectedGenres?.length > 0 && ` • Filtered by ${selectedGenres?.length} genre${selectedGenres?.length > 1 ? 's' : ''}`}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFeedback(!showFeedback)}
                  iconName="MessageSquare"
                  iconPosition="left"
                  iconSize={14}
                >
                  Feedback
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={14}
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5]?.map(i => (
                  <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                        <div className="h-3 bg-muted rounded w-1/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Track List */}
            {!isLoading && (
              <div className="space-y-4">
                {filteredRecommendations?.map((track, index) => (
                  <div key={track?.id} className="relative">
                    <div className="flex items-center space-x-3">
                      {/* Selection Checkbox */}
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedTracks?.some(t => t?.id === track?.id)}
                          onChange={() => handleTrackSelection(track)}
                          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>

                      {/* Track Card */}
                      <div className="flex-1">
                        <TrackCard
                          track={track}
                          isPlaying={isPlaying && currentTrack?.id === track?.id}
                          onPlay={handlePlay}
                          onPause={handlePause}
                          onAddToFavorites={handleAddToFavorites}
                          onAddToPlaylist={handleAddToPlaylist}
                          isFavorite={favorites?.some(t => t?.id === track?.id)}
                        />
                      </div>
                    </div>

                    {/* Feedback Section */}
                    {showFeedback && (
                      <div className="mt-4 ml-7">
                        <FeedbackSystem
                          track={track}
                          onFeedback={handleFeedback}
                          existingFeedback={feedbackData?.[track?.id]}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty State */}
                {filteredRecommendations?.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <Icon name="Music" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No tracks found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your genre filters or change your mood selection
                    </p>
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        iconName="X"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Clear Filters
                      </Button>
                      <Button
                        variant="default"
                        onClick={handleChangeMood}
                        iconName="RotateCcw"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Change Mood
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={handlePause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        currentTime={currentTime}
        duration={currentTrack?.duration || 0}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
      {/* Bottom Padding for Player */}
      <div className="h-32" />
    </div>
  );
};

export default MusicRecommendations;