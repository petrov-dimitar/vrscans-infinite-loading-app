import React from 'react';
import { Toolbar } from './components/Toolbar';

const Layout: React.FC<any> = ({ children }) => {
  const paddingTop = '16px';
  const marginBottom = '16px';

  return (
    <>
      <Toolbar />
      <div
        style={{
          paddingTop: '16px',
          height: `calc(100% - 64px - ${marginBottom} - ${paddingTop})`,
          background: '#FDFDFF'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
