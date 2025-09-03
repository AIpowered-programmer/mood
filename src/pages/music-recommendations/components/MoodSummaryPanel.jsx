import React from 'react';
import Icon from '../../../components/AppIcon';

const MoodSummaryPanel = ({ 
  currentMood, 
  confidenceScore, 
  detectionMethod, 
  onChangeMood 
}) => {
  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'text-yellow-400 bg-yellow-400/10',
      sad: 'text-blue-400 bg-blue-400/10',
      energetic: 'text-red-400 bg-red-400/10',
      calm: 'text-green-400 bg-green-400/10',
      romantic: 'text-pink-400 bg-pink-400/10',
      focused: 'text-purple-400 bg-purple-400/10',
      nostalgic: 'text-amber-400 bg-amber-400/10',
      melancholic: 'text-indigo-400 bg-indigo-400/10'
    };
    return moodColors?.[mood?.toLowerCase()] || 'text-gray-400 bg-gray-400/10';
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
      melancholic: 'Cloud'
    };
    return moodIcons?.[mood?.toLowerCase()] || 'Circle';
  };

  const getDetectionMethodIcon = (method) => {
    const methodIcons = {
      facial: 'Camera',
      text: 'MessageSquare',
      emoji: 'Smile'
    };
    return methodIcons?.[method] || 'Scan';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Current Mood</h2>
        <button
          onClick={onChangeMood}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Change Mood
        </button>
      </div>

      <div className="space-y-4">
        {/* Mood Display */}
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getMoodColor(currentMood)}`}>
            <Icon name={getMoodIcon(currentMood)} size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-card-foreground capitalize">
              {currentMood || 'Unknown'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Detected via {detectionMethod || 'unknown method'}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <span className="text-sm font-medium text-card-foreground">
              {confidenceScore || 0}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${confidenceScore || 0}%` }}
            />
          </div>
        </div>

        {/* Detection Method */}
        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
          <Icon name={getDetectionMethodIcon(detectionMethod)} size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {detectionMethod === 'facial' && 'Facial Recognition'}
            {detectionMethod === 'text' && 'Text Analysis'}
            {detectionMethod === 'emoji' && 'Emoji Selection'}
          </span>
        </div>

        {/* Mood Description */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {currentMood === 'happy' && 'Upbeat and cheerful vibes detected. Perfect for energetic and positive music.'}
            {currentMood === 'sad' && 'Melancholic emotions identified. Soothing and contemplative tracks recommended.'}
            {currentMood === 'energetic' && 'High energy levels detected. Dynamic and powerful music suggestions.'}
            {currentMood === 'calm' && 'Peaceful and relaxed state identified. Ambient and tranquil music recommended.'}
            {currentMood === 'romantic' && 'Romantic feelings detected. Love songs and intimate melodies suggested.'}
            {currentMood === 'focused' && 'Concentrated mindset identified. Instrumental and focus-enhancing tracks.'}
            {currentMood === 'nostalgic' && 'Nostalgic emotions detected. Classic and reminiscent music recommended.'}
            {currentMood === 'melancholic' && 'Reflective mood identified. Deep and introspective tracks suggested.'}
            {!currentMood && 'No specific mood detected. Showing general recommendations.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodSummaryPanel;