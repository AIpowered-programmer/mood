import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const [errors, setErrors] = useState({});
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return password?.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(password);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    if (field === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }

    if (field === 'password' && value && !validatePassword(value)) {
      setErrors(prev => ({ 
        ...prev, 
        password: 'Password must be at least 8 characters with uppercase, lowercase, and number' 
      }));
    }

    if (field === 'confirmPassword' && value && value !== formData?.password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
  };

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({ ...prev, [field]: checked }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData?.email)) newErrors.email = 'Please enter a valid email address';
    
    if (!formData?.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData?.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    
    if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreements?.terms) newErrors.terms = 'You must accept the Terms of Service';
    if (!agreements?.privacy) newErrors.privacy = 'You must accept the Privacy Policy';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, agreements });
    }
  };

  const isFormValid = () => {
    return formData?.email && 
           formData?.password && 
           formData?.confirmPassword && 
           formData?.firstName && 
           formData?.lastName && 
           agreements?.terms && 
           agreements?.privacy &&
           Object.keys(errors)?.length === 0;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            className="w-full"
          />
          
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            className="w-full"
          />
        </div>
      </div>
      {/* Account Credentials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Mail" size={20} className="mr-2 text-primary" />
          Account Credentials
        </h3>
        
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this to send you important account updates"
          required
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          description="Must be at least 8 characters with uppercase, lowercase, and number"
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>
      {/* Terms and Agreements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Terms & Privacy
        </h3>
        
        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms of Service"
            description="By checking this, you agree to our terms and conditions"
            checked={agreements?.terms}
            onChange={(e) => handleAgreementChange('terms', e?.target?.checked)}
            error={errors?.terms}
            required
          />
          
          <Checkbox
            label="I agree to the Privacy Policy"
            description="We respect your privacy and protect your personal data"
            checked={agreements?.privacy}
            onChange={(e) => handleAgreementChange('privacy', e?.target?.checked)}
            error={errors?.privacy}
            required
          />
          
          <Checkbox
            label="I'd like to receive marketing emails (optional)"
            description="Get updates about new features and music recommendations"
            checked={agreements?.marketing}
            onChange={(e) => handleAgreementChange('marketing', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isFormValid() || isLoading}
          iconName="UserPlus"
          iconPosition="left"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;