import React, { useEffect, useRef, useState } from 'react';

import { selectUser } from 'redux/auth.slice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ProductDisplay } from 'modules/Subscription/components/ProductDisplay';
import { Box, Button, TextField, Toolbar, Typography } from '@mui/material';
import { useUpdateUserMutation } from 'redux/auth.service';
import Avatar from '@mui/material/Avatar';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';

const ProfilePage = () => {
  const [success, setSuccess] = useState(false);
  const user = useSelector(selectUser);
  const [updateUser, updateUserResponse] = useUpdateUserMutation();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSuccess(true);
    }
    if (query.get('canceled')) {
      toast.error('Canceled Action');
      setSuccess(false);
    }
  }, []);

  useEffect(() => {
    if (success) {
      toast.success('Successfully subbscribed');
    }
  }, [success]);

  useEffect(() => {
    setEmailValue(user?.email);
    setFirstNameValue(user?.firstName);
    setLastNameValue(user?.lastName);
  }, [user]);

  useEffect(() => {
    if (updateUserResponse.isSuccess) {
      toast.success('Successfully updated User');
    }
    if (updateUserResponse.isError) {
      toast.success(updateUserResponse.error);
    }
  }, [updateUserResponse]);

  const [emailValue, setEmailValue] = useState<any>(user?.email || '');
  const [firstNameValue, setFirstNameValue] = useState<any>(user?.firstName || '');
  const [lastNameValue, setLastNameValue] = useState<any>(user?.lastName || '');
  const [newImage, setNewImage] = useState<any>();

  const onSubmitHandlerUpdateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Call the Upload API
    updateUser(formData);
  };

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const onFirstnameChange = (e) => {
    setFirstNameValue(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastNameValue(e.target.value);
  };

  const inputImageRef = useRef();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h4">User Profile</Typography>
        </Toolbar>
        <Box
          sx={{
            padding: 3
          }}
        >
          <form
            action="/upload"
            method="PUT"
            encType="multipart/form-data"
            onSubmit={onSubmitHandlerUpdateUser}
          >
            <input
              ref={inputImageRef}
              type="file"
              name="image"
              style={{
                display: 'none'
              }}
              onChange={(e) => {
                const objectUrl = URL.createObjectURL(e.target.files[0]);
                setNewImage(objectUrl);
              }}
            />

            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <Avatar
                src={newImage || `${process.env.REACT_APP_API_URL}/image/${user?.photo}`}
                sx={{ width: 200, height: 200, cursor: 'pointer' }}
                onClick={() => inputImageRef?.current?.click()}
              />
            </Box>
            <TextField
              fullWidth
              name="email"
              variant="standard"
              value={emailValue || ''}
              label="Email"
              onChange={onEmailChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                marginBottom: 2
              }}
            />
            <TextField
              placeholder="First Name"
              fullWidth
              name="firstName"
              variant="standard"
              value={firstNameValue || ''}
              label="First Name"
              onChange={onFirstnameChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                marginBottom: 2
              }}
            />
            <TextField
              placeholder="Last Name"
              fullWidth
              name="lastName"
              variant="standard"
              value={lastNameValue || ''}
              onChange={onLastNameChange}
              label="Last Name"
              InputLabelProps={{ shrink: true }}
              sx={{
                marginBottom: 2
              }}
            />

            <Button type="submit" fullWidth variant="outlined">
              Update
            </Button>
          </form>
        </Box>

        <Toolbar
          sx={{
            marginTop: 3
          }}
        >
          <Typography variant="h4">Subscription</Typography>
        </Toolbar>
        <Box
          sx={{
            padding: 3
          }}
        >
          {user?.subscriptionId && user?.subscription.plan.active ? (
            <>
              {user?.subscription.plan.active && (
                <Chip
                  sx={{
                    marginBottom: 2
                  }}
                  label="Subscribed"
                  icon={<DoneIcon />}
                  color="primary"
                />
              )}
              <form action={`${process.env.REACT_APP_API_URL}/create-portal-session`} method="POST">
                <input
                  type="hidden"
                  id="session-id"
                  name="stripeCustomer"
                  value={user.stripeCustomer}
                />
                <button id="checkout-and-portal-button" type="submit">
                  Manage Subscription
                </button>
              </form>
            </>
          ) : (
            <ProductDisplay />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
