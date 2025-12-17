
// // // import React, { useState, useEffect } from 'react';
// // // import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import LoginPage from './LoginPage';
// // // import NavBar from './components/Navbar';
// // // import PostCreateProjects from './components/PostCreateProjects';
// // // import UpdateProjectHierarchy from './components/UpdateProjectHierarchy';
// // // import AddProjectUsers from './components/AddProjectUsers';
// // // import SignUpUsers from './components/SignUpUsers';       
// // // import CreateSingleProject from './components/CreateSingleProject';
// // // import AddMultipleProjectUsers from './components/AddSingleMultipleProjectUsers';
// // // import UpdateMultipleHierarchy from './components/UpdateSingleMultipleProjectUsers';
// // // import ViewProjectHierarchies from './components/ViewProjectHierarchies';
// // // import Loader from './components/Loader';
// // // import HomePage from './components/HomePage';
// // // import ProfilePage from './components/ProfilePage';
// // // import FileManagement from './components/FileManagement ';
// // // import HierarchyManagement from './components/HierarchyManagement';
// // // import UsersManagement from './components/UsersManagement';
// // // import Add_Rent from './components/Rent/Add_Rent';
// // // import Projects from './components/Projects';
// // // import Purchase from './components/Purchase-Create/Purchase';
// // // import Users from './components/Users/Users';
// // // import 'font-awesome/css/font-awesome.min.css';
// // // import EmailAnnouncement from './components/Announcements/EmailAnnouncement';
// // // import X from "./components/Hierarchy/x";
// // // import Y from "./components/Hierarchy/y"
// // // import A from "./components/Hierarchy/a"
// // // import Z from "./components/Hierarchy/z"
// // // import B from "./components/Hierarchy/b"
// // // import C from "./components/Hierarchy/c"
// // // import "bootstrap/dist/js/bootstrap.bundle.min.js";


// // // const Layout = ({ children }) => {
// // //   const location = useLocation();
// // //   const [loading, setLoading] = useState(false);

// // //   const noNavBarRoutes = ['/', '/profile'];
// // //   const showNavBar = !noNavBarRoutes.includes(location.pathname);

// // //   useEffect(() => {
// // //     setLoading(true);
// // //     const timer = setTimeout(() => {
// // //       setLoading(false);
// // //     }, 0);
// // //     return () => clearTimeout(timer);
// // //   }, [location.pathname]);

// // //   return (
// // //     <div>
// // //       {showNavBar && <NavBar />}
// // //       {loading ? <Loader loading={loading} /> : children}
// // //     </div>
// // //   );
// // // };

// // // const App = () => {

// // //   return (
// // //     <Router>

// // //       <Layout>
// // //         <Routes>
// // //           <Route path="/" element={<LoginPage />} />
// // //           <Route path="/projects" element={<Projects />} />
// // //            <Route path="/purchase" element={<Purchase />} />
// // //           <Route path='/add-rent' element={<Add_Rent />} />
// // //           <Route path='/announcement' element={<EmailAnnouncement />} />
// // //           <Route path="/home-page" element={<HomePage />} />
// // //           <Route path="/create-projects" element={<PostCreateProjects />} /> 
// // //           <Route path="/update-project-hierarchy" element={<UpdateProjectHierarchy />} />
// // //           <Route path="/add-project-users" element={<AddProjectUsers />} />
// // //           <Route path="/sign-up-users" element={<SignUpUsers />} />
// // //           <Route path="/create-single-project" element={<CreateSingleProject />} />
// // //           <Route path="/add-multiple-project-users" element={<AddMultipleProjectUsers />} />
// // //           <Route path="/update-multiple-hierarchy" element={<UpdateMultipleHierarchy />} />
// // //           <Route path="/view-project-hierarchies" element={<ViewProjectHierarchies />} />
// // //           <Route path="/navbar" element={<NavBar />} />
// // //           <Route path="/profile" element={<ProfilePage />} />
// // //           <Route path="/file-management" element={<FileManagement />} />
// // //           <Route path="/users-management" element={<UsersManagement />} />
// // //           <Route path="/hierarchy-management" element={<HierarchyManagement />} />
// // //           <Route path="/users" element={<Users />} />
// // //           <Route path="/b" element={<B />} />
// // //           <Route path="/a" element={<A />} />
// // //           <Route path="/x" element={<X />} />
// // //           <Route path="/y" element={<Y />} />
// // //           <Route path="/z" element={<Z />} />
// // //           <Route path="/c" element={<C />} />
// // //         </Routes>
// // //       </Layout>
// // //     </Router>
// // //   );
// // // };


