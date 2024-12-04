
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
// // // // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // // import './Navbar.css';
// // // // // import profileIcon from '../assests/profile.png';
// // // // // import beats from '../assests/beats.png'

// // // // // const NavBar = () => {
// // // // //     const [activeMainTab, setActiveMainTab] = useState('file-management');
// // // // //     const [activeSubTab, setActiveSubTab] = useState('create-projects');
// // // // //     const [showLogoutModal, setShowLogoutModal] = useState(false);
// // // // //     const [username, setUsername] = useState('');
// // // // //     const navigate = useNavigate();
// // // // //     const location = useLocation();

// // // // //     const isLoggedIn = !!localStorage.getItem('jwttoken');
// // // // //     useEffect(() => {
// // // // //         const name = localStorage.getItem('username');
// // // // //         if (name) {
// // // // //             setUsername(name);
// // // // //         }
// // // // //     }, []);
// // // // //     const handleLogout = () => {
// // // // //         setShowLogoutModal(true);
// // // // //     };

// // // // //     const closeLogoutModal = () => {
// // // // //         setShowLogoutModal(false);
// // // // //     };
// // // // //     const handleConfirmLogout = async () => {
// // // // //         const userId = localStorage.getItem('id');
// // // // //         const token = localStorage.getItem('jwttoken');

// // // // //         if (!token || !userId) {
// // // // //             console.error('Token or User ID is missing');
// // // // //             return;
// // // // //         }

// // // // //         try {
// // // // //             const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
// // // // //                 headers: {
// // // // //                     'Authorization': `Bearer ${token}`,
// // // // //                     'userId': userId,
// // // // //                 }
// // // // //             });

// // // // //             if (response.status !== 200) {
// // // // //                 console.error('Logout failed:', response.status);
// // // // //                 throw new Error(`Logout failed with status: ${response.status}`);
// // // // //             }

// // // // //             // Clear the local storage
// // // // //             localStorage.removeItem('jwttoken');
// // // // //             localStorage.removeItem('id');
// // // // //             localStorage.removeItem('username');
// // // // //             console.log('Logout successful, token and userId removed');
// // // // //             navigate('/');
// // // // //         } catch (error) {
// // // // //             console.error('Logout failed:', error);
// // // // //         } finally {
// // // // //             setShowLogoutModal(false);
// // // // //         }
// // // // //     };

// // // // //     // const handleConfirmLogout = async () => {
// // // // //     //     const userId = localStorage.getItem('id');
// // // // //     //     const token = localStorage.getItem('jwttoken');

// // // // //     //     if (!token || !userId) {
// // // // //     //         console.error('Token or User ID is missing');
// // // // //     //         return;
// // // // //     //     }

// // // // //     //     try {
// // // // //     //         const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
// // // // //     //             headers: {
// // // // //     //                 'Authorization': `Bearer ${token}`,
// // // // //     //                 'userId': userId,
// // // // //     //             }
// // // // //     //         });

// // // // //     //         if (!response.ok) {
// // // // //     //             const errorMessage = await response.text();
// // // // //     //             console.error('Logout failed:', errorMessage);
// // // // //     //             throw new Error(`Logout failed with status: ${response.status}`);
// // // // //     //         }

// // // // //     //         localStorage.removeItem('jwttoken');
// // // // //     //         localStorage.removeItem('id');
// // // // //     //         localStorage.removeItem('username');
// // // // //     //         console.log('Logout successful, token and userId removed');
// // // // //     //         navigate('/login');
// // // // //     //     } catch (error) {
// // // // //     //         console.error('Logout failed:', error);
// // // // //     //     } finally {
// // // // //     //         setShowLogoutModal(false);
// // // // //     //     }
// // // // //     // };

// // // // //     const handleMainTabSelect = (tab) => {
// // // // //         setActiveMainTab(tab);
// // // // //         setActiveSubTab(tab === 'file-management' ? 'create-projects' : tab === 'users-management' ? 'sign-up-users' : 'update-multiple-hierarchy');
// // // // //         navigate(`/${tab}`);
// // // // //     };

// // // // //     const handleSubTabSelect = (tab) => {
// // // // //         setActiveSubTab(tab);
// // // // //         switch (tab) {
// // // // //             case 'create-projects':
// // // // //                 navigate('/create-projects');
// // // // //                 break;
// // // // //             case 'update-project-hierarchy':
// // // // //                 navigate('/update-project-hierarchy');
// // // // //                 break;
// // // // //             case 'add-project-users':
// // // // //                 navigate('/add-project-users');
// // // // //                 break;
// // // // //             case 'sign-up-users':
// // // // //                 navigate('/sign-up-users');
// // // // //                 break;
// // // // //             case 'create-single-project':
// // // // //                 navigate('/create-single-project');
// // // // //                 break;
// // // // //             case 'add-multiple-project-users':
// // // // //                 navigate('/add-multiple-project-users');
// // // // //                 break;
// // // // //             case 'update-multiple-hierarchy':
// // // // //                 navigate('/update-multiple-hierarchy');
// // // // //                 break;
// // // // //             case 'view-project-hierarchies':
// // // // //                 navigate('/view-project-hierarchies');
// // // // //                 break;
// // // // //             default:
// // // // //                 break;
// // // // //         }
// // // // //     };

// // // // //     useEffect(() => {
// // // // //         const path = location.pathname;

// // // // //         if (path.includes('/file-management')) {
// // // // //             setActiveMainTab('file-management');
// // // // //             setActiveSubTab('create-projects');
// // // // //         } else if (path.includes('/users-management')) {
// // // // //             setActiveMainTab('users-management');
// // // // //             setActiveSubTab('sign-up-users');
// // // // //         } else if (path.includes('/update-multiple-hierarchy')) {
// // // // //             setActiveMainTab('hierarchy-management');
// // // // //             setActiveSubTab('view-project-hierarchies');
// // // // //         }
// // // // //     }, [location.pathname]);

// // // // //     return (
// // // // //         <>
// // // // //             <Navbar className="color" expand="lg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
// // // // //                 <img src={beats} className='beats-img' style={{
// // // // //                     width: '26px',
// // // // //                     height: '26px',
// // // // //                     borderRadius: '50%',
// // // // //                     objectFit: 'cover',
// // // // //                     filter: 'brightness(0) invert(1)',
// // // // //                     borderRadius: '1px solid white',
// // // // //                     marginLeft: '10px ',
// // // // //                     marginRight: '30px '
// // // // //                 }} />
// // // // //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
// // // // //                 <Navbar.Collapse id="basic-navbar-nav">
// // // // //                     <Nav
// // // // //                         className="mr-auto"
// // // // //                     >
// // // // //                         <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
// // // // //                             File Management
// // // // //                         </Nav.Link>
// // // // //                         <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
// // // // //                             Users Management
// // // // //                         </Nav.Link>
// // // // //                         <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
// // // // //                             Hierarchy Management
// // // // //                         </Nav.Link>
// // // // //                     </Nav>
// // // // //                     <Nav
// // // // //                     // className="ml-auto"
// // // // //                     >
// // // // //                         {isLoggedIn ? (
// // // // //                             <Dropdown align="end">
// // // // //                                 <Dropdown.Toggle
// // // // //                                     style={{
// // // // //                                         backgroundColor: '#1b7ae7',
// // // // //                                         color: 'white',
// // // // //                                         border: 'none',
// // // // //                                         display: 'flex',
// // // // //                                         alignItems: 'center',
// // // // //                                     }}
// // // // //                                     id="dropdown-basic"
// // // // //                                     bsPrefix="toggle-no-caret"
// // // // //                                 >
// // // // //                                     <span style={{ marginRight: '10px', color: 'white' }}>
// // // // //                                         Welcome, {username.replace('.com', '')}
// // // // //                                     </span><img

