// // // // // import React from "react";
// // // // // import { Modal, Button, Form, Table } from "react-bootstrap";

// // // // //     const RemoveUserModal = ({ projects = [], selectedProjectId,  showModal, handleClose2, users  }) => {
// // // // //     if (!projects || !selectedProjectId) {
// // // // //         return <p>No data available</p>;
// // // // //     }

// // // // //     return (
// // // // //         <Modal show={showModal} onHide={handleClose2} size="lg" centered>
// // // // //             <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
// // // // //                 <Modal.Title id="removeUserModalLabel">
// // // // //                     Remove User Project_test1
// // // // //                 </Modal.Title>
// // // // //                 <Button variant="close" onClick={handleClose2} />
// // // // //             </Modal.Header>

// // // // //             <Modal.Body>
// // // // //                 <div className="add_view_user">
// // // // //                     <div className="row">
// // // // //                         <div className="col-md-12 d-flex justify-content-end">
// // // // //                             <div className="col-md-7 search-container">
// // // // //                                 <Form className="d-flex">
// // // // //                                     <Form.Control
// // // // //                                         type="text"
// // // // //                                         placeholder="Search.."
// // // // //                                         className="me-2"
// // // // //                                     />
// // // // //                                     <Button variant="primary" type="submit">
// // // // //                                         <i className="fa fa-search"></i>
// // // // //                                     </Button>
// // // // //                                 </Form>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* Table Section */}
// // // // //                     <div className="row mt-3">
// // // // //                         <div className="col-md-12 d-flex justify-content-between">
// // // // //                             <div className="col-md-11 mx-auto">
// // // // //                                 <div
// // // // //                                     className="card"
// // // // //                                     style={{
// // // // //                                         boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
// // // // //                                         width: "49rem",
// // // // //                                         marginLeft: "-39px",
// // // // //                                     }}
// // // // //                                 >
// // // // //                                     <div className="table-responsive">
// // // // //                                         {/* <Table striped>
// // // // //                                             <thead>
// // // // //                                                 <tr>
// // // // //                                                     <th>
// // // // //                                                         <Form.Check type="checkbox" id="select-all" />
// // // // //                                                     </th>
// // // // //                                                     <th>Name</th>
// // // // //                                                     <th>Short Name</th>
// // // // //                                                 </tr>
// // // // //                                             </thead>
// // // // //                                             <tbody>
// // // // //                                                 {users.map((user, index) => (
// // // // //                                                     <tr key={index}>
// // // // //                                                         <td>
// // // // //                                                             <Form.Check type="checkbox" id={`user-${index}`} />
// // // // //                                                         </td>
// // // // //                                                         <td>{user.name}</td>
// // // // //                                                         <td>{user.short}</td>
// // // // //                                                         <td>
// // // // //                                                             <Form.Check
// // // // //                                                                 type="switch"
// // // // //                                                                 id={`email-notification-${index}`}
// // // // //                                                             />
// // // // //                                                         </td>
// // // // //                                                     </tr>
// // // // //                                                 ))}
// // // // //                                             </tbody>
// // // // //                                         </Table> */}
// // // // //                                         <Table striped>
// // // // //                                             <thead>
// // // // //                                                 <tr>
// // // // //                                                     <th>
// // // // //                                                         <Form.Check type="checkbox" id="select-all" />
// // // // //                                                     </th>
// // // // //                                                     <th>Name</th>
// // // // //                                                     <th>Short Name</th>
// // // // //                                                     <th>Email Notifications</th>
// // // // //                                                 </tr>
// // // // //                                             </thead>
// // // // //                                             <tbody>
// // // // //                                                 {projects.length > 0 ? (
// // // // //                                                     projects
// // // // //                                                         .filter((project) => project.projectId === selectedProjectId) // Filter by selected project ID
// // // // //                                                         .flatMap((project) => project.users) // Extract users from the filtered projects
// // // // //                                                         .map((user, index) => (
// // // // //                                                             <tr key={user.id || index}>
// // // // //                                                                 <td>
// // // // //                                                                     <Form.Check type="checkbox" id={`user-${index}`} />
// // // // //                                                                 </td>
// // // // //                                                                 <td>{user.name}</td>
// // // // //                                                                 <td>{user.short}</td>
// // // // //                                                                 <td>
// // // // //                                                                     <Form.Check
// // // // //                                                                         type="switch"
// // // // //                                                                         id={`email-notification-${index}`}
// // // // //                                                                     />
// // // // //                                                                 </td>
// // // // //                                                             </tr>
// // // // //                                                         ))
// // // // //                                                 ) : (
// // // // //                                                     <tr>
// // // // //                                                         <td colSpan="4" className="text-center">
// // // // //                                                             No users found
// // // // //                                                         </td>
// // // // //                                                     </tr>
// // // // //                                                 )}
// // // // //                                             </tbody>
// // // // //                                         </Table>

// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </Modal.Body>

// // // // //             <Modal.Footer>
// // // // //                 <Button variant="info" style={{ color: "white" }}>
// // // // //                     Remove
// // // // //                 </Button>
// // // // //                 <Button
// // // // //                     variant="secondary"
// // // // //                     onClick={handleClose2}
// // // // //                     style={{
// // // // //                         border: "none",
// // // // //                         background: "transparent",
// // // // //                         color: "#000",
// // // // //                     }}
// // // // //                 >
// // // // //                     Cancel
// // // // //                 </Button>
// // // // //             </Modal.Footer>
// // // // //         </Modal>
// // // // //     );
// // // // // };

// // // // // export default RemoveUserModal;
// // // // import React from "react";
// // // // import { Modal, Button, Form, Table } from "react-bootstrap";

// // // // const RemoveUserModal = ({ projects = [], selectedProjectId, showModal, handleClose2, users,onHide }) => {
// // // //     if (!projects || !selectedProjectId) {
// // // //         return <p>No data available</p>;
// // // //     }

// // // //     return (
// // // //         <Modal show={showModal} onHide={handleClose2} size="lg" centered>
// // // //             <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
// // // //                 <Modal.Title id="removeUserModalLabel">Remove User Project_test1</Modal.Title>
// // // //                 <Button variant="close" onClick={handleClose2} />
// // // //             </Modal.Header>

// // // //             <Modal.Body>
// // // //                 <div className="add_view_user">
// // // //                     <div className="row">
// // // //                         <div className="col-md-12 d-flex justify-content-end">
// // // //                             <div className="col-md-7 search-container">
// // // //                                 <Form className="d-flex">
// // // //                                     <Form.Control
// // // //                                         type="text"
// // // //                                         placeholder="Search.."
// // // //                                         className="me-2"
// // // //                                     />
// // // //                                     <Button variant="primary" type="submit">
// // // //                                         <i className="fa fa-search"></i>
// // // //                                     </Button>
// // // //                                 </Form>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Table Section */}
// // // //                     <div className="row mt-3">
// // // //                         <div className="col-md-12 d-flex justify-content-between">
// // // //                             <div className="col-md-11 mx-auto">
// // // //                                 <div
// // // //                                     className="card"
// // // //                                     style={{
// // // //                                         boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
// // // //                                         width: "49rem",
// // // //                                         marginLeft: "-39px",
// // // //                                     }}
// // // //                                 >
// // // //                                     <div className="table-responsive">
// // // //                                         <Table striped>
// // // //                                             <thead>
// // // //                                                 <tr>
// // // //                                                     <th>
// // // //                                                         <Form.Check type="checkbox" id="select-all" />
// // // //                                                     </th>
// // // //                                                     <th>Name</th>
// // // //                                                     <th>Short Name</th>
// // // //                                                     <th>Email Notifications</th>
// // // //                                                 </tr>
// // // //                                             </thead>
// // // //                                             <tbody>
// // // //                                                 {projects.length > 0 ? (
// // // //                                                     projects
// // // //                                                         .filter((project) => project.projectId === selectedProjectId)
// // // //                                                         .flatMap((project) => project.users)
// // // //                                                         .map((user, index) => (
// // // //                                                             <tr key={user.id || index}>
// // // //                                                                 <td>
// // // //                                                                     <Form.Check type="checkbox" id={`user-${index}`} />
// // // //                                                                 </td>
// // // //                                                                 <td>{user.name}</td>
// // // //                                                                 <td>{user.short}</td>
// // // //                                                                 <td>
// // // //                                                                     <Form.Check
// // // //                                                                         type="switch"
// // // //                                                                         id={`email-notification-${index}`}
// // // //                                                                     />
// // // //                                                                 </td>
// // // //                                                             </tr>
// // // //                                                         ))
// // // //                                                 ) : (
// // // //                                                     <tr>
// // // //                                                         <td colSpan="4" className="text-center">
// // // //                                                             No users found
// // // //                                                         </td>
// // // //                                                     </tr>
// // // //                                                 )}
// // // //                                             </tbody>
// // // //                                         </Table>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </Modal.Body>

