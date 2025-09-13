import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EditUserFormToast = ({ 
  show, 
  type, 
  message, 
  onClose 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success',
          text: 'text-success-foreground',
          icon: 'CheckCircle'
        };
      case 'error':
        return {
          bg: 'bg-error',
          text: 'text-error-foreground',
          icon: 'AlertCircle'
        };
      default:
        return {
          bg: 'bg-primary',
          text: 'text-primary-foreground',
          icon: 'Info'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`${styles?.bg} ${styles?.text} rounded-lg shadow-elevation-3 p-4 min-w-80 max-w-md`}>
        <div className="flex items-start space-x-3">
          <Icon name={styles?.icon} size={20} className="mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-current hover:opacity-80 transition-fast"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserFormToast;