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
      <FiltersConteiner />
      <VrScansList />
    </div>
  );
};

export default ExplorePage;
