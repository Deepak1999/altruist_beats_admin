
// // import React, { useEffect, useState } from 'react';

// // import beats from '../assests/beats.png';
// // import { IconButton, InputAdornment, TextField, Button } from '@mui/material';
// // import { Visibility, VisibilityOff } from '@mui/icons-material';
// // import { useNavigate } from 'react-router-dom';


// // const ProfilePage = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
// //     const navigate = useNavigate(); // Hook for navigation

// //     useEffect(() => {
// //         const savedUsername = localStorage.getItem('username');
// //         const savedPassword = localStorage.getItem('password');

// //         if (savedUsername) setUsername(savedUsername);
// //         if (savedPassword) setPassword(savedPassword);
// //     }, []);

// //     const handleLogout = () => {
// //         // Clear localStorage and redirect or perform logout actions
// //         localStorage.removeItem('username');
// //         localStorage.removeItem('password');
// //         localStorage.removeItem('jwttoken'); // Clear JWT token if used
// //         localStorage.removeItem('id'); // Clear user ID if stored

// //         navigate('/');
// //     };

// //     return (
// //         <div className="projects-container">
// //             <meta charSet="UTF-8" />
// //             <meta name="viewport" content="width=device-width, initial-scale=1" />
// //             <meta name="author" content="Yinka Enoch Adedokun" />

// //             <div className="container-fluid">
// //                 <div className="row main-content bg-success text-center"
// //                     style={
// //                         {
// //                             width: '50%',
// //                             borderRadius: '20px',
// //                             boxShadow: '0 5px 5px rgba(0, 0, 0, .4)',
// //                             margin: '5em auto',
// //                             display: 'flex',
// //                         }
// //                     }>
// //                     <div className="col-md-4 text-center company__info" style={{
// //                         backgroundColor: '#1b7ae7',
// //                         borderTopLeftRadius: '20px',
// //                         borderBottomLeftRadius: '20px',
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         justifyContent: 'center',
// //                         color: '#fff'
// //                     }}>
// //                         <span className="company__logo">
// //                             <h2>
// //                                 <span className="fa fa-android" />
// //                             </h2>
// //                         </span>
// //                         <img
// //                             src={beats}
// //                             alt="Company Logo" 
// //                             style={{
// //                                 width: '123px',
// //                                 height: '137px',
// //                                 backgroundColor: "white",
// //                                 borderRadius: '12%',
// //                                 padding: '2px',
// //                             }}
// //                         />

// //                     </div>
// //                     <div className="col-md-8 col-xs-12 col-sm-12 login_form " style={{
// //                         backgroundColor: '#fff',
// //                         borderTopRightRadius: '20px',
// //                         borderBottomRightRadius: '20px',
// //                         borderTop: '1px solid #ccc',
// //                         borderRight: '1px solid #ccc',
// //                     }}>
// //                         <div className="container-fluid">
// //                             <div className="row">
// //                                 <h2>Profile</h2>
// //                             </div>
// //                             <div className="row">
// //                                 <form className="form-group">
// //                                     <div className="row">
// //                                         <TextField
// //                                             variant="outlined"
// //                                             fullWidth
// //                                             type="text"
// //                                             name="username"
// //                                             id="username"
// //                                             className="form__input"
// //                                             style={{
// //                                                 // width: '100%', border: '0px solid transparent', borderRadius: '0', borderBottom:
// //                                                 //     '1px solid #aaa', padding: '1em .5em .5em', paddingLeft: '2em', outline: 'none',
// //                                                 // margin: '1.5em auto', transition: 'all .5s ease'
// //                                                 marginBottom: '20px'
// //                                             }}
// //                                             placeholder="Username"
// //                                             value={username}
// //                                             onChange={(e) => setUsername(e.target.value)}
// //                                             disabled
// //                                         />
// //                                     </div>
// //                                     <div className="row">
// //                                         <TextField
// //                                             variant="outlined"
// //                                             fullWidth
// //                                             placeholder="Password"
// //                                             type={showPassword ? "text" : "password"}
// //                                             value={password}
// //                                             onChange={(e) => setPassword(e.target.value)}
// //                                             InputProps={{
// //                                                 endAdornment: (
// //                                                     <InputAdornment position="end">
// //                                                         <IconButton
// //                                                             onClick={() => setShowPassword(!showPassword)}
// //                                                             edge="end"
// //                                                         >
// //                                                             {showPassword ? <VisibilityOff /> : <Visibility />}
// //                                                         </IconButton>
// //                                                     </InputAdornment>
// //                                                 ),
// //                                             }}
// //                                         />
// //                                     </div>

