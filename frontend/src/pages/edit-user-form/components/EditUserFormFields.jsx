import React from 'react';
import Input from '../../../components/ui/Input';

const EditUserFormFields = ({ 
  formData, 
  errors, 
  onChange 
}) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Username"
          type="text"
          placeholder="Enter username"
          value={formData?.username}
          onChange={handleInputChange('username')}
          error={errors?.username}
          required
          description="Unique identifier for the user"
        />
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          value={formData?.fullName}
          onChange={handleInputChange('fullName')}
          error={errors?.fullName}
          required
          description="Complete name of the user"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData?.email}
          onChange={handleInputChange('email')}
          error={errors?.email}
          required
          description="Valid email address for communication"
        />
        
        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          value={formData?.phoneNumber}
          onChange={handleInputChange('phoneNumber')}
          error={errors?.phoneNumber}
          required
          description="Contact phone number with country code"
        />
      </div>
      <div className="grid grid-cols-1">
        <Input
          label="Location"
          type="text"
          placeholder="Enter location"
          value={formData?.location}
          onChange={handleInputChange('location')}
          error={errors?.location}
          required
          description="Current location or address"
        />
      </div>
    </div>
  );
};

export default EditUserFormFields;