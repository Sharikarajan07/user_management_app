import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditUserFormHeader = ({ userName }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="w-10 h-10"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Edit User
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Update information for {userName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="UserCog" size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default EditUserFormHeader;