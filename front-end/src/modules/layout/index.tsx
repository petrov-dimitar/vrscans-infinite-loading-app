import React, { useEffect } from 'react';
import { useLoginMutation } from 'redux/auth.service';
import { setJWT } from 'redux/utils/jwt.utils';
import { Toolbar } from './components/Toolbar';

const Layout: React.FC<any> = ({ children }) => {
  const [login, { data, error }] = useLoginMutation();

  useEffect(() => {
    login({
      email: 'dimitar12@email.com',
      password: '123456'
    });
  }, []);

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log('data', data);
    setJWT(data.token);
  }
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default Layout;
