import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import claim2 from "../assests/claim 22.png";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { Modal, Button, Form, Table, Dropdown } from 'react-bootstrap';
import RemoveUserModal from "./RemoveUserModal";
import AddOrViewUsersModal from "./AddOrViewUsersModal";
// import claim2 from "../assets/claim22.png";

import './Projects.css';

const Projects = ({ token, userId }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState(null);
    const itemsPerPage = 6;
    const [showModal, setShowModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [nonUsers, setNonUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]); const [approvers, setApprovers] = useState([]);
    const [currentPopUpProjectId, setCurrentPopUpProjectId] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showHierarchyModal, setShowHierarchyModal] = useState(false);


    const handleShow1 = () => setShowModal1(true);
    const handleClose1 = () => setShowModal1(false);

    const handleShow2 = () => setShowModal2(true);
    const handleClose2 = () => setShowModal2(false);

    const handleShow3 = () => setShowModal3(true);
    const handleClose3 = () => setShowModal3(false);
    const handleOpenModal3 = () => setShowModal3(true);
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal1(false);
            setShowModal2(false);
            setShowModal3(false);
        }
    };

    const navigate = useNavigate();

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const fetchProjects = async (token, userId) => {
        try {
            const response = await axios.get("http://192.168.167.5:8560/api/project/get/projectusers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });
            setProjects(response.data?.Projects || []);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const handleAddUser = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        try {
            const usersToAdd = selectedUsers.map(user => ({
                projectId: selectedProjectId,
                users: user.email,
            }));

            const response = await axios.post(
                "http://192.168.167.5:8560/api/project-users/add-singleproject-users",
                usersToAdd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.status === 200) {
                alert("Users successfully added to the project!");
                setProjects(prevProjects =>
                    prevProjects.map(project => {
                        if (project.projectId === selectedProjectId) {
                            return {
                                ...project,
                                users: [...project.users, ...selectedUsers],
                            };
                        }
                        return project;
                    })
                );
                setSelectedUsers([]);
            } else {
                alert(response.data.message || "Failed to add users");
            }
        } catch (error) {
            console.error("Error adding users:", error);
            alert("Error: " + (error.response?.data?.message || error.message));
        }
    };
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
    const handleHierarchyShow = () => {
        setShowHierarchyModal(true);
    };

    const handleHierarchyClose = () => {
        setShowHierarchyModal(false);
    };

    const fetchApprovers = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
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

    const handleSearchSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

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
                setSearchResults(response.data.data);
            } else {
                alert("No users found.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch user data.");
        }
    };

    const handleCheckboxChange = (userId, userName, userEmail) => {
        setSelectedUsers(prevSelectedUsers => {
            const isAlreadySelected = prevSelectedUsers.some(user => user.id === userId);
            if (isAlreadySelected) {
                return prevSelectedUsers.filter(user => user.id !== userId);
            }
            return [...prevSelectedUsers, { id: userId, name: userName, email: userEmail }];
        });
    };

    const toggleMenu = projectId => {
        setActiveMenu(prevId => (prevId === projectId ? null : projectId));
        setSelectedProjectId(projectId);
    };

    const handleAction = (action, projectId) => {
        console.log(`${action} clicked for project ${projectId}`);
    };

    const handlePageChange = pageNumber => setCurrentPage(pageNumber);

    const handleOpenModal = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        setActiveMenu(null);
        setShowModal(true);

        try {
            const response = await axios.get("http://192.168.167.5:8560/api/users/all/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });

            setUsers(Array.isArray(response.data.users) ? response.data.users : []);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch user data.");
        }
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        fetchProjects(token, userId);
    }, []);

    const colors = [
        "#282f37",
        "#247caa",
        "#5d5d5f",
        "#0199ec",
        "#00dc95",
        "#47f0b5",
        "#0504b8",
        "#C4778E",
    ];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

    const [projectData, setProjectData] = useState(null);

    const fetchViewProject = async (projectId) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                `http://192.168.167.5:8560/api/project/projects/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );
            if (response.data?.projects?.length > 0) {
                const projectDetails = response.data.projects[0];
                setSelectedProject({
                    projectName: projectDetails.name || "",
                    shortName: projectDetails.shortName || "",
                    created: projectDetails.dtCreated
                        ? projectDetails.dtCreated.split("T")[0]
                        : "",
                    managerName: projectDetails.managerName || "",
                    description: projectDetails.description || "",
                    businessCompany: projectDetails.businessCompany || "",
                    ptype: projectDetails.ptype || "",
                });
            } else {
                setError("Project not found");
            }
        } catch (err) {
            setError(err.message || "Failed to fetch project data");
        } finally {
            setLoading(false);
        }
    };

    const handleViewProject = (projectId) => {
        setCurrentPopUpProjectId(projectId);
        fetchViewProject(projectId);
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

    return (
        <div style={{ padding: "2rem" }}>

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
                            overflowX: "auto",
                            paddingBottom: "1rem",
                        }}
                    >
                        {currentProjects.map((project, index) => (

                            <div
                                key={index}
                                style={{
                                    flex: "0 0 auto",
                                    border: "1px solid var(--bs-light)",
                                    borderRadius: "11px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    padding: "1rem",
                                    backgroundColor: "var(--bs-white)",
                                    width: "214px",
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
                                    ><div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            overflowY: "auto",
                                            maxHeight: "70px",
                                            width: "490px",
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            gap: "10px",
                                        }}
                                    >
                                            {project.users?.map((user, userIndex) => (
                                                <span
                                                    key={userIndex}
                                                    style={{
                                                        position: "relative",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: "50%",
                                                        backgroundColor: colors[userIndex % colors.length],

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
                                        Created on:
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
                                        onClick={() => toggleMenu(project.projectId)}
                                    >
                                        <i className="fas fa-ellipsis-v text-dark"></i>
                                    </button>
                                    {activeMenu === project.projectId && (
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
                                                        onClick={(e) => {
                                                            setCurrentPopUpProjectId(project.projectId);
                                                            handleOpenModal(e);
                                                            handleOpen(e);
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
                                                            handleHierarchyShow(e);

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
                                                        onClick={(e) => {
                                                            setCurrentPopUpProjectId(project.projectId);
                                                            handleShow1(e);
                                                            handleViewProject(project.projectId);

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
                                                        &nbsp;View Project
                                                    </a>
                                                </li>
                                                <li>
                                                    <a

                                                        onClick={(e) => {
                                                            setCurrentPopUpProjectId(project.projectId);

                                                            handleShow2(e);

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

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
                        <button
                            className="btn btn-secondary"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            style={{ marginRight: "10px" }}
                        >
                            <FaChevronLeft />
                        </button>

                        <span style={{ margin: "0 10px" }}>
                            Page {currentPage} of {Math.ceil(projects.length / itemsPerPage)}
                        </span>

                        <button
                            className="btn btn-secondary"
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= projects.length}
                            style={{ marginLeft: "10px" }}
                        >
                            <FaChevronRight />
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

            <Dialog
                open={showModal1}
                onClose={handleClose1}
                fullWidth
                maxWidth="xl"
                style={{
                    maxWidth: "1088px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <DialogTitle
                    style={{
                        backgroundColor: "#0d6efd",
                        color: "white",
                        padding: "1rem 1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600",
                    }}
                >
                    Project Details
                </DialogTitle>

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        margin: "30px",
                        flexDirection: "column",
                        minWidth: "0",
                        wordWrap: "break-word",
                        backgroundColor: "#fff",
                        backgroundClip: "borderBox",
                        padding: "-10px",
                        border: "1px solid rgba(0, 0, 0, .125)",
                        boxShadow:
                            "0px -2px 11px 0px rgba(0, 0, 0, .1), 4px 2px 4px 4px rgb(0 0 0 / 6%)",
                        borderRadius: ".25rem",
                    }}
                >

                    <DialogContent
                        style={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                            fontSize: '1rem',
                            border: '3px solid rgba(0, 0, 0, .125)',
                        }}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: "red" }}>{error}</p>
                        ) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.projectName || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Short Name"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.shortName || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Created Date"
                                        variant="outlined"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={selectedProject?.created || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Manager Name"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.managerName || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>

                            </Grid>
                        )}
                    </DialogContent>

                </div>

                <DialogActions style={{ padding: "1.5rem 2rem" }}>

                    <Button
                        onClick={handleClose1}
                        variant="outlined"
                        color="secondary"
                        style={{
                            fontWeight: "600",
                            padding: "0.75rem 2rem",
                            borderRadius: "0.3rem",
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <RemoveUserModal
                projects={projects}
                selectedProjectId={selectedProjectId}
                showModal={showModal2}
                handleClose2={handleClose2}
                fetchProjects={fetchProjects}
                users={[]} />

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
                                {users.map((user, inex) => (
                                    <tr key={inex}>
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
                                    className="col-md-12 my-2"
                                    style={{ display: "flex", justifyContent: "start" }}
                                >
                                    {/* <div className="col-md-7 search-container search-container-1 px-2"> */}
                                        <form action="/action_page.php" className="d-flex mx-auto" style={{width:"251px"}}>
                                            <input className="form-control" type="text" placeholder="Search.." name="search" />
                                            <button type="submit" className="m-0">
                                                <i className="fa fa-search" />
                                            </button>
                                        </form>
                                    {/* </div> */}
                                </div>
                                <div className="col-md-6 mx-auto my-2">
                                        <div
                                            className="card h-100"
                                            style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)"}}
                                        >
                                            <div className="table-responsive"
                                            style={{
                                                // marginLeft: "-190px",
                                                // maxHeight: "300px",
                                                // overflowY: "auto",
                                                border: "1px solid #ddd",
                                                maxHeight:'51vh',
                                            }}>
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
                                    <div className="col-md-6 mx-auto my-2">
                                        <div
                                            className="card h-100"
                                            style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",}}
                                        >
                                            <div className="table-responsive"
                                            style={{
                                                // marginLeft: "-190px",
                                                // maxHeight: "300px",
                                                // overflowY: "auto",
                                                border: "1px solid #ddd",
                                                maxHeight:'51vh',
                                            }}>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th ID />
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Hierarchy</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>

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
