import React from 'react';
import FiltersContainer from './components/Filters/FiltersContainer';
import VrScansList from './components/VrScans/VrScansList';

const ExplorePage = () => {
  return (
    <div
      style={{
        display: 'flex'
      }}
      data-cy="explorepageContainer"
    >
      <div
        style={{
          width: '196px',
          padding: '16px'
        }}
      >
        <FiltersContainer />
      </div>
      <VrScansList />
    </div>
  );
};

export default ExplorePage;