// // // // //                                         src={profileIcon}
// // // // //                                         alt="Profile Icon"
// // // // //                                         style={{
// // // // //                                             width: '26px',
// // // // //                                             height: '26px',
// // // // //                                             borderRadius: '50%',
// // // // //                                             objectFit: 'cover',
// // // // //                                             filter: 'brightness(0) invert(1)',
// // // // //                                         }}
// // // // //                                     />
// // // // //                                 </Dropdown.Toggle>
// // // // //                                 <Dropdown.Menu>
// // // // //                                     <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
// // // // //                                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
// // // // //                                 </Dropdown.Menu>
// // // // //                             </Dropdown>
// // // // //                         ) : (
// // // // //                             <Link to="/">
// // // // //                                 <Button variant="primary">Login</Button>
// // // // //                             </Link>
// // // // //                         )}
// // // // //                     </Nav>
// // // // //                 </Navbar.Collapse>
// // // // //             </Navbar>

// // // // //             {/* Conditional Sub Tabs Rendering */}
// // // // //             {activeMainTab === 'file-management' && (
// // // // //                 <Tab.Container activeKey={activeSubTab} className="my-tab" style={{ backgroundColor: "blue" }}>
// // // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')} >
// // // // //                                 Create Projects
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')} >
// // // // //                                 Update Project Hierarchy
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')} >
// // // // //                                 Add Project Users
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                     </NavTabs>
// // // // //                 </Tab.Container>
// // // // //             )}
// // // // //             {/* {activeMainTab === 'file-management' && (
// // // // //                 <Tab.Container activeKey={activeSubTab}>
// // // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')} style={{ color: "#48a8dd" }}>
// // // // //                                 Create Projects
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')} style={{ color: "#48a8dd" }}>
// // // // //                                 Update Project Hierarchy
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')} style={{ color: "#48a8dd" }}>
// // // // //                                 Add Project Users
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                     </NavTabs>
// // // // //                 </Tab.Container>
// // // // //             )} */}

// // // // //             {activeMainTab === 'users-management' && (
// // // // //                 <Tab.Container activeKey={activeSubTab}>
// // // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // // //                         <NavTabs.Item style={{ marginLeft: '77px' }}>
// // // // //                             <NavTabs.Link eventKey="sign-up-users" onClick={() => handleSubTabSelect('sign-up-users')} >
// // // // //                                 Sign Up Users
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="create-single-project" onClick={() => handleSubTabSelect('create-single-project')} >
// // // // //                                 Create Single Project
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="add-multiple-project-users" onClick={() => handleSubTabSelect('add-multiple-project-users')} >
// // // // //                                 Add Single/Multiple Project Users
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                     </NavTabs>
// // // // //                 </Tab.Container>
// // // // //             )}

// // // // //             {activeMainTab === 'hierarchy-management' && (
// // // // //                 <Tab.Container activeKey={activeSubTab}>
// // // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="update-multiple-hierarchy" onClick={() => handleSubTabSelect('update-multiple-hierarchy')}>
// // // // //                                 Update Multiple Hierarchy
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                         <NavTabs.Item>
// // // // //                             <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
// // // // //                                 View Project Hierarchies
// // // // //                             </NavTabs.Link>
// // // // //                         </NavTabs.Item>
// // // // //                     </NavTabs>
// // // // //                 </Tab.Container>
// // // // //             )}

// // // // //             <Modal show={showLogoutModal} onHide={closeLogoutModal}>
// // // // //                 <Modal.Header closeButton>
// // // // //                     <Modal.Title>Logout Confirmation</Modal.Title>
// // // // //                 </Modal.Header>
// // // // //                 <Modal.Body>Are you sure you want to logout?</Modal.Body>
// // // // //                 <Modal.Footer>
// // // // //                     <Button variant="secondary" onClick={closeLogoutModal}>
// // // // //                         Cancel
// // // // //                     </Button>
// // // // //                     <Button variant="primary" onClick={handleConfirmLogout}>
// // // // //                         Logout
// // // // //                     </Button>
// // // // //                 </Modal.Footer>
// // // // //             </Modal>
// // // // //         </>
// // // // //     );
// // // // // };

// // // // // export default NavBar;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
// // // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // // import './Navbar.css';
// // // // import profileIcon from '../assests/profile.png';
// // // // import beats from '../assests/beats.png';

// // // // const NavBar = () => {
// // // //     const [activeMainTab, setActiveMainTab] = useState('file-management');
// // // //     const [activeSubTab, setActiveSubTab] = useState('create-projects');
// // // //     const [showLogoutModal, setShowLogoutModal] = useState(false);
// // // //     const [username, setUsername] = useState('');
// // // //     const navigate = useNavigate();
// // // //     const location = useLocation();

// // // //     const isLoggedIn = !!localStorage.getItem('jwttoken');

// // // //     useEffect(() => {
// // // //         const name = localStorage.getItem('username');
// // // //         if (name) {
// // // //             setUsername(name);
// // // //         }
// // // //     }, []);

// // // //     const handleLogout = () => {
// // // //         setShowLogoutModal(true);
// // // //     };

// // // //     const closeLogoutModal = () => {
// // // //         setShowLogoutModal(false);
// // // //     };

// // // //     const handleConfirmLogout = async () => {
// // // //         const userId = localStorage.getItem('id');
// // // //         const token = localStorage.getItem('jwttoken');

// // // //         if (!token || !userId) {
// // // //             console.error('Token or User ID is missing');
// // // //             return;
// // // //         }

// // // //         try {
// // // //             const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
// // // //                 headers: {
// // // //                     'Authorization': `Bearer ${token}`,
// // // //                     'userId': userId,
// // // //                 }
// // // //             });

// // // //             if (response.status !== 200) {
// // // //                 console.error('Logout failed:', response.status);
// // // //                 throw new Error(`Logout failed with status: ${response.status}`);
// // // //             }

