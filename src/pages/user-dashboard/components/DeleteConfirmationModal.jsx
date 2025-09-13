import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ isOpen, user, onConfirm, onCancel }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg border border-border shadow-elevation-3 p-6 w-full max-w-md mx-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mr-4">
            <Icon name="AlertTriangle" size={24} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Delete User
            </h3>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-foreground mb-4">
            Are you sure you want to delete the following user?
          </p>
          
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-center">
              <Icon name="User" size={16} className="text-muted-foreground mr-2" />
              <span className="font-medium text-foreground">{user?.fullName}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Mail" size={16} className="text-muted-foreground mr-2" />
              <span className="text-muted-foreground">{user?.email}</span>
            </div>
            <div className="flex items-center">
              <Icon name="AtSign" size={16} className="text-muted-foreground mr-2" />
              <span className="text-muted-foreground">@{user?.username}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            iconName="Trash2"
            iconPosition="left"
            className="px-6"
          >
            Delete User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;