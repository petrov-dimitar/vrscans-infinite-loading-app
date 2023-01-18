import React, { useEffect, useState } from 'react';

import { selectUser } from 'redux/auth.slice';
import { useSelector } from 'react-redux';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomTreeView from 'modules/common/components/CustomTreeView';
import { toast } from 'react-toastify';
import { ProductDisplay } from 'modules/Subscription/components/ProductDisplay';

const ProfilePage = () => {
  const [success, setSuccess] = useState(false);
  const user = useSelector(selectUser);

  console.log('user', user);

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

  return (
    <>
      <div>User Email: {user?.email}</div>

      <h5>Subscription</h5>
      {user?.subscriptionId ? (
        <>
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
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {user?.subscription && <CustomTreeView renderData={user.subscription} />}
          </TreeView>
        </>
      ) : (
        <ProductDisplay />
      )}
    </>
  );
};

export default ProfilePage;
