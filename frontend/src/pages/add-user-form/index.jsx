import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FormHeader from './components/FormHeader';
import UserFormFields from './components/UserFormFields';
import FormActions from './components/FormActions';
import ToastNotification from './components/ToastNotification';
import apiService from '../../services/apiService';

const AddUserForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    location: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex?.test(phone?.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Full Name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone Number validation
    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Location validation
    if (!formData?.location?.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData?.location?.length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setToast({
        isVisible: true,
        message: 'Please correct the errors before submitting',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user via API
      const userData = {
        username: formData?.username?.trim(),
        fullName: formData?.fullName?.trim(),
        email: formData?.email?.trim()?.toLowerCase(),
        phoneNumber: formData?.phoneNumber?.trim(),
        location: formData?.location?.trim()
      };

      const response = await apiService.createUser(userData);

      if (response.success) {
        setToast({
          isVisible: true,
          message: 'User created successfully!',
          type: 'success'
        });

        // Navigate back to dashboard after short delay
        setTimeout(() => {
          navigate('/user-dashboard');
        }, 2000);
      }

    } catch (error) {
      console.error('Failed to create user:', error);
      let errorMessage = 'Failed to create user. Please try again.';
      
      // Handle specific error cases
      if (error.message.includes('already exists')) {
        errorMessage = 'Username or email already exists. Please use different values.';
      } else if (error.message.includes('Validation')) {
        errorMessage = 'Please check your input and try again.';
      }

      setToast({
        isVisible: true,
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/user-dashboard');
  };

  const isFormValid = () => {
    return formData?.username?.trim() &&
           formData?.fullName?.trim() &&
           formData?.email?.trim() &&
           formData?.phoneNumber?.trim() &&
           formData?.location?.trim() &&
           Object.keys(errors)?.length === 0;
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <FormHeader />
          
          <div className="bg-card rounded-xl border border-border shadow-elevation-1 p-6">
            <UserFormFields
              formData={formData}
              errors={errors}
              onChange={handleFieldChange}
            />
            
            <FormActions
              onSave={handleSave}
              onCancel={handleCancel}
              isValid={isFormValid()}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
      <ToastNotification
        message={toast?.message}
        type={toast?.type}
        isVisible={toast?.isVisible}
        onClose={closeToast}
      />
    </div>
  );
};

export default AddUserForm;