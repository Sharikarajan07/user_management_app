import React from 'react';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl mr-4">
          <Icon name="UserPlus" size={24} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Add New User</h1>
          <p className="text-muted-foreground">Create a new user account with required information</p>
        </div>
      </div>
      
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="Info" size={16} className="text-accent mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Required Information</p>
            <p>All fields marked with an asterisk (*) are required. Please ensure email and phone number formats are correct.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;