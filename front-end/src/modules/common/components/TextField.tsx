import React from 'react';

interface TextFieldProps {
  placeholder: string;
  icon?: string;
}

export const TextField: React.FC<TextFieldProps> = ({ icon, placeholder }) => {
  return (
    <input
      style={{
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #FE7F2D'
      }}
      placeholder={placeholder}
    />
  );
};
