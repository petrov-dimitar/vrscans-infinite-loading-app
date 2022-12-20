import React from 'react';

export const Toolbar = () => {
  return (
    <div
      style={{
        height: '64px',
        background: '#FDFDFF',
        boxShadow: '0px 2px 16px rgba(125, 131, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <span>App Name</span>
      <div>
        <img src="assets/safari.svg" />
        <img src="assets/heart-solid.svg" />
        <img src="assets/user-regular.svg" />
      </div>
    </div>
  );
};