// // // //             <Modal.Footer>
// // // //                 <Button variant="info" style={{ color: "white" }}>
// // // //                     Remove
// // // //                 </Button>
// // // //                 <Button
// // // //                     variant="secondary"
// // // //                     onClick={handleClose2}
// // // //                     style={{
// // // //                         border: "none",
// // // //                         background: "transparent",
// // // //                         color: "#000",
// // // //                     }}
// // // //                 >
// // // //                     Cancel
// // // //                 </Button>
// // // //             </Modal.Footer>
// // // //         </Modal>
// // // //     );
// // // // };

// // // // export default RemoveUserModal;
// // // import React, { useState } from "react";
// // // import { Modal, Button, Form, Table } from "react-bootstrap";

// // // const RemoveUserModal = ({ projects = [], selectedProjectId, showModal, handleClose2, users }) => {
// // //     if (!projects || !selectedProjectId) {
// // //         return <p></p>;
// // //     }

// // //     return (
// // //         <Modal show={showModal} onHide={handleClose2} size="lg" centered>
// // //             <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
// // //                 <Modal.Title id="removeUserModalLabel">Remove User Project_test1</Modal.Title>
// // //                 <Button variant="close" onClick={handleClose2} />
// // //             </Modal.Header>

// // //             <Modal.Body>
// // //                 <div className="add_view_user">
// // //                     {/* Search Bar */}
// // //                     <div className="row">
// // //                         <div className="col-md-12 d-flex justify-content-end">
// // //                             <div className="col-md-7 search-container">
// // //                                 <Form className="d-flex">
// // //                                     <Form.Control
// // //                                         type="text"
// // //                                         placeholder="Search.."
// // //                                         className="me-2"
// // //                                     />
// // //                                     <Button variant="primary" type="submit">
// // //                                         <i className="fa fa-search"></i>
// // //                                     </Button>
// // //                                 </Form>
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Table Section */}
// // //                     <div className="row mt-3">
// // //                         <div className="col-md-12 d-flex justify-content-between">
// // //                             <div className="col-md-11 mx-auto">
// // //                                 <div
// // //                                     className="card"
// // //                                     style={{
// // //                                         boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
// // //                                         width: "49rem",
// // //                                         marginLeft: "-39px",
// // //                                     }}
// // //                                 >
// // //                                     <div className="table-responsive">
// // //                                         <Table striped>
// // //                                             <thead>
// // //                                                 <tr>
// // //                                                     <th>
// // //                                                         <Form.Check type="checkbox" id="select-all" />
// // //                                                     </th>
// // //                                                     <th>Name</th>
// // //                                                       </tr>
// // //                                             </thead>
// // //                                             <tbody>
// // //                                                 {projects.length > 0 ? (
// // //                                                     projects
// // //                                                         .filter((project) => project.projectId === selectedProjectId)
// // //                                                         .flatMap((project) => project.users)
// // //                                                         .map((user, index) => (
// // //                                                             <tr key={user.id || index}>
// // //                                                                 <td>
// // //                                                                     <Form.Check type="checkbox" id={`user-${index}`} />
// // //                                                                 </td>
// // //                                                                 <td>{user.name}</td>

// // //                                                             </tr>
// // //                                                         ))
// // //                                                 ) : (
// // //                                                     <tr>
// // //                                                         <td colSpan="4" className="text-center">
// // //                                                             No users found
// // //                                                         </td>
// // //                                                     </tr>
// // //                                                 )}
// // //                                             </tbody>
// // //                                         </Table>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </Modal.Body>

// // //             <Modal.Footer>
// // //                 <Button variant="info" style={{ color: "white" }}>
// // //                     Remove
// // //                 </Button>
// // //                 <Button
// // //                     variant="secondary"
// // //                     onClick={handleClose2}
// // //                     style={{
// // //                         border: "none",
// // //                         background: "transparent",
// // //                         color: "#000",
// // //                     }}
// // //                 >
// // //                     Cancel
// // //                 </Button>
// // //             </Modal.Footer>
// // //         </Modal>
// // //     );
// // // };

// // // export default RemoveUserModal;
// // import React, { useState } from "react";
// // import { Modal, Button, Form, Table } from "react-bootstrap";
// // import axios from "axios";

// // const RemoveUserModal = ({ projects = [], selectedProjectId, showModal, handleClose2 }) => {
// //     const [selectedUsers, setSelectedUsers] = useState([]);

// //     // Handle checkbox toggle
// //     const handleCheckboxChange = (userId) => {
// //         setSelectedUsers((prevSelected) =>
// //             prevSelected.includes(userId)
// //                 ? prevSelected.filter((id) => id !== userId)
// //                 : [...prevSelected, userId]
// //         );
// //     };

// //     // Handle "Remove" button click
// //     const handleRemoveUsers = async () => {
// //         const token = localStorage.getItem("jwttoken");
// //         const userId = localStorage.getItem("id");

// //         if (!token || !userId) {
// //             navigate("/"); // Redirect to login if no token or userId
// //             return;
// //         }
// //         try {
// //             const promises = selectedUsers.map((userId) =>
// //                 axios.post("http://192.168.167.5:8560/api/project-users/delete-user", {
// //                     projectId: selectedProjectId,
// //                     projectUserId: userId,
// //                 })
// //             );
// //             await Promise.all(promises);
// //             const response = await axios.post(apiUrl, usersToAdd, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     userId: userId,
// //                 },

// //             // Optionally refresh data or update the UI
// //             alert("Users removed successfully!");
// //             setSelectedUsers([]); // Clear selected users
// //             handleClose2(); // Close the modal
// //         } catch (error) {
// //             console.error("Error removing users:", error);
// //             alert("Failed to remove users. Please try again.");
// //         }
// //     };

// //     // Find users for the selected project
// //     const projectUsers =
// //         projects.find((project) => project.projectId === selectedProjectId)?.users || [];

// //     return (
// //         <Modal show={showModal} onHide={handleClose2} size="lg" centered>
// //             <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
// //                 <Modal.Title id="removeUserModalLabel">Remove User</Modal.Title>
// //                 <Button variant="close" onClick={handleClose2} />
// //             </Modal.Header>

// //             <Modal.Body>
// //                 <div className="add_view_user">
// //                     {/* Search Bar */}
// //                     <div className="row">
// //                         <div className="col-md-12 d-flex justify-content-end">
// //                             <div className="col-md-7 search-container">
// //                                 <Form className="d-flex">
// //                                     <Form.Control
// //                                         type="text"
// //                                         placeholder="Search.."
// //                                         className="me-2"
// //                                     />
// //                                     <Button variant="primary" type="submit">
// //                                         <i className="fa fa-search"></i>
// //                                     </Button>
// //                                 </Form>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Table Section */}
// //                     <div className="row mt-3">
// //                         <div className="col-md-12 d-flex justify-content-between">
// //                             <div className="col-md-11 mx-auto">
// //                                 <div
// //                                     className="card"
// //                                     style={{
// //                                         boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
// //                                         width: "49rem",
// //                                         marginLeft: "-39px",
// //                                     }}
// //                                 >
// //                                     <div className="table-responsive">
// //                                         <Table striped>
// //                                             <thead>
// //                                                 <tr>
// //                                                     <th>
// //                                                         <Form.Check
// //                                                             type="checkbox"
// //                                                             id="select-all"
// //                                                             onChange={(e) => {
// //                                                                 const isChecked = e.target.checked;
// //                                                                 setSelectedUsers(
// //                                                                     isChecked
// //                                                                         ? projectUsers.map((user) => user.id)
// //                                                                         : []
// //                                                                 );
// //                                                             }}
// //                                                             checked={
// //                                                                 selectedUsers.length === projectUsers.length &&
// //                                                                 projectUsers.length > 0
// //                                                             }
// //                                                         />
// //                                                     </th>
// //                                                     <th>Name</th>
// //                                                 </tr>
// //                                             </thead>
// //                                             <tbody>
// //                                                 {projectUsers.length > 0 ? (
// //                                                     projectUsers.map((user, index) => (
// //                                                         <tr key={user.id || index}>
// //                                                             <td>
// //                                                                 <Form.Check
// //                                                                     type="checkbox"
// //                                                                     id={`user-${index}`}
// //                                                                     onChange={() => handleCheckboxChange(user.id)}
// //                                                                     checked={selectedUsers.includes(user.id)}
// //                                                                 />
// //                                                             </td>
// //                                                             <td>{user.name}</td>
// //                                                         </tr>
// //                                                     ))
// //                                                 ) : (
// //                                                     <tr>
// //                                                         <td colSpan="4" className="text-center">
// //                                                             No users found
// //                                                         </td>
// //                                                     </tr>
// //                                                 )}
// //                                             </tbody>
// //                                         </Table>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </Modal.Body>

// //             <Modal.Footer>
// //                 <Button
// //                     variant="info"
// //                     style={{ color: "white" }}
// //                     onClick={handleRemoveUsers}
// //                     disabled={selectedUsers.length === 0}
// //                 >
// //                     Remove
// //                 </Button>
// //                 <Button
// //                     variant="secondary"
// //                     onClick={handleClose2}
// //                     style={{
// //                         border: "none",
// //                         background: "transparent",
// //                         color: "#000",
// //                     }}
// //                 >
// //                     Cancel
// //                 </Button>
// //             </Modal.Footer>
// //         </Modal>
// //     );
// // };

// // export default RemoveUserModal;
// import React, { useState } from "react";
// import { Modal, Button, Form, Table } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RemoveUserModal = ({ projects = [], selectedProjectId, showModal, handleClose2 }) => {
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const navigate = useNavigate();

//     // Handle checkbox toggle
//     const handleCheckboxChange = (userId) => {
//         setSelectedUsers((prevSelected) =>
//             prevSelected.includes(userId)
//                 ? prevSelected.filter((id) => id !== userId)
//                 : [...prevSelected, userId]
//         );
//     };

//     // Handle "Remove" button click
//     const handleRemoveUsers = async () => {
//         const token = localStorage.getItem("jwttoken");
//         const userId = localStorage.getItem("id");

//         if (!token || !userId) {
//             navigate("/"); // Redirect to login if no token or userId
//             return;
//         }

//         try {
//             const promises = selectedUsers.map((projectUserId) =>
//                 axios.post(
//                     "http://192.168.167.5:8560/api/project-users/delete-user",
//                     { projectId: selectedProjectId, projectUserId },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                             userId: userId,
//                         },
//                     }
//                 )
//             );
//             await Promise.all(promises);
//             alert("Users removed successfully!");
//             setSelectedUsers([]); // Clear selected users
//             handleClose2(); // Close the modal
//         } catch (error) {
//             console.error("Error removing users:", error);
//             alert("Failed to remove users. Please try again.");
//         }
//     };

//     // Find users for the selected project
//     const projectUsers =
//         projects.find((project) => project.projectId === selectedProjectId)?.users || [];

//     return (
//         <Modal show={showModal} onHide={handleClose2} size="lg" centered>
//             <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
//                 <Modal.Title id="removeUserModalLabel">Remove User</Modal.Title>
//                 <Button variant="close" onClick={handleClose2} />
//             </Modal.Header>

//             <Modal.Body>
//                 <div className="add_view_user">
//                     {/* Search Bar */}
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

//                     {/* Table Section */}
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
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RemoveUserModal = ({ projects = [], selectedProjectId, showModal, handleClose2, fetchProjects }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Update project users when modal opens or selectedProjectId changes
        const users = projects.find((project) => project.projectId === selectedProjectId)?.users || [];
        setProjectUsers(users);
    }, [projects, selectedProjectId]);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };
    const handleRemoveUsers = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/"); // Redirect to login if no token or userId
            return;
        }

        try {
            const promises = selectedUsers.map((projectUserId) => {
                return axios.post(
                    "http://192.168.167.5:8560/api/project-users/delete-user",
                    { projectId: selectedProjectId, projectUserId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            userId: userId,
                        },
                    }
                );
            });

            await Promise.all(promises);

            // Filter out removed users from local state
            setProjectUsers((prevUsers) =>
                prevUsers.filter((user) => !selectedUsers.includes(user.id))
            );

            alert("Users removed successfully!");
            setSelectedUsers([]); // Clear selected users

            // Refetch updated projects to keep the state consistent
            fetchProjects();
        } catch (error) {
            console.error("Error removing users:", error.response?.data || error.message);
            alert("Failed to remove users. Please try again.");
        }
    };

    // const handleRemoveUsers = async () => {
    //     const token = localStorage.getItem("jwttoken");
    //     const userId = localStorage.getItem("id");

    //     if (!token || !userId) {
    //         navigate("/"); // Redirect to login if no token or userId
    //         return;
    //     }

    //     try {
    //         const promises = selectedUsers.map((projectUserId) => {
    //             // Log the payload for debugging
    //             console.log("Payload:", {
    //                 projectId: selectedProjectId,
    //                 projectUserId,
    //             });

    //             return axios.post(
    //                 "http://192.168.167.5:8560/api/project-users/delete-user",
    //                 { projectId: selectedProjectId, projectUserId },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         userId: userId,
    //                     },
    //                 }
    //             );
    //         });

    //         await Promise.all(promises);

    //         // Filter out removed users from local state
    //         setProjectUsers((prevUsers) =>
    //             prevUsers.filter((user) => !selectedUsers.includes(user.id))
    //         );

    //         alert("Users removed successfully!");
    //         setSelectedUsers([]); // Clear selected users
    //     } catch (error) {
    //         console.error("Error removing users:", error.response?.data || error.message);
    //         alert("Failed to remove users. Please try again.");
    //     }
    // };

    // const handleRemoveUsers = async () => {
    //     const token = localStorage.getItem("jwttoken");
    //     const userId = localStorage.getItem("id");

    //     if (!token || !userId) {
    //         navigate("/"); // Redirect to login if no token or userId
    //         return;
    //     }

    //     try {
    //         const promises = selectedUsers.map((projectUserId) =>
    //          console.log("Payload:", {
    //             projectId: selectedProjectId,
    //             projectUserId,
    //         });
    //             axios.post(
    //                 "http://192.168.167.5:8560/api/project-users/delete-user",
    //                 { projectId: selectedProjectId, projectUserId: projectUserId },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         userId: userId,
    //                     },
    //                 }
    //             )
    //         );
    //         await Promise.all(promises);

    //         // Filter out removed users from local state
    //         setProjectUsers((prevUsers) =>
    //             prevUsers.filter((user) => !selectedUsers.includes(user.id))
    //         );

    //         alert("Users removed successfully!");
    //         setSelectedUsers([]); // Clear selected users
    //     } catch (error) {
    //         console.error("Error removing users:", error);
    //         alert("Failed to remove users. Please try again.");
    //     }
    // };

    return (
        <Modal show={showModal} onHide={handleClose2} size="lg" centered>
            <Modal.Header style={{ background: "#2cb7fd", color: "white" }}>
                <Modal.Title id="removeUserModalLabel">Remove User</Modal.Title>
                <Button variant="close" onClick={handleClose2} />
            </Modal.Header>

            <Modal.Body>
                <div className="add_view_user">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <div className="col-md-7 search-container">
                                <Form className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search.."
                                        className="me-2"
                                    />
                                    <Button variant="primary" type="submit">
                                        <i className="fa fa-search"></i>
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-12 d-flex justify-content-between">
                            <div className="col-md-11 mx-auto">
                                <div
                                    className="card"
                                    style={{
                                        boxShadow: "0 2px 4px rgba(0, 0.1, 0.2, 0.3)",
                                        width: "49rem",
                                        marginLeft: "-39px",
                                    }}
                                >
                                    <div className="table-responsive">
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <Form.Check
                                                            type="checkbox"
                                                            id="select-all"
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setSelectedUsers(
                                                                    isChecked
                                                                        ? projectUsers.map((user) => user.id)
                                                                        : []
                                                                );
                                                            }}
                                                            checked={
                                                                selectedUsers.length === projectUsers.length &&
                                                                projectUsers.length > 0
                                                            }
                                                        />
                                                    </th>
                                                    <th>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projectUsers.length > 0 ? (
                                                    projectUsers.map((user, index) => (
                                                        <tr key={user.id || index}>
                                                            <td>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    id={`user-${index}`}
                                                                    onChange={() => handleCheckboxChange(user.id)}
                                                                    checked={selectedUsers.includes(user.id)}
                                                                />
                                                            </td>
                                                            <td>{user.name}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">
                                                            No users found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="info"
                    style={{ color: "white" }}
                    onClick={handleRemoveUsers}
                    disabled={selectedUsers.length === 0}
                >
                    Remove
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleClose2}
                    style={{
                        border: "none",
                        background: "transparent",
                        color: "#000",
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveUserModal;
