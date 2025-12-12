/**
 * TranslateButton - Toggle between English and Urdu
 */
import React, { useState } from 'react';
import { contentAPI } from '../lib/api';
import './TranslateButton.css';

interface TranslateButtonProps {
  chapterId: string;
  content: string;
  onContentUpdate?: (content: string) => void;
}

export const TranslateButton: React.FC<TranslateButtonProps> = ({
  chapterId,
  content,
  onContentUpdate,
}) => {
  const [currentLang, setCurrentLang] = useState<'en' | 'ur'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [originalContent, setOriginalContent] = useState<string>(content);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (currentLang === 'en') {
        // Translate to Urdu
        setOriginalContent(content);
        const response = await contentAPI.translate(chapterId, content, 'ur');

        if (onContentUpdate) {
          onContentUpdate(response.translated_content);
        }

        setCurrentLang('ur');

        // Show success message
        showNotification('Content translated to Urdu! 🌐');
      } else {
        // Switch back to English
        if (onContentUpdate) {
          onContentUpdate(originalContent);
        }

        setCurrentLang('en');
        showNotification('Content switched to English! 🌐');
      }
    } catch (err: any) {
      console.error('Translation error:', err);
      setError(err.message || 'Failed to translate content');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'translate-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="translate-container">
      <button
        className={`translate-btn ${currentLang === 'ur' ? 'urdu' : ''}`}
        onClick={handleTranslate}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="translate-spinner"></span>
            Translating...
          </>
        ) : currentLang === 'en' ? (
          <>
            🌐 <span className="urdu-text">اردو</span>
          </>
        ) : (
          <>
            🌐 English
          </>
        )}
      </button>

      {error && (
        <div className="translate-error">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default TranslateButton;
