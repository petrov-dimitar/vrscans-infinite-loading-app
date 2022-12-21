import React from 'react';
import { Toolbar } from './components/Toolbar';

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default Layout;