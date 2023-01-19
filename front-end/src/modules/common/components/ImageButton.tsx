import React from 'react';
interface ImageButtonProps {
  src: string;
  text: string;
  textColor?: string;
  onClick: () => VoidFunction;
}

export const ImageButton: React.FC<ImageButtonProps> = ({ text, onClick, textColor, icon }) => {
  return (
    <div
      style={{
        paddingLeft: '8px',
        paddingRight: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {icon}
      <span
        style={{
          color: textColor
        }}
      >
        {text}
      </span>
    </div>
  );
};