// // // //             // Clear the local storage
// // // //             localStorage.removeItem('jwttoken');
// // // //             localStorage.removeItem('id');
// // // //             localStorage.removeItem('username');
// // // //             console.log('Logout successful, token and userId removed');
// // // //             navigate('/');
// // // //         } catch (error) {
// // // //             console.error('Logout failed:', error);
// // // //         } finally {
// // // //             setShowLogoutModal(false);
// // // //         }
// // // //     };

// // // //     const handleMainTabSelect = (tab) => {
// // // //         setActiveMainTab(tab);
// // // //         setActiveSubTab(tab === 'file-management' ? 'create-projects' : tab === 'users-management' ? 'sign-up-users' : 'update-multiple-hierarchy');
// // // //         // Navigate to /create-projects when file-management tab is selected
// // // //         if (tab === 'file-management') {
// // // //             navigate('/create-projects');
// // // //         } else {
// // // //             navigate(`/${tab}`);
// // // //         }
// // // //     };

// // // //     const handleSubTabSelect = (tab) => {
// // // //         setActiveSubTab(tab);
// // // //         switch (tab) {
// // // //             case 'create-projects':
// // // //                 navigate('/create-projects');
// // // //                 break;
// // // //             case 'update-project-hierarchy':
// // // //                 navigate('/update-project-hierarchy');
// // // //                 break;
// // // //             case 'add-project-users':
// // // //                 navigate('/add-project-users');
// // // //                 break;
// // // //             case 'sign-up-users':
// // // //                 navigate('/sign-up-users');
// // // //                 break;
// // // //             case 'create-single-project':
// // // //                 navigate('/create-single-project');
// // // //                 break;
// // // //             case 'add-multiple-project-users':
// // // //                 navigate('/add-multiple-project-users');
// // // //                 break;
// // // //             case 'update-multiple-hierarchy':
// // // //                 navigate('/update-multiple-hierarchy');
// // // //                 break;
// // // //             case 'view-project-hierarchies':
// // // //                 navigate('/view-project-hierarchies');
// // // //                 break;
// // // //             default:
// // // //                 break;
// // // //         }
// // // //     };

// // // //     useEffect(() => {
// // // //         const path = location.pathname;

// // // //         if (path.includes('/file-management')) {
// // // //             setActiveMainTab('file-management');
// // // //             setActiveSubTab('create-projects');
// // // //         } else if (path.includes('/users-management')) {
// // // //             setActiveMainTab('users-management');
// // // //             setActiveSubTab('sign-up-users');
// // // //         } else if (path.includes('/update-multiple-hierarchy')) {
// // // //             setActiveMainTab('hierarchy-management');
// // // //             setActiveSubTab('view-project-hierarchies');
// // // //         }
// // // //     }, [location.pathname]);

// // // //     return (
// // // //         <>
// // // //             <Navbar className="color" expand="lg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
// // // //                 <img src={beats} className='beats-img' style={{
// // // //                     width: '26px',
// // // //                     height: '26px',
// // // //                     borderRadius: '50%',
// // // //                     objectFit: 'cover',
// // // //                     filter: 'brightness(0) invert(1)',
// // // //                     marginLeft: '10px',
// // // //                     marginRight: '30px'
// // // //                 }} />
// // // //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
// // // //                 <Navbar.Collapse id="basic-navbar-nav">
// // // //                     <Nav className="mr-auto">
// // // //                         <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
// // // //                             File Management
// // // //                         </Nav.Link>
// // // //                         <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
// // // //                             Users Management
// // // //                         </Nav.Link>
// // // //                         <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
// // // //                             Hierarchy Management
// // // //                         </Nav.Link>
// // // //                     </Nav>
// // // //                     <Nav>
// // // //                         {isLoggedIn ? (
// // // //                             <Dropdown align="end">
// // // //                                 <Dropdown.Toggle
// // // //                                     style={{
// // // //                                         backgroundColor: '#1b7ae7',
// // // //                                         color: 'white',
// // // //                                         border: 'none',
// // // //                                         display: 'flex',
// // // //                                         alignItems: 'center',
// // // //                                     }}
// // // //                                     id="dropdown-basic"
// // // //                                     bsPrefix="toggle-no-caret"
// // // //                                 >
// // // //                                     <span style={{ marginRight: '10px', color: 'white' }}>
// // // //                                         Welcome, {username.replace('.com', '')}
// // // //                                     </span>
// // // //                                     <img
// // // //                                         src={profileIcon}
// // // //                                         alt="Profile Icon"
// // // //                                         style={{
// // // //                                             width: '26px',
// // // //                                             height: '26px',
// // // //                                             borderRadius: '50%',
// // // //                                             objectFit: 'cover',
// // // //                                             filter: 'brightness(0) invert(1)',
// // // //                                         }}
// // // //                                     />
// // // //                                 </Dropdown.Toggle>
// // // //                                 <Dropdown.Menu>
// // // //                                     <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
// // // //                                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
// // // //                                 </Dropdown.Menu>
// // // //                             </Dropdown>
// // // //                         ) : (
// // // //                             <Link to="/">
// // // //                                 <Button variant="primary">Login</Button>
// // // //                             </Link>
// // // //                         )}
// // // //                     </Nav>
// // // //                 </Navbar.Collapse>
// // // //             </Navbar>

// // // //             {/* Conditional Sub Tabs Rendering */}
// // // //             {activeMainTab === 'file-management' && (
// // // //                 <Tab.Container activeKey={activeSubTab} className="my-tab">
// // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')}>
// // // //                                 Create Projects
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')}>
// // // //                                 Update Project Hierarchy
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')}>
// // // //                                 Add Project Users
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                     </NavTabs>
// // // //                 </Tab.Container>
// // // //             )}

// // // //             {activeMainTab === 'users-management' && (
// // // //                 <Tab.Container activeKey={activeSubTab}>
// // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="sign-up-users" onClick={() => handleSubTabSelect('sign-up-users')}>
// // // //                                 Sign Up Users
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="create-single-project" onClick={() => handleSubTabSelect('create-single-project')}>
// // // //                                 Create Single Project
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="add-multiple-project-users" onClick={() => handleSubTabSelect('add-multiple-project-users')}>
// // // //                                 Add Single/Multiple Project Users
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                     </NavTabs>
// // // //                 </Tab.Container>
// // // //             )}

// // // //             {activeMainTab === 'hierarchy-management' && (
// // // //                 <Tab.Container activeKey={activeSubTab}>
// // // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="update-multiple-hierarchy" onClick={() => handleSubTabSelect('update-multiple-hierarchy')}>
// // // //                                 Update Multiple Hierarchy
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                         <NavTabs.Item>
// // // //                             <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
// // // //                                 View Project Hierarchies
// // // //                             </NavTabs.Link>
// // // //                         </NavTabs.Item>
// // // //                     </NavTabs>
// // // //                 </Tab.Container>
// // // //             )}

