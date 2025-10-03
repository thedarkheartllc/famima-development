"use client";

import { useState, useEffect } from "react";
import {
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheck className='text-green-600' />;
      case "error":
        return <FaTimes className='text-red-600' />;
      case "warning":
        return <FaExclamationTriangle className='text-yellow-600' />;
      case "info":
      default:
        return <FaInfoCircle className='text-blue-600' />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${getStyles()}`}
      >
        <div className='flex-shrink-0'>{getIcon()}</div>
        <div className='flex-1'>
          <p className='text-sm font-medium'>{message}</p>
        </div>
        <button
          onClick={handleClose}
          className='flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <FaTimes className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type?: "success" | "error" | "info" | "warning";
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
