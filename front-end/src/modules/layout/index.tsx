import React from 'react';
import { useGetUserByTokenQuery } from 'redux/auth.service';
import { Toolbar } from './components/Toolbar';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/auth.slice';

const Layout: React.FC<any> = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData } = useGetUserByTokenQuery({});
  if (userData) {
    dispatch(updateUser(userData));
  }
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default Layout;
