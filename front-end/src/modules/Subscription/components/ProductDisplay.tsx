import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth.slice';

export const ProductDisplay = () => {
  const user = useSelector(selectUser);
  return (
    <section>
      <form action={`${process.env.REACT_APP_API_URL}/create-checkout-session`} method="POST">
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="email" value={user?.email ?? ''} />
        <input type="hidden" name="lookup_key" value="pr20" />
        <div
          style={{
            width: '100%',
            textAlign: 'center'
          }}
        >
          <h3>Subscribe for full functionality</h3>
          <Typography>$20.00 / month</Typography>
          <Button
            sx={{
              color: 'white'
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </section>
  );
};
