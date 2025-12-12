/**
 * TextSelectionChat - Q&A based on user-selected text
 */
import React, { useState, useEffect } from 'react';
import { chatAPI } from '../lib/api';
import './TextSelectionChat.css';

export const TextSelectionChat: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 10) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setPopupPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + window.scrollY - 10,
          });
          setShowPopup(true);
          setAnswer('');
          setQuestion('');
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.selection-chat-popup')) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId') || undefined;
      const response = await chatAPI.querySelection(selectedText, question, userId);
      setAnswer(response.response);
    } catch (error) {
      console.error('Selection chat error:', error);
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  if (!showPopup) return null;

  return (
    <div
      className="selection-chat-popup"
      style={{
        left: `${popupPosition.x}px`,
        top: `${popupPosition.y}px`,
      }}
    >
      <div className="selection-chat-content">
        <button
          className="close-btn"
          onClick={() => setShowPopup(false)}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="selected-text-preview">
          <strong>Selected text:</strong>
          <p>{selectedText.substring(0, 150)}{selectedText.length > 150 ? '...' : ''}</p>
        </div>

        <div className="question-input">
          <input
            type="text"
            placeholder="Ask about this selection..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button onClick={handleAsk} disabled={isLoading || !question.trim()}>
            {isLoading ? '...' : 'Ask'}
          </button>
        </div>

        {answer && (
          <div className="answer-box">
            <strong>Answer:</strong>
            <p>{answer}</p>
          </div>
        )}

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSelectionChat;
