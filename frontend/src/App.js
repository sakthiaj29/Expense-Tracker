// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Transaction from './components/scripts/Transaction';
import Home from './components/scripts/Home';
import LeftMenu from './components/scripts/LeftMenu';
import SignIn from './components/scripts/SignIn';
import CreateAccount from './components/scripts/CreateAccount';
import './App.css';

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const showLeftMenu = currentPath === '/dashboard' || currentPath === '/transaction';

  return (
    <div className="app">
      {showLeftMenu && <LeftMenu />}
      <Routes>
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/createaccount' element={<CreateAccount />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/home" element={<Navigate to="/dashboard" />} />

  {/* Catch-all route to handle undefined paths */}
  <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
