import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodHistoryPanel = ({ 
  moodHistory, 
  onMoodSelect, 
  onCreatePlaylistFromMood,
  selectedMood = null 
}) => {
  const [expandedMood, setExpandedMood] = useState(null);

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: 'Smile',
      sad: 'Frown',
      energetic: 'Zap',
      calm: 'Leaf',
      romantic: 'Heart',
      focused: 'Target',
      nostalgic: 'Clock',
      angry: 'Flame',
      excited: 'Star',
      melancholic: 'Cloud'
    };
    return moodIcons?.[mood?.toLowerCase()] || 'Circle';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'text-yellow-500 bg-yellow-500/10',
      sad: 'text-blue-500 bg-blue-500/10',
      energetic: 'text-red-500 bg-red-500/10',
      calm: 'text-green-500 bg-green-500/10',
      romantic: 'text-pink-500 bg-pink-500/10',
      focused: 'text-purple-500 bg-purple-500/10',
      nostalgic: 'text-amber-500 bg-amber-500/10',
      angry: 'text-red-600 bg-red-600/10',
      excited: 'text-orange-500 bg-orange-500/10',
      melancholic: 'text-gray-500 bg-gray-500/10'
    };
    return moodColors?.[mood?.toLowerCase()] || 'text-muted-foreground bg-muted';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date?.getFullYear() !== now?.getFullYear() ? 'numeric' : undefined
    });
  };

  const groupedHistory = moodHistory?.reduce((groups, entry) => {
    const date = new Date(entry.timestamp)?.toDateString();
    if (!groups?.[date]) {
      groups[date] = [];
    }
    groups?.[date]?.push(entry);
    return groups;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Mood History</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="TrendingUp"
          iconPosition="left"
          iconSize={16}
        >
          View Analytics
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(groupedHistory)?.sort(([a], [b]) => new Date(b) - new Date(a))?.map(([date, entries]) => (
            <div key={date} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground sticky top-0 bg-card py-1">
                {formatDate(date)}
              </h3>
              
              {entries?.map((entry) => (
                <div
                  key={entry?.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedMood?.id === entry?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => onMoodSelect(entry)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getMoodColor(entry?.mood)}`}>
                      <Icon 
                        name={getMoodIcon(entry?.mood)} 
                        size={18} 
                        className={getMoodColor(entry?.mood)?.split(' ')?.[0]}
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground capitalize">
                        {entry?.mood}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{entry?.method}</span>
                        <span>•</span>
                        <span>
                          {new Date(entry.timestamp)?.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {entry?.playlistsGenerated > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-success">
                        <Icon name="Music" size={12} />
                        <span>{entry?.playlistsGenerated}</span>
                      </div>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        setExpandedMood(expandedMood === entry?.id ? null : entry?.id);
                      }}
                      className="w-8 h-8"
                      iconName={expandedMood === entry?.id ? "ChevronUp" : "ChevronDown"}
                      iconSize={14}
                    />
                  </div>
                </div>
              ))}

              {/* Expanded Details */}
              {entries?.map((entry) => (
                expandedMood === entry?.id && (
                  <div key={`expanded-${entry?.id}`} className="ml-13 p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="space-y-3">
                      {entry?.description && (
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-1">Description</h5>
                          <p className="text-sm text-muted-foreground">{entry?.description}</p>
                        </div>
                      )}
                      
                      {entry?.confidence && (
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-1">Confidence</h5>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${entry?.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{entry?.confidence}%</span>
                          </div>
                        </div>
                      )}
                      
                      {entry?.relatedPlaylists && entry?.relatedPlaylists?.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">Generated Playlists</h5>
                          <div className="space-y-1">
                            {entry?.relatedPlaylists?.map((playlist) => (
                              <div key={playlist?.id} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{playlist?.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {playlist?.trackCount} tracks
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onCreatePlaylistFromMood(entry)}
                          iconName="Plus"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Create New Playlist
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Repeat"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Detect Again
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ))}

        {moodHistory?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No mood history</h3>
            <p className="text-muted-foreground mb-4">
              Start detecting your mood to see your history here
            </p>
            <Button
              variant="default"
              iconName="Heart"
              iconPosition="left"
              iconSize={16}
            >
              Detect Mood
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodHistoryPanel;