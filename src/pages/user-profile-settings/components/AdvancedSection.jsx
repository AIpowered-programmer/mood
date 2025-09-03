import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AdvancedSection = ({ advancedSettings, onUpdateAdvancedSettings }) => {
  const [settings, setSettings] = useState({
    sessionTimeout: advancedSettings?.sessionTimeout || '30',
    offlineMoodSelection: advancedSettings?.offlineMoodSelection || true,
    reducedMotion: advancedSettings?.reducedMotion || false,
    highContrast: advancedSettings?.highContrast || false,
    screenReader: advancedSettings?.screenReader || false,
    keyboardNavigation: advancedSettings?.keyboardNavigation || false,
    autoSavePreferences: advancedSettings?.autoSavePreferences || true,
    debugMode: advancedSettings?.debugMode || false,
    betaFeatures: advancedSettings?.betaFeatures || false,
    analyticsOptOut: advancedSettings?.analyticsOptOut || false,
    cacheSize: advancedSettings?.cacheSize || '100',
    apiTimeout: advancedSettings?.apiTimeout || '10'
  });
  const [loading, setLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await onUpdateAdvancedSettings(settings);
    } catch (error) {
      console.error('Failed to update advanced settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetToDefaults = async () => {
    setLoading(true);
    try {
      const defaultSettings = {
        sessionTimeout: '30',
        offlineMoodSelection: true,
        reducedMotion: false,
        highContrast: false,
        screenReader: false,
        keyboardNavigation: false,
        autoSavePreferences: true,
        debugMode: false,
        betaFeatures: false,
        analyticsOptOut: false,
        cacheSize: '100',
        apiTimeout: '10'
      };
      setSettings(defaultSettings);
      await onUpdateAdvancedSettings(defaultSettings);
      setShowResetConfirm(false);
    } catch (error) {
      console.error('Failed to reset settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' },
    { value: 'never', label: 'Never expire' }
  ];

  const cacheSizeOptions = [
    { value: '50', label: '50 MB' },
    { value: '100', label: '100 MB' },
    { value: '200', label: '200 MB' },
    { value: '500', label: '500 MB' }
  ];

  const apiTimeoutOptions = [
    { value: '5', label: '5 seconds' },
    { value: '10', label: '10 seconds' },
    { value: '15', label: '15 seconds' },
    { value: '30', label: '30 seconds' }
  ];

  return (
    <div className="space-y-6">
      {/* Session Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Session Management</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Session Timeout
            </label>
            <select
              value={settings?.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sessionTimeoutOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Automatically log out after period of inactivity
            </p>
          </div>

          <Checkbox
            label="Auto-save Preferences"
            description="Automatically save changes without requiring manual confirmation"
            checked={settings?.autoSavePreferences}
            onChange={(e) => handleSettingChange('autoSavePreferences', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Offline Features */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Offline Features</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Offline Mood Selection"
            description="Allow mood input using text and emoji when camera is unavailable"
            checked={settings?.offlineMoodSelection}
            onChange={(e) => handleSettingChange('offlineMoodSelection', e?.target?.checked)}
          />

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Cache Size Limit
            </label>
            <select
              value={settings?.cacheSize}
              onChange={(e) => handleSettingChange('cacheSize', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {cacheSizeOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum storage for offline music previews and mood data
            </p>
          </div>
        </div>
      </div>
      {/* Accessibility */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Accessibility</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Reduce Motion"
            description="Minimize animations and transitions for motion sensitivity"
            checked={settings?.reducedMotion}
            onChange={(e) => handleSettingChange('reducedMotion', e?.target?.checked)}
          />

          <Checkbox
            label="High Contrast Mode"
            description="Increase color contrast for better visibility"
            checked={settings?.highContrast}
            onChange={(e) => handleSettingChange('highContrast', e?.target?.checked)}
          />

          <Checkbox
            label="Screen Reader Support"
            description="Enhanced compatibility with screen reading software"
            checked={settings?.screenReader}
            onChange={(e) => handleSettingChange('screenReader', e?.target?.checked)}
          />

          <Checkbox
            label="Enhanced Keyboard Navigation"
            description="Improved keyboard shortcuts and focus indicators"
            checked={settings?.keyboardNavigation}
            onChange={(e) => handleSettingChange('keyboardNavigation', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Performance */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Performance</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              API Request Timeout
            </label>
            <select
              value={settings?.apiTimeout}
              onChange={(e) => handleSettingChange('apiTimeout', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {apiTimeoutOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum wait time for Spotify API and emotion detection requests
            </p>
          </div>

          <Checkbox
            label="Opt-out of Analytics"
            description="Disable performance and usage analytics collection"
            checked={settings?.analyticsOptOut}
            onChange={(e) => handleSettingChange('analyticsOptOut', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Developer Options */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Developer Options</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Debug Mode"
            description="Show detailed logging and diagnostic information"
            checked={settings?.debugMode}
            onChange={(e) => handleSettingChange('debugMode', e?.target?.checked)}
          />

          <Checkbox
            label="Beta Features Access"
            description="Enable experimental features and early access to new functionality"
            checked={settings?.betaFeatures}
            onChange={(e) => handleSettingChange('betaFeatures', e?.target?.checked)}
          />

          {settings?.betaFeatures && (
            <div className="ml-6 p-4 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Beta Features Warning</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Beta features may be unstable and could affect app performance. Use with caution.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* System Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">System Information</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
            <span className="text-sm text-muted-foreground">App Version</span>
            <span className="text-sm font-medium text-card-foreground">2.1.0</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
            <span className="text-sm text-muted-foreground">Browser</span>
            <span className="text-sm font-medium text-card-foreground">Chrome 120.0</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
            <span className="text-sm text-muted-foreground">Last Updated</span>
            <span className="text-sm font-medium text-card-foreground">Jan 2, 2025</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
            <span className="text-sm text-muted-foreground">Cache Usage</span>
            <span className="text-sm font-medium text-card-foreground">45 MB / 100 MB</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          loading={loading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Save Advanced Settings
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowResetConfirm(true)}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Reset to Defaults
        </Button>
      </div>
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="RotateCcw" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-card-foreground">Reset to Defaults</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              This will reset all advanced settings to their default values. Your other preferences will not be affected.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleResetToDefaults}
                loading={loading}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
              >
                Reset Settings
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowResetConfirm(false)}
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

export default AdvancedSection;