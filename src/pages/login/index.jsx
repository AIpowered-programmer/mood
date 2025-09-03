import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SocialAuth from './components/SocialAuth';
import PrivacyNotice from './components/PrivacyNotice';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already authenticated
  useEffect(() => {
    const savedUser = localStorage.getItem('moodtunes_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        navigate('/mood-input-dashboard');
      } catch (error) {
        localStorage.removeItem('moodtunes_user');
      }
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: 'user_123',
        name: 'Sarah Mitchell',
        email: formData?.email,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        provider: 'email',
        spotifyConnected: false,
        preferences: {
          rememberMe: formData?.rememberMe,
          cameraPermission: false,
          notifications: true
        },
        createdAt: new Date()?.toISOString(),
        lastLogin: new Date()?.toISOString()
      };

      // Save user data
      localStorage.setItem('moodtunes_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return mockUser;
    } catch (error) {
      throw new Error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (socialUser) => {
    setIsLoading(true);
    
    try {
      // Mock social authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const enhancedUser = {
        ...socialUser,
        preferences: {
          cameraPermission: false,
          notifications: true
        },
        createdAt: new Date()?.toISOString(),
        lastLogin: new Date()?.toISOString()
      };

      // Save user data
      localStorage.setItem('moodtunes_user', JSON.stringify(enhancedUser));
      setUser(enhancedUser);
      
      return enhancedUser;
    } catch (error) {
      throw new Error('Social authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      {/* Main Content */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Login Form Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
          {/* Login Form */}
          <LoginForm 
            onLogin={handleLogin}
            isLoading={isLoading}
          />

          {/* Social Authentication */}
          <SocialAuth 
            onSocialLogin={handleSocialLogin}
          />
        </div>

        {/* Privacy Notice */}
        <PrivacyNotice />

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© {new Date()?.getFullYear()} MoodTunes. All rights reserved.</p>
          <p className="mt-1">Powered by AI emotion recognition technology</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;