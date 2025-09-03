import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionMoodTracker = ({ currentEmotion, emotionHistory = [] }) => {
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalDetections: 0,
    dominantMood: null,
    moodVariability: 0,
    sessionDuration: 0
  });

  // Mock session data for demonstration
  const mockHistory = [
    {
      id: 1,
      method: 'camera',
      emotion: 'happy',
      confidence: 0.92,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      emoji: '😊'
    },
    {
      id: 2,
      method: 'text',
      emotion: 'excited',
      confidence: 0.87,
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      originalText: "Just got great news about my promotion!"
    },
    {
      id: 3,
      method: 'emoji',
      emotion: 'energetic',
      confidence: 0.94,
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
      emoji: '⚡'
    }
  ];

  const allHistory = [...mockHistory, ...emotionHistory];

  useEffect(() => {
    // Calculate session statistics
    if (allHistory?.length > 0) {
      const moodCounts = {};
      let totalConfidence = 0;

      allHistory?.forEach(entry => {
        moodCounts[entry.emotion] = (moodCounts?.[entry?.emotion] || 0) + 1;
        totalConfidence += entry?.confidence;
      });

      const dominantMood = Object.entries(moodCounts)?.reduce((a, b) => 
        moodCounts?.[a?.[0]] > moodCounts?.[b?.[0]] ? a : b
      )?.[0];

      const avgConfidence = totalConfidence / allHistory?.length;
      const oldestEntry = allHistory?.[0];
      const sessionDuration = Math.floor((Date.now() - oldestEntry?.timestamp?.getTime()) / 60000);

      setSessionStats({
        totalDetections: allHistory?.length,
        dominantMood,
        moodVariability: avgConfidence,
        sessionDuration
      });
    }
  }, [allHistory]);

  const getMethodIcon = (method) => {
    switch (method) {
      case 'camera': return 'Camera';
      case 'text': return 'MessageSquare';
      case 'emoji': return 'Smile';
      default: return 'Circle';
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'camera': return 'text-primary';
      case 'text': return 'text-secondary';
      case 'emoji': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp?.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  };

  const getMoodEmoji = (emotion) => {
    const emojiMap = {
      happy: '😊',
      excited: '🤗',
      energetic: '⚡',
      calm: '😌',
      romantic: '💕',
      melancholy: '😔',
      angry: '😤',
      anxious: '😰',
      nostalgic: '🍂',
      peaceful: '🧘'
    };
    return emojiMap?.[emotion] || '😐';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Session Tracker</h3>
            <p className="text-sm text-muted-foreground">Your mood journey today</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpandedHistory(!expandedHistory)}
          iconName={expandedHistory ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          {expandedHistory ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {/* Current Mood Display */}
      {currentEmotion && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getMoodEmoji(currentEmotion?.emotion)}</span>
              <div>
                <p className="text-sm font-medium text-foreground">Current Mood</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {currentEmotion?.emotion} • {Math.round(currentEmotion?.confidence * 100)}% confidence
                </p>
              </div>
            </div>
            <div className="text-right">
              <Icon 
                name={getMethodIcon(currentEmotion?.method)} 
                size={16} 
                className={getMethodColor(currentEmotion?.method)} 
              />
            </div>
          </div>
        </div>
      )}
      {/* Session Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Detections</p>
              <p className="text-sm font-semibold text-foreground">{sessionStats?.totalDetections}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Session</p>
              <p className="text-sm font-semibold text-foreground">
                {sessionStats?.sessionDuration}m
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 col-span-2">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Dominant Mood</p>
              <p className="text-sm font-semibold text-foreground capitalize">
                {sessionStats?.dominantMood || 'Not detected yet'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mood History */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Recent Moods</h4>
          <span className="text-xs text-muted-foreground">
            {allHistory?.length} total
          </span>
        </div>
        
        <div className={`space-y-2 ${!expandedHistory ? 'max-h-32 overflow-hidden' : ''}`}>
          {allHistory?.slice(0, expandedHistory ? undefined : 3)?.map((entry) => (
            <div key={entry?.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getMethodIcon(entry?.method)} 
                    size={12} 
                    className={getMethodColor(entry?.method)} 
                  />
                  <span className="text-lg">{entry?.emoji || getMoodEmoji(entry?.emotion)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {entry?.emotion}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(entry?.confidence * 100)}% • {formatTimeAgo(entry?.timestamp)}
                  </p>
                </div>
              </div>
              
              <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                  style={{ width: `${entry?.confidence * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {!expandedHistory && allHistory?.length > 3 && (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedHistory(true)}
              iconName="MoreHorizontal"
              iconSize={14}
              className="text-xs"
            >
              Show {allHistory?.length - 3} more
            </Button>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            className="flex-1 text-xs"
          >
            Export History
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
            className="flex-1 text-xs text-destructive hover:text-destructive"
          >
            Clear Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionMoodTracker;