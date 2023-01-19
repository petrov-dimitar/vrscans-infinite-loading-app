import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAddScanToUserFavoritesMutation } from 'modules/ExplorePage/redux/vrScansService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import RegisterForm from 'modules/RegisterForm/RegisterComponent';
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import AppModal from 'modules/common/components/AppModal';
import { ProductDisplay } from 'modules/Subscription/components/ProductDisplay';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export interface VrScan {
  id: Number;
  name: String;
  thumb: string;
  manufacturerId: string;
  fileName: string;
}

const VrScanItem = ({ vrScanObject }: { vrScanObject: VrScan }) => {
  const selectedUser = useSelector((state: RootState) => state.auth.user);
  const [isRegisterModalOpen, setIsRegisterModelOpen] = useState(false);
  const [isSubscribedModalOpen, setIsSubscribedModelOpen] = useState(false);

  const [isItemFavorited, setIsItemFavorited] = useState(
    () => selectedUser?.favorites?.filter((favItem) => favItem.id === vrScanObject.id).length > 0
  );

  const [addScanToFavorites, { isError, isSuccess, isLoading }] =
    useAddScanToUserFavoritesMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully added scan to Favorties.');
      setIsItemFavorited(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setIsSubscribedModelOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (!selectedUser) {
      setIsItemFavorited(false);
    }
  }, [selectedUser]);

  return (
    <>
      <div
        style={{
          margin: `8px`,
          padding: `16px`,
          width: '195px',
          background: 'white',
          borderRadius: '8px'
        }}
        data-cy={'explorepageContainer'}
      >
        <RegisterForm
          isModalOpen={isRegisterModalOpen}
          setIsModalOpen={setIsRegisterModelOpen}
          customTitle="Hi, login to your account to like scans!"
        ></RegisterForm>

        <AppModal open={isSubscribedModalOpen} setOpen={setIsSubscribedModelOpen}>
          <Alert severity="error">
            Ups.. it looks like you have reached your free limit of 5 favorite scans. Subscribe for
            unlimited!
          </Alert>

          <ProductDisplay />
        </AppModal>
        <div
          style={{
            textAlign: 'center'
          }}
        >
          <img width="70%" src={vrScanObject.thumb} />
        </div>

        <div>
          <div>{vrScanObject.name}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px'
            }}
          >
            {!isLoading ? (
              <Button
                variant={!isItemFavorited ? 'outlined' : 'standard'}
                endIcon={
                  <FavoriteIcon
                    sx={{
                      fill: isItemFavorited && 'green'
                    }}
                  />
                }
                onClick={() => {
                  if (selectedUser) {
                    addScanToFavorites(vrScanObject);
                  } else {
                    setIsRegisterModelOpen(true);
                  }
                }}
                disabled={isItemFavorited}
              >
                {!isItemFavorited ? 'Add' : 'ADDED'}
              </Button>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VrScanItem;
