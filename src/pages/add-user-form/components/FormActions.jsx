import React from 'react';
import Button from '../../../components/ui/Button';

const FormActions = ({ onSave, onCancel, isValid, isSubmitting }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
      <Button
        variant="default"
        onClick={onSave}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        iconName="Save"
        iconPosition="left"
        className="flex-1 sm:flex-none sm:min-w-32"
      >
        Save User
      </Button>
      
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        iconName="X"
        iconPosition="left"
        className="flex-1 sm:flex-none sm:min-w-32"
      >
        Cancel
      </Button>
    </div>
  );
};

export default FormActions;