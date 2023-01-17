import { Button } from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScanItem = ({ vrScanObject }: { vrScanObject: VrScan }) => {
  return (
    <div
      style={{
        margin: `8px`,
        padding: `16px`,
        width: '195px',
        background: 'white',
        borderRadius: '8px'
      }}
    >
      <img width="100%" src={vrScanObject.thumb} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>{vrScanObject.name}</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px'
        }}
      >
        <Button
          variant="outlined"
          endIcon={<RemoveCircleOutlineIcon />}
          sx={{
            color: 'red',
            borderColor: 'red'
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default VrScanItem;
