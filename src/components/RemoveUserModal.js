import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import Api_base_url from "./Api_base_url/Api_base_url";
import sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";

const RemoveUserModal = ({
    projects = [],
    selectedProjectId,
    showModal,
    handleClose2,
    fetchProjects,
    setCurrentPopUpProjectId
}) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleCloseModal = () => {
        setSelectedUsers([]); // Clear selected users when closing modal
        handleClose2(); // Call the original close function
    };

    useEffect(() => {
        const users =
            projects.find((project) => project.projectId === selectedProjectId)
                ?.users || [];
        setProjectUsers(users);
    }, [projects, selectedProjectId]);

    const handleCheckboxChange = (projectUserId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(projectUserId)) {
                // Deselect the user
                return prevSelected.filter((id) => id !== projectUserId);
            } else {
                // Select the user
                return [...prevSelected, projectUserId];
            }
        });
    };
    // const handleRemoveUsers = async () => {
    //     if (selectedUsers.length === 0) return;

    //     const result = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "Do you want to remove selected users.",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#2cb7fd",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes",
    //         cancelButtonText: "Cancel"
    //     });

    //     if (result.isConfirmed) {
    //         const token = localStorage.getItem("jwttoken");
    //         const userId = localStorage.getItem("id");

    //         if (!token || !userId) {
    //             navigate("/"); // Redirect if token or user ID is missing
    //             return;
    //         }

    //         try {
    //             const promises = selectedUsers.map((projectUserId) => {
    //                 return axios.post(
    //                     `${Api_base_url}/api/project-users/delete-user`,
    //                     {
    //                         projectId: selectedProjectId,
    //                         projectUserId: projectUserId
    //                     },
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${token}`,
    //                             userId: userId,
    //                         },
    //                     }
    //                 );
    //             });

    //             await Promise.all(promises);

    //             setProjectUsers((prevUsers) =>
    //                 prevUsers.filter((user) => !selectedUsers.includes(user.userId))
    //             );

    //             Swal.fire({
    //                 title: "Removed!",
    //                 text: "Selected users have been removed successfully.",
    //                 icon: "success",
    //                 confirmButtonColor: "#2cb7fd"
    //             });

    //             setSelectedUsers([]);
    //             fetchProjects(token, userId);
    //         } catch (error) {
    //             console.error("Error removing users:", error.response?.data || error.statusMessage);
    //             Swal.fire({
    //                 title: "Error!",
    //                 text: "Failed to remove users. Please try again.",
    //                 icon: "error",
    //                 confirmButtonColor: "#2cb7fd"
    //             });
    //             setSelectedUsers([]);
    //         }
    //     }
    // };
    const handleRemoveUsers = async () => {
        if (selectedUsers.length === 0) return;

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to remove selected users?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2cb7fd",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");

            if (!token || !userId) {
                navigate("/"); // Redirect if token or user ID is missing
                return;
            }

            try {
                const responses = await Promise.all(
                    selectedUsers.map((projectUserId) =>
                        axios.post(
                            `${Api_base_url}/api/project-users/delete-user`,
                            {
                                projectId: selectedProjectId,
                                projectUserId: projectUserId
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    userId: userId,
                                },
                            }
                        )
                    )
                );

                // Extract status messages from API responses
                const successMessages = responses.map(res => res.data.statusMessage).filter(Boolean);

                setProjectUsers((prevUsers) =>
                    prevUsers.filter((user) => !selectedUsers.includes(user.userId))
                );

                Swal.fire({
                    title: "Success!",
                    text: successMessages.length > 0 ? successMessages.join("\n") : "Selected users have been removed successfully.",
                    icon: "success",
                    confirmButtonColor: "#2cb7fd"
                });

                setSelectedUsers([]);
                fetchProjects(token, userId);
            } catch (error) {
                console.error("Error removing users:", error.response?.data || error.statusMessage);
                Swal.fire({
                    title: "Error!",
                    text: error.response?.data?.statusMessage || "Failed to remove users. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#2cb7fd"
                });
                setSelectedUsers([]);
            }
        }
    };

    // const handleRemoveUsers = async () => {
    //     const token = localStorage.getItem("jwttoken");
    //     const userId = localStorage.getItem("id");

    //     if (!token || !userId) {
    //         navigate("/"); // Redirect if token or user ID is missing
    //         return;
    //     }

    //     try {
    //         const promises = selectedUsers.map((projectUserId) => {
    //             return axios.post(
    //                 `${Api_base_url}/api/project-users/delete-user`,
    //                 {
    //                     projectId: selectedProjectId,
    //                     projectUserId: projectUserId
    //                 },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         userId: userId,
    //                     },
    //                 }
    //             );
    //         });

    //         await Promise.all(promises);

    //         setProjectUsers((prevUsers) =>
    //             prevUsers.filter((user) => !selectedUsers.includes(user.userId))
    //         );

    //         alert("Users removed successfully!");
    //         setSelectedUsers([]); // Reset selected users

    //         fetchProjects(token, userId); // Refresh the list of projects
    //     } catch (error) {
    //         console.error("Error removing users:", error.response?.data || error.message);
    //         alert("Failed to remove users. Please try again.");
    //     } finally {
    //         setLoading(false); // Set loading to false once the operation is complete
    //     }
    // };

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Select",
                accessor: "select",
                Cell: ({ row }) => (
                    <Form.Check
                        type="checkbox"
                        id={`user-${row.original.userId}`} // Corrected the field to `userId`
                        onChange={() => handleCheckboxChange(row.original.userId)} // Corrected the field to `userId`
                        checked={selectedUsers.includes(row.original.userId)} // Corrected the field to `userId`
                    />
                ),
            },
        ],
        [selectedUsers]
    );

    const data = useMemo(() => projectUsers, [projectUsers]);

    const tableInstance = useTable({ columns, data });

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{ width: "700px" }}>
                    <div className="modal-header" style={{ background: "#2cb7fd", color: "white" }}>
                        <h5 className="modal-title" id="addUserModalLabel">
                            Remove Project
                        </h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body add_view_user px-4">

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div
                                    className="card border-0 p-0"
                                    style={{
                                        boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
                                        // width: "27rem",
                                        // marginLeft: "-139px",
                                        width: "39rem",
                                        margineft: "-151px"
                                    }}
                                >
                                    <div
                                        className="table-responsive"
                                        style={{
                                            maxHeight: "51vh",
                                            overflowY: "auto",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Assigned User(s)</th>
                                                    <th>Select</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projectUsers.length > 0 ? (
                                                    projectUsers.map((user, ind) => (
                                                        <tr key={ind}> {/* Corrected the key to userId */}
                                                            <td>{user.name}</td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedUsers.includes(user.userId)} // Corrected the field to userId
                                                                    onChange={() => handleCheckboxChange(user.userId)} // Corrected the field to userId
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" className="text-center">
                                                            No users found
                                                        </td>
                                                    </tr>

                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex " style={{ border: "none" }}>
                        <button
                            type="button"
                            onClick={handleRemoveUsers}
                            className="btn"
                            style={{
                                background: "#2cb7fd",
                                color: "white",
                                fontWeight: "bold",
                            }}
                            disabled={selectedUsers.length === 0} // Disable button if no users are selected
                        >
                            Remove
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="btn btn-secondary"
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
    );
};

export default RemoveUserModal;
