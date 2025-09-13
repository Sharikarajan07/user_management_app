import React from 'react';
import Button from '../../../components/ui/Button';


const EditUserFormActions = ({ 
  onUpdate, 
  onCancel, 
  isLoading, 
  isValid 
}) => {
  return (
    <div className="bg-surface border-t border-border px-6 py-4">
      <div className="flex items-center justify-end space-x-4">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          iconName="X"
          iconPosition="left"
          iconSize={16}
        >
          Cancel
        </Button>
        
        <Button
          variant="default"
          onClick={onUpdate}
          loading={isLoading}
          disabled={!isValid || isLoading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Update User
        </Button>
      </div>
    </div>
  );
};

export default EditUserFormActions;