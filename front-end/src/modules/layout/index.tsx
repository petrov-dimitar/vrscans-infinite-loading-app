import React from 'react';
import { Toolbar } from './components/Toolbar';
import RegisterComponent from '../RegisterForm/RegisterComponent'

const Layout: React.FC<any> = ({ children }) => {
  const paddingTop = '16px';
  return (
    <>
    
      <Toolbar />
      <div
        style={{
          paddingTop: '16px',
          height: `calc(100% - 64px - ${paddingTop})`
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
