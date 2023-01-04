import React from 'react';
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
        padding: `8px`,
        maxWidth: '195px'
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
        <div>
          remove
        </div>
      </div>
      <div>{vrScanObject.manufacturerId}</div>
      <div>{vrScanObject.fileName}</div>
    </div>
  );
};

export default VrScanItem;
