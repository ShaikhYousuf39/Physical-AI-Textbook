/**
 * API client for Physical AI Textbook backend
 */
import axios from 'axios';

// Use env var if provided (Vercel), otherwise default to the deployed backend
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'https://backend-cfej.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Types
export interface ChatQueryRequest {
  query: string;
  user_id?: string;
  chapter_id?: string;
}

export interface ChatResponse {
  response: string;
  sources?: Array<{
    chapter: string;
    chapter_id: string;
    relevance: number;
  }>;
}

export interface SelectionChatRequest {
  selected_text: string;
  query: string;
  user_id?: string;
}

export interface UserSignupData {
  email: string;
  name: string;
  password: string;
  software_background: 'beginner' | 'intermediate' | 'advanced';
  hardware_background: 'none' | 'basic' | 'intermediate' | 'advanced';
}

export interface UserData {
  id: string;
  user_id?: string;
  email: string;
  name: string;
  software_background: string;
  hardware_background: string;
}

export interface PersonalizeRequest {
  chapter_id: string;
  user_id: string;
  level: 'simplified' | 'standard' | 'advanced';
}

export interface TranslateRequest {
  chapter_id: string;
  content: string;
  target_lang: 'en' | 'ur';
}

// Chat APIs
export const chatAPI = {
  /**
   * Send a query to the chatbot
   */
  query: async (query: string, userId?: string, chapterId?: string): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chat/query', {
      query,
      user_id: userId,
      chapter_id: chapterId,
    });
    return response.data;
  },

  /**
   * Query based on selected text
   */
  querySelection: async (selectedText: string, query: string, userId?: string): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chat/selection', {
      selected_text: selectedText,
      query,
      user_id: userId,
    });
    return response.data;
  },
};

// Auth APIs
export const authAPI = {
  /**
   * Sign up a new user
   */
  signup: async (userData: UserSignupData): Promise<UserData> => {
    const response = await api.post<UserData>('/auth/signup', userData);
    return response.data;
  },

  /**
   * Sign in an existing user
   */
  signin: async (email: string, password: string): Promise<UserData> => {
    const response = await api.post<UserData>('/auth/signin', { email, password });
    return response.data;
  },

  /**
   * Get user data by ID
   */
  getUser: async (userId: string): Promise<UserData> => {
    const response = await api.get<UserData>(`/auth/user/${userId}`);
    return response.data;
  },
};

// Content APIs
export const contentAPI = {
  /**
   * Personalize chapter content
   */
  personalize: async (
    chapterId: string,
    userId: string,
    level: 'simplified' | 'standard' | 'advanced'
  ): Promise<{ personalized_content: string; level: string; chapter_id: string }> => {
    const response = await api.post('/content/personalize', {
      chapter_id: chapterId,
      user_id: userId,
      level,
    });
    return response.data;
  },

  /**
   * Translate chapter content
   */
  translate: async (
    chapterId: string,
    content: string,
    targetLang: 'en' | 'ur'
  ): Promise<{ translated_content: string; source_lang: string; target_lang: string }> => {
    const response = await api.post('/content/translate', {
      chapter_id: chapterId,
      content,
      target_lang: targetLang,
    });
    return response.data;
  },

  /**
   * List all available chapters
   */
  listChapters: async (): Promise<{ chapters: any[]; total: number }> => {
    const response = await api.get('/content/chapters');
    return response.data;
  },

  /**
   * Get user preferences
   */
  getUserPreferences: async (userId: string): Promise<any> => {
    const response = await api.get(`/content/preferences/${userId}`);
    return response.data;
  },

  /**
   * Generate personalized exercises
   */
  generateExercises: async (
    chapterId: string,
    userId: string,
    numExercises: number = 3
  ): Promise<{ chapter_id: string; exercises: any[] }> => {
    const response = await api.post(`/content/exercises/${chapterId}`, null, {
      params: { user_id: userId, num_exercises: numExercises },
    });
    return response.data;
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.detail || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw error;
    }
  }
);

export default api;
