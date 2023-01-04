import React from 'react';
import HeartIcon from 'assets/heart-solid.svg';
import { ImageButton } from 'modules/common/components/ImageButton';
import { useAddScanToUserFavoritesMutation } from 'modules/ExplorePage/redux/vrScansService';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScanItem = ({ vrScanObject }: { vrScanObject: VrScan }) => {
  const [addScanToFavorites] = useAddScanToUserFavoritesMutation();

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
          <ImageButton src={HeartIcon} onClick={() => {
            addScanToFavorites(vrScanObject)
          }} />
        </div>
      </div>
      <div>{vrScanObject.manufacturerId}</div>
      <div>{vrScanObject.fileName}</div>
    </div>
  );
};

export default VrScanItem;
