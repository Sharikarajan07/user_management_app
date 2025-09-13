import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-success-foreground border-success/20';
      case 'error':
        return 'bg-error text-error-foreground border-error/20';
      case 'warning':
        return 'bg-warning text-warning-foreground border-warning/20';
      default:
        return 'bg-primary text-primary-foreground border-primary/20';
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
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`
        flex items-center p-4 rounded-lg border shadow-elevation-2 min-w-80 max-w-md
        ${getToastStyles()}
      `}>
        <Icon name={getIcon()} size={20} className="mr-3 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-fast"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;