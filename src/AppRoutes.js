import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Api_base_url from './components/Api_base_url/Api_base_url';
import LoginPage from './LoginPage';
import Home from './components/Home';
import NavBar from './components/Navbar';
import Loader from './components/Loader';

import PostCreateProjects from './components/PostCreateProjects';
import UpdateProjectHierarchy from './components/UpdateProjectHierarchy';
import AddProjectUsers from './components/AddProjectUsers';
import SignUpUsers from './components/SignUpUsers';
import CreateSingleProject from './components/CreateSingleProject';
import AddMultipleProjectUsers from './components/AddSingleMultipleProjectUsers';
import UpdateMultipleHierarchy from './components/UpdateSingleMultipleProjectUsers';
import ViewProjectHierarchies from './components/ViewProjectHierarchies';
import ProfilePage from './components/ProfilePage';
import HierarchyManagement from './components/HierarchyManagement';
import UsersManagement from './components/UsersManagement';
import Add_Rent from './components/Rent/Add_Rent';
import Projects from './components/Projects';
import Purchase from './components/Purchase-Create/Purchase';
import Users from './components/Users/Users';
import EmailAnnouncement from './components/Announcements/EmailAnnouncement';
import UpdateSingleHierarchy from "./components/Hierarchy/UpdateSingleHierarchy";
import ReplaceHierarchy from "./components/Hierarchy/ReplaceHierarchy";
import CreateProjects from "./components/Hierarchy/CreateProjects";
import ReferenceHierarchy from "./components/Hierarchy/ReferenceHierarchy";
import BulkUpdateProjectHierarchy from "./components/Hierarchy/BulkUpdateProjectHierarchy";
import BulkReplaceProjectHierarchy from "./components/Hierarchy/BulkReplaceProjectHierarchy";
import AddSiteId from "./components/Hierarchy/AddSiteId";
import AddUsers from './components/Hierarchy/AddUsers';
import DownloadHierarchy from './components/Hierarchy/DownloadHierarchy';
// import SignUpUsers from './components/SignUpUsers';

const componentMap = {
  'LoginPage': LoginPage,
  'Projects': Projects,
  'Purchase': Purchase,
  'Add_Rent': Add_Rent,
  'EmailAnnouncement': EmailAnnouncement,
  'Home': Home,
  'PostCreateProjects': PostCreateProjects,
  'UpdateProjectHierarchy': UpdateProjectHierarchy,
  'AddProjectUsers': AddProjectUsers,
  'SignUpUsers': SignUpUsers,
  'CreateSingleProject': CreateSingleProject,
  'AddMultipleProjectUsers': AddMultipleProjectUsers,
  'UpdateMultipleHierarchy': UpdateMultipleHierarchy,
  'ViewProjectHierarchies': ViewProjectHierarchies,
  'NavBar': NavBar,
  'ProfilePage': ProfilePage,
  'UsersManagement': UsersManagement,
  'HierarchyManagement': HierarchyManagement,
  'Users': Users,
  'UpdateSingleHierarchy': UpdateSingleHierarchy,
  'ReplaceHierarchy': ReplaceHierarchy,
  'CreateProjects': CreateProjects,
  'ReferenceHierarchy': ReferenceHierarchy,
  'BulkUpdateProjectHierarchy': BulkUpdateProjectHierarchy,
  'BulkReplaceProjectHierarchy': BulkReplaceProjectHierarchy,
  'AddSiteId': AddSiteId,
  'AddUsers': AddUsers,
  'DownloadHierarchy': DownloadHierarchy,

};

const AppRoutes = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const roleId = localStorage.getItem('roleId');
  const location = useLocation();

  const fetchModules = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwttoken');
      const userId = localStorage.getItem('id');

      const response = await axios.get(`${Api_base_url}/api/users/role/modules`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'userId': userId,
        },
      });

      if (response.data.statusDescription.statusCode === 200) {
        setModules(response.data.roleModules);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      fetchModules();
    }
  }, [location.pathname]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <Routes>
      {modules
        .filter(module => module.roleId === Number(roleId) && module.active === true)
        .map(module => {
          if (!module.route || !componentMap[module.moduleName]) {
            console.warn(`Skipping module "${module.moduleName}" due to missing route or component`);
            return null;
          }

          const Component = componentMap[module.moduleName];
          return (
            <Route key={module.moduleId} path={`/${module.route}`} element={<Component />} />
          );
        })}

      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;