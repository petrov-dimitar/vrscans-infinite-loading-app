import React from 'react';
interface ImageButtonProps {
  src: string;
  text: string;
  textColor?: string;
  onClick: () => VoidFunction;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  src,
  text,
  onClick,
  textColor,
  icon
}) => {
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
      {icon || <img height={20} width={20} src={src} />}
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
