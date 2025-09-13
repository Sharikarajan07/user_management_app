import React from 'react';
import Input from '../../../components/ui/Input';

const UserFormFields = ({ formData, errors, onChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  return (
    <div className="space-y-6">
      {/* Username Field */}
      <Input
        label="Username"
        type="text"
        placeholder="Enter username"
        value={formData?.username}
        onChange={handleInputChange('username')}
        error={errors?.username}
        required
        className="w-full"
      />
      {/* Full Name Field */}
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter full name"
        value={formData?.fullName}
        onChange={handleInputChange('fullName')}
        error={errors?.fullName}
        required
        className="w-full"
      />
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter email address"
        value={formData?.email}
        onChange={handleInputChange('email')}
        error={errors?.email}
        required
        description="Please enter a valid email address"
        className="w-full"
      />
      {/* Phone Number Field */}
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        value={formData?.phoneNumber}
        onChange={handleInputChange('phoneNumber')}
        error={errors?.phoneNumber}
        required
        description="Format: +1 (555) 123-4567"
        className="w-full"
      />
      {/* Location Field */}
      <Input
        label="Location"
        type="text"
        placeholder="Enter location"
        value={formData?.location}
        onChange={handleInputChange('location')}
        error={errors?.location}
        required
        className="w-full"
      />
    </div>
  );
};

export default UserFormFields;