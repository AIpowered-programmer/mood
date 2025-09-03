import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeedbackSystem = ({ 
  track, 
  onFeedback, 
  existingFeedback = null 
}) => {
  const [selectedRating, setSelectedRating] = useState(existingFeedback?.rating || 0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState(existingFeedback?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingLabels = {
    1: 'Poor match',
    2: 'Below average',
    3: 'Average match',
    4: 'Good match',
    5: 'Perfect match'
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    if (!showFeedbackForm) {
      setShowFeedbackForm(true);
    }
  };

  const handleSubmitFeedback = async () => {
    if (selectedRating === 0) return;

    setIsSubmitting(true);
    
    try {
      await onFeedback({
        trackId: track?.id,
        rating: selectedRating,
        comment: feedbackText?.trim(),
        timestamp: new Date()?.toISOString()
      });
      
      setShowFeedbackForm(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipFeedback = () => {
    setShowFeedbackForm(false);
    setSelectedRating(0);
    setFeedbackText('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-card-foreground">
          Rate this recommendation
        </h3>
        {existingFeedback && (
          <span className="text-xs text-success">✓ Rated</span>
        )}
      </div>
      {/* Star Rating */}
      <div className="flex items-center space-x-1 mb-3">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(star)}
            className={`p-1 rounded transition-colors ${
              star <= selectedRating
                ? 'text-yellow-400 hover:text-yellow-500' :'text-muted-foreground hover:text-yellow-300'
            }`}
            disabled={isSubmitting}
          >
            <Icon 
              name={star <= selectedRating ? "Star" : "Star"} 
              size={20}
              className={star <= selectedRating ? "fill-current" : ""}
            />
          </button>
        ))}
      </div>
      {/* Rating Label */}
      {selectedRating > 0 && (
        <div className="text-sm text-muted-foreground mb-3">
          {ratingLabels?.[selectedRating]}
        </div>
      )}
      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Additional feedback (optional):
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e?.target?.value)}
              placeholder="Tell us why this recommendation worked or didn't work for your mood..."
              className="w-full p-2 text-sm bg-background border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              maxLength={200}
              disabled={isSubmitting}
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {feedbackText?.length}/200
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleSubmitFeedback}
              loading={isSubmitting}
              iconName="Check"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Submit Feedback
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkipFeedback}
              disabled={isSubmitting}
              className="flex-1"
            >
              Skip
            </Button>
          </div>
        </div>
      )}
      {/* Quick Feedback Buttons */}
      {!showFeedbackForm && selectedRating === 0 && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground mb-2">
            Quick feedback:
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRatingClick(5)}
              iconName="ThumbsUp"
              iconPosition="left"
              iconSize={12}
            >
              Love it
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRatingClick(3)}
              iconName="Meh"
              iconPosition="left"
              iconSize={12}
            >
              It's okay
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleRatingClick(1)}
              iconName="ThumbsDown"
              iconPosition="left"
              iconSize={12}
            >
              Not for me
            </Button>
          </div>
        </div>
      )}
      {/* Feedback Stats */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Your feedback helps improve recommendations for your mood preferences
        </div>
      </div>
    </div>
  );
};

export default FeedbackSystem;