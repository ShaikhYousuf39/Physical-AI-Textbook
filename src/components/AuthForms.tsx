/**
 * AuthForms - User signup and signin forms
 */
import React, { useState, forwardRef } from 'react';
import { authAPI, UserSignupData } from '../lib/api';
import './AuthForms.css';

const AuthForms = forwardRef<any>((props, ref) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    softwareBackground: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    hardwareBackground: 'none' as 'none' | 'basic' | 'intermediate' | 'advanced',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignup) {
        const userData: UserSignupData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          software_background: formData.softwareBackground,
          hardware_background: formData.hardwareBackground,
        };

        const response = await authAPI.signup(userData);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userName', response.name);
        localStorage.setItem('userEmail', response.email);

        showNotification('Signup successful! Welcome aboard! 🎉');
      } else {
        const response = await authAPI.signin(formData.email, formData.password);
        localStorage.setItem('userId', response.user_id || response.id);
        localStorage.setItem('userName', response.name);
        localStorage.setItem('userEmail', response.email);

        showNotification('Signin successful! Welcome back! 👋');
      }

      setIsVisible(false);
      window.location.reload(); // Refresh to update UI with user state
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'auth-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const isLoggedIn = !!localStorage.getItem('userId');

  if (isLoggedIn) {
    const userName = localStorage.getItem('userName');
    return (
      <div className="auth-status">
        <span className="user-greeting">Hello, {userName}! 👋</span>
        <button
          className="auth-btn logout"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        className="auth-btn"
        onClick={() => setIsVisible(true)}
      >
        Sign In / Sign Up
      </button>

      {isVisible && (
        <div className="auth-modal-overlay" onClick={() => setIsVisible(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="auth-close"
              onClick={() => setIsVisible(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} className="auth-form">
              <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
              <p className="auth-subtitle">
                {isSignup
                  ? 'Join us to get personalized learning experience'
                  : 'Sign in to access personalized features'}
              </p>

              {error && (
                <div className="auth-error">
                  ⚠️ {error}
                </div>
              )}

              {isSignup && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                />
              </div>

              {isSignup && (
                <>
                  <div className="form-group">
                    <label htmlFor="software">Software Background</label>
                    <select
                      id="software"
                      value={formData.softwareBackground}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          softwareBackground: e.target.value as any,
                        })
                      }
                    >
                      <option value="beginner">Beginner - New to programming</option>
                      <option value="intermediate">Intermediate - Some experience</option>
                      <option value="advanced">Advanced - Professional level</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="hardware">Hardware Background</label>
                    <select
                      id="hardware"
                      value={formData.hardwareBackground}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hardwareBackground: e.target.value as any,
                        })
                      }
                    >
                      <option value="none">None - No experience</option>
                      <option value="basic">Basic - Some tinkering</option>
                      <option value="intermediate">Intermediate - Electronics projects</option>
                      <option value="advanced">Advanced - Professional level</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="auth-spinner"></span>
                    Please wait...
                  </>
                ) : isSignup ? (
                  'Create Account'
                ) : (
                  'Sign In'
                )}
              </button>

              <p className="auth-toggle">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError(null);
                  }}
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
});

AuthForms.displayName = 'AuthForms';

export default AuthForms;
