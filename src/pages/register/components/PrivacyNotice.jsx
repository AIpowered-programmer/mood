import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacyNotice = ({ onAccept, isAccepted = false }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const privacySections = [
    {
      id: 'data-collection',
      title: 'What Data We Collect',
      icon: 'Database',
      content: `We collect the following types of information to provide you with personalized music recommendations:

Account Information:
• Email address and name for account creation
• Password (encrypted and never stored in plain text)
• Profile preferences and settings

Music Data:
• Spotify listening history and preferences (with your permission)
• Mood selections and emotion detection results
• Playlist creation and interaction data
• Music rating and feedback information

Technical Data:
• Device information and browser type
• IP address and general location (city/region level)
• Usage analytics and app performance data
• Error logs and diagnostic information`
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      icon: 'Target',
      content: `Your data is used exclusively to enhance your MoodTunes experience:

Personalization:
• Generate mood-based music recommendations
• Create personalized playlists and collections
• Improve emotion detection accuracy over time
• Customize app interface and features

Service Delivery:
• Authenticate your account and maintain security
• Sync data across your devices
• Provide customer support and troubleshooting
• Send important account and service updates

Analytics & Improvement:
• Analyze usage patterns to improve our algorithms
• Identify and fix technical issues
• Develop new features based on user behavior
• Ensure optimal app performance and reliability`
    },
    {
      id: 'data-protection',
      title: 'How We Protect Your Data',
      icon: 'Shield',
      content: `We implement industry-standard security measures to protect your information:

Technical Safeguards:
• End-to-end encryption for all data transmission
• Secure cloud storage with regular backups
• Multi-factor authentication for account access
• Regular security audits and vulnerability assessments

Privacy by Design:
• Facial recognition processing happens locally on your device
• No biometric data is transmitted or stored on our servers
• Minimal data collection - only what's necessary for functionality
• Automatic data anonymization for analytics purposes

Access Controls:
• Strict employee access controls and training
• Regular access reviews and permission audits
• Secure development practices and code reviews
• Incident response procedures and breach notifications`
    },
    {
      id: 'user-rights',title: 'Your Rights & Controls',icon: 'Settings',
      content: `You have complete control over your data and privacy settings:

Data Access & Control:
• View all data we have about you at any time
• Download a complete copy of your data
• Delete your account and all associated data
• Modify or correct any inaccurate information

Privacy Controls:
• Enable or disable facial recognition features
• Control what data is shared with Spotify
• Manage notification and communication preferences
• Set data retention and deletion preferences

Legal Rights:
• Right to data portability and interoperability
• Right to object to certain data processing
• Right to restrict processing in specific circumstances
• Right to file complaints with data protection authorities

These rights are available regardless of your location and are built into our platform design.`
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Privacy Notice</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Understanding how we handle your data and protect your privacy
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {privacySections?.map((section) => (
            <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section?.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={section?.icon} size={20} className="text-primary" />
                  <span className="font-medium text-card-foreground">{section?.title}</span>
                </div>
                <Icon 
                  name={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>
              
              {expandedSection === section?.id && (
                <div className="px-4 pb-4 border-t border-border bg-muted/20">
                  <div className="pt-4">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {section?.content}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="mt-6 bg-success/5 border border-success/20 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={18} className="mr-2 text-success" />
            Key Privacy Commitments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start space-x-2">
              <Icon name="Lock" size={14} className="mt-0.5 text-success flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                Local emotion processing - no biometric data leaves your device
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Trash2" size={14} className="mt-0.5 text-success flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                Complete data deletion available at any time
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Eye" size={14} className="mt-0.5 text-success flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                Full transparency - view all data we have about you
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="UserX" size={14} className="mt-0.5 text-success flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                No data sharing with third parties without consent
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <Icon name="Mail" size={16} className="mr-2 text-primary" />
            Questions About Privacy?
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Our privacy team is here to help. Contact us with any questions or concerns about how we handle your data.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              className="text-xs"
            >
              privacy@moodtunes.com
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              className="text-xs"
            >
              Full Privacy Policy
            </Button>
          </div>
        </div>

        {/* Acceptance */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                By creating an account, you acknowledge that you have read and understood our privacy practices.
              </p>
            </div>
            {isAccepted && (
              <div className="flex items-center text-success">
                <Icon name="CheckCircle" size={16} className="mr-2" />
                <span className="text-sm font-medium">Acknowledged</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;