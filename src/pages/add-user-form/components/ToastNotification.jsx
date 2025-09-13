import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ToastNotification = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-success-foreground border-success';
      case 'error':
        return 'bg-error text-error-foreground border-error';
      case 'warning':
        return 'bg-warning text-warning-foreground border-warning';
      default:
        return 'bg-accent text-accent-foreground border-accent';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`
        flex items-center p-4 rounded-lg border shadow-elevation-2 min-w-80 max-w-md
        ${getToastStyles()}
      `}>
        <Icon name={getIcon()} size={20} className="mr-3 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="ml-3 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-fast"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;