// //                                     <div className="row">
// //                                         <Button variant="contained" color="secondary" onClick={handleLogout} style={{
// //                                             cursor: 'pointer',
// //                                             marginTop: '23px',
// //                                             marginBottom: '14px',
// //                                             width: '36%',
// //                                             color: 'white',
// //                                             background: '#1b7ae7'
// //                                         }}>
// //                                             Logout
// //                                         </Button>
// //                                     </div>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Projects.css';

// const Projects = () => {
//     const navigate = useNavigate();

//     const token = localStorage.getItem('jwttoken');
//     const userId = localStorage.getItem('id');

//     useEffect(() => {
//         if (!token || !userId) {
//             navigate('/'); // Redirect to login if no token is found
//         }
//     }, [navigate, token, userId]);

//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get('/api/project/get/projectusers', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'User-Id': userId,
//                     },
//                 });
//                 setProjects(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };
//         fetchProjects();
//     }, [token, userId]);

//     const [showMenu, setShowMenu] = useState(false);

//     const handleMenuClick = () => {
//         setShowMenu(!showMenu);
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div className="projects-container">
//             {projects.map((project) => (
//                 <div key={project.project_id} className="project-card">
//                     <h2>{project.project_name}</h2>
//                     <p>
//                         {project.users.map((user) => (
//                             <span key={user.user_id}>{user.first_name.charAt(0)}</span>
//                         ))}
//                     </p>
//                 </div>
//             ))}
//             <div className="three_dots" onClick={handleMenuClick}>
//                 <div className="dropdown">
//                     <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//                         <i className="fas fa-ellipsis-v"></i>
//                     </button>
//                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                         <li>
//                             <a href="javascript:void(0);" className="icon-add-usr dropdown-item" data-bs-toggle="modal" data-bs-target="#addUserModal">
//                                 <i className="fas fa-plus-circle"></i>&nbsp;Add User or View User
//                             </a>
//                         </li>

//                         <li>
//                             <a href="https://beatsp.altruistindia.com/projects/details/9973fe951ee80860300dc64421f3be7f" className="dropdown-item">
//                                 <i className="fas fa-pencil-alt"></i>&nbsp;Update Hierarchy
//                             </a>
//                         </li>

//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Projects;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
// import axiosInstance from '../utils/axiosInstance';

const Projects = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (!token || !userId) {
            navigate('/'); // Redirect to login if no token is found
        }
    }, [navigate, token, userId]);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('${Api_base_url}/api/project/get/projectusers'
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'User-Id': userId,
                    },
                }
                );
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProjects();
    }, [token, userId]);

    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="projects-container">
            <div className="projects-header">
                <h2>Projects</h2>
                <div className="three_dots_div">
                    <div className="dropdown-menu">
                        <button className="three_dots" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <a href="javascript:void(0);" className="icon-add-usr dropdown-item" data-bs-toggle="modal" data-bs-target="#addUserModal">
                                    <i className="fas fa-plus-circle"></i>&nbsp;Add User or View User
                                </a>
                            </li>

                            <li>
                                <a href="https://beatsp.altruistindia.com/projects/details/9973fe951ee80860300dc64421f3be7f" className="dropdown-item">
                                    <i className="fas fa-pencil-alt"></i>&nbsp;Update Hierarchy
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* <div className="three_dots" onClick={handleMenuClick}>
                    <div className="dropdown">
                        <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <a href="javascript:void(0);" className="icon-add-usr dropdown-item" data-bs-toggle="modal" data-bs-target="#addUserModal">
                                    <i className="fas fa-plus-circle"></i>&nbsp;Add User or View User
                                </a>
                            </li>

                            <li>
                                <a href="https://beatsp.altruistindia.com/projects/details/9973fe951ee80860300dc64421f3be7f" className="dropdown-item">
                                    <i className="fas fa-pencil-alt"></i>&nbsp;Update Hierarchy
                                </a>
                            </li>

                        </ul>
                    </div>
                </div> */}
            </div>
            <div className="projects-body">
                {projects.map((project) => (
                    <div key={project.project_id} className="project-card">
                        <h2>{project.project_name}</h2>
                        <p>
                            {project.users.map((user) => (
                                <span key={user.user_id}>{user.first_name.charAt(0)}</span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;