import Box from '@mui/material/Box';
import AppAccordion from 'modules/common/components/AppAccordion';
import React from 'react';

const FiltersComponent = ({ title, children }: { title: string; children?: any }) => {
  return (
    <AppAccordion
      sx={{
        margin: '8px',
        background: 'rgb(253, 253, 255)',
        boxShadow: 'none'
      }}
      title={title}
    >
      <Box
        sx={{
          margin: '8px',
          overflow: 'hidden',
          '&:hover': {
            overflowY: 'scroll'
          },
          maxHeight: '170px'
        }}
      >
        {children && children}
      </Box>
    </AppAccordion>
  );
};

export default FiltersComponent;
