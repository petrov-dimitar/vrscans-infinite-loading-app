import Layout from 'modules/layout';
import VrScansList from 'modules/ExplorePage';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <div>
            <Routes>
              <Route path="/explore" element={<VrScansList />} />
              <Route path="/profile" element={<div>Profile page</div>} />
              <Route path="/favorites" element={<div>Favorites page</div>} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </>
  );
};

export default App;
