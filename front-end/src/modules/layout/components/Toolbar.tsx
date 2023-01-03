import React from 'react';
import SafariIcon from 'assets/safari.svg';
import HeartIcon from 'assets/heart-solid.svg';
import UserIcon from 'assets/user-regular.svg';
import { ImageButton } from 'modules/common/components/ImageButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export const Toolbar = () => {
  const selectedUser = useSelector((state: RootState) => state.auth.user);

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
      <Link to="/">
        <span>App Name</span>
      </Link>

      <div
        style={{
          display: 'flex'
        }}
      >
        <Link to="/explore">
          <ImageButton src={SafariIcon} text="Explore" />
        </Link>

        <Link to="/favorites">
          <ImageButton src={HeartIcon} text="Favorites" />
        </Link>

        {selectedUser ? (
          <Link to="/profile">
            <ImageButton src={selectedUser.photo} text={selectedUser.email} />
          </Link>
        ) : (
          <Link to="/profile">
            <ImageButton src={UserIcon} text="Profile" />
          </Link>
        )}
      </div>
    </div>
  );
};