// // // //             {/* Logout Modal */}
// // // //             <Modal show={showLogoutModal} onHide={closeLogoutModal}>
// // // //                 <Modal.Header closeButton>
// // // //                     <Modal.Title>Confirm Logout</Modal.Title>
// // // //                 </Modal.Header>
// // // //                 <Modal.Body>Are you sure you want to logout?</Modal.Body>
// // // //                 <Modal.Footer>
// // // //                     <Button variant="secondary" onClick={closeLogoutModal}>
// // // //                         Cancel
// // // //                     </Button>
// // // //                     <Button variant="danger" onClick={handleConfirmLogout}>
// // // //                         Logout
// // // //                     </Button>
// // // //                 </Modal.Footer>
// // // //             </Modal>
// // // //         </>
// // // //     );
// // // // };

// // // // export default NavBar;
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
// // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import './Navbar.css';
// // // import profileIcon from '../assests/profile.png';
// // // import beats from '../assests/beats.png';

// // // const NavBar = () => {
// // //     const [activeMainTab, setActiveMainTab] = useState('file-management');
// // //     const [activeSubTab, setActiveSubTab] = useState('create-projects');
// // //     const [showLogoutModal, setShowLogoutModal] = useState(false);
// // //     const [username, setUsername] = useState('');
// // //     const navigate = useNavigate();
// // //     const location = useLocation();

// // //     const isLoggedIn = !!localStorage.getItem('jwttoken');

// // //     useEffect(() => {
// // //         const name = localStorage.getItem('username');
// // //         if (name) {
// // //             setUsername(name);
// // //         }
// // //     }, []);

// // //     const handleLogout = () => {
// // //         setShowLogoutModal(true);
// // //     };

// // //     const closeLogoutModal = () => {
// // //         setShowLogoutModal(false);
// // //     };

// // //     const handleConfirmLogout = async () => {
// // //         const userId = localStorage.getItem('id');
// // //         const token = localStorage.getItem('jwttoken');

// // //         if (!token || !userId) {
// // //             console.error('Token or User ID is missing');
// // //             return;
// // //         }

// // //         try {
// // //             const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`,
// // //                     'userId': userId,
// // //                 }
// // //             });

// // //             if (response.status !== 200) {
// // //                 console.error('Logout failed:', response.status);
// // //                 throw new Error(`Logout failed with status: ${response.status}`);
// // //             }

// // //             // Clear the local storage
// // //             localStorage.removeItem('jwttoken');
// // //             localStorage.removeItem('id');
// // //             localStorage.removeItem('username');
// // //             console.log('Logout successful, token and userId removed');
// // //             navigate('/');
// // //         } catch (error) {
// // //             console.error('Logout failed:', error);
// // //         } finally {
// // //             setShowLogoutModal(false);
// // //         }
// // //     };

// // //     const handleMainTabSelect = (tab) => {
// // //         setActiveMainTab(tab);
// // //         if (tab === 'file-management') {
// // //             setActiveSubTab('create-projects');
// // //             navigate('/create-projects');
// // //         } else if (tab === 'users-management') {
// // //             setActiveSubTab('sign-up-users');
// // //             navigate('/sign-up-users');  // Navigate to sign-up-users on selecting Users Management
// // //         } else if (tab === 'hierarchy-management') {
// // //             setActiveSubTab('view-project-hierarchies');
// // //             navigate('/view-project-hierarchies');  // Change this to your preferred default sub-tab
// // //         }
// // //     };

// // //     const handleSubTabSelect = (tab) => {
// // //         setActiveSubTab(tab);
// // //         switch (tab) {
// // //             case 'create-projects':
// // //                 navigate('/create-projects');
// // //                 break;
// // //             case 'update-project-hierarchy':
// // //                 navigate('/update-project-hierarchy');
// // //                 break;
// // //             case 'add-project-users':
// // //                 navigate('/add-project-users');
// // //                 break;
// // //             case 'sign-up-users':
// // //                 navigate('/sign-up-users');
// // //                 break;
// // //             case 'create-single-project':
// // //                 navigate('/create-single-project');
// // //                 break;
// // //             case 'add-multiple-project-users':
// // //                 navigate('/add-multiple-project-users');
// // //                 break;
// // //             case 'update-multiple-hierarchy':
// // //                 navigate('/update-multiple-hierarchy');
// // //                 break;
// // //             case 'view-project-hierarchies':
// // //                 navigate('/view-project-hierarchies');
// // //                 break;
// // //             default:
// // //                 break;
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         const path = location.pathname;

// // //         if (path.includes('/file-management')) {
// // //             setActiveMainTab('file-management');
// // //             setActiveSubTab('create-projects');
// // //         } else if (path.includes('/users-management')) {
// // //             setActiveMainTab('users-management');
// // //             setActiveSubTab('sign-up-users');
// // //         } else if (path.includes('/update-multiple-hierarchy')) {
// // //             setActiveMainTab('hierarchy-management');
// // //             setActiveSubTab('view-project-hierarchies');
// // //         }
// // //     }, [location.pathname]);

// // //     return (
// // //         <>
// // //             <Navbar className="color" expand="lg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
// // //                 <img src={beats} className='beats-img' style={{
// // //                     width: '26px',
// // //                     height: '26px',
// // //                     borderRadius: '50%',
// // //                     objectFit: 'cover',
// // //                     filter: 'brightness(0) invert(1)',
// // //                     marginLeft: '10px',
// // //                     marginRight: '30px'
// // //                 }} />
// // //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
// // //                 <Navbar.Collapse id="basic-navbar-nav">
// // //                     <Nav className="mr-auto">
// // //                         <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
// // //                             File Management
// // //                         </Nav.Link>
// // //                         <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
// // //                             Users Management
// // //                         </Nav.Link>
// // //                         <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
// // //                             Hierarchy Management
// // //                         </Nav.Link>
// // //                     </Nav>
// // //                     <Nav>
// // //                         {isLoggedIn ? (
// // //                             <Dropdown align="end">
// // //                                 <Dropdown.Toggle
// // //                                     style={{
// // //                                         backgroundColor: '#1b7ae7',
// // //                                         color: 'white',
// // //                                         border: 'none',
// // //                                         display: 'flex',
// // //                                         alignItems: 'center',
// // //                                     }}
// // //                                     id="dropdown-basic"
// // //                                     bsPrefix="toggle-no-caret"
// // //                                 >
// // //                                     <span style={{ marginRight: '10px', color: 'white' }}>
// // //                                         Welcome, {username.replace('.com', '')}
// // //                                     </span>
// // //                                     <img
// // //                                         src={profileIcon}
// // //                                         alt="Profile Icon"
// // //                                         style={{
// // //                                             width: '26px',
// // //                                             height: '26px',
// // //                                             borderRadius: '50%',
// // //                                             objectFit: 'cover',
// // //                                             filter: 'brightness(0) invert(1)',
// // //                                         }}
// // //                                     />
// // //                                 </Dropdown.Toggle>
// // //                                 <Dropdown.Menu>
// // //                                     <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
// // //                                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
// // //                                 </Dropdown.Menu>
// // //                             </Dropdown>
// // //                         ) : (
// // //                             <Link to="/">
// // //                                 <Button variant="primary">Login</Button>
// // //                             </Link>
// // //                         )}
// // //                     </Nav>
// // //                 </Navbar.Collapse>
// // //             </Navbar>