// // // export default App;
// import React, { useState, useEffect } from 'react';
// import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import LoginPage from './LoginPage';
// import NavBar from './components/Navbar';
// import PostCreateProjects from './components/PostCreateProjects';
// import UpdateProjectHierarchy from './components/UpdateProjectHierarchy';
// import AddProjectUsers from './components/AddProjectUsers';
// import SignUpUsers from './components/SignUpUsers';
// import CreateSingleProject from './components/CreateSingleProject';
// import AddMultipleProjectUsers from './components/AddSingleMultipleProjectUsers';
// import UpdateMultipleHierarchy from './components/UpdateSingleMultipleProjectUsers';
// import ViewProjectHierarchies from './components/ViewProjectHierarchies';
// import Loader from './components/Loader';
// import Home from './components/Home';
// import ProfilePage from './components/ProfilePage';
// // import FileManagement from './components/FileManagement';
// import HierarchyManagement from './components/HierarchyManagement';
// import UsersManagement from './components/UsersManagement';
// import Add_Rent from './components/Rent/Add_Rent';
// import Projects from './components/Projects';
// import Purchase from './components/Purchase-Create/Purchase';
// import Users from './components/Users/Users';
// import EmailAnnouncement from './components/Announcements/EmailAnnouncement';
// import UpdateSingleHierarchy from "./components/Hierarchy/UpdateSingleHierarchy";
// import ReplaceHierarchy from "./components/Hierarchy/ReplaceHierarchy";
// import CreateProjects from "./components/Hierarchy/CreateProjects";
// import ReferenceHierarchy from "./components/Hierarchy/ReferenceHierarchy";
// import BulkUpdateProjectHierarchy from "./components/Hierarchy/BulkUpdateProjectHierarchy";
// import BulkReplaceProjectHierarchy from "./components/Hierarchy/BulkReplaceProjectHierarchy";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Api_base_url from './components/Api_base_url/Api_base_url';

// // Map module names to components
// const componentMap = {
//   'LoginPage': LoginPage,
//   'Projects': Projects,
//   'Purchase': Purchase,
//   'Add_Rent': Add_Rent,
//   'EmailAnnouncement': EmailAnnouncement,
//   'Home': Home,
//   'PostCreateProjects': PostCreateProjects,
//   'UpdateProjectHierarchy': UpdateProjectHierarchy,
//   'AddProjectUsers': AddProjectUsers,
//   'SignUpUsers': SignUpUsers,
//   'CreateSingleProject': CreateSingleProject,
//   'AddMultipleProjectUsers': AddMultipleProjectUsers,
//   'UpdateMultipleHierarchy': UpdateMultipleHierarchy,
//   'ViewProjectHierarchies': ViewProjectHierarchies,
//   'NavBar': NavBar,
//   'ProfilePage': ProfilePage,
//   // 'FileManagement': FileManagement,
//   'UsersManagement': UsersManagement,
//   'HierarchyManagement': HierarchyManagement,
//   'Users': Users,
//   'UpdateSingleHierarchy': UpdateSingleHierarchy,
//   'ReplaceHierarchy': ReplaceHierarchy,
//   'CreateProjects': CreateProjects,
//   'ReferenceHierarchy': ReferenceHierarchy,
//   'BulkUpdateProjectHierarchy': BulkUpdateProjectHierarchy,
//   'BulkReplaceProjectHierarchy': BulkReplaceProjectHierarchy
// };

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   const noNavBarRoutes = ['/', '/profile', '/home'];
//   const showNavBar = !noNavBarRoutes.includes(location.pathname);

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 0);
//     return () => clearTimeout(timer);
//   }, [location.pathname]);

//   return (
//     <div>
//       {showNavBar && <NavBar />}
//       {loading ? <Loader loading={loading} /> : children}
//     </div>
//   );
// };

// const App = () => {
//   const [modules, setModules] = useState([]);
//   const roleId = localStorage.getItem('roleId');

//   const fetchModules = async () => {
//     try {
//       const token = localStorage.getItem('jwttoken');
//       const userId = localStorage.getItem('id');

//       const response = await axios.get(`${Api_base_url}/api/users/role/modules`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'userId': userId,
//         },
//       });

//       if (response.data.statusDescription.statusCode === 200) {

//         setModules(response.data.roleModules);
//       }
//       console.log("fetchmodules", response.data.roleModules);
//     } catch (error) {
//       console.error('Error fetching modules:', error);
//     }
//   };
//   // useEffect(() => {
//   //   if (roleId) {
//   //     fetchModules();
//   //   }
//   // }, [roleId]);
//   useEffect(() => {
//     fetchModules();
//   }, []);

//   useEffect(() => {
//     modules.map((module) => {
//       console.log(module.roleId);
//     });
//   }, [modules]);

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           {/* Filter modules based on roleId stored in localStorage */}
//           {modules
//             .filter(module => module.roleId === Number(roleId) && module.active === true) // Ensure type match
//             .map(module => {
//               console.log("Module:", module);
//               if (!module.route) {
//                 console.warn(`Skipping module "${module.moduleName}" because route is missing`);
//                 return null;
//               }
//               if (!componentMap[module.moduleName]) {
//                 console.warn(`Skipping module "${module.moduleName}" because component is missing`);
//                 return null;
//               }

//               const Component = componentMap[module.moduleName];
//               return (
//                 <Route
//                   key={module.moduleId}
//                   path={`/${module.route}`}
//                   element={<Component />}
//                 />
//               );
//             })}

//           {/* Default routes */}
//           <Route path="/" element={<LoginPage fetchModules={fetchModules ? fetchModules : () => { }} />} />
//           <Route path="/home" element={<Home />} />

//         </Routes>

//       </Layout>
//     </Router >
//   );
// };

// export default App;
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
