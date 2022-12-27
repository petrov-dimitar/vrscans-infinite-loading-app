import React from 'react';
import FiltersConteiner from './components/FiltersContainer';
import VrScansList from './components/VrScansList';

const ExplorePage = () => {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          width: '196px',
          padding: '16px'
        }}
      >
        <FiltersConteiner />
      </div>
      <VrScansList />
    </div>
  );
};

export default ExplorePage;
