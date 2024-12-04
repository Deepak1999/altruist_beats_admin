import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom';
import claim2 from "../assests/claim 22.png"; // Example image import
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Backdrop from '@mui/material/Backdrop';
import './Projects.css';
import RemoveUserModal from "./RemoveUserModal";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';

// import ProjectDetailsModal from "./ProjectDetailModal";
import AddOrViewUsersModal from "./AddOrViewUsersModal";
import { Modal, Button, Form, Table, Dropdown } from 'react-bootstrap';
const Projects = ({ token, userId }) => {
    const [project, setProject] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [activeMenu, setActiveMenu] = useState(null); // Track active menu
    const itemsPerPage = 6; // Number of projects per page
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPopUpProjectId, setCurrentPopUpProjectId] = useState('')
    const [nonUsers, setNonUsers] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleProjectSelect = (project) => {
        setSelectedProject(project); // Set the selected project
        handleShow1(); // Open the modal
    };
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleAddUser = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect to login if no token or userId
            return;
        }

        console.log(selectedUsers)

        const apiUrl = "http://192.168.167.5:8560/api/project-users/add-singleproject-users";

        try {
            const usersToAdd = selectedUsers.map((user) => ({
                projectId: selectedProjectId,
                users: user.email, // Add selected user's email
            }));

            console.log("Users to Add:", usersToAdd);

            const response = await axios.post(apiUrl, usersToAdd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });

            if (response.status === 200) {
                alert("Users successfully added to the project!");
                // Update the projects state with the newly added users
                setProjects((prevProjects) => {
                    return prevProjects.map((project) => {
                        if (project.projectId === selectedProjectId) {
                            return {
                                ...project,
                                users: [
                                    ...project.users,
                                    ...selectedUsers, // Add the selected users to the existing project
                                ],
                            };
                        }
                        return project;
                    });
                });

                // Optionally clear selected users
                setSelectedUsers([]);

            } else {
                alert(response.data.message || "Failed to add users");
            }
        } catch (error) {
            console.error("Error adding users:", error);
            alert("Error: " + (error.response?.data?.message || error.message));
        }
    };


    const handleUpdateProjects = (payload) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) => {
                if (project.projectId === payload.projectId) {
                    const existingUserIds = new Set(project.users.map((user) => user.id));
                    const newUsers = payload.users.filter((user) => !existingUserIds.has(user.id));

                    return {
                        ...project,
                        users: [...project.users, ...newUsers],
                    };
                }
                return project;
            })
        );
    };
    const handleCheckboxChange = (userId, userName, userEmail) => {
        console.log("Before:", selectedUsers);  // Log before updating state
        setSelectedUsers((prevSelectedUsers) => {
            const newSelectedUsers = [...prevSelectedUsers, { id: userId, name: userName, email: userEmail }];
            console.log("After:", newSelectedUsers);  // Log after updating state
            return newSelectedUsers;
        });
    };


    const fetchProjects = async (token, userId, setProjects, setError, setLoading) => {
        try {
            const response = await axios.get(
                "http://192.168.167.5:8560/api/project/get/projectusers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );
            const projectData = response.data?.Projects || [];
            setProjects(projectData);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect to login if no token is found
            return;
        }

        fetchProjects(token, userId, setProjects, setError, setLoading);
    }, [navigate]);



    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage * itemsPerPage < projects.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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

    const toggleMenu = (projectId) => {
        setActiveMenu((prevId) => (prevId === projectId ? null : projectId)); // Toggle dropdown visibility
        setSelectedProjectId(projectId);
    };

    const handleAction = (action, projectId) => {
        console.log(`${action} clicked for project ${projectId}`);
        // You can handle your actions like opening a modal here
    };

    // Function to open the modal when "Add User or View User" is clicked
    const handleOpenModal = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect to login if no token is found
            return;
        }
        setActiveMenu(null);

        // setSelectedUsers(users);

        setShowModal(true);

        try {
            const response = await axios.get("http://192.168.167.5:8560/api/users/all/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    UserId: userId,
                },
            });

            console.log("API Response:", response.data);
            setUsers(Array.isArray(response.data.users) ? response.data.users : []);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch user data.");
        }
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setDropdownVisible(false); // Hide the modal
        setShowHierarchyModal(false);

    };
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const rowsPerPage = 5;

    // Calculate the index of the first and last row for the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate page numbers
    const totalPages = Math.ceil(users.length / rowsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const [selectedUser, setSelectedUser] = useState(null); // Single user object

    const updateUsers = (users) => {
        // setSelectedUsers(users); // Store selected users in the state

    };
    useEffect(() => {
        if (projects.users) {
            setUsersState(projects.users); // Store all users in the state
        }
    }, [projects.users]); // Runs whenever project.users changes
    const [usersState, setUsersState] = useState([]);

    const displayedUsers = projects
        .filter((project) => project.projectId === selectedProjectId) // Filter by selected project ID
        .flatMap((project) => project.users); // Get all users from the filtered project

    const displayedUserIds = displayedUsers.map((user) => user.userId); // Collect all user IDs

    // Filter users for the second table
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal')) {
            handleCloseModal(); // Close the modal if backdrop (outside of the modal) is clicked
        }
    };
    const [searchTerm, setSearchTerm] = useState(""); // To hold the input value
    const [searchResults, setSearchResults] = useState([]); // To store API results
    const handleSearchSubmit = async (e) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect to login if no token or userId
            return;
        }

        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post(
                "http://192.168.167.5:8560/api/users/searchUser",
                { searchTerm },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.data.status?.statusCode === 200) {
                setSearchResults(response.data.data); // Store the results in state
                console.log("Search Results:", response.data.data);
            } else {
                alert("No users found.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch user data.");
        }
    };

    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        const updatedFilteredUsers = users.filter((user) => {
            const matchesSearchTerm =
                (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email?.toLowerCase().includes(searchTerm.toLowerCase()));
            const isNotDisplayed = !displayedUserIds.includes(user.id);
            return matchesSearchTerm && isNotDisplayed;
        });
        setFilteredUsers(updatedFilteredUsers);
    }, [users, displayedUserIds, searchTerm]);

    const [showModal1, setShowModal1] = useState(false);

    const handleShow1 = () => setShowModal1(true);
    const handleClose1 = () => setShowModal1(false);

    // remove user
    const [showModal2, setShowModal2] = useState(false);

    const handleShow2 = () => setShowModal2(true);
    const handleClose2 = () => setShowModal2(false);

    const [showModal3, setShowModal3] = useState(false);

    const handleShow3 = () => setShowModal3(true);
    const handleClose3 = () => setShowModal3(false);

    const [showHierarchyModal, setShowHierarchyModal] = useState(false);

    // const handleHierarchyShow = () => setShowHierarchyModal(true);
    // const handleHierarchyClose = () => setShowHierarchyModal(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleHierarchyShow = () => {
        setShowHierarchyModal(true);
        setIsAnimating(false);
    };

    const handleHierarchyClose = () => {
        setIsAnimating(true); // Set animation state to true when closing modal
        setTimeout(() => {
            setShowHierarchyModal(false); // Hide modal after animation
            setIsAnimating(false); // Reset animation state
        }, 300); // Adjust the timeout duration to match your animation time
    };

    const handleOpenModal3 = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect to login if no token is found
            return;
        }

        try {
            const response = await axios.get("http://192.168.167.5:8560/api/users/all/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    UserId: userId,
                },
            });

            const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
            setUsers(fetchedUsers); // Update the state with fetched users
            setShowModal3(true); // Only open Modal3
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch user data.");
        }
    };

    useEffect(() => {
        if (currentPopUpProjectId) {
            fetchNonUsers()
fetchApprovers();
        }
    }, [currentPopUpProjectId]);
    const fetchNonUsers = async () => {

        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `http://192.168.167.5:8560/api/users/non/users/${currentPopUpProjectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            console.log("Not Assigned Projects Response:", response.data);
            if (response.status === 200) {
                console.log("Not Assigned Projects Response:", response.data.usersNotInProject);

                setNonUsers(Array.isArray(response.data.usersNotInProject) ? response.data.usersNotInProject : [])
                    ;
            } else {
                setError("Failed to fetch assigned projects");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            setError(err.response?.data?.statusMessage || "Something went wrong");
        }

    };
    const [approvers, setApprovers] = useState([]);
   

        const fetchApprovers = async () => {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");

            // Redirect to login if no token or userId
            if (!token || !userId) {
                navigate("/"); // Redirect to login
                return;
            }

            try {
                const response = await axios.post(
                    "http://192.168.167.5:8560/api/project/get/approvers",
                    { projectId: currentPopUpProjectId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            userId: userId,
                        },
                    }
                );

                if (response.data.Projects && response.data.Projects[0]?.approvers) {
                    setApprovers(response.data.Projects[0].approvers);
                } else {
                    setError("No approvers found.");
                }
            } catch (err) {
                setError("Failed to fetch approvers.");
            } finally {
                setLoading(false);
            }
        };

        
    //     const [approvers, setApprovers] = useState([]);
    //     const fetchApprovers = async (e) => {
    //         const token = localStorage.getItem("jwttoken");
    //         const userId = localStorage.getItem("id");

    //         if (!token || !userId) {
    //             navigate("/"); // Redirect to login if no token or userId
    //             return;
    //         }

    //         e.preventDefault(); // Prevent the default form submission behavior

    //         try {
    //             const response = await axios.post(
    //                 "http://192.168.167.5:8560/api/project/get/approvers",
    //                 { projectId: currentPopUpProjectId },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         userId: userId,
    //                     },
    //                 }
    //             );

    //             //         if (response.data.status?.statusCode === 200) {
    //             //             setSearchResults(response.data.data); // Store the results in state
    //             //             console.log("Search Results:", response.data.data);
    //             //         } else {
    //             //             alert("No users found.");
    //             //         }
    //             //     } catch (error) {
    //             //         console.error("Error fetching users:", error);
    //             //         alert("Failed to fetch user data.");
    //             //     }
    //             // };

    //             setApprovers(response.data.Projects[0].approvers);
    //             setLoading(false);
    //         } catch (err) {
    //             setError("Failed to fetch approvers.");
    //             setLoading(false);
    //         }
    //     };

    //     if (projectId) {
    //         fetchApprovers();
    //     }
    // }, [projectId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }
    return (
        <div style={{ padding: "2rem" }}>
            {/* {loading ? (
                <p style={{ color: "var(--bs-gray-dark)", fontSize: "1.2rem" }}>
                    Loading...
                </p>
            ) : error ? (
                <p style={{ color: "var(--bs-danger)", fontSize: "1.2rem" }}>
                    Error: {error}
                </p>
            ) : projects.length === 0 ? (
                <p style={{ color: "var(--bs-secondary)", fontSize: "1.2rem" }}>
                    No projects available.
                </p>
            ) : ( */}
            {loading ? (
                <div className="loader-container loader-backdrop">
                    <div className="loader"></div>
                </div>
            ) : error ? (
                <p style={{ color: "var(--bs-danger)", fontSize: "1.2rem" }}>
                    Error: {error}
                </p>
            ) : projects.length === 0 ? (
                <p style={{ color: "var(--bs-secondary)", fontSize: "1.2rem" }}>
                    No projects available.
                </p>
            ) : (
                <div
                    className="card shadow-none border bg_white mt-4"
                    style={{
                        backgroundColor: "#e5e5e5",

                        marginLeft: "-7px",
                        marginRight: "-7px",
                        width: "auto",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",

                            flexWrap: "nowrap",
                            gap: "1.8rem",
                            overflowX: "auto", // Enable horizontal scrolling
                            paddingBottom: "1rem",
                        }}
                    >
                        {currentProjects.map((project, index) => (

                            <div
                                key={project.projectId}
                                style={{
                                    flex: "0 0 auto", // Prevent wrapping
                                    border: "1px solid var(--bs-light)",
                                    borderRadius: "11px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    padding: "1rem",
                                    backgroundColor: "var(--bs-white)",
                                    width: "214px", // Fixed width for each card
                                    position: "relative",
                                    transition: "transform 0.3s, box-shadow 0.3s",

                                }} onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = "translateY(-5px)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = "translateY(0)")
                                }
                            >
                                <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                                    <span
                                        style={{
                                            backgroundColor: "#48c1f1",
                                            color: "#fff",
                                            fontSize: "0.9rem",
                                            padding: "0.3rem 0.6rem",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        #{index + 1}
                                    </span>
                                </div>
                                <div>
                                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                                        <img
                                            src={claim2}
                                            alt="Project Thumbnail"
                                            style={{
                                                width: "40%",
                                                height: "40%",
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </div>
                                    <h5
                                        style={{
                                            color: "black",
                                            fontSize: "17.25px",
                                            marginBottom: "0.5rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        {project.projectName || "Untitled Project"}
                                    </h5>
                                    <p style={{
                                        lineHeight: "21px",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                        textAlign: "center",
                                        color: "#6a6a6a"
                                    }}>{project.shortName}</p>
                                    <hr
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '1.428571429',
                                            color: '#333333'
                                        }} />

                                    <p
                                        style={{
                                            color: "#8d8d8e",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            textAlign: "center",
                                        }}
                                    >
                                        Users ({project.users?.length || 0}):
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "0.5rem",
                                            flexWrap: "wrap",
                                        }}
                                    >


                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap", // Wraps the elements to the next line
                                                overflowY: "auto", // Enables vertical scrolling
                                                maxHeight: "70px", // Set max height for the scrollable area
                                                width: "490px", // Set width for the container
                                                border: "1px solid #ddd", // Border around the scrollable area
                                                padding: "10px",
                                                gap: "10px",
                                            }}
                                        >
                                            {project.users?.map((user, userIndex) => (
                                                <span
                                                    key={user.user_id}
                                                    style={{
                                                        position: "relative",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: "50%",
                                                        backgroundColor: colors[userIndex % colors.length], // Unique color for each circle

                                                        color: "var(--bs-white)",
                                                        fontSize: "1rem",
                                                        cursor: "pointer",
                                                    }}
                                                    title={user.name || "User"}
                                                >
                                                    {user.name?.charAt(0) || "U"}
                                                </span>
                                            ))}
                                        </div>


                                    </div>
                                    <hr
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: '#333333'
                                        }} />
                                    <p style={{
                                        color: "#8d8d8e",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        textAlign: "center",
                                    }}
                                    >
                                        Created:
                                    </p>
                                    <p style={{
                                        lineHeight: "2px",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                        textAlign: "center",
                                        color: "#6a6a6a"
                                    }}>{formatDate(project.created)}</p>
                                    <hr
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: '#333333'
                                        }} />
                                    <p style={{
                                        color: "#8d8d8e",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        textAlign: "center",
                                    }}
                                    >
                                        Created By:
                                    </p>
                                    <p style={{
                                        lineHeight: "2px",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                        textAlign: "center",
                                        color: "#6a6a6a"
                                    }}>{project.createdByName}</p>
                                </div>

                                {/* Three-dot menu remains unchanged */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                    }}
                                >
                                    <button
                                        type="button"
                                        style={{
                                            background: "none",
                                            border: "none",
                                            fontSize: "1.5rem",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => toggleMenu(project.projectId)} // Pass the project ID to the toggle function
                                    >
                                        <i className="fas fa-ellipsis-v"></i>
                                    </button>
                                    {activeMenu === project.projectId && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "30px",
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
                                                        onClick={(e) => {
                                                            setCurrentPopUpProjectId(project.projectId);
                                                            handleOpenModal(e);  // Call handleOpenModal
                                                            handleOpen(e);       // Call handleOpen (if needed)
                                                        }}
                                                        className="icon-add-usr dropdown-item"
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

                                                        &nbsp;Add User or View User
                                                    </a>
                                                </li>

                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        onClick={(e) => {
                                                            setCurrentPopUpProjectId(project.projectId);
                                                            fetchApprovers();
                                                            handleHierarchyShow(e);  // Call handleOpenModal

                                                        }}
                                                        className="icon-add-usr dropdown-item"
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

                                                        &nbsp;Update Hierarchy
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={handleShow1}
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
                                                        &nbsp;View Project
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={handleShow2}
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
                                                        &nbsp;Remove User
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={(e) => { handleShow3(e); handleOpenModal3(e) }}
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
                                                        &nbsp;Asign Role
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Pagination controls */}

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem", marginLeft: "auto" }}>
                        {/* Prev Arrow */}
                        <button
                            className="btn btn-secondary"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            style={{ marginRight: "10px" }}
                        >
                            <FaChevronLeft /> {/* Left arrow icon */}
                        </button>

                        {/* Page Number */}
                        <span style={{ margin: "0 10px" }}>
                            Page {currentPage} of {Math.ceil(projects.length / itemsPerPage)}
                        </span>

                        {/* Next Arrow */}
                        <button
                            className="btn btn-secondary"
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= projects.length}
                            style={{ marginLeft: "10px" }}
                        >
                            <FaChevronRight /> {/* Right arrow icon */}
                        </button>
                    </div>
                </div>
            )
            }

            <AddOrViewUsersModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleBackdropClick={handleBackdropClick}
                handleSearchSubmit={handleSearchSubmit}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredUsers={nonUsers}
                handleCheckboxChange={handleCheckboxChange}
                projects={projects}
                selectedProjectId={currentPopUpProjectId}
                handleAddUser={handleAddUser}
            />
            <Dialog open={showModal1} onClose={handleClose1} fullWidth maxWidth="xl" style={{ maxWidth: '1088px', marginLeft: 'auto', marginRight: 'auto' }}>
                <DialogTitle
                    style={{
                        backgroundColor: '#0d6efd', // Primary color
                        color: 'white',
                        padding: '1rem 1.5rem',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                    }}
                >
                    Project Details
                </DialogTitle>

                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        margin: '30px',
                        flexDirection: 'column',
                        minWidth: '0',
                        wordWrap: 'break-word',
                        backgroundColor: '#fff',
                        backgroundClip: 'borderBox',
                        padding: '-10px',
                        border: '1px solid rgba(0, 0, 0, .125)',
                        boxShadow: '0px -2px 11px 0px rgba(0, 0, 0, .1), 4px 2px 4px 4px rgb(0 0 0 / 6%)',
                        borderRadius: '.25rem',
                    }}
                >
                    <DialogContent
                        style={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                            fontSize: '1rem',
                            border: '3px solid rgba(0, 0, 0, .125)',
                        }}
                    >
                        <Grid container spacing={3}>
                            {/* First Row */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Name"
                                    value={selectedProject?.projectName || ''}
                                    style={{
                                        marginBottom: '1rem',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Short Name"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Short Name"
                                    value={selectedProject?.shortName || ''}
                                    style={{
                                        marginBottom: '1rem',
                                    }}
                                />
                            </Grid>

                            {/* Second Row */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Created Date"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={selectedProject?.created || ''}
                                    style={{
                                        marginBottom: '1rem',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </div>

                <DialogActions style={{ padding: '1.5rem 2rem' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose1}
                        style={{
                            fontWeight: '600',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.3rem',
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={handleClose1}
                        variant="outlined"
                        color="secondary"
                        style={{
                            fontWeight: '600',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.3rem',
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* <Dialog open={showModal1} onClose={handleClose1} fullWidth maxWidth="xl">
                <DialogTitle>Project Details</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Name"
                                value={selectedProject?.projectName || ''}
                                style={{ marginBottom: '1rem' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Short Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Short Name"
                                value={selectedProject?.shortName || ''}
                                style={{ marginBottom: '1rem' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Created Date"
                                variant="outlined"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={selectedProject?.created || ''}
                                style={{ marginBottom: '1rem' }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleClose1}>Update</Button>
                    <Button onClick={handleClose1} variant="outlined" color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog> */}

            {/* <Dialog open={showModal1} onClose={handleClose1} fullWidth maxWidth="xl" style={{ maxWidth: '1088px', marginLeft: 'auto', marginRight: 'auto' }}>
                <DialogTitle
                    style={{
                        backgroundColor: '#0d6efd', // Primary color
                        color: 'white',
                        padding: '1rem 1.5rem',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                    }}
                >
                    Project Details
                </DialogTitle>

                <DialogContent
                    style={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                        fontSize: '1rem',
                        border: '3px solid rgba(0, 0, 0, .125)',
                    }}
                >
                    <Grid container spacing={3}>
                        {/* First Row */}
            {/* <Grid item xs={12} sm={4}>
                            {console.log(project)}
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Name"
                                value={project?.projectName || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Short Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Short Name"
                                value={project?.shortName || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid> */}

            {/* Second Row */}
            {/* <Grid item xs={12} sm={4}>
                            <TextField
                                label="Created Date"
                                variant="outlined"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={project?.created || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions style={{ padding: '1.5rem 2rem' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('Update clicked')}
                        style={{
                            fontWeight: '600',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.3rem',
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={handleClose1}
                        variant="outlined"
                        color="secondary"
                        style={{
                            fontWeight: '600',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.3rem',
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions> */}
            {/* </Dialog> */}
            {/* <ProjectDetailsModal show={showModal1} onHide={handleClose1} /> */}

            {/* remove user */}

            {/* <RemoveUserModal
                projects={projects} selectedProjectId={selectedProjectId}
                onHide={handleClose2}
                showModal={showModal2}
                handleClose={handleClose2}
                users={users}
            /> */}
            <RemoveUserModal
                projects={projects}
                selectedProjectId={selectedProjectId}
                showModal={showModal2}
                handleClose2={handleClose2}
                fetchProjects={fetchProjects}
                users={[]} />
            {/* remove user offf */}
            {/* <Modal
                show={showModal3}
                onHide={() => setShowModal3(false)}
                size="lg"
                centered
                backdrop="static"
            >
                <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
                    <Modal.Title>Assign Role</Modal.Title>
                    <Button variant="close" onClick={() => setShowModal3(false)} />
                </Modal.Header>

                <Modal.Body className="add_view_user">
                    <div className="row mb-3">
                        <div className="col-md-7 search-container mx-auto">
                            <form className="d-flex">
                                <input
                                    type="text"
                                    placeholder="Search.."
                                    className="form-control me-2"
                                />
                                <Button variant="primary" type="submit">
                                    <i className="fa fa-search"></i>
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="card" style={{
                        marginLeft: "-10px", width: "49rem", boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)"
                    }}>
                        <div className="table-responsive">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Users</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        style={{ border: "1px solid grey" }}
                                                    >
                                                        {user.role || "Select Role"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {roles.map((role, idx) => (
                                                            <Dropdown.Item key={idx}>
                                                                {role}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            <td>
                                                <Button variant="link">View</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="info" style={{ color: "white" }}>
                        Add
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal3(false)}
                        style={{ background: "transparent", color: "black", border: "none" }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <Modal
                show={showModal3}
                onHide={() => setShowModal3(false)}
                size="lg"
                centered
                backdrop="static"
            >
                <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
                    <Modal.Title>Assign Role</Modal.Title>
                    <Button variant="close" onClick={() => setShowModal3(false)} />
                </Modal.Header>

                <Modal.Body>
                    <div className="table-responsive">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Users</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    style={{ border: "1px solid grey" }}
                                                >
                                                    {user.role || "Select Role"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {roles.map((role, idx) => (
                                                        <Dropdown.Item key={idx}>{role}</Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>View</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="info" style={{ color: "white" }}>
                        Add
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal3(false)}
                        style={{ background: "transparent", color: "black", border: "none" }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>







            {/* <div
            show={handleHierarchyShow}
            
                onHide={() => setShowHierarchyModal(false)}
                className="modal fade"
                id="updateModal"
                tabIndex={-1}
                aria-labelledby="updateModalLabel"
                aria-hidden="true"
            > */}

            <div
                className={`modal fade ${showHierarchyModal ? "show" : ""} ${isAnimating ? "fade-out" : ""}`}
                style={{ display: showHierarchyModal || isAnimating ? "block" : "none" }}
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{ background: "#2cb7fd", color: "white" }}
                        >
                            <h5 className="modal-title" id="updateModalLabel">
                                Approval Hierarchy
                            </h5>
                            <button

                                onClick={(e) => { handleHierarchyClose(e); handleCloseModal(e) }}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body add_view_user">
                            <div className="row">
                                <div
                                    className="col-md-12 px-5"
                                    style={{ display: "flex", justifyContent: "start" }}
                                >
                                    <div className="col-md-7 search-container search-container-1 px-2">
                                        <form action="/action_page.php" className="d-flex">
                                            <input type="text" placeholder="Search.." name="search" />
                                            <button type="submit">
                                                <i className="fa fa-search" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Table inside modal */}
                            <div className="row mt-3">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <div className="col-md-5 mx-auto">
                                        <div
                                            className="card"
                                            style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)", width: "17rem", marginLeft: "-39px" }}
                                        >
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>User Name</th>
                                                            <th>Email</th>
                                                            <th>Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* Example table rows, you can dynamically add users here */}
                                                        <tr>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="user1"
                                                                />
                                                            </td>
                                                            <td>Muskan</td>
                                                            <td>muskan@example.com</td>
                                                            <td>Admin</td>
                                                        </tr>
                                                        {/* Add more users as needed */}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div
                                                    className="col-md-12 px-4 my-1"
                                                    style={{ display: "flex", justifyContent: "end" }}
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn btn-info btn-sm"
                                                        style={{ color: "white", fontWeight: 600 }}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 mx-auto">
                                        <div
                                            className="card"
                                            style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)", width: "17rem", marginLeft: "-39px" }}
                                        >
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th />
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Hierarchy</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {/* <tbody>
                                                        <tr>
                                                            <td>
                                                               
                                                                <label className="switch">
                                                                    <input type="checkbox" id="email-notification-1" />
                                                                    <span className="slider round" />
                                                                </label>
                                                            </td>
                                                            <td>Benisha</td>
                                                            <td>benish32@example.com</td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    placeholder={1}
                                                                    id="quantity"
                                                                    name="quantity"
                                                                    min={1}
                                                                    max={10}
                                                                    style={{ width: 40, height: 24 }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <i className="fas fa-pencil-alt" />
                                                            </td>
                                                        </tr>
                                                    </tbody> */}
                                                    <tbody>
                                                        {approvers.map((approver) => (
                                                            <tr key={approver.userId}>
                                                                <td>
                                                                    <label className="switch">
                                                                        <input type="checkbox" id={`approver-${approver.userId}`} />
                                                                        <span className="slider round" />
                                                                    </label>
                                                                </td>
                                                                <td>{approver.name}</td>
                                                                <td>{approver.email}</td>
                                                                <td>{approver.hierarchy}</td>
                                                                <td>
                                                                    <i className="fas fa-pencil-alt" />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-info"
                                style={{ color: "white" }}
                            >
                                Update
                            </button>
                            <button
                                onClick={(e) => { handleHierarchyClose(e); handleCloseModal(true, e) }}
                                type="button"
                                className=""
                                data-bs-dismiss="modal"
                                style={{ border: "none", background: "transparent" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
};

export default Projects;