// // //             {/* Conditional Sub Tabs Rendering */}
// // //             {activeMainTab === 'file-management' && (
// // //                 <Tab.Container activeKey={activeSubTab} className="my-tab">
// // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')}>
// // //                                 Create Projects
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')}>
// // //                                 Update Project Hierarchy
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')}>
// // //                                 Add Project Users
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                     </NavTabs>
// // //                 </Tab.Container>
// // //             )}

// // //             {activeMainTab === 'users-management' && (
// // //                 <Tab.Container activeKey={activeSubTab}>
// // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="sign-up-users" onClick={() => handleSubTabSelect('sign-up-users')}>
// // //                                 Sign Up Users
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="create-single-project" onClick={() => handleSubTabSelect('create-single-project')}>
// // //                                 Create Single Project
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="add-multiple-project-users" onClick={() => handleSubTabSelect('add-multiple-project-users')}>
// // //                                 Add Single/Multiple Project Users
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                     </NavTabs>
// // //                 </Tab.Container>
// // //             )}

// // //             {activeMainTab === 'hierarchy-management' && (
// // //                 <Tab.Container activeKey={activeSubTab}>
// // //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="update-multiple-hierarchy" onClick={() => handleSubTabSelect('update-multiple-hierarchy')}>
// // //                                 Update Multiple Hierarchy
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                         <NavTabs.Item>
// // //                             <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
// // //                                 View Project Hierarchies
// // //                             </NavTabs.Link>
// // //                         </NavTabs.Item>
// // //                     </NavTabs>
// // //                 </Tab.Container>
// // //             )}

// // //             {/* Logout Modal */}
// // //             <Modal show={showLogoutModal} onHide={closeLogoutModal}>
// // //                 <Modal.Header closeButton>
// // //                     <Modal.Title>Confirm Logout</Modal.Title>
// // //                 </Modal.Header>
// // //                 <Modal.Body>Are you sure you want to logout?</Modal.Body>
// // //                 <Modal.Footer>
// // //                     <Button variant="secondary" onClick={closeLogoutModal}>
// // //                         Cancel
// // //                     </Button>
// // //                     <Button variant="danger" onClick={handleConfirmLogout}>
// // //                         Logout
// // //                     </Button>
// // //                 </Modal.Footer>
// // //             </Modal>
// // //         </>
// // //     );
// // // };

// // // export default NavBar;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './Navbar.css';
// // import profileIcon from '../assests/profile.png';
// // import beats from '../assests/beats.png';

// // const NavBar = () => {
// //     const [activeMainTab, setActiveMainTab] = useState('file-management');
// //     const [activeSubTab, setActiveSubTab] = useState('create-projects');
// //     const [showLogoutModal, setShowLogoutModal] = useState(false);
// //     const [username, setUsername] = useState('');
// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const isLoggedIn = !!localStorage.getItem('jwttoken');

// //     useEffect(() => {
// //         const name = localStorage.getItem('username');
// //         if (name) {
// //             setUsername(name);
// //         }
// //     }, []);

// //     const handleLogout = () => {
// //         setShowLogoutModal(true);
// //     };

// //     const closeLogoutModal = () => {
// //         setShowLogoutModal(false);
// //     };

// //     const handleConfirmLogout = async () => {
// //         const userId = localStorage.getItem('id');
// //         const token = localStorage.getItem('jwttoken');

// //         if (!token || !userId) {
// //             console.error('Token or User ID is missing');
// //             return;
// //         }

// //         try {
// //             const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
// //                 headers: {
// //                     'Authorization': `Bearer ${token}`,
// //                     'userId': userId,
// //                 }
// //             });

// //             if (response.status !== 200) {
// //                 console.error('Logout failed:', response.status);
// //                 throw new Error(`Logout failed with status: ${response.status}`);
// //             }

// //             // Clear the local storage
// //             localStorage.removeItem('jwttoken');
// //             localStorage.removeItem('id');
// //             localStorage.removeItem('username');
// //             console.log('Logout successful, token and userId removed');
// //             navigate('/');
// //         } catch (error) {
// //             console.error('Logout failed:', error);
// //         } finally {
// //             setShowLogoutModal(false);
// //         }
// //     };

// //     const handleMainTabSelect = (tab) => {
// //         setActiveMainTab(tab);
// //         if (tab === 'file-management') {
// //             setActiveSubTab('create-projects');
// //             navigate('/create-projects');
// //         } else if (tab === 'users-management') {
// //             setActiveSubTab('sign-up-users');
// //             navigate('/sign-up-users');  // Navigate to sign-up-users on selecting Users Management
// //         } else if (tab === 'hierarchy-management') {
// //             setActiveSubTab('view-project-hierarchies');
// //             navigate('/view-project-hierarchies');  // Navigate to view-project-hierarchies on selecting Hierarchy Management
// //         }
// //     };

// //     const handleSubTabSelect = (tab) => {
// //         setActiveSubTab(tab);
// //         switch (tab) {
// //             case 'create-projects':
// //                 navigate('/create-projects');
// //                 break;
// //             case 'update-project-hierarchy':
// //                 navigate('/update-project-hierarchy');
// //                 break;
// //             case 'add-project-users':
// //                 navigate('/add-project-users');
// //                 break;
// //             case 'sign-up-users':
// //                 navigate('/sign-up-users');
// //                 break;
// //             case 'create-single-project':
// //                 navigate('/create-single-project');
// //                 break;
// //             case 'add-multiple-project-users':
// //                 navigate('/add-multiple-project-users');
// //                 break;
// //             case 'update-multiple-hierarchy':
// //                 navigate('/update-multiple-hierarchy');
// //                 break;
// //             case 'view-project-hierarchies':
// //                 navigate('/view-project-hierarchies');
// //                 break;
// //             default:
// //                 break;
// //         }
// //     };

// //     useEffect(() => {
// //         const path = location.pathname;

// //         if (path.includes('/file-management')) {
// //             setActiveMainTab('file-management');
// //             setActiveSubTab('create-projects');
// //         } else if (path.includes('/users-management')) {
// //             setActiveMainTab('users-management');
// //             setActiveSubTab('sign-up-users');
// //         } else if (path.includes('/update-multiple-hierarchy')) {
// //             setActiveMainTab('hierarchy-management');
// //             setActiveSubTab('view-project-hierarchies');
// //         }
// //     }, [location.pathname]);

