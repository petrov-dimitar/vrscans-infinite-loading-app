import React from 'react';
import { Toolbar } from './components/Toolbar';

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Toolbar />
      <div
        style={{
          height: 'calc(100% - 64px)'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
