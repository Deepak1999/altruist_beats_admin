import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavBar from './components/Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavBarRoutes = ['/', '/profile', '/home'];
  const showNavBar = !noNavBarRoutes.includes(location.pathname);

  return (
    <div>
      {showNavBar && <NavBar />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
};

export default App;