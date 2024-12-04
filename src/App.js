import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './LoginPage';
import NavBar from './components/Navbar';
import PostCreateProjects from './components/PostCreateProjects';
import UpdateProjectHierarchy from './components/UpdateProjectHierarchy';
import AddProjectUsers from './components/AddProjectUsers';
import SignUpUsers from './components/SignUpUsers';
import CreateSingleProject from './components/CreateSingleProject';
import AddMultipleProjectUsers from './components/AddSingleMultipleProjectUsers';
import UpdateMultipleHierarchy from './components/UpdateSingleMultipleProjectUsers';
import ViewProjectHierarchies from './components/ViewProjectHierarchies';
import Loader from './components/Loader';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import FileManagement from './components/FileManagement ';
import HierarchyManagement from './components/HierarchyManagement';
import UsersManagement from './components/UsersManagement';
import Add_Rent from './components/Rent/Add_Rent';
import Projects from './components/Projects';
import Users from './components/Users/Users';
import 'font-awesome/css/font-awesome.min.css';


const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const noNavBarRoutes = ['/', '/profile'];
  const showNavBar = !noNavBarRoutes.includes(location.pathname);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      {showNavBar && <NavBar />}
      {loading ? <Loader loading={loading} /> : children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/add-rent' element={<Add_Rent />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/create-projects" element={<PostCreateProjects />} />
          <Route path="/update-project-hierarchy" element={<UpdateProjectHierarchy />} />
          <Route path="/add-project-users" element={<AddProjectUsers />} />
          <Route path="/sign-up-users" element={<SignUpUsers />} />
          <Route path="/create-single-project" element={<CreateSingleProject />} />
          <Route path="/add-multiple-project-users" element={<AddMultipleProjectUsers />} />
          <Route path="/update-multiple-hierarchy" element={<UpdateMultipleHierarchy />} />
          <Route path="/view-project-hierarchies" element={<ViewProjectHierarchies />} />
          <Route path="/navbar" element={<NavBar />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/file-management" element={<FileManagement />} />
          <Route path="/users-management" element={<UsersManagement />} />
          <Route path="/hierarchy-management" element={<HierarchyManagement />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
