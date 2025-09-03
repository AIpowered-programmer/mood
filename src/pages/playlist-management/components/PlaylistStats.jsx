import React from 'react';
import Icon from '../../../components/AppIcon';

const PlaylistStats = ({ playlists }) => {
  const calculateStats = () => {
    const totalPlaylists = playlists?.length;
    const totalTracks = playlists?.reduce((sum, playlist) => sum + playlist?.trackCount, 0);
    const totalDuration = playlists?.reduce((sum, playlist) => sum + playlist?.duration, 0);
    const exportedCount = playlists?.filter(p => p?.exportedToSpotify)?.length;
    
    const moodDistribution = playlists?.reduce((acc, playlist) => {
      acc[playlist.mood] = (acc?.[playlist?.mood] || 0) + 1;
      return acc;
    }, {});
    
    const topMood = Object.entries(moodDistribution)?.sort(([,a], [,b]) => b - a)?.[0];
    
    const recentActivity = playlists?.filter(p => {
      const daysDiff = (new Date() - new Date(p.createdAt)) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    })?.length;

    return {
      totalPlaylists,
      totalTracks,
      totalDuration,
      exportedCount,
      topMood: topMood ? { mood: topMood?.[0], count: topMood?.[1] } : null,
      recentActivity,
      moodDistribution
    };
  };

  const stats = calculateStats();

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

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
      happy: 'text-yellow-500',
      sad: 'text-blue-500',
      energetic: 'text-red-500',
      calm: 'text-green-500',
      romantic: 'text-pink-500',
      focused: 'text-purple-500',
      nostalgic: 'text-amber-500',
      angry: 'text-red-600',
      excited: 'text-orange-500',
      melancholic: 'text-gray-500'
    };
    return moodColors?.[mood?.toLowerCase()] || 'text-muted-foreground';
  };

  const statCards = [
    {
      title: 'Total Playlists',
      value: stats?.totalPlaylists,
      icon: 'Music',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Tracks',
      value: stats?.totalTracks?.toLocaleString(),
      icon: 'Disc',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Total Duration',
      value: formatDuration(stats?.totalDuration),
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Exported',
      value: `${stats?.exportedCount}/${stats?.totalPlaylists}`,
      icon: 'Share',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat) => (
          <div key={stat?.title} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Mood */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Most Common Mood</h3>
          </div>
          
          {stats?.topMood ? (
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center`}>
                <Icon 
                  name={getMoodIcon(stats?.topMood?.mood)} 
                  size={24} 
                  className={getMoodColor(stats?.topMood?.mood)}
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground capitalize">
                  {stats?.topMood?.mood}
                </h4>
                <p className="text-muted-foreground">
                  {stats?.topMood?.count} playlists ({Math.round((stats?.topMood?.count / stats?.totalPlaylists) * 100)}%)
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No mood data available</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">This week</span>
              <span className="text-2xl font-bold text-foreground">{stats?.recentActivity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Export rate</span>
              <span className="text-lg font-semibold text-foreground">
                {stats?.totalPlaylists > 0 ? Math.round((stats?.exportedCount / stats?.totalPlaylists) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Avg tracks/playlist</span>
              <span className="text-lg font-semibold text-foreground">
                {stats?.totalPlaylists > 0 ? Math.round(stats?.totalTracks / stats?.totalPlaylists) : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Mood Distribution */}
      {Object.keys(stats?.moodDistribution)?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Mood Distribution</h3>
          </div>
          
          <div className="space-y-3">
            {Object.entries(stats?.moodDistribution)?.sort(([,a], [,b]) => b - a)?.map(([mood, count]) => (
                <div key={mood} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                    <Icon 
                      name={getMoodIcon(mood)} 
                      size={16} 
                      className={getMoodColor(mood)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground capitalize">{mood}</span>
                      <span className="text-sm text-muted-foreground">
                        {count} ({Math.round((count / stats?.totalPlaylists) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(count / stats?.totalPlaylists) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistStats;