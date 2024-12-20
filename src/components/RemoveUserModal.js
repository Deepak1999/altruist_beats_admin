// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Table } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RemoveUserModal = ({ projects = [], selectedProjectId, showModal, handleClose2, fetchProjects }) => {
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [projectUsers, setProjectUsers] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Update project users when modal opens or selectedProjectId changes
//         const users = projects.find((project) => project.projectId === selectedProjectId)?.users || [];
//         setProjectUsers(users);
//     }, [projects, selectedProjectId]);

//     const handleCheckboxChange = (userId) => {
//         setSelectedUsers((prevSelected) =>
//             prevSelected.includes(userId)
//                 ? prevSelected.filter((id) => id !== userId)
//                 : [...prevSelected, userId]
//         );
//     };
//     const handleRemoveUsers = async () => {
//         const token = localStorage.getItem("jwttoken");
//         const userId = localStorage.getItem("id");

//         if (!token || !userId) {
//             navigate("/"); // Redirect to login if no token or userId
//             return;
//         }

//         try {
//             const promises = selectedUsers.map((projectUserId) => {
//                 return axios.post(
//                     "http://192.168.167.5:8560/api/project-users/delete-user",
//                     { projectId: selectedProjectId, projectUserId },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                             userId: userId,
//                         },
//                     }
//                 );
//             });

//             await Promise.all(promises);

//             // Filter out removed users from local state
//             setProjectUsers((prevUsers) =>
//                 prevUsers.filter((user) => !selectedUsers.includes(user.id))
//             );

//             alert("Users removed successfully!");
//             setSelectedUsers([]); // Clear selected users

//             // Refetch updated projects to keep the state consistent
//             fetchProjects();
//         } catch (error) {
//             console.error("Error removing users:", error.response?.data || error.message);
//             alert("Failed to remove users. Please try again.");
//         }
//     };


//     return (
//         <Modal show={showModal} onHide={handleClose2} size="lg" centered>
//             <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
//                 <Modal.Title id="removeUserModalLabel">Remove User</Modal.Title>
//                 <Button variant="close" onClick={handleClose2} />
//             </Modal.Header>

//             <Modal.Body>
//                 <div className="add_view_user">
//                     <div className="row">
//                         <div className="col-md-12 d-flex justify-content-end">
//                             <div className="col-md-7 search-container">
//                                 <Form className="d-flex">
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Search.."
//                                         className="me-2"
//                                     />
//                                     <Button variant="primary" type="submit">
//                                         <i className="fa fa-search"></i>
//                                     </Button>
//                                 </Form>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row mt-3">
//                         <div className="col-md-12 d-flex justify-content-between">
//                             <div className="col-md-11 mx-auto">
//                                 <div
//                                     className="card"
//                                     style={{
//                                         boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
//                                         width: "49rem",
//                                         marginLeft: "-39px",
//                                     }}
//                                 >
//                                     <div className="table-responsive">
//                                         <Table striped>
//                                             <thead>
//                                                 <tr>
//                                                     <th>
//                                                         <Form.Check
//                                                             type="checkbox"
//                                                             id="select-all"
//                                                             onChange={(e) => {
//                                                                 const isChecked = e.target.checked;
//                                                                 setSelectedUsers(
//                                                                     isChecked
//                                                                         ? projectUsers.map((user) => user.id)
//                                                                         : []
//                                                                 );
//                                                             }}
//                                                             checked={
//                                                                 selectedUsers.length === projectUsers.length &&
//                                                                 projectUsers.length > 0
//                                                             }
//                                                         />
//                                                     </th>
//                                                     <th>Name</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {projectUsers.length > 0 ? (
//                                                     projectUsers.map((user, index) => (
//                                                         <tr key={user.id || index}>
//                                                             <td>
//                                                                 <Form.Check
//                                                                     type="checkbox"
//                                                                     id={`user-${index}`}
//                                                                     onChange={() => handleCheckboxChange(user.id)}
//                                                                     checked={selectedUsers.includes(user.id)}
//                                                                 />
//                                                             </td>
//                                                             <td>{user.name}</td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="4" className="text-center">
//                                                             No users found
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </Table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Modal.Body>

//             <Modal.Footer>
//                 <Button
//                     variant="info"
//                     style={{ color: "white" }}
//                     onClick={handleRemoveUsers}
//                     disabled={selectedUsers.length === 0}
//                 >
//                     Remove
//                 </Button>
//                 <Button
//                     variant="secondary"
//                     onClick={handleClose2}
//                     style={{
//                         border: "none",
//                         background: "transparent",
//                         color: "#000",
//                     }}
//                 >
//                     Cancel
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default RemoveUserModal;





import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

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

    const handleRemoveUsers = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect if token or user ID is missing
            return;
        }

        try {
            const promises = selectedUsers.map((projectUserId) => {
                return axios.post(
                    "http://192.168.167.5:8560/api/project-users/delete-user",
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
                );
            });

            await Promise.all(promises);

            setProjectUsers((prevUsers) =>
                prevUsers.filter((user) => !selectedUsers.includes(user.userId))
            );

            alert("Users removed successfully!");
            setSelectedUsers([]); // Reset selected users

             fetchProjects(token, userId); // Refresh the list of projects
        } catch (error) {
            console.error("Error removing users:", error.response?.data || error.message);
            alert("Failed to remove users. Please try again.");
        } finally {
            setLoading(false); // Set loading to false once the operation is complete
        }
    };

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
                        <button type="button" className="btn-close" onClick={handleClose2}></button>
                    </div>
                    <div className="modal-body add_view_user">
                        
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <div
                                    className="card"
                                    style={{
                                        boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
                                        width: "27rem",
                                        marginLeft: "-139px",
                                    }}
                                >
                                    <div
                                        className="table-responsive"
                                        style={{
                                            maxHeight: "300px",
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
                                                    projectUsers.map((user,ind) => (
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
                            Remove Selected Users
                        </button>
                        <button
                            type="button"
                            onClick={handleClose2}
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
