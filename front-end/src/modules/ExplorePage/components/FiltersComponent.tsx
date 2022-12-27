import React from 'react';

const FiltersComponent = ({ title, children }: { title: string; children?: any }) => {
  return (
    <>
      <h3>{title}</h3>
      <div
        style={{
          height: '200px',
          overflowY: 'scroll',
          margin: '8px'
        }}
      >
        <div>{children && children}</div>
      </div>
    </>
  );
};

export default FiltersComponent;
