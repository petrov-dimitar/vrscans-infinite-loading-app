import React from 'react';

interface ImageButtonProps {
  src: string;
  text: string;
  onClick: () => VoidFunction
}

export const ImageButton: React.FC<ImageButtonProps> = ({ src, text, onClick }) => {
  return (
    <div
      style={{
        paddingLeft: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <img height={20} width={20} src={src} />
      <span>{text}</span>
    </div>
  );
};
