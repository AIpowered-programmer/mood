import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenreFilter = ({ 
  selectedGenres, 
  onGenreToggle, 
  currentMood,
  onClearFilters 
}) => {
  const genresByMood = {
    happy: [
      { id: 'pop', name: 'Pop', icon: 'Music' },
      { id: 'dance', name: 'Dance', icon: 'Zap' },
      { id: 'funk', name: 'Funk', icon: 'Disc' },
      { id: 'reggae', name: 'Reggae', icon: 'Sun' }
    ],
    sad: [
      { id: 'blues', name: 'Blues', icon: 'CloudRain' },
      { id: 'indie', name: 'Indie', icon: 'Coffee' },
      { id: 'alternative', name: 'Alternative', icon: 'Headphones' },
      { id: 'folk', name: 'Folk', icon: 'TreePine' }
    ],
    energetic: [
      { id: 'rock', name: 'Rock', icon: 'Guitar' },
      { id: 'electronic', name: 'Electronic', icon: 'Zap' },
      { id: 'hip-hop', name: 'Hip Hop', icon: 'Mic' },
      { id: 'metal', name: 'Metal', icon: 'Volume2' }
    ],
    calm: [
      { id: 'ambient', name: 'Ambient', icon: 'Cloud' },
      { id: 'classical', name: 'Classical', icon: 'Piano' },
      { id: 'jazz', name: 'Jazz', icon: 'Music2' },
      { id: 'new-age', name: 'New Age', icon: 'Leaf' }
    ],
    romantic: [
      { id: 'r&b', name: 'R&B', icon: 'Heart' },
      { id: 'soul', name: 'Soul', icon: 'Sparkles' },
      { id: 'love-songs', name: 'Love Songs', icon: 'HeartHandshake' },
      { id: 'acoustic', name: 'Acoustic', icon: 'Guitar' }
    ],
    focused: [
      { id: 'instrumental', name: 'Instrumental', icon: 'Piano' },
      { id: 'lo-fi', name: 'Lo-Fi', icon: 'Headphones' },
      { id: 'study', name: 'Study Music', icon: 'BookOpen' },
      { id: 'minimal', name: 'Minimal', icon: 'Minus' }
    ],
    nostalgic: [
      { id: 'classic-rock', name: 'Classic Rock', icon: 'Radio' },
      { id: 'oldies', name: 'Oldies', icon: 'Clock' },
      { id: 'vintage', name: 'Vintage', icon: 'Camera' },
      { id: 'retro', name: 'Retro', icon: 'Rewind' }
    ],
    melancholic: [
      { id: 'post-rock', name: 'Post Rock', icon: 'Mountain' },
      { id: 'shoegaze', name: 'Shoegaze', icon: 'Eye' },
      { id: 'dream-pop', name: 'Dream Pop', icon: 'Cloud' },
      { id: 'slowcore', name: 'Slowcore', icon: 'Pause' }
    ]
  };

  const availableGenres = genresByMood?.[currentMood?.toLowerCase()] || [
    { id: 'pop', name: 'Pop', icon: 'Music' },
    { id: 'rock', name: 'Rock', icon: 'Guitar' },
    { id: 'jazz', name: 'Jazz', icon: 'Music2' },
    { id: 'classical', name: 'Classical', icon: 'Piano' },
    { id: 'electronic', name: 'Electronic', icon: 'Zap' },
    { id: 'hip-hop', name: 'Hip Hop', icon: 'Mic' }
  ];

  const isGenreSelected = (genreId) => {
    return selectedGenres?.includes(genreId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Filter by Genre
        </h3>
        {selectedGenres?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary hover:text-primary/80"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {/* Mood-based suggestion */}
        {currentMood && (
          <div className="text-sm text-muted-foreground mb-3">
            Genres recommended for <span className="text-primary font-medium capitalize">{currentMood}</span> mood:
          </div>
        )}

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {availableGenres?.map((genre) => (
            <Button
              key={genre?.id}
              variant={isGenreSelected(genre?.id) ? "default" : "outline"}
              size="sm"
              onClick={() => onGenreToggle(genre?.id)}
              iconName={genre?.icon}
              iconPosition="left"
              iconSize={16}
              className={`justify-start transition-all duration-200 ${
                isGenreSelected(genre?.id)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-muted'
              }`}
            >
              {genre?.name}
            </Button>
          ))}
        </div>

        {/* Selected Genres Summary */}
        {selectedGenres?.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">
              Active filters ({selectedGenres?.length}):
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedGenres?.map((genreId) => {
                const genre = availableGenres?.find(g => g?.id === genreId);
                return genre ? (
                  <span
                    key={genreId}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    <Icon name={genre?.icon} size={12} />
                    <span>{genre?.name}</span>
                    <button
                      onClick={() => onGenreToggle(genreId)}
                      className="ml-1 hover:text-primary/80"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Filter Stats */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          {selectedGenres?.length === 0 
            ? 'Showing all genres' 
            : `Filtering by ${selectedGenres?.length} genre${selectedGenres?.length > 1 ? 's' : ''}`
          }
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;