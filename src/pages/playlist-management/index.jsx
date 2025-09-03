import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import PlaylistCard from './components/PlaylistCard';
import PlaylistEditor from './components/PlaylistEditor';
import MoodHistoryPanel from './components/MoodHistoryPanel';
import ExportModal from './components/ExportModal';
import PlaylistStats from './components/PlaylistStats';

const PlaylistManagement = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterMood, setFilterMood] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showStats, setShowStats] = useState(false);
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [exportingPlaylist, setExportingPlaylist] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockPlaylists = [
    {
      id: 1,
      name: "Happy Vibes Collection",
      mood: "happy",
      trackCount: 25,
      duration: 5400,
      createdAt: "2025-01-15T10:30:00Z",
      lastPlayed: "2025-01-20T14:20:00Z",
      exportedToSpotify: true,
      moodHistory: ["happy", "excited"],
      tracks: [
        {
          id: 1,
          name: "Good as Hell",
          artist: "Lizzo",
          album: "Cuz I Love You",
          duration: 219,
          artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Uptown Funk",
          artist: "Mark Ronson ft. Bruno Mars",
          album: "Uptown Special",
          duration: 270,
          artwork: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: 2,
      name: "Calm Evening Sounds",
      mood: "calm",
      trackCount: 18,
      duration: 3960,
      createdAt: "2025-01-10T18:45:00Z",
      lastPlayed: "2025-01-18T20:15:00Z",
      exportedToSpotify: false,
      moodHistory: ["calm", "peaceful"],
      tracks: [
        {
          id: 3,
          name: "Weightless",
          artist: "Marconi Union",
          album: "Ambient Works",
          duration: 485,
          artwork: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: 3,
      name: "Energetic Workout Mix",
      mood: "energetic",
      trackCount: 32,
      duration: 7200,
      createdAt: "2025-01-08T07:00:00Z",
      lastPlayed: "2025-01-19T06:30:00Z",
      exportedToSpotify: true,
      moodHistory: ["energetic", "motivated"],
      tracks: [
        {
          id: 4,
          name: "Thunder",
          artist: "Imagine Dragons",
          album: "Evolve",
          duration: 187,
          artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: 4,
      name: "Romantic Dinner Playlist",
      mood: "romantic",
      trackCount: 15,
      duration: 3300,
      createdAt: "2025-01-05T19:30:00Z",
      lastPlayed: "2025-01-14T19:45:00Z",
      exportedToSpotify: false,
      moodHistory: ["romantic", "intimate"],
      tracks: [
        {
          id: 5,
          name: "Perfect",
          artist: "Ed Sheeran",
          album: "÷ (Divide)",
          duration: 263,
          artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: 5,
      name: "Focus & Study Sessions",
      mood: "focused",
      trackCount: 28,
      duration: 6120,
      createdAt: "2025-01-03T09:15:00Z",
      lastPlayed: "2025-01-21T10:00:00Z",
      exportedToSpotify: true,
      moodHistory: ["focused", "concentrated"],
      tracks: [
        {
          id: 6,
          name: "Ludovico Einaudi - Nuvole Bianche",
          artist: "Ludovico Einaudi",
          album: "Una Mattina",
          duration: 344,
          artwork: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: 6,
      name: "Melancholic Reflections",
      mood: "melancholic",
      trackCount: 22,
      duration: 4680,
      createdAt: "2024-12-28T16:20:00Z",
      lastPlayed: "2025-01-12T21:30:00Z",
      exportedToSpotify: false,
      moodHistory: ["melancholic", "reflective"],
      tracks: [
        {
          id: 7,
          name: "Mad World",
          artist: "Gary Jules",
          album: "Trading Snakeoil for Wolftickets",
          duration: 192,
          artwork: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop"
        }
      ]
    }
  ];

  const mockMoodHistory = [
    {
      id: 1,
      mood: "happy",
      method: "Facial Recognition",
      timestamp: "2025-01-21T14:30:00Z",
      confidence: 92,
      description: "Detected bright smile and positive facial expressions",
      playlistsGenerated: 1,
      relatedPlaylists: [{ id: 1, name: "Happy Vibes Collection", trackCount: 25 }]
    },
    {
      id: 2,
      mood: "calm",
      method: "Text Input",
      timestamp: "2025-01-20T20:15:00Z",
      confidence: 88,
      description: "User described feeling peaceful and relaxed after meditation",
      playlistsGenerated: 1,
      relatedPlaylists: [{ id: 2, name: "Calm Evening Sounds", trackCount: 18 }]
    },
    {
      id: 3,
      mood: "energetic",
      method: "Emoji Selection",
      timestamp: "2025-01-19T06:30:00Z",
      confidence: 95,
      description: "Selected high-energy emojis indicating workout motivation",
      playlistsGenerated: 1,
      relatedPlaylists: [{ id: 3, name: "Energetic Workout Mix", trackCount: 32 }]
    },
    {
      id: 4,
      mood: "focused",
      method: "Facial Recognition",
      timestamp: "2025-01-18T10:00:00Z",
      confidence: 85,
      description: "Detected concentrated expression during work session",
      playlistsGenerated: 1,
      relatedPlaylists: [{ id: 5, name: "Focus & Study Sessions", trackCount: 28 }]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPlaylists(mockPlaylists);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort playlists
  const filteredPlaylists = playlists?.filter(playlist => {
    const matchesSearch = playlist?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         playlist?.mood?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesMood = filterMood === 'all' || playlist?.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const sortedPlaylists = [...filteredPlaylists]?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'tracks':
        return b?.trackCount - a?.trackCount;
      case 'duration':
        return b?.duration - a?.duration;
      default:
        return 0;
    }
  });

  const handlePlaylistSelect = (playlistId, isSelected) => {
    if (isSelected) {
      setSelectedPlaylists([...selectedPlaylists, playlistId]);
    } else {
      setSelectedPlaylists(selectedPlaylists?.filter(id => id !== playlistId));
    }
  };

  const handleSelectAll = () => {
    if (selectedPlaylists?.length === filteredPlaylists?.length) {
      setSelectedPlaylists([]);
    } else {
      setSelectedPlaylists(filteredPlaylists?.map(p => p?.id));
    }
  };

  const handlePlayPlaylist = (playlist) => {
    console.log('Playing playlist:', playlist?.name);
    // Navigate to music player or trigger play functionality
  };

  const handleEditPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
  };

  const handleDeletePlaylist = (playlist) => {
    if (window.confirm(`Are you sure you want to delete "${playlist?.name}"?`)) {
      setPlaylists(playlists?.filter(p => p?.id !== playlist?.id));
      setSelectedPlaylists(selectedPlaylists?.filter(id => id !== playlist?.id));
    }
  };

  const handleExportPlaylist = (playlist) => {
    setExportingPlaylist(playlist);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedPlaylists?.length} playlists?`)) {
      setPlaylists(playlists?.filter(p => !selectedPlaylists?.includes(p?.id)));
      setSelectedPlaylists([]);
    }
  };

  const handleBulkExport = () => {
    const playlistsToExport = playlists?.filter(p => selectedPlaylists?.includes(p?.id));
    console.log('Bulk exporting playlists:', playlistsToExport);
    // Implement bulk export logic
  };

  const handleSavePlaylist = (updatedPlaylist) => {
    setPlaylists(playlists?.map(p => 
      p?.id === updatedPlaylist?.id ? updatedPlaylist : p
    ));
    setEditingPlaylist(null);
  };

  const handleTrackReorder = (trackId, newIndex) => {
    console.log('Reordering track:', trackId, 'to index:', newIndex);
    // Implement track reordering logic
  };

  const handleTrackRemove = (trackIds) => {
    console.log('Removing tracks:', trackIds);
    // Implement track removal logic
  };

  const handleExportComplete = (exportData) => {
    console.log('Export completed:', exportData);
    // Update playlist export status
    if (exportData?.options?.spotify) {
      setPlaylists(playlists?.map(p => 
        p?.id === exportData?.playlist?.id 
          ? { ...p, exportedToSpotify: true }
          : p
      ));
    }
    setExportingPlaylist(null);
  };

  const handleMoodSelect = (moodEntry) => {
    setSelectedMood(moodEntry);
  };

  const handleCreatePlaylistFromMood = (moodEntry) => {
    console.log('Creating playlist from mood:', moodEntry);
    navigate('/music-recommendations', { 
      state: { mood: moodEntry?.mood, method: moodEntry?.method }
    });
  };

  const sortOptions = [
    { value: 'recent', label: 'Recently Created' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'tracks', label: 'Track Count' },
    { value: 'duration', label: 'Duration' }
  ];

  const moodOptions = [
    { value: 'all', label: 'All Moods' },
    { value: 'happy', label: 'Happy' },
    { value: 'sad', label: 'Sad' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'calm', label: 'Calm' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'focused', label: 'Focused' },
    { value: 'nostalgic', label: 'Nostalgic' },
    { value: 'melancholic', label: 'Melancholic' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your playlists...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Playlists</h1>
            <p className="text-muted-foreground">
              Manage your mood-based music collections
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowStats(!showStats)}
              iconName="BarChart3"
              iconPosition="left"
              iconSize={16}
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowMoodHistory(!showMoodHistory)}
              iconName="History"
              iconPosition="left"
              iconSize={16}
            >
              Mood History
            </Button>
            <Button
              variant="default"
              onClick={() => navigate('/mood-input-dashboard')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Create Playlist
            </Button>
          </div>
        </div>

        {/* Stats Panel */}
        {showStats && (
          <div className="mb-8">
            <PlaylistStats playlists={playlists} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className={`${showMoodHistory ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Input
                  type="search"
                  placeholder="Search playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64"
                />
                <Select
                  options={moodOptions}
                  value={filterMood}
                  onChange={setFilterMood}
                  placeholder="Filter by mood"
                  className="w-40"
                />
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
                  className="w-40"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16}
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  iconName="List"
                  iconSize={16}
                />
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedPlaylists?.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg mb-6">
                <span className="text-sm text-foreground">
                  {selectedPlaylists?.length} playlist{selectedPlaylists?.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    iconName={selectedPlaylists?.length === filteredPlaylists?.length ? "Square" : "CheckSquare"}
                    iconPosition="left"
                    iconSize={14}
                  >
                    {selectedPlaylists?.length === filteredPlaylists?.length ? 'Deselect All' : 'Select All'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkExport}
                    iconName="Share"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Export
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    iconName="Trash2"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}

            {/* Playlists Grid/List */}
            {sortedPlaylists?.length > 0 ? (
              <div className={`${
                viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
              }`}>
                {sortedPlaylists?.map((playlist) => (
                  <PlaylistCard
                    key={playlist?.id}
                    playlist={playlist}
                    onPlay={handlePlayPlaylist}
                    onEdit={handleEditPlaylist}
                    onDelete={handleDeletePlaylist}
                    onExport={handleExportPlaylist}
                    onSelect={handlePlaylistSelect}
                    isSelected={selectedPlaylists?.includes(playlist?.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Music" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery || filterMood !== 'all' ? 'No playlists found' : 'No playlists yet'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || filterMood !== 'all' ?'Try adjusting your search or filter criteria' :'Create your first mood-based playlist to get started'
                  }
                </p>
                <Button
                  variant="default"
                  onClick={() => navigate('/mood-input-dashboard')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create Your First Playlist
                </Button>
              </div>
            )}
          </div>

          {/* Mood History Sidebar */}
          {showMoodHistory && (
            <div className="lg:col-span-1">
              <MoodHistoryPanel
                moodHistory={mockMoodHistory}
                onMoodSelect={handleMoodSelect}
                onCreatePlaylistFromMood={handleCreatePlaylistFromMood}
                selectedMood={selectedMood}
              />
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      {editingPlaylist && (
        <PlaylistEditor
          playlist={editingPlaylist}
          onSave={handleSavePlaylist}
          onClose={() => setEditingPlaylist(null)}
          onTrackReorder={handleTrackReorder}
          onTrackRemove={handleTrackRemove}
        />
      )}
      {exportingPlaylist && (
        <ExportModal
          playlist={exportingPlaylist}
          isOpen={!!exportingPlaylist}
          onClose={() => setExportingPlaylist(null)}
          onExport={handleExportComplete}
        />
      )}
    </div>
  );
};

export default PlaylistManagement;