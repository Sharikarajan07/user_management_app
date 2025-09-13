import React from 'react';
import Icon from '../../../components/AppIcon';

const EditUserFormValidation = ({ errors, isValid }) => {
  const errorCount = Object.keys(errors)?.filter(key => errors?.[key])?.length;

  if (errorCount === 0) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-sm font-medium text-success">
            All fields are valid
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-2">
        <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-error mb-2">
            Please fix the following errors:
          </h4>
          <ul className="text-sm text-error space-y-1">
            {Object.entries(errors)?.map(([field, error]) => 
              error && (
                <li key={field} className="flex items-center space-x-1">
                  <Icon name="Dot" size={12} />
                  <span>{error}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditUserFormValidation;