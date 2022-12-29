import Layout from 'modules/layout';
import VrScansList from 'modules/ExplorePage';
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router basename="/lazy-loading-vrscans-library">
        <Layout>
          <div>
            <Routes>
              <Route path="/explore" element={<VrScansList />} />
              <Route path="/profile" element={<div>Profile page</div>} />
              <Route path="/favorites" element={<div>Favorites page</div>} />
              <Route path="*" element={<Navigate to="/explore" replace />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </>
  );
};

export default App;
