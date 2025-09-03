import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AccountSection = ({ user, onUpdateProfile, onChangePassword, onConnectSpotify, spotifyConnected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData?.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData?.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordData?.newPassword?.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSaveProfile = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await onUpdateProfile(formData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await onChangePassword(passwordData);
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
    } catch (error) {
      setErrors({ password: 'Failed to change password. Please check your current password.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSpotifyConnect = async () => {
    setLoading(true);
    try {
      await onConnectSpotify();
    } catch (error) {
      setErrors({ spotify: 'Failed to connect to Spotify. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Profile Information</h3>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Edit
            </Button>
          )}
        </div>

        {errors?.general && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{errors?.general}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            placeholder="Optional"
          />

          {isEditing && (
            <div className="flex space-x-3 pt-2">
              <Button
                variant="default"
                onClick={handleSaveProfile}
                loading={loading}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || ''
                  });
                  setErrors({});
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Password Change */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Password & Security</h3>
          {!isChangingPassword && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(true)}
              iconName="Lock"
              iconPosition="left"
              iconSize={16}
            >
              Change Password
            </Button>
          )}
        </div>

        {errors?.password && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{errors?.password}</p>
          </div>
        )}

        {isChangingPassword ? (
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordData?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              error={errors?.currentPassword}
              required
            />

            <Input
              label="New Password"
              type="password"
              value={passwordData?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              error={errors?.newPassword}
              description="Must be at least 8 characters long"
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />

            <div className="flex space-x-3 pt-2">
              <Button
                variant="default"
                onClick={handleChangePassword}
                loading={loading}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setErrors({});
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Last changed: {user?.lastPasswordChange || 'Never'}
          </p>
        )}
      </div>
      {/* Spotify Integration */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Spotify Integration</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            spotifyConnected 
              ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
          }`}>
            <div className={`w-2 h-2 rounded-full ${spotifyConnected ? 'bg-success' : 'bg-warning'} animate-pulse`} />
            <span>{spotifyConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>

        {errors?.spotify && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{errors?.spotify}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {spotifyConnected 
              ? 'Your Spotify account is connected. You can create and export playlists directly to your Spotify library.'
              : 'Connect your Spotify account to enable playlist creation and music streaming features.'
            }
          </p>

          {spotifyConnected ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
                <Icon name="Music" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Connected as: {user?.spotifyUsername || 'spotify_user'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Premium account • Last sync: {new Date()?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleSpotifyConnect}
                loading={loading}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Reconnect Account
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={handleSpotifyConnect}
              loading={loading}
              iconName="Music"
              iconPosition="left"
              iconSize={16}
              className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
            >
              Connect Spotify Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSection;