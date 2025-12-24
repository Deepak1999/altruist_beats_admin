import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import claim2 from "../assests/claim 22.png";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { Modal, Button, Form, Table, Dropdown } from 'react-bootstrap';
import RemoveUserModal from "./RemoveUserModal";
import AddOrViewUsersModal from "./AddOrViewUsersModal";
import Select from "react-select";
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import './Projects.css';

import HomeButton from "./HomeButton";
import { HomeOutlined } from '@mui/icons-material';

import HomeIcon from '@mui/icons-material/Home';

import IconButton from '@mui/material/IconButton';
import Api_base_url from "./Api_base_url/Api_base_url";
// import axiosInstance from "../utils/axiosInstance";

const Projects = ({ token, userId }) => {
    const ro = localStorage.getItem("roleId");
    const ho = localStorage.getItem("home");
    const [hierarchyValues, setHierarchyValues] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [projects, setProjects] = useState([]);

    const [allProjects, setAllProjects] = useState([]);
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
    const [selectedUsersApprove, setSelectedUsersApprove] = useState([]);
    const [nonUsers, setNonUsers] = useState([]);
    const [nonApprovers, setNonApprovers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [approvers, setApprovers] = useState([]);
    const [currentPopUpProjectId, setCurrentPopUpProjectId] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showHierarchyModal, setShowHierarchyModal] = useState(false);
    const handleShow1 = () => setShowModal1(true);
    const handleClose1 = () => setShowModal1(false);
    const handleShow2 = () => setShowModal2(true);
    const handleClose2 = () => {
        setShowModal2(false);
        // setSelectedUsers([]);
    };
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

    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [company, setCompany] = useState("");
    const [type, setType] = useState("");
    const [initiator, setInitiator] = useState("");
    const [selectedUserNew, setSelectedUserNew] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [usersNew, setUsersNew] = useState([]);
    const [initiators, setInitiators] = useState([]);
    const [companies, setCompanies] = useState([]);

    const navigate = useNavigate();

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const fetchProjects = async (token, userId) => {
        try {
            const response = await axios.get(`${Api_base_url}/api/project/get/projectusers`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );
            const sortedProjects = (response.data?.Projects || []).sort((a, b) =>
                a.projectName.localeCompare(b.projectName)
            );

            setProjects(sortedProjects);
            setAllProjects(sortedProjects);

            // setProjects(response.data?.Projects || []);

            // setAllProjects(response.data?.Projects || []);

        } catch (err) {
            // setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
        }
    }, [navigate]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.tagName === "A") {
                setActiveMenu(null); // Close the active menu
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        // setIsModalOpen(true); // Open the modal
        navigate('/purchase'); // Navigate to the purchase page
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };




    // import Swal from "sweetalert2";
    const handleAddUser = async (currentPopUpProjectId) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        const usersToAdd = selectedUsers.map(user => ({
            projectId: selectedProjectId,
            users: user.email,
        }));

        if (usersToAdd.length === 0) {
            Swal.fire("Error!", "No users selected to add!", "error");
            return; // Stop execution
        }

        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to add these users to the project?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        });

        if (!confirmResult.isConfirmed) {
            return; // Exit if user cancels
        }

        try {
            console.log("usersToAdd:", usersToAdd);

            const response = await axios.post(
                `${Api_base_url}/api/project-users/add-singleproject-users`,
                usersToAdd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.data.statusCode === 200) {
                Swal.fire("Success!", "Users successfully added to the project!", "success");

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
                setSelectedUserNew([]);
                setSelectedUsers([]);
                fetchNonUsers(selectedProjectId);
                fetchProjectUsers(selectedProjectId);
            } else {
                Swal.fire("Error!", response.data.statusMessage || "Failed to add users", "error");
                setSelectedUserNew([]);
                setSelectedUsers([]);
            }
        } catch (error) {
            console.error("Error adding users:", error);
            Swal.fire("Error!", error.response?.data?.statusMessage || error.statusMessage, "error");
            setSelectedUserNew([]);
            setSelectedUsers([]);
        }
    };


    useEffect(() => {
        console.log("Updated selectedUsers:", selectedUsers);
    }, [selectedUsers]);


    const
        handleHierarchyChange = (email, value) => {
            setHierarchyValues(prev => {
                const updatedHierarchy = { ...prev, [email]: value };
                console.log("Updated Hierarchy:", updatedHierarchy); // Log inside the function update
                return updatedHierarchy;
            });
        };

    const handleHierarchyChange2 = (email, value) => {
        setHierarchyValues(prev => {
            const updatedHierarchy = { ...prev, [email]: value };
            console.log("Updated Hierarchy:", updatedHierarchy); // Log inside the function update
            return updatedHierarchy;
        });
    };
    const handleUpdateHierarchy = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        // if (!token || !userId) {
        //     navigate("/");
        //     return;
        // }

        const usersToAdd = selectedUsers.map(user => ({
            projectId: selectedProjectId,
            hierarchy: hierarchyValues[user.email],
            email: user.email,
        }));

        // ✅ Check if the request payload is empty
        if (usersToAdd.length === 0) {
            Swal.fire("Error!", "No users selected to update hierarchy!", "error");
            return; // Stop execution
        }

        // ✅ Confirmation pop-up before proceeding
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update the hierarchy for selected users?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        });

        if (!confirmResult.isConfirmed) {
            return; // Exit if user cancels
        }

        try {
            console.log("usersToAdd:::::::::::::", usersToAdd);

            const response = await axios.post(`${Api_base_url}/api/project/update-project-hierarchy-shift`,
                usersToAdd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.data.statusCode === 200) {
                Swal.fire("Success!", "Users' hierarchy successfully updated!", "success");

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
                setSetHandleChange(false);
                fetchApprovers(selectedProjectId);
                fetchNonApprovers(selectedProjectId);
                setHierarchyValues({});
            }
            else if (response.data.statusCode === 400) {
                Swal.fire("Error!", "Bad Request" || "Failed to update hierarchy", "error");
                setSelectedUsers([]);
                setHierarchyValues({});
            } else {
                Swal.fire("Error!", response.data.statusMessage || "Failed to update hierarchy", "error");
                setSelectedUsers([]);
                setHierarchyValues({});
            }
        } catch (error) {
            console.error("Error updating hierarchy:", error);
            Swal.fire("Error!", error.response?.data?.statusMessage || error.statusMessage, "error");
            setSelectedUsers([]);
            setHierarchyValues({});
        }
    };

    const handleShiftHierarchy = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        console.log("Selected Users before API call:", selectedUsersApprove);

        // Show confirmation popup
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to shift the hierarchy of these users?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        });

        if (!result.isConfirmed) {
            return; // Stop execution if user cancels
        }

        try {
            const usersToAdd = selectedUsersApprove.map(user => ({
                projectId: selectedProjectId,
                hierarchy: hierarchyValues[user.email],
                email: user.email,
            }))
                .filter(user => user.hierarchy !== undefined && user.hierarchy !== null && user.hierarchy > 0); // Ensure hierarchy is valid


            if (usersToAdd.length === 0) {
                Swal.fire("Error!", "Hierarchy must be greater than 0", "error");
                return;
            }

            console.log("Payload sent to API:", usersToAdd);

            // const response = await axios.post(`${Api_base_url}/api/project/update-singleproject-hierarchyShift`,
            const response = await axios.post(`${Api_base_url}/api/project/update-project-hierarchy-shift`,
                usersToAdd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.data.statusCode === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.statusMessage || "Users successfully added to the Hierarchy!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });

                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project.projectId === selectedProjectId
                            ? { ...project, users: [...project.users, ...selectedUsersApprove] }
                            : project
                    )
                );

                setTimeout(() => {
                    setSelectedUsersApprove([]);
                }, 100);

                setHierarchyValues({});
                fetchApprovers(selectedProjectId);
                fetchNonApprovers(selectedProjectId);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.statusMessage || "Failed to shift hierarchy.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });

                setSelectedUsersApprove([]);
                setHierarchyValues({});
            }
        } catch (error) {
            console.error("Error shifting hierarchy:", error.response?.data || error.message);

            Swal.fire({
                title: "Error!",
                text: error.response?.data?.statusMessage || "Something went wrong while shifting hierarchy.",
                icon: "error",
                confirmButtonColor: "#d33",
            });

            setSelectedUsersApprove([]);
            setHierarchyValues({});
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
        setHierarchyValues({});
        setSelectedUsers([]);
        setSelectedUsersApprove([]);
    };

    const fetchApprovers = async (currentPopUpProjectId) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        try {
            const response = await axios.post(
                `${Api_base_url}/api/project/get/approvers`,
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
            }
        } catch (err) {
            setError("Failed to fetch approvers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!searchTerm.trim()) {
                setSearchResults([]);
                // Clear results if search term is empty
                return;
            }

            if (!searchTerm.trim()) {
                fetchNonUsers(); // Fetch non-users if search is empty
                return;
            }

            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");

            if (!token || !userId) {
                navigate("/");
                return;
            }

            try {
                const response = await axios.post(
                    `${Api_base_url}/api/users/searchUser`,
                    { searchTerm },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            userId: userId,
                        },
                    }
                );

                response.data.status?.statusCode === 200
                    ? setSearchResults(response.data.data)
                    : alert("No users found.");



            } catch (error) {
                console.error("Error fetching users:", error);
                alert("Failed to fetch user data.");
            }
        };

        fetchUsers();
    }, [searchTerm]);

    const [setHandleChange, setSetHandleChange] = useState(() => () => { });

    useEffect(() => {
        setSetHandleChange(() => handleCheckboxChange);
    }, []);

    const handleCheckboxChange = (userId, userName, userEmail) => {
        setSelectedUsers((prevSelectedUsers) => {
            const isAlreadySelected = prevSelectedUsers.some(user => user.id === userId);
            if (isAlreadySelected) {
                return prevSelectedUsers.filter(user => user.id !== userId);
            }
            return [...prevSelectedUsers, { id: userId, name: userName, email: userEmail }];
        });
        console.log("users1111111111111:", selectedUsers);
    };

    const handleCheckboxChange2 = (userId, userName, userEmail) => {
        setSelectedUsersApprove(prevSelectedUsersApprove => {
            const isAlreadySelected = prevSelectedUsersApprove.some(user => user.id === userId);
            if (isAlreadySelected) {
                return prevSelectedUsersApprove.filter(user => user.id !== userId);

            }

            return [...prevSelectedUsersApprove, { id: userId, name: userName, email: userEmail }];
        });
        console.log("users:", selectedUsersApprove);
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
            const response = await axios.get(`${Api_base_url}/api/users/all/user`, {
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

    // const handleCloseModal = () => setShowModal(false);
    const handleCloseModal = () => {
        setSelectedUsers([]); // Clear selected users
        setShowModal(false); // Close the modal
        setSearchQuery("");
    };


    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        fetchProjects(token, userId);
        fetchData();
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
                `${Api_base_url}/api/project/projects/${projectId}`,
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

    const fetchNonUsers = async (currentPopUpProjectId) => {

        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");
        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `${Api_base_url}/api/users/non/users/${currentPopUpProjectId}`,
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
            // setError(err.response?.data?.statusMessage || "Something went wrong");
        }
    };
    const [searchQuery2, setSearchQuery2] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    // const [nonApprovers, setNonApprovers] = useState([]);
    const [allNonApprovers, setAllNonApprovers] = useState([]); // Keep the original data

    const fetchNonApprovers = async (currentPopUpProjectId) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `${Api_base_url}/api/users/not/in/hierarchy/${currentPopUpProjectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            console.log("API Response:", response.data);

            // Check if the response structure matches the expected format
            if (response.data?.statusDescription?.statusCode === 200) {
                console.log("Users Not In Project:", response.data.usersNotInProject);

                // Ensure the data is an array before setting state
                const users = Array.isArray(response.data.usersNotInProject) ? response.data.usersNotInProject : [];

                setNonApprovers(users);
                setAllNonApprovers(users);
                // setNonApprovers(Array.isArray(response.data.usersNotInProject) ? response.data.usersNotInProject : []);
                // setAllNonApprovers(users);
            } else {
                setError(response.data?.statusDescription?.statusMessage || "Failed to fetch users.");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            // setError(err.response?.data?.statusDescription?.statusMessage || "Something went wrong");
        }
    };
    const handleSearch2 = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery2(query);

        if (!query) {
            setProjects(allProjects);
        } else {
            const filteredProjects = allProjects.filter((project) => {
                const projectName = project.projectName ? project.projectName.toLowerCase() : "";
                const email = project.email ? project.email.toLowerCase() : "";

                return projectName.includes(query) || email.includes(query);
            });

            // Sort after filtering
            const sortedFilteredProjects = filteredProjects.sort((a, b) =>
                a.projectName.localeCompare(b.projectName)
            );

            console.log("Filtered Users22222222:", filteredProjects);
            setProjects(sortedFilteredProjects);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        console.log("Search Query:", query);
        console.log("Users before filtering:", allNonApprovers);

        if (!query) {
            setNonApprovers(allNonApprovers); // Reset to original data when query is empty
        } else {
            const filteredNonApprovers = allNonApprovers.filter((user) => {
                const userName = user.userName ? user.userName.toLowerCase() : "";
                const email = user.email ? user.email.toLowerCase() : "";

                return userName.includes(query) || email.includes(query);
            });

            console.log("Filtered Users:", filteredNonApprovers);
            setNonApprovers(filteredNonApprovers);
        }
    };

    useEffect(() => {
        setNonApprovers(nonApprovers); // Update when projectUsers changes
    }, [nonApprovers]);


    const fetchProjectUsers = async (currentPopUpProjectId) => {

        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");
        if (!token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(
                `${Api_base_url}/api/users/users/${currentPopUpProjectId}`,

                // http://192.168.167.5:8560/api/users/users/161
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

                setProjectUsers(Array.isArray(response.data.usersNotInProject) ? response.data.usersNotInProject : [])
                    ;
            } else {
                setError("Failed to fetch assigned projects");
            }
        } catch (err) {
            console.error("API Error:", err.response?.data || err.message);
            // setError(err.response?.data?.statusMessage || "Something went wrong");
        }
    };





    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        else if (name === "shortName") setShortName(value);
        else if (name === "company") setCompany(value);
        else if (name === "type") setType(value);
        else if (name === "initiator") setInitiator(value);
        else if (name === "user") setSelectedUserNew(value);
    };

    const handleUserChange = (selectedOptions) => {
        const selectedEmails = selectedOptions ? selectedOptions.map(option => option.email) : [];
        console.log("selectedEmails");
        setSelectedUsers(selectedEmails);
        setSelectedUsersApprove(selectedEmails);
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");
        e.preventDefault();

        const requestPayload = {
            name,
            shortName,
            company,
            type,
            initiator,
            users: selectedUsers && selectedUsersApprove
        };

        try {
            const response = await fetch(`${Api_base_url}/api/project/create-single-project`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
                body: JSON.stringify(requestPayload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Form submitted successfully:", result);

                Swal.fire({
                    title: 'Success!',
                    text: 'Project created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setIsModalOpen(false);
            } else {
                console.error("Error submitting form:", response.statusText);

                Swal.fire({
                    title: 'Error!',
                    text: `Failed to create project: ${response.statusText}`,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            console.error("Error:", error);

            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const fetchData = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        try {
            const userResponse = await axios.get(
                `${Api_base_url}/api/users/all/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            const initiatorResponse = await axios.get(
                `${Api_base_url}/api/users/all/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            const companyResponse = await axios.get(
                `${Api_base_url}/api/project/get/companies`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (
                userResponse.status === 200 &&
                initiatorResponse.status === 200 &&
                companyResponse.status === 200
            ) {
                setUsersNew(userResponse.data.users);
                setInitiators(initiatorResponse.data.users);
                setCompanies(companyResponse.data.companies);
            } else {
                setError("No data found.");
            }
            console.log("User Response:", userResponse.data.users);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const userOptions = usersNew.map(user => ({
        value: user.id,
        label: user.email,
        email: user.email,
    }));

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
                    Loading projects....
                </p>
            ) : (
                <>

                    <HomeButton ho={ho} />
                    <form className="d-flex mx-auto">
                        <div className="row w-100">
                            <div className="d-flex justify-content-end align-items-center">
                                <input
                                    style={{ width: "15rem" }}
                                    type="text"
                                    className="form-control my-2 "
                                    placeholder="Search by project name"
                                    value={searchQuery2}
                                    onChange={handleSearch2}
                                    name="search"
                                />
                                <button type="submit" className="btn btn-outline-secondary  m-0 p-2" style={{ height: "maxContent" }}>
                                    <i className="fa fa-search" />
                                </button>
                            </div>
                        </div>
                    </form>

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
                                        }}>
                                            {project.shortName}</p>
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
                                                {/* <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}> */}


                                                {ro === "2" ? (
                                                    <>
                                                        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setCurrentPopUpProjectId(project.projectId);
                                                                        handleOpenModal(e);
                                                                        handleOpen(e);
                                                                        fetchProjectUsers(project.projectId);
                                                                        fetchNonUsers(project.projectId);
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
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setCurrentPopUpProjectId(project.projectId);
                                                                        fetchNonApprovers(project.projectId);;
                                                                        fetchApprovers(project.projectId);;

                                                                        // fetchNonApprovers();
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
                                                        </ul>

                                                    </>
                                                ) : (
                                                    <>

                                                        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                                                            <li>
                                                                <a
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setCurrentPopUpProjectId(project.projectId);
                                                                        handleOpenModal(e);
                                                                        handleOpen(e);
                                                                        fetchProjectUsers(project.projectId);
                                                                        fetchNonUsers(project.projectId);
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
                                                                    href="#"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setCurrentPopUpProjectId(project.projectId);
                                                                        fetchNonApprovers(project.projectId);
                                                                        fetchApprovers(project.projectId);

                                                                        // fetchNonApprovers();
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
                                                    </>)}

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

                            <div className="crt_task_btn_btm" style={{
                                position: 'fixed',
                                right: '4%',
                                bottom: '28%',
                                zIndex: '9',
                            }}>


                                <div>
                                    <button
                                        className="d-block rounded-pill"
                                        onClick={handleClick}
                                        style={{
                                            backgroundColor: "#2cb7fd",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            color: "white",
                                            padding: "10px",
                                            border: "none",
                                            cursor: "pointer",
                                            width: "56px",
                                            height: "56px",
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s',
                                        }}
                                        data-tooltip-id="addItemTooltip"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>

                                    <Tooltip id="addItemTooltip" place="top" content="Create Project" />
                                </div>

                                {isModalOpen && (
                                    <div
                                        style={{
                                            position: "fixed",
                                            top: "0",
                                            left: "0",
                                            right: "0",
                                            bottom: "0",
                                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: '15px'
                                        }}
                                    >
                                        <div className="m-auto"
                                            style={{
                                                backgroundColor: "white",
                                                padding: "20px",
                                                borderRadius: "8px",
                                                width: "600px",
                                                flex: '0 0 auto'
                                            }}
                                        >
                                            <h2>Create Project</h2>
                                            {loading && <p>Loading...</p>}
                                            {error && <p style={{ color: "red" }}>{error}</p>}
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-6 my-1">
                                                        <div>
                                                            <label>Name:</label>

                                                            <input className="form-control"
                                                                type="text"
                                                                name="name"
                                                                value={name}
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 my-1">
                                                        <div>
                                                            <label>Short Name:</label>
                                                            <input className="form-control"
                                                                type="text"
                                                                name="shortName"
                                                                value={shortName}
                                                                placeholder="Enter Short Name"
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div></div>
                                                    <div className="col-sm-6 my-1">
                                                        <div>
                                                            <label>Company:</label>
                                                            <select className="form-select" name="company" value={company} onChange={handleInputChange} required>
                                                                <option value="">Select Company</option>
                                                                {companies.map((companyOption, i) => (
                                                                    <option
                                                                        //  key={companyOption.id} 
                                                                        key={i}
                                                                        value={companyOption.name}>
                                                                        {companyOption.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div></div>
                                                    <div className="col-sm-6 my-1">
                                                        <div>
                                                            <label>Type:</label>
                                                            <select className="form-select" name="type" value={type} onChange={handleInputChange} required>
                                                                <option value="">Select Type</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div></div>
                                                    <div className="col-sm-6 my-1">
                                                        <div>
                                                            <label>Initiator:</label>
                                                            <select className="form-select" name="initiator" value={initiator} onChange={handleInputChange} required>
                                                                <option value="">Select Initiator</option>
                                                                {initiators.map((initiatorOption, p) => (
                                                                    <option
                                                                        //  key={initiatorOption.id} 
                                                                        key={p}
                                                                        value={initiatorOption.email}>
                                                                        {initiatorOption.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div></div>
                                                    <div className="col-sm-6 my-1">

                                                        <div>
                                                            <label>Users:</label>
                                                            <Select className="form-selet"
                                                                isMulti
                                                                name="users"
                                                                options={userOptions}
                                                                value={userOptions.filter(option =>
                                                                    selectedUsers.includes(option.email)
                                                                )}
                                                                onChange={handleUserChange}
                                                                getOptionLabel={(e) => e.label}
                                                                getOptionValue={(e) => e.value}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="col-sm- my-1">

                                                        <div className="text-center">
                                                            <button type="submit">Create</button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setIsModalOpen(false)}
                                                                style={{ marginLeft: "10px" }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )
            }
            <AddOrViewUsersModal
                users={users}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleBackdropClick={handleBackdropClick}
                // handleSearchSubmit={handleSearchSubmit}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                // filteredUsers={nonUsers}
                filteredUsers2={searchResults.length > 0 ? searchResults : nonUsers}
                handleCheckboxChange={handleCheckboxChange}
                projects={projects}
                setProjectUsers={setNonUsers}
                projectUsers={nonUsers}
                selectedProjectId={currentPopUpProjectId}
                handleAddUser={handleAddUser}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                setFilteredUsers={setFilteredUsers}
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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span>Project Details</span>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={handleClose1}
                        aria-label="Close"
                    ></button>
                </DialogTitle>

                {/* <DialogTitle
                    style={{
                        backgroundColor: "#0d6efd",
                        color: "white",
                        padding: "1rem 1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600",
                    }}
                >
                    Project Details
                     <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleClose1}
                            aria-label="Close"
                        ></button>
                </DialogTitle> */}
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
                                        label="Creater Name"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.managerName || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.description || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Business Company"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.businessCompany || "Any"}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Project Type"
                                        variant="outlined"
                                        fullWidth
                                        value={selectedProject?.ptype || ""}
                                        style={{ marginBottom: "1rem" }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                </div>

                {/* <DialogActions style={{ padding: "1.5rem 2rem" }}>
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
                </DialogActions> */}
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
                                className="btn-close btn-close-white"
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

                                    <form className="d-flex mx-auto">
                                        <div className="row w-100">
                                            <div className="d-flex justify-content-start align-items-center" style={{ marginLeft: "-34rem" }}>
                                                <input
                                                    style={{ width: "15rem" }}
                                                    type="text"
                                                    className="form-control my-2"
                                                    placeholder="Search by user name or email"
                                                    value={searchQuery}
                                                    onChange={handleSearch}
                                                    name="search"
                                                />
                                                <button type="submit" className="btn btn-outline-secondary m-0 p-2" style={{ height: "max-content" }}>
                                                    <i className="fa fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                                <div className="col-md-6 mx-auto my-2">
                                    <div
                                        className="card h-100"
                                        style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)" }}
                                    >
                                        <div className="table-responsive"
                                            style={{
                                                border: "1px solid #ddd",
                                                maxHeight: '51vh',
                                            }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        {/* <th>User Name</th> */}
                                                        <th style={{ width: "311px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                            Email</th>
                                                        {/* <th>Role</th> */}
                                                        <th>Hierarchy</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {nonApprovers.length > 0 ? (
                                                        nonApprovers.map((user, e) => (
                                                            <tr
                                                                // key={user.id}
                                                                key={e}>

                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id={`user${user.id}`}
                                                                        // checked={selectedUsers.some(selectedUser => selectedUser.userId === user.userId)}
                                                                        set

                                                                        checked={selectedUsers.some(selectedUser => selectedUser.id === user.userId)}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(
                                                                                user.userId,
                                                                                user.userName || user.name,
                                                                                user.email
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                {/* <td>{user.userName || user.name}</td> */}
                                                                <td
                                                                    style={{
                                                                        maxWidth: "311px",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    title={user.email}

                                                                >{user.email}</td>

                                                                <td>
                                                                    <input

                                                                        type="number"
                                                                        className="form-control"
                                                                        value={hierarchyValues[user.email] || ""}
                                                                        onChange={(e) => handleHierarchyChange2(user.email, e.target.value)}
                                                                        placeholder="Enter hierarchy"




                                                                    //      type="number"
                                                                    // className="form-control"
                                                                    // value={hierarchyValues[approver.email] || ""}
                                                                    // onChange={(e) => handleHierarchyChange(approver.email, e.target.value)}
                                                                    // placeholder="Enter hierarchy"
                                                                    />

                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4">No users found</td>
                                                        </tr>
                                                    )}
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
                                                    className="btn btn-info"
                                                    style={{ color: "white" }}
                                                    onClick={handleUpdateHierarchy}
                                                >
                                                    {/* Add & Continue */}
                                                    Add & Shift Hierarchy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mx-auto my-2">
                                    <div
                                        className="card h-100"
                                        style={{ boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)", }}
                                    >
                                        <div className="table-responsive"
                                            style={{
                                                border: "1px solid #ddd",
                                                maxHeight: '51vh',
                                            }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th id />
                                                        {/* <th>Name</th> */}
                                                        <th>Email</th>
                                                        <th>Hierarchy</th>
                                                        <th>update</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {approvers.map((approver, a) => (
                                                        <tr
                                                            // key={approver.userId}
                                                            key={a}
                                                        >
                                                            {/* <td>

                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`user${approver.id}`}
                                                                    onChange={() =>
                                                                        handleCheckboxChange2(
                                                                            approver.id,
                                                                            approver.userName || approver.name,
                                                                            approver.email
                                                                        )
                                                                    }
                                                                />
                                                            </td> */}
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`user${approver.id}`}
                                                                    checked={selectedUsersApprove.some(user => user.email === approver.email)} // ✅ Make it controlled
                                                                    onChange={() => handleCheckboxChange2(approver.id, approver.name, approver.email)}
                                                                />
                                                            </td>

                                                            {/* <td>{approver.name}</td> */}
                                                            <td>{approver.email}</td>
                                                            <td>{approver.hierarchy}</td>

                                                            <td>
                                                                <input

                                                                    type="number"
                                                                    className="form-control"
                                                                    value={hierarchyValues[approver.email] || ""}
                                                                    onChange={(e) => handleHierarchyChange(approver.email, e.target.value)}
                                                                    placeholder="Enter hierarchy"
                                                                />

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
                                onClick={handleShiftHierarchy}
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
