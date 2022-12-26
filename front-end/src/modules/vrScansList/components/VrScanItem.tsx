import React from 'react';
import HeartIcon from 'assets/heart-solid.svg';
import { ImageButton } from 'modules/common/components/ImageButton';

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
          display: 'flex'
        }}
      >
        <div>{vrScanObject.name}</div>
        <div>
          <ImageButton src={HeartIcon} />
        </div>
      </div>
      <div>{vrScanObject.manufacturerId}</div>
      <div>{vrScanObject.fileName}</div>
    </div>
  );
};

export default VrScanItem;
