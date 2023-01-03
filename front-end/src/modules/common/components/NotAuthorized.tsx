import React from 'react';

const NotAuthorizedPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <h1>This page requires authorization</h1>
    </div>
  );
};

export default NotAuthorizedPage;
