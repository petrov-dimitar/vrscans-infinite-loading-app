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
      {icon || (
        <div
          style={{
            borderRadius: '50%'
          }}
        >
          <img
            style={{
              display: 'block',
              maxWidth: '30px',
              maxHeight: '30px',
              width: 'auto',
              height: 'auto'
            }}
            src={src}
          />
        </div>
      )}
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