// //     return (
// //         <>
// //             <Navbar className="color" expand="lg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
// //                 <img src={beats} className='beats-img' style={{
// //                     width: '26px',
// //                     height: '26px',
// //                     borderRadius: '50%',
// //                     objectFit: 'cover',
// //                     filter: 'brightness(0) invert(1)',
// //                     marginLeft: '10px',
// //                     marginRight: '30px'
// //                 }} />
// //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //                 <Navbar.Collapse id="basic-navbar-nav">
// //                     <Nav className="mr-auto">
// //                         <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
// //                             File Management
// //                         </Nav.Link>
// //                         <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
// //                             Users Management
// //                         </Nav.Link>
// //                         <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
// //                             Hierarchy Management
// //                         </Nav.Link>
// //                     </Nav>
// //                     <Nav>
// //                         {isLoggedIn ? (
// //                             <Dropdown align="end">
// //                                 <Dropdown.Toggle
// //                                     style={{
// //                                         backgroundColor: '#1b7ae7',
// //                                         color: 'white',
// //                                         border: 'none',
// //                                         display: 'flex',
// //                                         alignItems: 'center',
// //                                     }}
// //                                     id="dropdown-basic"
// //                                     bsPrefix="toggle-no-caret"
// //                                 >
// //                                     <span style={{ marginRight: '10px', color: 'white' }}>
// //                                         Welcome, {username.replace('.com', '')}
// //                                     </span>
// //                                     <img
// //                                         src={profileIcon}
// //                                         alt="Profile Icon"
// //                                         style={{
// //                                             width: '26px',
// //                                             height: '26px',
// //                                             borderRadius: '50%',
// //                                             objectFit: 'cover',
// //                                             filter: 'brightness(0) invert(1)',
// //                                         }}
// //                                     />
// //                                 </Dropdown.Toggle>
// //                                 <Dropdown.Menu>
// //                                     <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
// //                                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
// //                                 </Dropdown.Menu>
// //                             </Dropdown>
// //                         ) : (
// //                             <Link to="/">
// //                                 <Button variant="primary">Login</Button>
// //                             </Link>
// //                         )}
// //                     </Nav>
// //                 </Navbar.Collapse>
// //             </Navbar>

// //             {/* Conditional Sub Tabs Rendering */}
// //             {activeMainTab === 'file-management' && (
// //                 <Tab.Container activeKey={activeSubTab} className="my-tab">
// //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')}>
// //                                 Create Projects
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')}>
// //                                 Update Project Hierarchy
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')}>
// //                                 Add Project Users
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                     </NavTabs>
// //                 </Tab.Container>
// //             )}

// //             {activeMainTab === 'users-management' && (
// //                 <Tab.Container activeKey={activeSubTab}>
// //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="sign-up-users" onClick={() => handleSubTabSelect('sign-up-users')}>
// //                                 Sign Up Users
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="create-single-project" onClick={() => handleSubTabSelect('create-single-project')}>
// //                                 Create Single Project
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="add-multiple-project-users" onClick={() => handleSubTabSelect('add-multiple-project-users')}>
// //                                 Add Single/Multiple Project Users
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                     </NavTabs>
// //                 </Tab.Container>
// //             )}

// //             {activeMainTab === 'hierarchy-management' && (
// //                 <Tab.Container activeKey={activeSubTab}>
// //                     <NavTabs variant="tabs" className="justify-content-center my-3">
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="update-multiple-hierarchy" onClick={() => handleSubTabSelect('update-multiple-hierarchy')}>
// //                                 Update Multiple Hierarchies
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                         <NavTabs.Item>
// //                             <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
// //                                 View Project Hierarchies
// //                             </NavTabs.Link>
// //                         </NavTabs.Item>
// //                     </NavTabs>
// //                 </Tab.Container>
// //             )}

// //             {/* Logout Modal */}
// //             <Modal show={showLogoutModal} onHide={closeLogoutModal}>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>Confirm Logout</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>Are you sure you want to logout?</Modal.Body>
// //                 <Modal.Footer>
// //                     <Button variant="secondary" onClick={closeLogoutModal}>
// //                         Cancel
// //                     </Button>
// //                     <Button variant="danger" onClick={handleConfirmLogout}>
// //                         Logout
// //                     </Button>
// //                 </Modal.Footer>
// //             </Modal>
// //         </>
// //     );
// // };

// // export default NavBar;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Navbar.css';
// import profileIcon from '../assests/profile.png';
// import beats from '../assests/beats.png';

// const NavBar = () => {
//     const [activeMainTab, setActiveMainTab] = useState('file-management');
//     const [activeSubTab, setActiveSubTab] = useState('create-projects');
//     const [showLogoutModal, setShowLogoutModal] = useState(false);
//     const [username, setUsername] = useState('');
//     const navigate = useNavigate();
//     const location = useLocation();

//     const isLoggedIn = !!localStorage.getItem('jwttoken');

//     useEffect(() => {
//         const name = localStorage.getItem('username');
//         if (name) {
//             setUsername(name);
//         }
//     }, []);

//     const handleLogout = () => {
//         setShowLogoutModal(true);
//     };

//     const closeLogoutModal = () => {
//         setShowLogoutModal(false);
//     };

//     const handleConfirmLogout = async () => {
//         const userId = localStorage.getItem('id');
//         const token = localStorage.getItem('jwttoken');

//         if (!token || !userId) {
//             console.error('Token or User ID is missing');
//             return;
//         }

//         try {
//             const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'userId': userId,
//                 }
//             });

//             if (response.status !== 200) {
//                 console.error('Logout failed:', response.status);
//                 throw new Error(`Logout failed with status: ${response.status}`);
//             }

//             // Clear the local storage
//             localStorage.removeItem('jwttoken');
//             localStorage.removeItem('id');
//             localStorage.removeItem('username');
//             console.log('Logout successful, token and userId removed');
//             navigate('/');
//         } catch (error) {
//             console.error('Logout failed:', error);
//         } finally {
//             setShowLogoutModal(false);
//         }
//     };

//     const handleMainTabSelect = (tab) => {
//         setActiveMainTab(tab);
//         if (tab === 'file-management') {
//             setActiveSubTab('create-projects');
//             navigate('/create-projects');
//         } else if (tab === 'users-management') {
//             setActiveSubTab('sign-up-users');
//             navigate('/sign-up-users');  // Navigate to sign-up-users on selecting Users Management
//         } else if (tab === 'hierarchy-management') {
//             setActiveSubTab('update-multiple-hierarchy');
//             navigate('/update-multiple-hierarchy');  // Navigate to update-multiple-hierarchy on selecting Hierarchy Management
//         }
//     };

