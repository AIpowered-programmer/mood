import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmojiMoodCard = ({ onEmotionDetected, isActive, onActivate }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const emojiCategories = {
    happy: {
      name: 'Happy',
      icon: 'Smile',
      color: 'text-success',
      emojis: [
        { emoji: '😊', name: 'happy', intensity: 0.8 },
        { emoji: '😄', name: 'joyful', intensity: 0.9 },
        { emoji: '🤗', name: 'excited', intensity: 0.85 },
        { emoji: '😆', name: 'cheerful', intensity: 0.9 },
        { emoji: '🥳', name: 'celebratory', intensity: 0.95 },
        { emoji: '😍', name: 'euphoric', intensity: 0.9 }
      ]
    },
    calm: {
      name: 'Calm',
      icon: 'Leaf',
      color: 'text-primary',
      emojis: [
        { emoji: '😌', name: 'peaceful', intensity: 0.8 },
        { emoji: '🧘', name: 'meditative', intensity: 0.85 },
        { emoji: '😇', name: 'serene', intensity: 0.8 },
        { emoji: '🤲', name: 'zen', intensity: 0.9 },
        { emoji: '💆', name: 'relaxed', intensity: 0.75 },
        { emoji: '🌸', name: 'tranquil', intensity: 0.8 }
      ]
    },
    energetic: {
      name: 'Energetic',
      icon: 'Zap',
      color: 'text-warning',
      emojis: [
        { emoji: '⚡', name: 'energetic', intensity: 0.9 },
        { emoji: '🔥', name: 'fired up', intensity: 0.95 },
        { emoji: '💪', name: 'powerful', intensity: 0.9 },
        { emoji: '🚀', name: 'motivated', intensity: 0.85 },
        { emoji: '⭐', name: 'dynamic', intensity: 0.8 },
        { emoji: '🌟', name: 'vibrant', intensity: 0.85 }
      ]
    },
    romantic: {
      name: 'Romantic',
      icon: 'Heart',
      color: 'text-pink-500',
      emojis: [
        { emoji: '💕', name: 'loving', intensity: 0.9 },
        { emoji: '💖', name: 'romantic', intensity: 0.85 },
        { emoji: '🥰', name: 'affectionate', intensity: 0.8 },
        { emoji: '💝', name: 'tender', intensity: 0.75 },
        { emoji: '🌹', name: 'passionate', intensity: 0.9 },
        { emoji: '💐', name: 'sweet', intensity: 0.7 }
      ]
    },
    melancholy: {
      name: 'Melancholy',
      icon: 'Cloud',
      color: 'text-secondary',
      emojis: [
        { emoji: '😔', name: 'melancholy', intensity: 0.7 },
        { emoji: '🌧️', name: 'gloomy', intensity: 0.75 },
        { emoji: '🍂', name: 'nostalgic', intensity: 0.8 },
        { emoji: '🌙', name: 'contemplative', intensity: 0.7 },
        { emoji: '💭', name: 'reflective', intensity: 0.75 },
        { emoji: '🌊', name: 'wistful', intensity: 0.8 }
      ]
    },
    intense: {
      name: 'Intense',
      icon: 'Flame',
      color: 'text-red-500',
      emojis: [
        { emoji: '😤', name: 'determined', intensity: 0.85 },
        { emoji: '🔥', name: 'intense', intensity: 0.9 },
        { emoji: '💥', name: 'explosive', intensity: 0.95 },
        { emoji: '⚡', name: 'electric', intensity: 0.9 },
        { emoji: '🌪️', name: 'turbulent', intensity: 0.85 },
        { emoji: '🎯', name: 'focused', intensity: 0.8 }
      ]
    }
  };

  const handleEmojiSelect = (categoryKey, emojiData) => {
    setSelectedEmoji({ ...emojiData, category: categoryKey });
    onActivate();
    
    onEmotionDetected({
      method: 'emoji',
      emotion: emojiData?.name,
      confidence: emojiData?.intensity,
      emoji: emojiData?.emoji,
      category: categoryKey,
      timestamp: new Date()
    });
  };

  const filteredCategories = selectedCategory === 'all' 
    ? Object.entries(emojiCategories)
    : Object.entries(emojiCategories)?.filter(([key]) => key === selectedCategory);

  return (
    <div className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
      isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Smile" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Emoji Selection</h3>
            <p className="text-sm text-muted-foreground">Choose an emoji that matches your mood</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Palette" size={16} className="text-accent" />
          <span className="text-xs font-medium text-accent">Direct Select</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            All Moods
          </button>
          {Object.entries(emojiCategories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center space-x-1 ${
                selectedCategory === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={category?.icon} size={12} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Emoji Grid */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {filteredCategories?.map(([categoryKey, category]) => (
          <div key={categoryKey} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={category?.icon} size={16} className={category?.color} />
              <h4 className="text-sm font-medium text-foreground">{category?.name}</h4>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {category?.emojis?.map((emojiData, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(categoryKey, emojiData)}
                  className={`aspect-square p-2 rounded-lg border transition-all duration-200 hover:scale-110 ${
                    selectedEmoji?.emoji === emojiData?.emoji
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border hover:border-muted-foreground hover:bg-muted/50'
                  }`}
                  title={`${emojiData?.name} (${Math.round(emojiData?.intensity * 100)}% intensity)`}
                >
                  <span className="text-2xl">{emojiData?.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Selected Emotion Display */}
      {selectedEmoji && (
        <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Mood Selected</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Intensity: {Math.round(selectedEmoji?.intensity * 100)}%
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{selectedEmoji?.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-foreground capitalize">
                {selectedEmoji?.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {selectedEmoji?.category} category
              </p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${selectedEmoji?.intensity * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <Button
          variant="outline"
          onClick={() => setSelectedEmoji(null)}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
          disabled={!selectedEmoji}
        >
          Clear Selection
        </Button>
        
        {selectedEmoji && (
          <Button
            variant="default"
            onClick={() => {
              // Navigate to recommendations with selected emotion
              console.log('Navigate to recommendations with:', selectedEmoji);
            }}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
            className="flex-1"
          >
            Find Music
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmojiMoodCard;