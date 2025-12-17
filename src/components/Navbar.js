import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Modal, Button, Tab, Nav as NavTabs } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import profileIcon from '../assests/profile.png';
import beats from '../assests/beats.png';
import Api_base_url from './Api_base_url/Api_base_url';

const NavBar = () => {
    const ro = localStorage.getItem('roleId');
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
            const response = await axios.delete(`${Api_base_url}/auth/logout`, {
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
            localStorage.removeItem('roleId');
            localStorage.removeItem('home');
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
            navigate('/sign-up-users');
        }
        else if (tab === 'hierarchy-management') {
            setActiveSubTab('update-multiple-hierarchy');
            navigate('/update-multiple-hierarchy');
        }
        else if (tab === 'projects') {
            setActiveSubTab('projects');
            navigate('/projects');
        }
        else if (tab === 'users') {
            setActiveSubTab('users');
            navigate('/users');
        }
        else if (tab === 'add-rent') {
            setActiveSubTab('add-rent');
            navigate('/add-rent');
        }
        else if (tab === 'announcement') {
            setActiveSubTab('announcement');
            navigate('/announcement');
        }
        else if (tab === 'hierarchy') {
            setActiveSubTab('hierarchy');
            navigate('/UpdateSingleHierarchy');
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
            case 'UpdateSingleHierarchy':
                navigate('/UpdateSingleHierarchy');
                break;
            case 'ReplaceHierarchy':
                navigate('/ReplaceHierarchy');
                break;
            case 'ReferenceHierarchy':
                navigate('/ReferenceHierarchy');
                break;
            case 'CreateProjects':
                navigate('/CreateProjects');
                break;
            case 'BulkUpdateProjectHierarchy':
                navigate('/BulkUpdateProjectHierarchy');
                break;
            case 'BulkReplaceProjectHierarchy':
                navigate('/BulkReplaceProjectHierarchy');
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
    console.log("Current Hash:", window.location.hash);


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
                    <Nav className="mr-auto ms-0 gap-2">
                        {/* <Nav.Link onClick={() => handleMainTabSelect('file-management')} active={activeMainTab === 'file-management'} style={{ marginLeft: '-90px' }}>
                            File Management
                        </Nav.Link> */}
                        {/* <Nav.Link onClick={() => handleMainTabSelect('users-management')} active={activeMainTab === 'users-management'} style={{ marginLeft: '-90px' }}>
                            Users Management
                        </Nav.Link> */}
                        {/* <Nav.Link onClick={() => handleMainTabSelect('hierarchy-management')} active={activeMainTab === 'hierarchy-management'} style={{ marginLeft: '-90px' }}>
                            Hierarchy Management
                        </Nav.Link> */}
                        {ro === "2" ? (
                            <>

                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('projects')}
                                    style={{

                                        color: (window.location.hash === "#/projects" || window.location.hash === "#/purchase") ? "white" : "white",
                                        borderRadius:(window.location.hash === "#/projects" || window.location.hash === "#/purchase") ? "7px" : "none",
                                        border:(window.location.hash === "#/projects" || window.location.hash === "#/purchase") ? "1px solid white" : "none",


                                    }}
                                    active={activeMainTab === 'projects'}>
                                    Projects
                                </Nav.Link>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('users')}

                                    style={{


                                        color: (window.location.hash === "#/users" || window.location.hash === "#/sign-up-users") ? "white" : "white",
                                        borderRadius: (window.location.hash === "#/users" || window.location.hash === "#/sign-up-users") ? "7px" : "none",
                                        border: (window.location.hash === "#/users" || window.location.hash === "#/sign-up-users") ? "1px solid white" : "none",


                                    }}
                                    active={activeMainTab === 'users'}>
                                    Users Management
                                </Nav.Link>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('hierarchy')}

                                    style={{

                                        color: (window.location.hash === "#/UpdateSingleHierarchy" || window.location.hash === "#/ReplaceHierarchy" || window.location.hash === "#/ReferenceHierarchy" || window.location.hash === "#/CreateProjects" || window.location.hash === "#/BulkUpdateProjectHierarchy" || window.location.hash === "#/BulkReplaceProjectHierarchy") ? "white" : "white",
                                        borderRadius: (window.location.hash === "#/UpdateSingleHierarchy" || window.location.hash === "#/ReplaceHierarchy" || window.location.hash === "#/ReferenceHierarchy" || window.location.hash === "#/CreateProjects" || window.location.hash === "#/BulkUpdateProjectHierarchy" || window.location.hash === "#/BulkReplaceProjectHierarchy") ? "7px" : "none",
                                        border: (window.location.hash === "#/UpdateSingleHierarchy" || window.location.hash === "#/ReplaceHierarchy" || window.location.hash === "#/ReferenceHierarchy" || window.location.hash === "#/CreateProjects" || window.location.hash === "#/BulkUpdateProjectHierarchy" || window.location.hash === "#/BulkReplaceProjectHierarchy") ? "1px solid white" : "none",


                                    }}

                                    active={activeMainTab === 'hierarchy'}>
                                    Hierarchy Management

                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('projects')}
                                    style={{

                                        color: (window.location.hash === "#/projects" || window.location.hash === "#/purchase") ? "white" : "white",
                                        borderRadius: (window.location.hash === "#/projects" || window.location.hash === "#/purchase") ? "7px" : "none",
                                        border: (window.location.hash === "#/projects" || window.location.hash === "#/purchase") ? "1px solid white" : "none",


                                    }}
                                    active={activeMainTab === 'projects'}>
                                    Projects
                                </Nav.Link>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('users')}

                                    style={{

                                        color: (window.location.hash === "#/users" || window.location.hash === "#/sign-up-users") ? "white" : "white",
                                        borderRadius: (window.location.hash === "#/users" || window.location.hash === "#/sign-up-users") ? "7px" : "none",
                                        border: (window.location.hash === "#/users" || window.location.hash === "#/sign-up-users") ? "1px solid white" : "none",


                                    }}
                                    active={activeMainTab === 'users'}>
                                    Users Management
                                </Nav.Link>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('add-rent')}

                                    style={{

                                        color: (window.location.hash === "#/add-rent" || window.location.hash === "#/view-project-hierarchies") ? "white" : "white",
                                        borderRadius: (window.location.hash === "#/add-rent" || window.location.hash === "#/view-project-hierarchies") ? "7px" : "none",
                                        border: (window.location.hash === "#/add-rent" || window.location.hash === "#/view-project-hierarchies") ? "1px solid white" : "none",


                                    }}


                                    active={activeMainTab === 'add-rent'}>
                                    Rent Agreements Management
                                </Nav.Link>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('announcement')}

                                    style={{

                                        color: window.location.hash === "#/announcement" ? "white" : "white",
                                        borderRadius: window.location.hash === "#/announcement" ? "7px" : "none",
                                        border: window.location.hash === "#/announcement" ? "1px solid white" : "none",


                                    }}

                                    active={activeMainTab === 'announcement'}>
                                    Email Announcement
                                </Nav.Link>
                                <Nav.Link className='m-0' onClick={() => handleMainTabSelect('hierarchy')}

                                    style={{


                                        color: (window.location.hash === "#/UpdateSingleHierarchy" || window.location.hash === "#/ReplaceHierarchy" || window.location.hash === "#/ReferenceHierarchy" || window.location.hash === "#/CreateProjects" || window.location.hash === "#/BulkUpdateProjectHierarchy" || window.location.hash === "#/BulkReplaceProjectHierarchy") ? "white" : "white",
                                        borderRadius: (window.location.hash === "#/UpdateSingleHierarchy" || window.location.hash === "#/ReplaceHierarchy" || window.location.hash === "#/ReferenceHierarchy" || window.location.hash === "#/CreateProjects" || window.location.hash === "#/BulkUpdateProjectHierarchy" || window.location.hash === "#/BulkReplaceProjectHierarchy") ? "7px" : "none",
                                        border: (window.location.hash === "#/UpdateSingleHierarchy" || window.location.hash === "#/ReplaceHierarchy" || window.location.hash === "#/ReferenceHierarchy" || window.location.hash === "#/CreateProjects" || window.location.hash === "#/BulkUpdateProjectHierarchy" || window.location.hash === "#/BulkReplaceProjectHierarchy") ? "1px solid white" : "none",


                                    }}

                                    active={activeMainTab === 'hierarchy'}>
                                    Hierarchy Management

                                </Nav.Link>
                            </>)}



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
                                    {/* <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item> */}
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
            </Navbar >

            {/* Conditional Sub Tabs Rendering */}
            {
                activeMainTab === 'file-management' && (
                    <Tab.Container activeKey={activeSubTab} className="my-tab px-">
                        <NavTabs variant="tabs" className="justify-content-center px-3 my-3">
                            {/* <NavTabs.Item>
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
                        </NavTabs.Item> */}
                        </NavTabs>
                    </Tab.Container>
                )
            }

            {
                activeMainTab === 'users-management' && (
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
                )
            }

            {
                activeMainTab === 'hierarchy-management' && (
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
                )
            }

            {
                activeMainTab === 'add-rent' && (
                    <Tab.Container activeKey={activeSubTab}>
                        <NavTabs variant="tabs" className="justify-content-center my-3">
                            <NavTabs.Item>
                                <NavTabs.Link className='fw-bold' eventKey="get"

                                    style={{
                                        backgroundColor: window.location.hash === "#/add-rent" ? "#1b7ae7" : "white",
                                        borderRadius: "5px",
                                        color: window.location.hash === "#/add-rent" ? "white" : "#1b7ae7",
                                        bordorColor: window.location.hash === "#/add-rent" ? "#0d6efd" : "#0d6efd",
                                    }}


                                    onClick={() => handleSubTabSelect('get')} >
                                    Existing Rent Agreement
                                </NavTabs.Link>
                            </NavTabs.Item>
                            <NavTabs.Item>
                                <NavTabs.Link className='fw-bold' eventKey="Add New Agreement"
                                    style={{
                                        backgroundColor: window.location.hash === "#/view-project-hierarchies" ? "#1b7ae7" : "white",
                                        borderRadius: "5px",
                                        color: window.location.hash === "#/view-project-hierarchies" ? "white" : "#1b7ae7",
                                        bordorColor: window.location.hash === "#/view-project-hierarchies" ? "#0d6efd" : "#0d6efd",
                                    }}


                                    onClick={() => handleSubTabSelect('view-project-hierarchies')} >
                                    Add New Agreement
                                </NavTabs.Link>
                            </NavTabs.Item>
                        </NavTabs>
                    </Tab.Container>
                )
            }

            {
                activeMainTab === 'hierarchy' && (
                    <Tab.Container activeKey={activeSubTab}>
                        <NavTabs variant="tabs" className="justify-content-center my-3">
                            {ro === '2' ?
                                (
                                    <>
                                        <NavTabs.Item>
                                            <NavTabs.Link
                                                className='fw-bold'
                                                // className={`fw-bold ${window.location.hash === '#/UpdateSingleHierarchy' ? 'active-tab' : ''}`}
                                                style={{
                                                    backgroundColor: window.location.hash === "#/UpdateSingleHierarchy" ? "#1b7ae7" : "white",
                                                    borderRadius: "5px",
                                                    color: window.location.hash === "#/UpdateSingleHierarchy" ? "white" : "#1b7ae7",
                                                    bordorColor: window.location.hash === "#/UpdateSingleHierarchy" ? "#0d6efd" : "#0d6efd",
                                                }}
                                                eventKey="UpdateSingleHierarchy" onClick={() => handleSubTabSelect('UpdateSingleHierarchy')}>
                                                Update Single Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                        <NavTabs.Item>
                                            <NavTabs.Link
                                                className='fw-bold'
                                                // className={`fw-bold ${window.location.hash === '#/ReplaceHierarchy' ? 'active-tab' : ''}`}
                                                style={{
                                                    backgroundColor: window.location.hash === "#/ReplaceHierarchy" ? "#1b7ae7" : "white",
                                                    borderRadius: "5px",
                                                    color: window.location.hash === "#/ReplaceHierarchy" ? "white" : "#1b7ae7",
                                                    bordorColor: window.location.hash === "#/ReplaceHierarchy" ? "#0d6efd" : "#0d6efd",
                                                }}
                                                eventKey="ReplaceHierarchy" onClick={() => handleSubTabSelect('ReplaceHierarchy')}>
                                                Replace Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                    </>
                                    // <>


                                    //     <NavTabs.Item>
                                    //         <NavTabs.Link
                                    //             className="fw-bold"
                                    //             eventKey="UpdateSingleHierarchy"
                                    //             onClick={() => handleSubTabSelect('UpdateSingleHierarchy')}
                                    //             style={{
                                    //                 backgroundColor: window.location.hash === "#/UpdateSingleHierarchy" ? "pink" : "transparent",
                                    //                 borderRadius: "5px",
                                    //                 color: window.location.hash === "#/UpdateSingleHierarchy" ? "white" : "black",
                                    //             }}
                                    //         >
                                    //             Update Single Hierarchy
                                    //         </NavTabs.Link>
                                    //     </NavTabs.Item>
                                    //     <NavTabs.Item>
                                    //         <NavTabs.Link
                                    //             className="fw-bold"
                                    //             eventKey="ReplaceHierarchy"
                                    //             onClick={() => handleSubTabSelect('ReplaceHierarchy')}
                                    //             style={location.hash === '#/ReplaceHierarchy' ? { backgroundColor: 'pink', borderRadius: '5px' } : {}}
                                    //         >
                                    //             Replace Hierarchy
                                    //         </NavTabs.Link>
                                    //     </NavTabs.Item>
                                    // </>

                                ) : (
                                    <>
                                        <NavTabs.Item>
                                            <NavTabs.Link className='fw-bold' eventKey="UpdateSingleHierarchy"

                                                style={{
                                                    backgroundColor: window.location.hash === "#/UpdateSingleHierarchy" ? "#1b7ae7" : "white",
                                                    borderRadius: "5px",
                                                    color: window.location.hash === "#/UpdateSingleHierarchy" ? "white" : "#1b7ae7",
                                                    bordorColor: window.location.hash === "#/UpdateSingleHierarchy" ? "#0d6efd" : "#0d6efd",
                                                }}


                                                onClick={() => handleSubTabSelect('UpdateSingleHierarchy')}>
                                                Update Single Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                        <NavTabs.Item>
                                            <NavTabs.Link className='fw-bold' eventKey="ReplaceHierarchy"

                                                style={{
                                                    backgroundColor: window.location.hash === "#/ReplaceHierarchy" ? "#1b7ae7" : "white",
                                                    borderRadius: "5px",
                                                    color: window.location.hash === "#/ReplaceHierarchy" ? "white" : "#1b7ae7",
                                                    bordorColor: window.location.hash === "#/ReplaceHierarchy" ? "#0d6efd" : "#0d6efd",
                                                }}
                                                onClick={() => handleSubTabSelect('ReplaceHierarchy')}>
                                                Replace Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                        <NavTabs.Item>
                                            <NavTabs.Link className='fw-bold' eventKey="ReferenceHierarchy"

                                                style={{
                                                    backgroundColor: window.location.hash === "#/ReferenceHierarchy" ? "#1b7ae7" : "white",
                                                    borderRadius: "5px",
                                                    color: window.location.hash === "#/ReferenceHierarchy" ? "white" : "#1b7ae7",
                                                    bordorColor: window.location.hash === "#/ReferenceHierarchy" ? "#0d6efd" : "#0d6efd",
                                                }}

                                                onClick={() => handleSubTabSelect('ReferenceHierarchy')}>
                                                Reference Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                        <NavTabs.Item>
                                            <NavTabs.Link className='fw-bold' eventKey="CreateProjects" onClick={() => handleSubTabSelect('CreateProjects')}>
                                                Create Projects
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                        <NavTabs.Item>
                                            <NavTabs.Link className='fw-bold' eventKey="BulkUpdateProjectHierarchy" onClick={() => handleSubTabSelect('BulkUpdateProjectHierarchy')}>
                                                Bulk Update Project Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                        <NavTabs.Item>
                                            <NavTabs.Link className='fw-bold' eventKey="BulkReplaceProjectHierarchy" onClick={() => handleSubTabSelect('BulkReplaceProjectHierarchy')}>
                                                Bulk Replace Project Hierarchy
                                            </NavTabs.Link>
                                        </NavTabs.Item>
                                    </>)}
                        </NavTabs>
                    </Tab.Container>
                )
            }

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
