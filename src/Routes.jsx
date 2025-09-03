import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PlaylistManagement from './pages/playlist-management';
import LoginPage from './pages/login';
import UserProfileSettings from './pages/user-profile-settings';
import MoodInputDashboard from './pages/mood-input-dashboard';
import MusicRecommendations from './pages/music-recommendations';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/playlist-management" element={<PlaylistManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/mood-input-dashboard" element={<MoodInputDashboard />} />
        <Route path="/music-recommendations" element={<MusicRecommendations />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