//     const handleSubTabSelect = (tab) => {
//         setActiveSubTab(tab);
//         switch (tab) {
//             case 'create-projects':
//                 navigate('/create-projects');
//                 break;
//             case 'update-project-hierarchy':
//                 navigate('/update-project-hierarchy');
//                 break;
//             case 'add-project-users':
//                 navigate('/add-project-users');
//                 break;
//             case 'sign-up-users':
//                 navigate('/sign-up-users');
//                 break;
//             case 'create-single-project':
//                 navigate('/create-single-project');
//                 break;
//             case 'add-multiple-project-users':
//                 navigate('/add-multiple-project-users');
//                 break;
//             case 'update-multiple-hierarchy':
//                 navigate('/update-multiple-hierarchy');
//                 break;
//             case 'view-project-hierarchies':
//                 navigate('/view-project-hierarchies');
//                 break;
//             default:
//                 break;
//         }
//     };

//     useEffect(() => {
//         const path = location.pathname;

//         if (path.includes('/file-management')) {
//             setActiveMainTab('file-management');
//             setActiveSubTab('create-projects');
//         } else if (path.includes('/users-management')) {
//             setActiveMainTab('users-management');
//             setActiveSubTab('sign-up-users');
//         } else if (path.includes('/update-multiple-hierarchy')) {
//             setActiveMainTab('hierarchy-management');
//             setActiveSubTab('update-multiple-hierarchy');
//         }
//     }, [location.pathname]);

//     return (
//         <>
//             <Navbar className="color" expand="lg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                 <img src={beats} className='beats-img' style={{
//                     width: '26px',
//                     height: '26px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                     filter: 'brightness(0) invert(1)',
//                     marginLeft: '10px',
//                     marginRight: '30px'
//                 }} />
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="mr-auto">
//                         <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
//                             File Management
//                         </Nav.Link>
//                         <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
//                             Users Management
//                         </Nav.Link>
//                         <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
//                             Hierarchy Management
//                         </Nav.Link>
//                     </Nav>
//                     <Nav>
//                         {isLoggedIn ? (
//                             <Dropdown align="end">
//                                 <Dropdown.Toggle
//                                     style={{
//                                         backgroundColor: '#1b7ae7',
//                                         color: 'white',
//                                         border: 'none',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                     }}
//                                     id="dropdown-basic"
//                                     bsPrefix="toggle-no-caret"
//                                 >
//                                     <span style={{ marginRight: '10px', color: 'white' }}>
//                                         Welcome, {username.replace('.com', '')}
//                                     </span>
//                                     <img
//                                         src={profileIcon}
//                                         alt="Profile Icon"
//                                         style={{
//                                             width: '26px',
//                                             height: '26px',
//                                             borderRadius: '50%',
//                                             objectFit: 'cover',
//                                             filter: 'brightness(0) invert(1)',
//                                         }}
//                                     />
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu>
//                                     <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
//                                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//                                 </Dropdown.Menu>
//                             </Dropdown>
//                         ) : (
//                             <Link to="/">
//                                 <Button variant="primary">Login</Button>
//                             </Link>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>

//             {/* Conditional Sub Tabs Rendering */}
//             {activeMainTab === 'file-management' && (
//                 <Tab.Container activeKey={activeSubTab} className="my-tab">
//                     <NavTabs variant="tabs" className="justify-content-center my-3">
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')}>
//                                 Create Projects
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')}>
//                                 Update Project Hierarchy
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')}>
//                                 Add Project Users
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                     </NavTabs>
//                 </Tab.Container>
//             )}

//             {activeMainTab === 'users-management' && (
//                 <Tab.Container activeKey={activeSubTab}>
//                     <NavTabs variant="tabs" className="justify-content-center my-3">
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="sign-up-users" onClick={() => handleSubTabSelect('sign-up-users')}>
//                                 Sign Up Users
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="create-single-project" onClick={() => handleSubTabSelect('create-single-project')}>
//                                 Create Single Project
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="add-multiple-project-users" onClick={() => handleSubTabSelect('add-multiple-project-users')}>
//                                 Add Single/Multiple Project Users
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                     </NavTabs>
//                 </Tab.Container>
//             )}

//             {activeMainTab === 'hierarchy-management' && (
//                 <Tab.Container activeKey={activeSubTab}>
//                     <NavTabs variant="tabs" className="justify-content-center my-3">
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="update-multiple-hierarchy" onClick={() => handleSubTabSelect('update-multiple-hierarchy')}>
//                                 Update Multiple Hierarchy
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                         <NavTabs.Item>
//                             <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
//                                 View Project Hierarchies
//                             </NavTabs.Link>
//                         </NavTabs.Item>
//                     </NavTabs>
//                 </Tab.Container>
//             )}

//             {/* Logout Modal */}
//             <Modal show={showLogoutModal} onHide={closeLogoutModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Logout</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to logout?</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeLogoutModal}>
//                         Cancel
//                     </Button>
//                     <Button variant="danger" onClick={handleConfirmLogout}>
//                         Logout
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default NavBar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import profileIcon from '../assests/profile.png';
import beats from '../assests/beats.png';

