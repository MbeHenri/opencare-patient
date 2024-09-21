// ToastNotifications.tsx
import React from 'react';
import { ToastContainer, toast, ToastOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Options par défaut pour les notifications
const defaultOptions: ToastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

interface ToastNotificationsProps {
  type: 'success' | 'error' | 'info';
  message: string;
  position?: ToastPosition;
  options?: ToastOptions;
}

// Composant Toast personnalisé
export const ToastNotifications: React.FC<ToastNotificationsProps> = ({ type, message, position = "top-right", options }) => {
  const notify = () => {
    switch (type) {
      case 'success':
        toast.success(message, { ...defaultOptions, ...options });
        break;
      case 'error':
        toast.error(message, { ...defaultOptions, ...options });
        break;
      case 'info':
        toast.info(message, { ...defaultOptions, ...options });
        break;
      default:
        toast(message, { ...defaultOptions, ...options });
    }
  };

  React.useEffect(() => {
    notify();
  }, [type, message, options]);

  return <ToastContainer position={position} />;
};
