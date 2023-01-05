import React from 'react';
import SafariIcon from 'assets/safari.svg';
import HeartIcon from 'assets/heart-solid.svg';
import UserIcon from 'assets/user-regular.svg';
import { ImageButton } from 'modules/common/components/ImageButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useCurrentPath } from 'modules/common/hooks/useCurrentPath';

export const Toolbar = () => {
  const selectedUser = useSelector((state: RootState) => state.auth.user);

  const currentPath = useCurrentPath();
  const activeColor = 'red';

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
          <ImageButton
            src={SafariIcon}
            text="Explore"
            textColor={currentPath && currentPath[0]?.pathname === '/explore' && activeColor}
          />
        </Link>

        <Link to="/favorites">
          <ImageButton
            src={HeartIcon}
            text="Favorites"
            textColor={currentPath && currentPath[0]?.pathname === '/favorites' && activeColor}
          />
        </Link>

        {selectedUser ? (
          <Link to="/profile">
            <ImageButton
              src={selectedUser.photo}
              text={selectedUser.email}
              textColor={currentPath && currentPath[0]?.pathname === '/profile' && activeColor}
            />
          </Link>
        ) : (
          <Link to="/login">
            <ImageButton src={UserIcon} text="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};
