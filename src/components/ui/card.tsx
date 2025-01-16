import React from 'react';

// Card Component
export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`rounded-lg border shadow-md p-4 ${className}`}>{children}</div>;
};

// CardHeader Component
export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`border-b pb-2 mb-4 ${className}`}>{children}</div>;
};

// CardTitle Component
export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
};

// CardContent Component
export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`text-gray-700 ${className}`}>{children}</div>;
};
