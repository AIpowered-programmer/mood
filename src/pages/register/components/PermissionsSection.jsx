import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PermissionsSection = ({ onPermissionChange, permissions = {} }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [testingCamera, setTestingCamera] = useState(false);

  const handlePermissionToggle = (permission, value) => {
    onPermissionChange(permission, value);
  };

  const testCameraAccess = async () => {
    setTestingCamera(true);
    try {
      // Simulate camera access test
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPermissionChange('camera', true);
      setTestingCamera(false);
    } catch (error) {
      setTestingCamera(false);
      // Handle camera access error
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const permissionSections = [
    {
      id: 'camera',
      title: 'Camera Access',
      icon: 'Camera',
      required: false,
      description: 'Allow MoodTunes to access your camera for facial emotion recognition',
      details: `Our facial recognition technology analyzes your facial expressions to detect emotions and recommend music that matches your mood. This feature is optional but enhances your music discovery experience.

Key points:
• Facial recognition processing happens locally on your device
• No facial images are stored or transmitted to our servers
• You can disable this feature at any time in settings
• Alternative mood input methods are always available`,
      enabled: permissions?.camera || false
    },
    {
      id: 'microphone',
      title: 'Microphone Access',
      icon: 'Mic',
      required: false,
      description: 'Optional: Allow voice commands and audio mood detection',
      details: `Microphone access enables voice-based mood input and audio analysis features. This is completely optional and can be used alongside or instead of camera-based emotion detection.

Features include:
• Voice commands for music control
• Audio tone analysis for mood detection
• Hands-free playlist navigation
• Voice-based search functionality`,
      enabled: permissions?.microphone || false
    },
    {
      id: 'notifications',
      title: 'Browser Notifications',
      icon: 'Bell',
      required: false,
      description: 'Receive notifications about new music recommendations and features',
      details: `Browser notifications keep you updated about:
• New music recommendations based on your mood patterns
• Weekly mood and music insights
• New features and app updates
• Playlist updates and social features

You can customize notification preferences in your account settings.`,
      enabled: permissions?.notifications || false
    },
    {
      id: 'location',
      title: 'Location Access',
      icon: 'MapPin',
      required: false,
      description: 'Optional: Enhance recommendations with location-based mood insights',
      details: `Location data helps provide contextual music recommendations based on:
• Weather conditions in your area
• Time of day and seasonal patterns
• Local events and cultural context
• Regional music preferences and trends

Location data is used only for recommendation enhancement and is never shared.`,
      enabled: permissions?.location || false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Icon name="Shield" size={24} className="text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Privacy & Permissions</h2>
          <p className="text-sm text-muted-foreground">
            Configure your privacy settings and grant permissions for enhanced features
          </p>
        </div>
      </div>
      {/* Permission Cards */}
      <div className="space-y-4">
        {permissionSections?.map((section) => (
          <div key={section?.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    section?.enabled ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={section?.icon} 
                      size={20} 
                      className={section?.enabled ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-card-foreground">{section?.title}</h3>
                      {section?.required && (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{section?.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {section?.id === 'camera' && !section?.enabled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={testCameraAccess}
                      loading={testingCamera}
                      disabled={testingCamera}
                      iconName="TestTube"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Test Camera
                    </Button>
                  )}
                  
                  <Checkbox
                    checked={section?.enabled}
                    onChange={(e) => handlePermissionToggle(section?.id, e?.target?.checked)}
                    size="default"
                  />
                </div>
              </div>

              {/* Expandable Details */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {section?.enabled && (
                    <div className="flex items-center text-xs text-success">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      <span>Enabled</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection(section?.id)}
                  iconName={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {expandedSection === section?.id ? 'Less Info' : 'More Info'}
                </Button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedSection === section?.id && (
              <div className="px-4 pb-4 border-t border-border bg-muted/30">
                <div className="pt-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {section?.details}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Privacy Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Your Privacy is Protected</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
                <span>All emotion detection processing happens locally on your device</span>
              </div>
              <div className="flex items-center">
                <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
                <span>No biometric data is stored on our servers</span>
              </div>
              <div className="flex items-center">
                <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
                <span>You can revoke permissions at any time</span>
              </div>
              <div className="flex items-center">
                <Icon name="Check" size={14} className="mr-2 text-success flex-shrink-0" />
                <span>Alternative input methods are always available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsSection;