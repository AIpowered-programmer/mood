import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MoodHistorySection = ({ moodHistory, onExportHistory, onDeleteHistory }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const mockMoodData = [
    { date: '2025-01-02', mood: 'happy', confidence: 0.92, songsDiscovered: 8, method: 'facial' },
    { date: '2025-01-01', mood: 'calm', confidence: 0.87, songsDiscovered: 5, method: 'text' },
    { date: '2024-12-31', mood: 'energetic', confidence: 0.95, songsDiscovered: 12, method: 'emoji' },
    { date: '2024-12-30', mood: 'melancholic', confidence: 0.78, songsDiscovered: 6, method: 'facial' },
    { date: '2024-12-29', mood: 'excited', confidence: 0.89, songsDiscovered: 10, method: 'text' },
    { date: '2024-12-28', mood: 'peaceful', confidence: 0.91, songsDiscovered: 7, method: 'emoji' },
    { date: '2024-12-27', mood: 'nostalgic', confidence: 0.84, songsDiscovered: 9, method: 'facial' }
  ];

  const periodOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'all', label: 'All Time' }
  ];

  const moodColors = {
    happy: 'text-yellow-500 bg-yellow-500/10',
    calm: 'text-blue-500 bg-blue-500/10',
    energetic: 'text-red-500 bg-red-500/10',
    melancholic: 'text-purple-500 bg-purple-500/10',
    excited: 'text-orange-500 bg-orange-500/10',
    peaceful: 'text-green-500 bg-green-500/10',
    nostalgic: 'text-pink-500 bg-pink-500/10'
  };

  const methodIcons = {
    facial: 'Camera',
    text: 'MessageSquare',
    emoji: 'Smile'
  };

  const handleExportHistory = async () => {
    setLoading(true);
    try {
      await onExportHistory(selectedPeriod);
    } catch (error) {
      console.error('Failed to export mood history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async () => {
    setLoading(true);
    try {
      await onDeleteHistory(selectedPeriod);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete mood history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalSessions = mockMoodData?.length;
    const totalSongs = mockMoodData?.reduce((sum, entry) => sum + entry?.songsDiscovered, 0);
    const avgConfidence = mockMoodData?.reduce((sum, entry) => sum + entry?.confidence, 0) / totalSessions;
    const mostCommonMood = mockMoodData?.reduce((acc, entry) => {
      acc[entry.mood] = (acc?.[entry?.mood] || 0) + 1;
      return acc;
    }, {});
    const topMood = Object.entries(mostCommonMood)?.sort(([,a], [,b]) => b - a)?.[0];

    return {
      totalSessions,
      totalSongs,
      avgConfidence: Math.round(avgConfidence * 100),
      topMood: topMood ? topMood?.[0] : 'N/A'
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Mood History</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {periodOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-muted/50 rounded-md text-center">
            <p className="text-2xl font-bold text-primary">{stats?.totalSessions}</p>
            <p className="text-xs text-muted-foreground">Total Sessions</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-md text-center">
            <p className="text-2xl font-bold text-secondary">{stats?.totalSongs}</p>
            <p className="text-xs text-muted-foreground">Songs Discovered</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-md text-center">
            <p className="text-2xl font-bold text-accent">{stats?.avgConfidence}%</p>
            <p className="text-xs text-muted-foreground">Avg Confidence</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-md text-center">
            <p className={`text-2xl font-bold capitalize ${moodColors?.[stats?.topMood]?.split(' ')?.[0] || 'text-foreground'}`}>
              {stats?.topMood}
            </p>
            <p className="text-xs text-muted-foreground">Top Mood</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleExportHistory}
            loading={loading}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Data
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
          >
            Delete History
          </Button>
        </div>
      </div>
      {/* Mood History List */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Sessions</h3>
        
        <div className="space-y-3">
          {mockMoodData?.map((entry, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${moodColors?.[entry?.mood] || 'bg-muted text-muted-foreground'}`}>
                    <Icon name={methodIcons?.[entry?.method]} size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground capitalize">
                      {entry?.mood}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.date)?.toLocaleDateString()} • {entry?.method} detection
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">
                    {entry?.songsDiscovered} songs
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(entry?.confidence * 100)}% confidence
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockMoodData?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No mood history available for the selected period</p>
          </div>
        )}
      </div>
      {/* Mood Trends */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Mood Trends</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-md">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <p className="text-sm font-medium text-card-foreground">Most Active Time</p>
            </div>
            <p className="text-xs text-muted-foreground">
              You tend to use mood detection most frequently in the evening (6-9 PM)
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-md">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Heart" size={20} className="text-secondary" />
              <p className="text-sm font-medium text-card-foreground">Mood Pattern</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Your mood tends to be more positive on weekends and during morning hours
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-md">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Music" size={20} className="text-accent" />
              <p className="text-sm font-medium text-card-foreground">Music Discovery</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Facial recognition sessions lead to 40% more song discoveries than text input
            </p>
          </div>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-2">Privacy & Data Retention</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Your mood history is stored locally and encrypted. Facial recognition data is processed in real-time and not permanently stored unless explicitly enabled in privacy settings.
            </p>
            <p className="text-xs text-muted-foreground">
              You can export or delete your mood history at any time. Deleted data cannot be recovered.
            </p>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-semibold text-card-foreground">Delete Mood History</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently delete your mood history for the selected period. This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={handleDeleteHistory}
                loading={loading}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete History
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodHistorySection;