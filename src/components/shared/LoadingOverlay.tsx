import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Even geduld...' 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="alert"
      aria-busy="true"
    >
      <div className="bg-white p-8 rounded-xl shadow-xl text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}; 