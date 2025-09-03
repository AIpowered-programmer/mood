import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TextMoodCard = ({ onEmotionDetected, isActive, onActivate }) => {
  const [moodText, setMoodText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedEmotion, setAnalyzedEmotion] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const moodKeywords = {
    happy: ['happy', 'joyful', 'cheerful', 'excited', 'elated', 'upbeat', 'positive', 'great', 'amazing', 'wonderful'],
    sad: ['sad', 'depressed', 'down', 'blue', 'melancholy', 'gloomy', 'upset', 'disappointed', 'heartbroken'],
    angry: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'livid', 'pissed'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'zen', 'chill', 'mellow', 'composed'],
    anxious: ['anxious', 'nervous', 'worried', 'stressed', 'tense', 'uneasy', 'restless', 'panicked'],
    energetic: ['energetic', 'pumped', 'hyper', 'active', 'lively', 'vibrant', 'dynamic', 'spirited'],
    romantic: ['romantic', 'loving', 'passionate', 'intimate', 'affectionate', 'tender', 'sweet'],
    nostalgic: ['nostalgic', 'reminiscent', 'wistful', 'sentimental', 'reflective', 'longing']
  };

  const analyzeMood = () => {
    if (!moodText?.trim()) return;
    
    setIsAnalyzing(true);
    onActivate();

    // Mock NLP processing
    setTimeout(() => {
      const text = moodText?.toLowerCase();
      let detectedMood = 'neutral';
      let maxMatches = 0;
      let calculatedConfidence = 0.5;

      // Simple keyword matching algorithm
      Object.entries(moodKeywords)?.forEach(([emotion, keywords]) => {
        const matches = keywords?.filter(keyword => text?.includes(keyword))?.length;
        if (matches > maxMatches) {
          maxMatches = matches;
          detectedMood = emotion;
          calculatedConfidence = Math.min(0.95, 0.6 + (matches * 0.1));
        }
      });

      // Add some randomness for more realistic feel
      if (maxMatches === 0) {
        const emotions = Object.keys(moodKeywords);
        detectedMood = emotions?.[Math.floor(Math.random() * emotions?.length)];
        calculatedConfidence = 0.3 + Math.random() * 0.4;
      }

      setAnalyzedEmotion(detectedMood);
      setConfidence(calculatedConfidence);
      setIsAnalyzing(false);

      onEmotionDetected({
        method: 'text',
        emotion: detectedMood,
        confidence: calculatedConfidence,
        originalText: moodText,
        timestamp: new Date()
      });
    }, 2000);
  };

  const clearAnalysis = () => {
    setMoodText('');
    setAnalyzedEmotion(null);
    setConfidence(0);
  };

  const suggestionPrompts = [
    "I\'m feeling overwhelmed with work today...",
    "Just had an amazing day with friends!",
    "Feeling nostalgic about old memories",
    "Need something to calm my nerves",
    "Ready to conquer the world!",
    "Missing someone special right now"
  ];

  const handlePromptClick = (prompt) => {
    setMoodText(prompt);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
      isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Text Analysis</h3>
            <p className="text-sm text-muted-foreground">Describe your current mood in words</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={16} className="text-secondary" />
          <span className="text-xs font-medium text-secondary">NLP Ready</span>
        </div>
      </div>
      {/* Text Input Area */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={moodText}
            onChange={(e) => setMoodText(e?.target?.value)}
            placeholder="Tell me how you're feeling right now... Be as descriptive as you'd like!"
            className="w-full h-32 p-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            maxLength={500}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {moodText?.length}/500
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Quick prompts:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestionPrompts?.slice(0, 4)?.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Controls */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            onClick={analyzeMood}
            loading={isAnalyzing}
            iconName="Zap"
            iconPosition="left"
            className="flex-1"
            disabled={!moodText?.trim() || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing Mood...' : 'Analyze Mood'}
          </Button>
          
          {(moodText || analyzedEmotion) && (
            <Button
              variant="outline"
              onClick={clearAnalysis}
              iconName="RotateCcw"
              iconSize={16}
              className="px-3"
            />
          )}
        </div>

        {/* Processing Indicator */}
        {isAnalyzing && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              <div>
                <p className="text-sm font-medium text-secondary">Processing your mood...</p>
                <p className="text-xs text-muted-foreground">
                  Analyzing emotional context and sentiment
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Result */}
        {analyzedEmotion && !isAnalyzing && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Mood Analyzed</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Confidence: {Math.round(confidence * 100)}%
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Detected Emotion:</span>
                <span className="text-sm font-semibold text-foreground capitalize">
                  {analyzedEmotion}
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
              
              <p className="text-xs text-muted-foreground">
                Based on emotional keywords and sentiment analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextMoodCard;