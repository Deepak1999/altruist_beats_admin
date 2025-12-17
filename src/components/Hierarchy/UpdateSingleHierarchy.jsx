
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Formik, Form, Field } from 'formik';
// import { Button, Card } from 'react-bootstrap';
// import Select from "react-select";
// import Api_base_url from '../Api_base_url/Api_base_url';
// import './a.css';

// const UpdateHierarchy = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [submitting, setSubmitting] = useState(false);
// const [users, setUsers] = useState([]);
//     const fetchProjects = async () => {
//         if (projects.length === 0) { 
//             setLoading(true);
//             setError(null);
//             const token = localStorage.getItem('jwttoken');
//             const userId = localStorage.getItem('id');

//             if (!token || !userId) {
//                 setSubmitting(false);
//                 return;
//             }
//             try {
//                 const response = await axios.get("http://192.168.167.5:8560/api/project/getprojects", {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                         'userId': userId
//                     },
//                 });
//                 setProjects(response.data);
//             } catch (err) {
//                 setError("Failed to load projects");
//                 console.error("Error fetching projects:", err);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//         const requestData = [
//             {
//                 projectId: parseInt(values.projectId1, 10),
//                 hierarchy: parseInt(values.hierarchy1, 10),
//                 email: values.email1
//             }
//         ];
//         const token = localStorage.getItem('jwttoken');
//         const userId = localStorage.getItem('id');

//         if (!token || !userId) {
//             setSubmitting(false);
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 "http://192.168.167.5:8560/api/project/update-singleproject-hierarchy",
//                 requestData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                         'userId': userId
//                     },
//                 }
//             );
//             console.log("Response:", response.data);
//             alert("Project hierarchy updated successfully!");
//             resetForm();
//         } catch (error) {
//             console.error("Error updating hierarchy:", error);
//             alert("Failed to update project hierarchy.");
//         }

//         setSubmitting(false);
//     };

//     const fetchUsers = async () => {
//         const token = localStorage.getItem("jwttoken");
//         const userId = localStorage.getItem("id");

//         try {
//             const response = await axios.get(
//                 `${Api_base_url}/api/users/all/user`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         userId: userId,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 const formattedUsers = response.data.users.map(user => ({
//                     label: user.email,
//                     value: user.email,
//                 }));
//                 setUsers(formattedUsers);
//             } else {
//                 setError('No users found.');
//             }
//         } catch (err) {
//             console.error(err);
//             setError('Failed to fetch users.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container px-4 pb-4 mt-4">
//             <Card className="p-4 card-1-v">
//                 <div className="label" style={{ marginTop: '-18px' }}>
//                     <h6>Update Project Hierarchy</h6>
//                 </div>
//                 <Card.Body className="pt-4">
//                     <Formik
//                         initialValues={{
//                             projectId1: '',
//                             hierarchy1: '',
//                             email1: ''
//                         }}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ isSubmitting, resetForm }) => (
//                             <Form>
//                                 <div className="row">
//                                     {/* Project Dropdown */}
//                                     <div className="col-md-4 mb-4">
//                                         <label className="form-label">Project ID 1</label>
//                                         <Field
//                                             as="select"
//                                             name="projectId1"
//                                             className="form-control"
//                                             onClick={fetchProjects}
//                                         >
//                                             <option value="">Select Project</option>
//                                             {loading ? (
//                                                 <option disabled>Loading projects...</option>
//                                             ) : error ? (
//                                                 <option disabled>{error}</option>
//                                             ) : (
//                                                 projects.map((project) => (
//                                                     <option key={project.projectId} value={project.projectId}>
//                                                         {project.projectName}
//                                                     </option>
//                                                 ))
//                                             )}
//                                         </Field>
//                                     </div>

//                                     <div className="col-md-4 mb-4">
//                                         <label className="form-label">Hierarchy 1</label>
//                                         <Field type="text" name="hierarchy1" className="form-control" placeholder="Enter Hierarchy" />
//                                     </div>
//                                     <div className="col-md-4 mb-4">
//                                         <label className="form-label">Email 1</label>
//                                         <Field type="email" name="email1" className="form-control" placeholder="Enter Email" />
//                                     </div>
//                                 </div>

//                                 <div className="d-flex justify-content-center">
//                                     <Button className="m-2" type="button" variant="secondary" onClick={() => resetForm()}>
//                                         Reset
//                                     </Button>
//                                     <Button className="m-2" type="submit" variant="primary" disabled={isSubmitting}>
//                                         {isSubmitting ? "Submitting..." : "Update Hierarchy"}
//                                     </Button>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };

// export default UpdateHierarchy;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { Button, Card } from "react-bootstrap";
import Select from "react-select";
import Api_base_url from "../Api_base_url/Api_base_url";
import './a.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from '@mui/icons-material/Home';
import HomeButton from "../HomeButton"
const Reference = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const ho = localStorage.getItem("home");
    useEffect(() => {
        console.log("Fetching Projects...");
        fetchProjects();
        fetchUsers();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            console.warn("No token or userId found in localStorage.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${Api_base_url}/api/project/getprojects`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            console.log("Fetched Projects Response:", response.data);

            if (!response.data || !Array.isArray(response.data)) {
                console.error("Unexpected API response format:", response.data);
                setError("Invalid project data received.");
                return;
            }

            const formattedProjects = response.data.map((project) => ({
                label: project.name,
                value: project.id.toString(),
            }));

            setProjects(formattedProjects);
            console.log("Updated Projects:", formattedProjects);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        try {
            const response = await axios.get(`${Api_base_url}/api/users/all/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });

            console.log("Fetched Users Response:", response.data);

            if (response.status === 200 && response.data.users) {
                const formattedUsers = response.data.users.map((user) => ({
                    label: user.email,
                    value: user.email,
                }));
                setUsers(formattedUsers);
            } else {
                setError("No users found.");
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to fetch users.");
        }
    };

    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     const requestData = {
    //         email: values.emails.map((email) => email.value).join(","),
    //         projectId: values.projectIds.map((project) => project.value).join(","),
    //         hierarchy: values.updateHierarchy,
    //     };

    //     const token = localStorage.getItem("jwttoken");
    //     const userId = localStorage.getItem("id");

    //     if (!token || !userId) {
    //         console.warn("No token or userId found. Cannot proceed with submission.");
    //         setSubmitting(false);
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(
    //             "http://192.168.167.5:8560/api/project/update-singleproject-hierarchy",
    //             [requestData],
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                     userId: userId,
    //                 },
    //             }
    //         );

    //         console.log("Response:", response.data);
    //         alert("Project hierarchy updated successfully!");
    //         resetForm();
    //     } catch (error) {
    //         console.error("Error updating hierarchy:", error);
    //         alert("Failed to update project hierarchy.");
    //     }

    //     setSubmitting(false);
    // };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const requestData = {
            email: values.emails.map((email) => email.value).join(","),
            projectId: values.projectIds.map((project) => project.value).join(","),
            hierarchy: values.updateHierarchy,
        };

        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            console.warn("No token or userId found. Cannot proceed with submission.");
            setSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                `${Api_base_url}/api/project/update-singleproject-hierarchy`,
                [requestData],
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            console.log("Response:", response.data);

            if (response.data.statusCode === 200) {
                if (response.data.statusMessage) {
                    toast.success(<div>
                        <span style={{ color: "green", fontWeight: "bold" }} />
                        {response.data.statusMessage}
                    </div>);
                }
            }

            // else {
            //     if (response.data.statusCode === 400) {
            //         toast.error(
            //             <div>
            //                 <span style={{ color: "red", fontWeight: "bold" }} />
            //                 {
            //                     toast.error("bad request");}
            //             </div>
            //         );
            //     }
            //     if (response.data.statusCode !== 200 && response.data.statusCode !== 400) {
            //         toast.error(
            //             <div>
            //                 <span style={{ color: "red", fontWeight: "bold" }} />
            //                 {response.data.statusMessage}
            //             </div>
            //         );
            //     } else {
            //         toast.error("Something went wrong. Please try again.");
            //     }
            // }
            else {
                if (response.data.statusCode === 400) {
                    toast.error("Bad Request");
                } else if (response.data.statusCode !== 200) {
                    toast.error(response.data.statusMessage || "Something went wrong. Please try again.");
                }
            }

            resetForm();

        }
        catch (error) {
            console.error("Error updating hierarchy:", error);

            // Display the error message in the toast
            toast.error("Failed to update project hierarchy.");
        }

        setSubmitting(false);
    };


    return (
        <>
            <HomeButton ho={ho} />

            <div className="container px-4 pb-4 mt-4">

                <ToastContainer />

                <Card className="card-form p-3">
                    <div className="label" style={{ marginTop: "-1px" }}>
                        <h6>Update Single Hierarchy</h6>
                    </div>
                    <Card.Body className="card-1-form d-block">
                        <Formik
                            initialValues={{
                                projectIds: [],
                                emails: [],
                                updateHierarchy: "",  // Added this field
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue, isSubmitting, resetForm }) => (
                                <Form>
                                    <div className="row">
                                        {/* Multi-select Project ID */}
                                        <div className="col-md-4 mb-4">
                                            <label className="form-label">Select Projects</label>
                                            <Select
                                                isMulti
                                                options={projects}
                                                value={values.projectIds}
                                                onChange={(selectedOptions) =>
                                                    setFieldValue("projectIds", selectedOptions)
                                                }
                                                isLoading={loading}
                                                placeholder="Select Projects"
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </div>

                                        {/* Multi-select Emails */}
                                        <div className="col-md-4 mb-4">
                                            <label className="form-label">Select Emails</label>
                                            <Select
                                                isMulti
                                                options={users}
                                                value={values.emails}
                                                onChange={(selectedOptions) =>
                                                    setFieldValue("emails", selectedOptions)
                                                }
                                                isLoading={loading}
                                                placeholder="Select Users"
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </div>

                                        <div className="col-md-4 mb-4">
                                            <label className="form-label">Hierarchy</label>
                                            <Field
                                                type="number"
                                                name="updateHierarchy"
                                                className="form-control"
                                                placeholder="Enter Updated Hierarchy"
                                            />
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <Button
                                            className="m-2"
                                            type="submit"
                                            variant="primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </Button>
                                        <Button
                                            className="m-2"
                                            type="button"
                                            variant="danger"
                                            onClick={() => resetForm()}
                                        >
                                            Reset
                                        </Button>

                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Reference;
