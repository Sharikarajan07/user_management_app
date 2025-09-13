import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EditUserFormHeader from './components/EditUserFormHeader';
import EditUserFormFields from './components/EditUserFormFields';
import EditUserFormValidation from './components/EditUserFormValidation';
import EditUserFormActions from './components/EditUserFormActions';
import EditUserFormToast from './components/EditUserFormToast';
import apiService from '../../services/apiService';

const EditUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToEdit = location?.state?.user;

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Mock users data for demonstration
  const mockUsers = [
    {
      id: 1,
      username: "john_doe",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1-555-0123",
      location: "New York, NY",
      createdTime: new Date('2024-01-15T10:30:00')
    },
    {
      id: 2,
      username: "sarah_wilson",
      fullName: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phoneNumber: "+1-555-0456",
      location: "Los Angeles, CA",
      createdTime: new Date('2024-02-20T14:45:00')
    },
    {
      id: 3,
      username: "mike_johnson",
      fullName: "Mike Johnson",
      email: "mike.johnson@example.com",
      phoneNumber: "+1-555-0789",
      location: "Chicago, IL",
      createdTime: new Date('2024-03-10T09:15:00')
    }
  ];

  // Initialize form with user data or redirect if no user
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        username: userToEdit?.username || '',
        fullName: userToEdit?.fullName || '',
        email: userToEdit?.email || '',
        phoneNumber: userToEdit?.phoneNumber || '',
        location: userToEdit?.location || ''
      });
    } else {
      // If no user data, try to get from mock data (for demo purposes)
      const mockUser = mockUsers?.[0]; // Use first user as default
      setFormData({
        username: mockUser?.username,
        fullName: mockUser?.fullName,
        email: mockUser?.email,
        phoneNumber: mockUser?.phoneNumber,
        location: mockUser?.location
      });
    }
  }, [userToEdit]);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/?.test(formData?.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/?.test(formData?.phoneNumber?.replace(/[-\s\(\)]/g, ''))) {
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

  const handleUpdate = async () => {
    if (!validateForm()) {
      setToast({
        show: true,
        type: 'error',
        message: 'Please fix the validation errors before updating'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update user via API
      const userData = {
        username: formData?.username?.trim(),
        fullName: formData?.fullName?.trim(),
        email: formData?.email?.trim()?.toLowerCase(),
        phoneNumber: formData?.phoneNumber?.trim(),
        location: formData?.location?.trim()
      };

      const response = await apiService.updateUser(userToEdit?.id, userData);

      if (response.success) {
        // Show success toast
        setToast({
          show: true,
          type: 'success',
          message: 'User updated successfully!'
        });

        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          navigate('/user-dashboard');
        }, 2000);
      }

    } catch (error) {
      console.error('Failed to update user:', error);
      let errorMessage = 'Failed to update user. Please try again.';
      
      // Handle specific error cases
      if (error.message.includes('already exists')) {
        errorMessage = 'Username or email already exists. Please use different values.';
      } else if (error.message.includes('not found')) {
        errorMessage = 'User not found. Please refresh and try again.';
      }

      setToast({
        show: true,
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/user-dashboard');
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const isValid = Object.keys(errors)?.length === 0 && 
    formData?.username && 
    formData?.fullName && 
    formData?.email && 
    formData?.phoneNumber && 
    formData?.location;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <EditUserFormHeader 
          userName={formData?.fullName || formData?.username}
        />
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
            <div className="p-6">
              <EditUserFormValidation 
                errors={errors}
                isValid={isValid}
              />
              
              <EditUserFormFields
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
              />
            </div>
            
            <EditUserFormActions
              onUpdate={handleUpdate}
              onCancel={handleCancel}
              isLoading={isLoading}
              isValid={isValid}
            />
          </div>
        </div>
      </div>
      <EditUserFormToast
        show={toast?.show}
        type={toast?.type}
        message={toast?.message}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default EditUserForm;