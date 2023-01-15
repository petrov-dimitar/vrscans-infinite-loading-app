import React, { useState } from 'react';
import SafariIcon from 'assets/safari.svg';
import HeartIcon from 'assets/heart-solid.svg';
import UserIcon from 'assets/user-regular.svg';
import { ImageButton } from 'modules/common/components/ImageButton';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { useCurrentPath } from 'modules/common/hooks/useCurrentPath';
import { logout } from 'redux/auth.slice';
import RegisterForm from '../../RegisterForm/RegisterComponent';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const Toolbar = () => {
  const selectedUser = useSelector((state: RootState) => state.auth.user);

  const currentPath = useCurrentPath();
  const activeColor = 'red';

  const dispatch = useDispatch();

  const [isRegisterModalOpen, setIsRegisterModelOpen] = useState(false);
  return (
    <>
      <RegisterForm
        isModalOpen={isRegisterModalOpen}
        setIsModalOpen={setIsRegisterModelOpen}
      ></RegisterForm>
      <div
        style={{
          height: '64px',
          background: '#FDFDFF',
          boxShadow: '0px 2px 16px rgba(125, 131, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '8px',
          paddingRight: '8px',
          marginBottom: '16px'
        }}
      >
        <Link to="/">
          <Typography variant="h4">SCAO</Typography>
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
            <>
              <Link to="/profile">
                <ImageButton
                  icon={<AccountCircleIcon />}
                  text={selectedUser.email}
                  textColor={currentPath && currentPath[0]?.pathname === '/profile' && activeColor}
                />
              </Link>
              <ImageButton
                text="logout"
                onClick={() => {
                  dispatch(logout());
                }}
                icon={<ExitToAppIcon />}
              />
            </>
          ) : (
            // <Link to="/login">
            <ImageButton
              src={UserIcon}
              text="Login"
              onClick={() => {
                setIsRegisterModelOpen(true);
              }}
            />
            // </Link>
          )}
        </div>
      </div>
    </>
  );
};
