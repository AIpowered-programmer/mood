import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import SpotifyConnection from './components/SpotifyConnection';
import PermissionsSection from './components/PermissionsSection';
import PrivacyNotice from './components/PrivacyNotice';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    notifications: false,
    location: false
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const steps = [
    { id: 1, title: 'Account Details', icon: 'User' },
    { id: 2, title: 'Connect Spotify', icon: 'Music' },
    { id: 3, title: 'Permissions', icon: 'Shield' },
    { id: 4, title: 'Privacy Notice', icon: 'FileText' }
  ];

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleSpotifyConnect = (connected) => {
    setSpotifyConnected(connected);
    if (connected) {
      setTimeout(() => setCurrentStep(3), 1000);
    }
  };

  const handlePermissionChange = (permission, value) => {
    setPermissions(prev => ({ ...prev, [permission]: value }));
  };

  const handlePrivacyAccept = () => {
    setPrivacyAccepted(true);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const registrationData = {
        ...formData,
        spotifyConnected,
        permissions,
        privacyAccepted,
        registeredAt: new Date()?.toISOString()
      };
      
      console.log('Registration successful:', registrationData);
      
      // Navigate to dashboard
      navigate('/mood-input-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return Object.keys(formData)?.length > 0;
      case 2:
        return true; // Spotify connection is optional
      case 3:
        return true; // Permissions are optional
      case 4:
        return privacyAccepted;
      default:
        return false;
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationForm 
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <SpotifyConnection 
              onConnect={handleSpotifyConnect}
              isConnected={spotifyConnected}
              isLoading={isLoading}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={() => setCurrentStep(3)}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <PermissionsSection 
              onPermissionChange={handlePermissionChange}
              permissions={permissions}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={() => setCurrentStep(4)}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <PrivacyNotice 
              onAccept={handlePrivacyAccept}
              isAccepted={privacyAccepted}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(3)}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={handleFinalSubmit}
                loading={isLoading}
                disabled={!privacyAccepted || isLoading}
                iconName="UserPlus"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Music" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  MoodTunes
                </h1>
                <p className="text-sm text-muted-foreground">Create your account</p>
              </div>
            </div>

            {/* Login Link */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-primary hover:text-primary/80"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    currentStep >= step?.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'bg-background border-border text-muted-foreground'
                  }`}>
                    {currentStep > step?.id ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </p>
                  </div>
                </div>
                
                {index < steps?.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                    currentStep > step?.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-lg shadow-lg">
          <div className="p-6 md:p-8">
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={steps?.[currentStep - 1]?.icon} size={24} className="text-primary" />
                <h2 className="text-2xl font-semibold text-card-foreground">
                  {steps?.[currentStep - 1]?.title}
                </h2>
              </div>
              <p className="text-muted-foreground">
                {currentStep === 1 && "Let's start by creating your account with basic information."}
                {currentStep === 2 && "Connect your Spotify account to access personalized music recommendations."}
                {currentStep === 3 && "Configure privacy settings and grant permissions for enhanced features."}
                {currentStep === 4 && "Review our privacy practices and complete your registration."}
              </p>
            </div>

            {/* Step Content */}
            {getStepContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            By creating an account, you agree to our{' '}
            <button className="text-primary hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-primary hover:underline">Privacy Policy</button>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date()?.getFullYear()} MoodTunes. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;