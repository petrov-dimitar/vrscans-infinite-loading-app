import { TextField } from 'modules/common/components/TextField';
import React from 'react';

const FiltersConteiner = () => {
  return (
    <div
      style={{
        width: '196px',
        padding: '16px'
      }}
    >
      Filters Container
      <TextField placeholder="Search" />
    </div>
  );
};

export default FiltersConteiner;
