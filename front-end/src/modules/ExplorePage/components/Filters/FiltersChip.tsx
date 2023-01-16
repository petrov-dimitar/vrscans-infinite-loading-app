import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function FiltersChip({ label, handleDelete = () => {} }) {
  return (
    <Chip
      sx={{
        margin: '2px'
      }}
      label={label}
      onDelete={handleDelete}
    />
  );
}