const NavBar = () => {
    const [activeMainTab, setActiveMainTab] = useState('file-management');
    const [activeSubTab, setActiveSubTab] = useState('create-projects');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = !!localStorage.getItem('jwttoken');

    useEffect(() => {
        const name = localStorage.getItem('username');
        if (name) {
            setUsername(name);
        }
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    const handleConfirmLogout = async () => {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('jwttoken');

        if (!token || !userId) {
            console.error('Token or User ID is missing');
            return;
        }

        try {
            const response = await axios.delete('http://192.168.167.5:8560/auth/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                }
            });

            if (response.status !== 200) {
                console.error('Logout failed:', response.status);
                throw new Error(`Logout failed with status: ${response.status}`);
            }

            // Clear the local storage
            localStorage.removeItem('jwttoken');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            console.log('Logout successful, token and userId removed');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.'); // Display a user-friendly message
        } finally {
            setShowLogoutModal(false);
        }
    };

    const handleMainTabSelect = (tab) => {
        setActiveMainTab(tab);
        if (tab === 'file-management') {
            setActiveSubTab('create-projects');
            navigate('/create-projects');
        } else if (tab === 'users-management') {
            setActiveSubTab('sign-up-users');
            navigate('/sign-up-users');  // Navigate to sign-up-users on selecting Users Management
        } else if (tab === 'hierarchy-management') {
            setActiveSubTab('update-multiple-hierarchy');
            navigate('/update-multiple-hierarchy');  // Navigate to update-multiple-hierarchy on selecting Hierarchy Management
        }
        else if (tab === 'projects') {
            setActiveSubTab('projects');
            navigate('/projects');  // Navigate to update-multiple-hierarchy on selecting Hierarchy Management
        }
        else if (tab === 'users') {
            setActiveSubTab('users');
            navigate('/users');  // Navigate to update-multiple-hierarchy on selecting Hierarchy Management
        }
        else if (tab === 'add-rent') {
            setActiveSubTab('add-rent');
            navigate('/add-rent');  // Navigate to update-multiple-hierarchy on selecting Hierarchy Management
        }
    };

    const handleSubTabSelect = (tab) => {
        setActiveSubTab(tab);
        switch (tab) {
            case 'create-projects':
                navigate('/create-projects');
                break;
            case 'update-project-hierarchy':
                navigate('/update-project-hierarchy');
                break;
            case 'add-project-users':
                navigate('/add-project-users');
                break;
            case 'sign-up-users':
                navigate('/sign-up-users');
                break;
            case 'create-single-project':
                navigate('/create-single-project');
                break;
            case 'add-multiple-project-users':
                navigate('/add-multiple-project-users');
                break;
            case 'update-multiple-hierarchy':
                navigate('/update-multiple-hierarchy');
                break;
            case 'view-project-hierarchies':
                navigate('/view-project-hierarchies');
                break;
                 case 'get':
                navigate('/add-rent');
                break;
                 case 'update':
                navigate('/view-project-hierarchies');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const path = location.pathname;

        if (path.includes('/file-management')) {
            setActiveMainTab('file-management');
            setActiveSubTab('create-projects');
        } else if (path.includes('/users-management')) {
            setActiveMainTab('users-management');
            setActiveSubTab('sign-up-users');
        }
        else if (path.includes('/projects')) {
            setActiveMainTab('projects');
            setActiveSubTab('project-overview');
        } else if (path.includes('/update-multiple-hierarchy')) {
            setActiveMainTab('hierarchy-management');
            setActiveSubTab('update-multiple-hierarchy');
        }
    }, [location.pathname]);

    return (
        <>
            <Navbar className="color" expand="lg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <img src={beats} className='beats-img' style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    filter: 'brightness(0) invert(1)',
                    marginLeft: '10px',
                    marginRight: '30px'
                }} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
                            File Management
                        </Nav.Link>
                        <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
                            Users Management
                        </Nav.Link>
                        <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
                            Hierarchy Management
                        </Nav.Link>
                        <Nav.Link onClick={() => handleMainTabSelect('projects')} active={activeMainTab === 'projects'} style={{ marginLeft: '-90px' }}>
                            Projects
                        </Nav.Link>
                        <Nav.Link onClick={() => handleMainTabSelect('users')} active={activeMainTab === 'users'} style={{ marginLeft: '-90px' }}>
                            Users
                        </Nav.Link>
                        <Nav.Link onClick={() => handleMainTabSelect('add-rent')} active={activeMainTab === 'add-rent'} style={{ marginLeft: '-90px' }}>
                            Rent
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    style={{
                                        backgroundColor: '#1b7ae7',
                                        color: 'white',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    id="dropdown-basic"
                                    bsPrefix="toggle-no-caret"
                                >
                                    <span style={{ marginRight: '10px', color: 'white' }}>
                                        Welcome, {username.replace('.com', '')}
                                    </span>
                                    <img
                                        src={profileIcon}
                                        alt="Profile Icon"
                                        style={{
                                            width: '26px',
                                            height: '26px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            filter: 'brightness(0) invert(1)',
                                        }}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Link to="/">
                                <Button variant="primary">Login</Button>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Conditional Sub Tabs Rendering */}
            {activeMainTab === 'file-management' && (
                <Tab.Container activeKey={activeSubTab} className="my-tab">
                    <NavTabs variant="tabs" className="justify-content-center my-3">
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="create-projects" onClick={() => handleSubTabSelect('create-projects')} style={{ marginLeft: "40px" }}>
                                Create Projects
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="update-project-hierarchy" onClick={() => handleSubTabSelect('update-project-hierarchy')}>
                                Update Project Hierarchy
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="add-project-users" onClick={() => handleSubTabSelect('add-project-users')}>
                                Add Project Users
                            </NavTabs.Link>
                        </NavTabs.Item>
                    </NavTabs>
                </Tab.Container>
            )}

            {activeMainTab === 'users-management' && (
                <Tab.Container activeKey={activeSubTab}>
                    <NavTabs variant="tabs" className="justify-content-center my-3">
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="sign-up-users" onClick={() => handleSubTabSelect('sign-up-users')} style={{ marginLeft: "120px" }}>
                                Sign Up Users
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="create-single-project" onClick={() => handleSubTabSelect('create-single-project')}>
                                Create Single Project
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="add-multiple-project-users" onClick={() => handleSubTabSelect('add-multiple-project-users')}>
                                Add Single/Multiple Project Users
                            </NavTabs.Link>
                        </NavTabs.Item>
                    </NavTabs>
                </Tab.Container>
            )}

            {activeMainTab === 'hierarchy-management' && (
                <Tab.Container activeKey={activeSubTab}>
                    <NavTabs variant="tabs" className="justify-content-center my-3">
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="update-multiple-hierarchy" onClick={() => handleSubTabSelect('update-multiple-hierarchy')} style={{ marginLeft: "-40px" }}>
                                Update Multiple Hierarchy
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
                                View Project Hierarchies
                            </NavTabs.Link>
                        </NavTabs.Item>
                    </NavTabs>
                </Tab.Container>
            )}

            {activeMainTab === 'add-rent' && (
                <Tab.Container activeKey={activeSubTab}>
                    <NavTabs variant="tabs" className="justify-content-center my-3">
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="get" onClick={() => handleSubTabSelect('get')} style={{ marginLeft: "-40px" }}>
                                Get
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="view-project-hierarchies" onClick={() => handleSubTabSelect('view-project-hierarchies')}>
                                Update
                            </NavTabs.Link>
                        </NavTabs.Item>
                    </NavTabs>
                </Tab.Container>
            )}

            {/* {activeMainTab === 'projects' && (
                <Tab.Container activeKey={activeSubTab}>
                    <NavTabs variant="tabs" className="justify-content-center my-3"> */}
            {/* <NavTabs.Item>
                            <NavTabs.Link eventKey="project-overview" onClick={() => handleSubTabSelect('project-overview')}>
                                Project Overview
                            </NavTabs.Link>
                        </NavTabs.Item> */}
            {/* <NavTabs.Item>
                            <NavTabs.Link eventKey="add-new-project" onClick={() => handleSubTabSelect('add-new-project')}>
                                Add New Project
                            </NavTabs.Link>
                        </NavTabs.Item>
                        <NavTabs.Item>
                            <NavTabs.Link eventKey="project-reports" onClick={() => handleSubTabSelect('project-reports')}>
                                Project Reports
                            </NavTabs.Link>
                        </NavTabs.Item> */}
            {/* <NavTabs.Item>
                            <Nav.Link onClick={() => handleMainTabSelect('projects')} active={activeMainTab === 'projects'}>
                                Projects
                            </Nav.Link>
                        </NavTabs.Item>
                    </NavTabs>
                </Tab.Container>
            )} */}

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={closeLogoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeLogoutModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleConfirmLogout}>Logout</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NavBar;
