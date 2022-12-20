import React from 'react';
import SafariIcon from 'assets/safari.svg';
import HeartIcon from 'assets/heart-solid.svg';
import UserIcon from 'assets/user-regular.svg';
import { ImageButton } from './ImageButton';

export const Toolbar = () => {
  return (
    <div
      style={{
        height: '64px',
        background: '#FDFDFF',
        boxShadow: '0px 2px 16px rgba(125, 131, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '8px',
        paddingRight: '8px'
      }}
    >
      <span>App Name</span>
      <div
        style={{
          display: 'flex'
        }}
      >
        <ImageButton src={SafariIcon} text="Explore" />
        <ImageButton src={HeartIcon} text="Favorites" />
        <ImageButton src={UserIcon} text="Profile" />
      </div>
    </div>
  );
};
