import Layout from 'modules/layout';
import VrScansList from 'modules/ExplorePage';
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useGetUserByTokenQuery } from 'redux/auth.service';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth.slice';
import NotAuthorizedPage from 'modules/common/components/NotAuthorized';

const ProtectedRoute: React.FC<any> = () => {
  const user = useSelector(selectUser);
  return user ? <Outlet /> : <Navigate to="/not-authorized" />;
};

const App = () => {
  // Check if authenticated
  useGetUserByTokenQuery({});

  return (
    <>
      <Router basename="/lazy-loading-vrscans-library">
        <Layout>
          <Routes>
            <Route path="/explore" element={<VrScansList />} />
            <Route path="/not-authorized" element={<NotAuthorizedPage />} />
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route path="/profile" element={<div>Profile page</div>} />
            </Route>
            <Route path="/favorites" element={<ProtectedRoute />}>
              <Route path="/favorites" element={<div>Favorites page</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
