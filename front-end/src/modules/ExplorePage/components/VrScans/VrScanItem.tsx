import React, { useEffect } from 'react';
import HeartIcon from 'assets/heart-solid.svg';
import { ImageButton } from 'modules/common/components/ImageButton';
import { useAddScanToUserFavoritesMutation } from 'modules/ExplorePage/redux/vrScansService';
import { toast } from 'react-toastify';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScanItem = ({ vrScanObject }: { vrScanObject: VrScan }) => {
  const [addScanToFavorites, { isError, isSuccess, error }] = useAddScanToUserFavoritesMutation();
  useEffect(() => {
    if (isSuccess) {
      console.log('success');
      toast.success('Successfully added scan to Favorties.');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error');
      toast.error(error.data.message);
    }
  }, [isError]);

  return (
    <div
      style={{
        margin: `8px`,
        padding: `8px`,
        width: '195px',
        background: 'white'
      }}
    >
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <img width="70%" src={vrScanObject.thumb} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>{vrScanObject.name}</div>
        <div>
          <ImageButton
            src={HeartIcon}
            onClick={() => {
              addScanToFavorites(vrScanObject);
            }}
          />
        </div>
      </div>
      <div>{vrScanObject.manufacturerId}</div>
      <div>{vrScanObject.fileName}</div>
    </div>
  );
};

export default VrScanItem;
