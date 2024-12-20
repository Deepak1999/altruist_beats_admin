
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Grid, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material';
const Users = () => {

    const [unassignedProjects, setUnassignedProjects] = useState([]);
    const [assignedProjects, setAssignedProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(67); // Pagination state
    const itemsPerPage = 6; // Items per page
    const [activeMenu, setActiveMenu] = useState(null); // Active menu state for each user
    const navigate = useNavigate();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const handleShow1 = () => setShowModal1(true);
    const handleClose1 = () => setShowModal1(false);

    const [showModal2, setShowModal2] = useState(false);
    const handleShow2 = () => setShowModal2(true);
    const handleClose2 = () => setShowModal2(false);

    const [showModal3, setShowModal3] = useState(false);
    const handleShow3 = () => setShowModal3(true);
    const handleClose3 = () => setShowModal3(false);

    const [showModal4, setShowModal4] = useState(false);
    const handleShow4 = () => setShowModal4(true);
    const handleClose4 = () => setShowModal4(false);
    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");

            if (!token || !userId) {
                setError("User not authenticated");
                return;
            }

            try {
                const response = await axios.get(
                    "http://192.168.167.5:8560/api/users/all/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            userId: userId,
                        },
                    }
                );
                setUsers(response.data?.users || []);
            } catch (err) {
                console.error("API Error:", err);
                // setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Function to toggle the user menu
    const toggleMenu = (userId) => {
        setActiveMenu(activeMenu === userId ? null : userId);
    };

    // Slice users for pagination
    const currentUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handleSubmit = () => {
        if (newPassword === confirmPassword) {
            // Handle password update logic
            console.log('Password updated:', newPassword);
            // Close the dialog after successful submission
            setShowModal2(false);
        } else {
            alert('Passwords do not match!');
        }
    };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
        // fetchNotAssignedProjects();
    }, []);
    const fetchProjects = async (selectedUserId) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `http://192.168.167.5:8560/api/users/project/by/user/${selectedUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (Number(response.data.statusDescription.statusCode) === 200) {
                setProjects(Array.isArray(response.data.projects) ? response.data.projects : []);
            } else {
                setError(response.data.statusDescription.statusMessage || "Failed to fetch projects");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            // setError(err.response?.data?.statusMessage || "Something went wrong");
        }
    };


    const handleAssignClick = (userId) => {
        setSelectedUserId(userId);
        fetchProjects(userId);
        fetchNotAssignProjects(userId);
    };

    const fetchRemoveProjects = async (projectId, projectUserId) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.post(
                `http://192.168.167.5:8560/api/project-users/delete-user`,
                {
                    projectId: projectId,
                    projectUserId: projectUserId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );
            if (response.status === 200) {
                setAssignedProjects(
                    Array.isArray(response.data.projects) ? response.data.projects : []
                );
            } else {
                setError("Failed to fetch assigned projects");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            // setError(err.response?.data?.statusMessage || "Something went wrong");
        }

    };
    const handleRemoveClick = (projectId, projectUserId) => {
        console.log(projectId, projectUserId)
        setSelectedProjectId(projectId);
        fetchRemoveProjects(projectId, projectUserId);
    };

    const fetchNotAssignProjects = async (selectedUserId) => {

        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `http://192.168.167.5:8560/api/users/project/not/by/user/${selectedUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            console.log("Not Assigned Projects Response:", response.data);
            if (response.status === 200) {
                setUnassignedProjects(
                    Array.isArray(response.data.projects) ? response.data.projects : []
                );
            } else {
                setError("Failed to fetch assigned projects");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            // setError(err.response?.data?.statusMessage || "Something went wrong");
        }

    };
    const handleDeactivateClick = (userId) => {
        setSelectedUserId(userId);
        fetchDeactivateUser(userId);
    };

    const fetchDeactivateUser = async (selectedUserId) => {

        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `http://192.168.167.5:8560/api/users/disable-user/${selectedUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            console.log("Deactivate User Response:", response.data);

            if (response.status === 200) {
                alert("User has been deactivated successfully!");

                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUserId
                            ? { ...user, isActive: false }
                            : user
                    )
                );
            } else {
                setError("Failed to deactivate the user.");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
        }

    };
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        shortName: '',
        istype: '',
        roleId: '',
        empCode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleEditClick = (userId) => {
        setSelectedUserId(userId);

        handleShow1();
    };

    const handleUpdateUser = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }
        if (!userData.name || !userData.email || !userData.shortName || !userData.istype) {
            setError("All fields must be filled before updating.");
            return;
        }
        const dataToSend = {
            id: selectedUserId,
            email: userData.email,
            name: userData.name,
            shortName: userData.shortName,
            istype: userData.istype,
            // isactive: userData.isactive,
            // timezoneId: userData.timezoneId,
            roleId: userData.roleId,
            empCode: userData.empCode
        };

        console.log("Sending update request with data:", dataToSend);

        try {
            const response = await axios.post(
                'http://192.168.167.5:8560/api/users/update',
                dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId
                    },
                }
            );

            if (response.status === 200) {
                console.log("User updated successfully", response.data);
                handleClose1();  // Close the modal after successful update
            } else {
                console.error("Failed to update user", response.data);
            }
        } catch (err) {
            console.error("Error updating user:", err.response?.data || err.message);
        }
    };


   
    const colors = [
        "#282f37", // Light Blue (lighter than #0199ec)
        "#247caa", // Light Indigo (lighter than #0504b8)
        "#5d5d5f", // Light Cornflower Blue (lighter than #3357FF)
        "#0199ec", // Light Pink (lighter than #FF33A1)
        "#00dc95", // Light Yellow (lighter than #FFC300)
        "#47f0b5", // Light Green (lighter than #DAF7A6)
        "#0504b8", // Light Purple (lighter than #581845)
        "#C4778E",
    ];
    const styles = {
        "--bs-blue": "#0d6efd",
        "--bs-indigo": "#6610f2",
        "--bs-purple": "#6f42c1",
        "--bs-pink": "#d63384",
        "--bs-red": "#dc3545",
        "--bs-orange": "#fd7e14",
        "--bs-yellow": "#ffc107",
        "--bs-green": "#198754",
        "--bs-teal": "#20c997",
        "--bs-cyan": "#0dcaf0",
        "--bs-white": "#fff",
        "--bs-gray": "#6c757d",
        "--bs-gray-dark": "#343a40",
        "--bs-primary": "#0d6efd",
        "--bs-secondary": "#6c757d",
        "--bs-success": "#198754",
        "--bs-info": "#0dcaf0",
        "--bs-warning": "#ffc107",
        "--bs-danger": "#dc3545",
        "--bs-light": "#f8f9fa",
        "--bs-dark": "#212529",
        "--bs-font-sans-serif":
            'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        "--bs-font-monospace":
            'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace"',
        "--bs-gradient":
            "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))",
        fontFamily: "var(--bs-font-sans-serif)",
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        color: "#212529",
        WebkitTextSizeAdjust: "100%",
        WebkitTapHighlightColor: "transparent",
        "--bs-gutter-x": "1.5rem",
        "--bs-gutter-y": "0",
        wordWrap: "break-word",
        boxSizing: "border-box",
        width: "30%",
        height: "60px",
        background: "#defcff",
        borderRadius: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
    };

    const [selectedEmail, setSelectedEmail] = useState("");
       const handleAddProjectClick = (email) => {
        setSelectedEmail(email);
    };

    // Capture project ID from checkbox
    const handleCheckboxChange = (e, projectId) => {
        if (e.target.checked) {
            setSelectedProjectId(projectId);
        } else {
            setSelectedProjectId(null);
        }
    };

    const handleAddProject = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        if (!selectedEmail || !selectedProjectId) {
            setError("Please select both email and project ID.");
            return;
        }

        const dataToSend = [{
            users: selectedEmail,
            projectId: selectedProjectId,
        }];

        console.log("Sending request with data:", dataToSend);

        try {
            const response = await axios.post(
                "http://192.168.167.5:8560/api/project-users/add-singleproject-users",
                dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.status === 200) {
                console.log("Project assigned successfully", response.data);
                await fetchProjects(selectedUserId);
            } else {
                console.error("Failed to assign project", response.data);
            }
        } catch (err) {
            console.error("Error assigning project:", err.response?.data || err.message);
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
            <div
                style={{
                    backgroundColor: "#e5e5e5",
                    margin: "0 -7px",
                    width: "auto",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "1.5rem",
                        overflowX: "auto", // Enable horizontal scrolling
                        paddingBottom: "1rem",
                    }}
                >
                    {currentUsers.map((user, project, userIndex) => (

                        <div

                            key={user.id}

                            style={{
                                width: "18%",
                                borderRadius: "25px",
                                padding: "15px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#fff",
                                textAlign: "center",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "translateY(-5px)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "translateY(0)")
                            }
                        >
                            <span
                                key={user.id}
                                style={styles}
                                
                                title={user.name || "User"}
                            >
                                {user.name?.charAt(0) || "U"}
                            </span>
                            <h4 style={{ marginBottom: "10px" }}>{user.name}</h4>
                            <p style={{

                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#6a6a6a",
                                lineHeight: "24px"

                            }}>{user.shortName}</p>
                            <hr style={{ margin: "10px 0" }} />
                            <p style={{
                                lineHeight: "24px",
                                fontSize: "18px",
                                fontWeight: 400,
                                color: "#6a6a6a"
                            }}
                            >
                                Email_Id
                            </p>
                            <p style={{
                                lineHeight: "24px",
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#6a6a6a"
                            }}>{user.email}</p>
                            <hr style={{ margin: "10px 0" }} />
                            <p style={{
                                lineHeight: "24px",
                                fontSize: "18px",
                                fontWeight: 400,
                                color: "#6a6a6a"
                            }}
                            >
                                Created on
                            </p>
                            <p style={{
                                lineHeight: "24px",
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#6a6a6a"
                            }}>{formatDate(user.createdDate)}</p>
                            <hr style={{ margin: "10px 0" }} />
                            <p style={{
                                lineHeight: "24px",
                                fontSize: "18px",
                                fontWeight: 400,
                                color: "#6a6a6a"
                            }}
                            >Role</p>
                            <p style={{
                                lineHeight: "24px",
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#6a6a6a"
                            }}>{user.role}</p>

                            <div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                }}
                            >
                                <button className="m-0"
                                    type="button"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "1.5rem",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => toggleMenu(user.id)} // Pass the project ID to the toggle function
                                >
                                    <i className="fas fa-ellipsis-v text-dark"></i>
                                </button>

                                {activeMenu === user.id && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "46px",
                                            right: "0",
                                            backgroundColor: "#fff",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                            zIndex: 10,
                                        }}
                                    >
                                        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                                            <li>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="icon-add-usr dropdown-item"
                                                    onClick={(e) => {
                                                        handleShow1(e); // Trigger handleShow3 (e.g., show a modal)
                                                        handleEditClick(user.id); // Fetch and display the projects for the user
                                                    }}
                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <i className="fas fa-plus-circle" />

                                                    &nbsp;Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a

                                                    className="dropdown-item"
                                                    onClick={handleShow2}

                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                    &nbsp;Change password
                                                </a>
                                            </li>
                                            <li>
                                                <a

                                                    className="dropdown-item"
                                                    onClick={(e) => {
                                                        handleShow3(e); // Trigger handleShow3 (e.g., show a modal)
                                                        handleAssignClick(user.id);
                                                        handleAddProjectClick(user.email); // Fetch and display the projects for the user
                                                    }}
                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                    &nbsp;Assign Project
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    onClick={(e) => {
                                                        // console.log(project, user)
                                                        handleShow4(e); // Trigger handleShow3 (e.g., show a modal)
                                                        handleAssignClick(user.id);
                                                        // handleAddProjectClick(user.email); // Fetch and display the projects for the user
                                                    }}
                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                    &nbsp;Remove Project
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={(e) => {


                                                    handleDeactivateClick(user.id);
                                                }}
                                                    className="dropdown-item"
                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                    &nbsp;Disable
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                )}
                            </div></div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    gap: "10px",
                }}
            >
                <button
                    style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span style={{ fontSize: "1.1rem" }}>{currentPage}</span>
                <button
                    style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        setCurrentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(users.length / itemsPerPage))
                        )
                    }
                    disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>

            {/* Loading and error handling */}
            {loading && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    Loading...
                </div>
            )}
            {error && (
                <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
                    {error}
                </div>
            )}
        <Dialog open={showModal1} onClose={handleClose1} fullWidth maxWidth="xl" style={{ maxWidth: '1088px', marginLeft: 'auto', marginRight: 'auto' }}>
                <DialogTitle style={{ backgroundColor: '#0d6efd', color: 'white', padding: '1rem 1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>
                    Update User
                </DialogTitle>

                <div style={{ position: 'relative', display: 'flex', margin: '30px', flexDirection: 'column', backgroundColor: '#fff', padding: '-10px', border: '1px solid rgba(0, 0, 0, .125)' }}>
                    <DialogContent style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', fontSize: '1rem', border: '3px solid rgba(0, 0, 0, .125)' }}>
                        <Grid container spacing={3}>
                            {/* Your input fields */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Name"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Short Name"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Short Name"
                                    name="shortName"
                                    value={userData.shortName}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Type"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    name="istype"
                                    value={userData.istype}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Role"
                                    variant="outlined"
                                    fullWidth
                                    name="roleId"
                                    value={userData.roleId}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Employee Code"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Employee Code"
                                    name="empCode"
                                    value={userData.empCode}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </div>

                {error && (
                    <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
                        <strong>{error}</strong>
                    </div>
                )}

                <DialogActions style={{ padding: '1.5rem 2rem' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateUser} // Trigger update on click
                        style={{ fontWeight: '600', padding: '0.75rem 2rem', borderRadius: '0.3rem' }}
                    >
                        Update
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose1} // Close the dialog
                        style={{ fontWeight: '600', padding: '0.75rem 2rem', borderRadius: '0.3rem' }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* PASSWORD */}

            <Dialog open={showModal2} onClose={handleClose2}>
                <DialogTitle style={{ background: '#2cb7fd', color: 'white' }}>
                    Change Password
                </DialogTitle>
                <DialogContent>
                    <form>
                        <div className="row">
                        <div className="col-6">
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        /></div>
                        <div className="col-6">
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        </div>
</div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        style={{ background: '#2cb7fd', color: 'white', fontWeight: 'bold' }}
                    >
                        Update & Send
                    </Button>
                    <Button onClick={handleClose2} style={{ color: '#0a869f' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <div className={`modal fade ${showModal3 ? "show" : ""}`} style={{ display: showModal3 ? "block" : "none" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "#2cb7fd", color: "white" }}>
                            <h5 className="modal-title" id="addUserModalLabel">
                                Assign Project
                            </h5>
                            <button type="button" className="btn-close m-0" onClick={handleClose3}></button>
                        </div>
                        <div className="modal-body add_view_user">
                            <div className="row">
                                <div className="col-md-12 my-2" style={{ display: "flex", justifyContent: "end" }}>
                                    {/* <div className="col-md-7 search-container"> */}
                                        <form action="/action_page.php" className="search-bar-form d-flex mx-auto" style={{width:"251px"}}>
                                            <input className="form-control" type="text" placeholder="Search.." name="search" />
                                            <button className="m-0" type="submit">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </form>
                                    {/* </div> */}
                                </div>
                                <div className="col-md-6 my-2">
                                        <div
                                            className="card p-0 w-100 h-100 m-0"
                                            style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)", width: "25rem"}}
                                        >
                                            <div className="table-responsive" style={{
                                                maxHeight: "300px", 
                                                overflowY: "auto", 
                                                border: "1px solid #ddd", 
                                            }}>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Company</th>
                                                            <th>Type</th>
                                                            <th>Created By</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {unassignedProjects && unassignedProjects.length > 0 ? (
                                                            unassignedProjects.map((project, index) => (
                                                                <tr key={project.id}>
                                                                    <td>
                                                                        <input
                                                                            type="checkbox"
                                                                              onChange={(e) => handleCheckboxChange(e, project.id)}
                      
                                                                              />
                                                                    </td>
                                                                    <td>{index + 1}</td>
                                                                    <td>{project.name}</td>
                                                                    <td>{project.businessCompany || "N/A"}</td>
                                                                    <td>{project.ptype || "N/A"}</td>
                                                                    <td>{project.createdBy || "N/A"}</td>

                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="5">No unassigned projects available.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <div
                                            className="card p-0 w-100 h-100"
                                            style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)", width: "20rem" }}
                                        >
                                            <div className="table-responsive" style={{
                                                maxHeight: "300px", // Set the height you want
                                                overflowY: "auto",  // Enable vertical scrolling
                                                border: "1px solid #ddd", // Optional: Add a border for clarity
                                            }}>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Assigned Project(s)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {projects && projects.length > 0 ? (
                                                            projects.map((project, index) => (
                                                                <tr key={index}>
                                                                    <td>{project.projectName}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td>No assigned projects available.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/* Table inside modal */}
                            {/* <div className="row mt-3">
                                <div className="col-md-12 d-flex justify-content-between">
                                    
                                </div>
                            </div> */}
                        </div>
                        <div
                            className="modal-footer d-flex justify-content-center"
                            style={{ border: "none",marginLeft:"-99px" }}
                        >
                            <button
                                type="button"
                                onClick={handleAddProject}
                                className="btn"
                                style={{
                                    background: "#2cb7fd",
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                Assign
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type="button"
                                className="btn"
                                onClick={handleClose3}
                                style={{
                                    background: "#2cb7fd",
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                Assign & Continue
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type="button"
                                onClick={handleClose3}
                                className=""
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#0a869f",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* remove project */}

            <div className={`modal fade ${showModal4 ? "show" : ""}`} style={{ display: showModal4 ? "block" : "none" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{width:"700px"}}>
                        <div className="modal-header" style={{ background: "#2cb7fd", color: "white" }}>
                            <h5 className="modal-title" id="addUserModalLabel">
                               Remove Project
                            </h5>
                            <button type="button" className="btn-close" onClick={handleClose4}></button>
                        </div>
                        <div className="modal-body add_view_user">
                            <div className="row">
                                <div className="col-md-12 my-2" style={{ display: "flex", justifyContent: "end" }}>
                                    {/* <div className="col-md-7 search-container"> */}
                                        <form action="/action_page.php"
                                            className="search-bar-form d-flex mx-auto" style={{width:"251px"}}>
                                            <input className="form-control" type="text" placeholder="Search.." name="search" />
                                            <button className="m-0" type="submit">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </form>
                                    {/* </div> */}
                                </div>
                                <div className="col-md-6 mx-auto my-2">
                                    <div
                                        className="card w-100 h-100 m-0"
                                        style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)", width: "27rem",marginLeft:"-139px" }}
                                    >
                                        <div className="table-responsive" style={{
                                            maxHeight: "300px", // Set the height you want
                                            overflowY: "auto",  // Enable vertical scrolling
                                            border: "1px solid #ddd", // Optional: Add a border for clarity
                                        }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Assigned Project(s)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {projects && projects.length > 0 ? (
                                                        projects.map((project, index) => (
                                                            <tr key={index}>
                                                                <td>{project.projectName}</td>
                                                                <td>
                                                                    {/* The remove button should be within the map loop */}
                                                                    <button
                                                                        type="button"
                                                                        className="btn"
                                                                        style={{
                                                                            background: "#2cb7fd",
                                                                            color: "white",
                                                                            fontWeight: "bold",
                                                                        }}
                                                                        onClick={() => handleRemoveClick(project.projectId, selectedUserId)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td>No assigned projects available.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Table inside modal */}
                            {/* <div className="row mt-3">
                                
                            </div> */}
                        </div>
                        <div
                            className="modal-footer d-flex justify-content-center"
                            style={{ border: "none" }}
                        >
                            {/* The footer buttons can remain unchanged */}
                            <button
                                type="button"
                                onClick={handleClose4}
                                className=""
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#0a869f",
                                    // marginLeft: "40rem"
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Users;
