import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PrivacySection = ({ 
  privacySettings, 
  onUpdatePrivacySettings, 
  onDeleteBiometricData, 
  onExportData,
  cameraPermission,
  onRequestCameraPermission 
}) => {
  const [settings, setSettings] = useState({
    allowFacialRecognition: privacySettings?.allowFacialRecognition || false,
    storeBiometricData: privacySettings?.storeBiometricData || false,
    shareAnonymousData: privacySettings?.shareAnonymousData || false,
    allowDataAnalytics: privacySettings?.allowDataAnalytics || false,
    retainMoodHistory: privacySettings?.retainMoodHistory || true,
    dataRetentionPeriod: privacySettings?.dataRetentionPeriod || '12months'
  });
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await onUpdatePrivacySettings(settings);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBiometricData = async () => {
    setLoading(true);
    try {
      await onDeleteBiometricData();
      setShowDeleteConfirm(false);
      setSettings(prev => ({ ...prev, storeBiometricData: false }));
    } catch (error) {
      console.error('Failed to delete biometric data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      await onExportData();
    } catch (error) {
      console.error('Failed to export data:', error);
    } finally {
      setLoading(false);
    }
  };

  const retentionOptions = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '12months', label: '12 Months' },
    { value: 'indefinite', label: 'Keep Forever' }
  ];

  return (
    <div className="space-y-6">
      {/* Camera Permissions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Camera Permissions</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            cameraPermission 
              ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
          }`}>
            <Icon name={cameraPermission ? "Camera" : "CameraOff"} size={14} />
            <span>{cameraPermission ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Camera access is required for facial emotion recognition. Your camera feed is processed locally and never transmitted to our servers.
          </p>

          {!cameraPermission && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Camera Access Required</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable camera permissions to use facial emotion recognition features.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            variant={cameraPermission ? "outline" : "default"}
            onClick={onRequestCameraPermission}
            iconName="Camera"
            iconPosition="left"
            iconSize={16}
          >
            {cameraPermission ? 'Manage Camera Settings' : 'Enable Camera Access'}
          </Button>
        </div>
      </div>
      {/* Facial Recognition Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Facial Recognition</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Allow Facial Recognition"
            description="Enable emotion detection through facial analysis"
            checked={settings?.allowFacialRecognition}
            onChange={(e) => handleSettingChange('allowFacialRecognition', e?.target?.checked)}
            disabled={!cameraPermission}
          />

          <Checkbox
            label="Store Biometric Data"
            description="Save facial recognition patterns for improved accuracy (can be deleted anytime)"
            checked={settings?.storeBiometricData}
            onChange={(e) => handleSettingChange('storeBiometricData', e?.target?.checked)}
            disabled={!settings?.allowFacialRecognition}
          />

          {settings?.storeBiometricData && (
            <div className="ml-6 p-4 bg-muted/50 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Biometric Data Stored</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date()?.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={14}
                >
                  Delete Data
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Data Privacy */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Data Privacy</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Share Anonymous Usage Data"
            description="Help improve our service by sharing anonymized usage patterns"
            checked={settings?.shareAnonymousData}
            onChange={(e) => handleSettingChange('shareAnonymousData', e?.target?.checked)}
          />

          <Checkbox
            label="Allow Data Analytics"
            description="Enable analytics to provide personalized music recommendations"
            checked={settings?.allowDataAnalytics}
            onChange={(e) => handleSettingChange('allowDataAnalytics', e?.target?.checked)}
          />

          <Checkbox
            label="Retain Mood History"
            description="Keep your mood detection history for trend analysis"
            checked={settings?.retainMoodHistory}
            onChange={(e) => handleSettingChange('retainMoodHistory', e?.target?.checked)}
          />

          {settings?.retainMoodHistory && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Data Retention Period
              </label>
              <select
                value={settings?.dataRetentionPeriod}
                onChange={(e) => handleSettingChange('dataRetentionPeriod', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {retentionOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Data Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
            <div>
              <p className="text-sm font-medium text-card-foreground">Export Your Data</p>
              <p className="text-xs text-muted-foreground">
                Download all your mood history, preferences, and account data
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              loading={loading}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <div>
              <p className="text-sm font-medium text-destructive">Delete All Data</p>
              <p className="text-xs text-muted-foreground">
                Permanently remove all your data from our servers
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              iconSize={14}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      {/* Save Settings */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          loading={loading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save Privacy Settings
        </Button>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-semibold text-card-foreground">Delete Biometric Data</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently delete all stored facial recognition patterns. This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={handleDeleteBiometricData}
                loading={loading}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete Data
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySection;