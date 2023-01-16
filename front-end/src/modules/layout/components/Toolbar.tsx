import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import { useTheme } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import VRIcon from 'assets/vr-headset-icon.svg';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const Toolbar = () => {
  const selectedUser = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();

  const currentPath = useCurrentPath();
  const activeColor = theme.palette.primary.main;

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
        <Link to="/explore">
          <Typography
            sx={{
              fontFamily: 'Clash Grotesk Variable',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '32px',
              lineHeight: '32px',
              color: '#090C02',
              marginLeft: '32px',
              textTransform: 'none'
            }}
          >
            VRscans
            <img
              style={{
                position: 'absolute',
                left: '150px',
                top: '12px'
              }}
              height="20px"
              width="20px"
              src={VRIcon}
            />
          </Typography>
        </Link>

        <div
          style={{
            display: 'flex'
          }}
        >
          <Link to="/explore">
            <ImageButton
              icon={
                <ExploreIcon
                  sx={{
                    fill:
                      currentPath && currentPath[0]?.pathname === '/explore'
                        ? theme.palette.primary.main
                        : 'black'
                  }}
                />
              }
              text="Explore"
              textColor={
                currentPath && currentPath[0]?.pathname === '/explore' ? activeColor : 'black'
              }
            />
          </Link>

          {selectedUser && (
            <Link to="/favorites">
              <ImageButton
                icon={
                  <FavoriteIcon
                    sx={{
                      fill:
                        currentPath && currentPath[0]?.pathname === '/favorites'
                          ? theme.palette.primary.main
                          : 'black'
                    }}
                  />
                }
                text="Favorites"
                textColor={
                  currentPath && currentPath[0]?.pathname === '/favorites' ? activeColor : 'black'
                }
              />
            </Link>
          )}

          {selectedUser ? (
            <>
              <Link to="/profile">
                <ImageButton
                  icon={
                    <AccountCircleIcon
                      sx={{
                        fill:
                          currentPath && currentPath[0]?.pathname === '/profile'
                            ? theme.palette.primary.main
                            : 'black'
                      }}
                    />
                  }
                  text={selectedUser.email}
                  textColor={
                    currentPath && currentPath[0]?.pathname === '/profile' ? activeColor : 'black'
                  }
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
            <ImageButton
              icon={<PersonAddAltIcon />}
              text="Login"
              onClick={() => {
                setIsRegisterModelOpen(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
