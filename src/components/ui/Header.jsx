import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ 
  isAuthenticated = true, 
  user = null, 
  spotifyConnected = false, 
  cameraPermission = false,
  onLogout = () => {},
  className = '' 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      name: 'Discover',
      path: '/mood-input-dashboard',
      icon: 'Heart',
      tooltip: 'Find music through emotion detection'
    },
    {
      name: 'Recommendations',
      path: '/music-recommendations',
      icon: 'Music',
      tooltip: 'View your mood-matched tracks'
    },
    {
      name: 'My Playlists',
      path: '/playlist-management',
      icon: 'ListMusic',
      tooltip: 'Manage your saved collections'
    },
    {
      name: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      tooltip: 'Account and privacy settings'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer gesture-aware"
              onClick={() => handleNavigation('/mood-input-dashboard')}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center emotion-pulse">
                  <Icon name="Music" size={20} className="text-primary-foreground" />
                </div>
                {currentMood && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MoodTunes
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Button
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className={`gesture-aware transition-all duration-fast ${
                    isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground shadow-emotion' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item?.name}
                </Button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-fast pointer-events-none whitespace-nowrap z-110">
                  {item?.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
                </div>
              </div>
            ))}
          </nav>

          {/* Status Indicators & User Menu */}
          <div className="flex items-center space-x-3">
            {/* Status Indicators */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Spotify Status */}
              <div className="relative group">
                <div className={`w-2 h-2 rounded-full ${spotifyConnected ? 'bg-success' : 'bg-warning'} animate-pulse`} />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-fast pointer-events-none whitespace-nowrap z-110">
                  Spotify: {spotifyConnected ? 'Connected' : 'Disconnected'}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
                </div>
              </div>

              {/* Camera Status */}
              <div className="relative group">
                <Icon 
                  name={cameraPermission ? "Camera" : "CameraOff"} 
                  size={16} 
                  className={cameraPermission ? 'text-success' : 'text-muted-foreground'} 
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-fast pointer-events-none whitespace-nowrap z-110">
                  Camera: {cameraPermission ? 'Enabled' : 'Disabled'}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
                </div>
              </div>
            </div>

            {/* User Avatar */}
            <div className="relative group">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center cursor-pointer gesture-aware">
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name || 'User'} 
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <Icon name="User" size={16} className="text-accent-foreground" />
              </div>
              
              {/* User Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-fast pointer-events-none group-hover:pointer-events-auto z-110">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/user-profile-settings')}
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full justify-start text-sm"
                  >
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full justify-start text-sm text-destructive hover:text-destructive"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileMenuToggle}
              className="md:hidden"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-slide-down">
            <div className="px-4 py-3 space-y-2">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className={`w-full justify-start ${
                    isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item?.name}
                </Button>
              ))}
              
              {/* Mobile Status Indicators */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Music" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Spotify</span>
                  </div>
                  <span className={`text-xs ${spotifyConnected ? 'text-success' : 'text-warning'}`}>
                    {spotifyConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Camera" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Camera</span>
                  </div>
                  <span className={`text-xs ${cameraPermission ? 'text-success' : 'text-muted-foreground'}`}>
                    {cameraPermission ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
};

export default Header;