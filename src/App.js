// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Services from './pages/Service';
import QuickLinks from './pages/QuickLinks';
import UserSetup from './pages/UserSetup';
import OnboardingTrend from './pages/OnboardingTrend';
import TrafficTrend from './pages/TrafficTrend';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/services" element={<Services />} />
          <Route path="/quick-links" element={<QuickLinks />} />
          <Route path="/user-setup" element={<UserSetup />} />
          <Route path="/onboarding-trend" element={<OnboardingTrend />} />
          <Route path="/traffic-trend" element={<TrafficTrend />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
