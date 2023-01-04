import Layout from 'modules/layout';
import VrScansList from 'modules/ExplorePage';
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useGetUserByTokenQuery } from 'redux/auth.service';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth.slice';
import NotAuthorizedPage from 'modules/common/components/NotAuthorized';
import FavoritesPage from 'modules/Favorites';
// Load react toastify CSS
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ProtectedRoute: React.FC<any> = () => {
  const { isFetching } = useGetUserByTokenQuery({});
  const user = useSelector(selectUser);
  return !isFetching && !user ? <Navigate to="/not-authorized" /> : <Outlet />;
};

const App = () => {
  // Testing login
  // const [login] = useLoginMutation();

  // useEffect(() => {
  //   login({
  //     email: 'dimitar13@email.com',
  //     password: '123456'
  //   });
  // }, []);

  useGetUserByTokenQuery({});

  return (
    <>
      <ToastContainer hideProgressBar theme="colored" autoClose={5000} position="top-center" />
      <Router basename="/lazy-loading-vrscans-library">
        <Layout>
          <Routes>
            <Route path="/explore" element={<VrScansList />} />
            <Route path="/not-authorized" element={<NotAuthorizedPage />} />
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route path="/profile" element={<div>Profile page</div>} />
            </Route>
            <Route path="/favorites" element={<ProtectedRoute />}>
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
