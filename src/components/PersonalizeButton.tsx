/**
 * PersonalizeButton - Content personalization based on user level
 */
import React, { useState } from 'react';
import { contentAPI } from '../lib/api';
import './PersonalizeButton.css';

interface PersonalizeButtonProps {
  chapterId: string;
  onContentUpdate?: (content: string) => void;
}

export const PersonalizeButton: React.FC<PersonalizeButtonProps> = ({
  chapterId,
  onContentUpdate,
}) => {
  const [level, setLevel] = useState<'simplified' | 'standard' | 'advanced'>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalize = async (selectedLevel: 'simplified' | 'standard' | 'advanced') => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please sign in to personalize content');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await contentAPI.personalize(chapterId, userId, selectedLevel);

      if (onContentUpdate) {
        onContentUpdate(response.personalized_content);
      }

      setLevel(selectedLevel);
      setShowOptions(false);

      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'personalize-success';
      successMsg.textContent = `Content personalized to ${selectedLevel} level!`;
      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    } catch (err: any) {
      console.error('Personalization error:', err);
      setError(err.message || 'Failed to personalize content');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="personalize-container">
      <button
        className="personalize-btn"
        onClick={() => setShowOptions(!showOptions)}
        disabled={isLoading}
      >
        🎯 Personalize Content
      </button>

      {showOptions && (
        <div className="personalize-options">
          <div className="options-header">
            <span>Choose your level:</span>
            <button
              className="close-options"
              onClick={() => setShowOptions(false)}
            >
              ✕
            </button>
          </div>

          <button
            onClick={() => handlePersonalize('simplified')}
            disabled={isLoading}
            className={`level-option ${level === 'simplified' ? 'active' : ''}`}
          >
            <span className="level-icon">📚</span>
            <div className="level-info">
              <strong>Simplified</strong>
              <small>For beginners, with everyday examples</small>
            </div>
          </button>

          <button
            onClick={() => handlePersonalize('standard')}
            disabled={isLoading}
            className={`level-option ${level === 'standard' ? 'active' : ''}`}
          >
            <span className="level-icon">🎓</span>
            <div className="level-info">
              <strong>Standard</strong>
              <small>Balanced for engineering students</small>
            </div>
          </button>

          <button
            onClick={() => handlePersonalize('advanced')}
            disabled={isLoading}
            className={`level-option ${level === 'advanced' ? 'active' : ''}`}
          >
            <span className="level-icon">🚀</span>
            <div className="level-info">
              <strong>Advanced</strong>
              <small>In-depth with technical details</small>
            </div>
          </button>
        </div>
      )}

      {isLoading && (
        <div className="personalize-loading">
          <div className="spinner"></div>
          <span>Personalizing content...</span>
        </div>
      )}

      {error && (
        <div className="personalize-error">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default PersonalizeButton;
