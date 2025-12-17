import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import axios from 'axios';
import Api_base_url from "../Api_base_url/Api_base_url";
import { Button, Card, CardContent, CircularProgress, TextField, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Purchase = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [users, setUsers] = useState([]);
    const [modifierEmails, setModifierEmails] = useState([]);
    const [initiator, setInitiator] = useState([]);

    const [advanceHierarchyEmails, setAdvanceHierarchyEmails] = useState([]);
    const [error, setError] = useState(null);
    const [initiators, setInitiators] = useState([]);
    const navigate = useNavigate();
    const [selectedUserNew, setSelectedUserNew] = useState([]);
    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [company, setCompany] = useState("");
    const [type, setType] = useState("");
    // const [initiator, setInitiator] = useState("");
    const [paymentHierarchyEmails, setPaymentHierarchyEmails] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [usersNew, setUsersNew] = useState([]);
    const [companies, setCompanies] = useState([]);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const [loading, setLoading] = useState(false);


    const getUsers = async () => {
        setLoading(true);

        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');

        try {
            const response = await axios.get(`${Api_base_url}/api/users/get/users`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });

            if (response.data?.statusDescription?.statusCode === 200) {
                setInitiator(response.data.userList);
                setUsers(response.data.userList);
                setModifierEmails(response.data.userList);
                setAdvanceHierarchyEmails(response.data.userList);
                setPaymentHierarchyEmails(response.data.userList);
                // ✅ Set the user list in state
            } else {
                console.error('Error submitting form:', response.data);

                Swal.fire({
                    title: 'Error!',
                    text: `Failed to retrieve users: ${response.data.statusDescription?.statusMessage || 'Unknown error'}`,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            console.error('Error:', error);

            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setLoading(false);
    };
    const userOptions = usersNew.map(user => ({
        value: user.id,
        label: user.email,
        email: user.email,
    }));
    const userOptions2 = usersNew.map(user => ({
        value: user.id,
        label: user.email,
        email: user.email,
    })); const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        else if (name === "shortName") setShortName(value);
        else if (name === "company") setCompany(value);
        else if (name === "type") setType(value);
        else if (name === "initiator") setInitiator(value);
        else if (name === "user") setSelectedUserNew(value);
    };

    // const handleUserChange = (selectedOptions) => {
    //     const selectedEmails = selectedOptions ? selectedOptions.map(option => option.email) : [];
    //     setSelectedUsers(selectedEmails);
    // };
    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     setLoading(true);

    //     const token = localStorage.getItem('jwttoken');
    //     const userId = localStorage.getItem('id');

    //     const requestPayload = {
    //         name: values.name,
    //         shortName: values.shortName,
    //         company: values.company,
    //         type: 1,
    //         initiator: values.initiator.length > 0 ? values.initiator.map(user => user.value).join(', ') : '',
    //         users: values.users.map(user => user.value),
    //         modifierEmails: values.modifierEmails.map(user => user.value),
    //         advanceHierarchyEmails: values.advanceHierarchyEmails.map(user => user.value),
    //         paymentHierarchyEmails: values.paymentHierarchyEmails.map(user => user.value),
    //     };

    //     try {
    //         const response = await axios.post(`${Api_base_url}/api/project/create-purchase-project`, requestPayload, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //                 userId: userId,
    //             },
    //         });
    //         console.log('Form submitted successfully:', response.data);
    //         const message = response.data.statusMessage;

    //         if (response.data.statusCode === 200) {
    //             Swal.fire("Success!", "Users successfully added to the project!", "success");
    //         } else {
    //             Swal.fire({
    //                 title: 'Fail!',
    //                 text: `${message}`,  // Fixed template string syntax
    //                 icon: 'error',       // Corrected icon value
    //                 confirmButtonText: 'Try Again'  // Improved user-friendly message
    //             });
    //         }
    // console.log('Form submitted successfully:', response.data);
    // const message = response.data.statusMessage
    // if (response.data.statusCode === 200) {
    //     Swal.fire("Success!", "Users successfully added to the project!", "success");
    // } else {
    //     Swal.fire({
    //         title: 'Fail!',
    //         text: ${message},
    //         icon: 'failiur',
    //         confirmButtonText: 'not Ok'
    //     });
    // }

    //         resetForm();
    //     } catch (error) {
    //         console.error('Error:', error);

    //         Swal.fire({
    //             title: 'Error!',
    //             text: `Failed to create project: ${error.response?.data?.message || 'Unknown error'}`,
    //             icon: 'error',
    //             confirmButtonText: 'Try Again'
    //         });
    //     }

    //     setLoading(false);
    //     setSubmitting(false);
    // };

    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     setLoading(true);

    //     const token = localStorage.getItem('jwttoken');
    //     const userId = localStorage.getItem('id');

    //     const requestPayload = {
    //         name: values.name,
    //         shortName: values.shortName,
    //         company: values.company,
    //         type: 1,
    //         // initiator: values.initiator.map(user => user.value),
    //         initiator: values.initiator.length > 0 ? values.initiator.map(user => user.value).join(', ') : '',

    //         users: values.users.map(user => user.value),
    //         modifierEmails: values.modifierEmails.map(user => user.value),
    //         advanceHierarchyEmails: values.advanceHierarchyEmails.map(user => user.value),
    //         paymentHierarchyEmails: values.paymentHierarchyEmails.map(user => user.value),
    //     };

    //     try {
    //         const response = await axios.post(`${Api_base_url}/api/project/create-purchase-project`, requestPayload, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //                 userId: userId,
    //             },
    //         });

    //         console.log('Form submitted successfully:', response.data);

    //         Swal.fire({
    //             title: 'Success!',
    //             text: 'Project created successfully.',
    //             icon: 'success',
    //             confirmButtonText: 'OK'
    //         });

    //         resetForm();
    //     } catch (error) {
    //         console.error('Error:', error);

    //         Swal.fire({
    //             title: 'Error!',
    //             text: `Failed to create project: ${error.response?.data?.message || 'Unknown error'}`,
    //             icon: 'error',
    //             confirmButtonText: 'Try Again'
    //         });
    //     }

    //     setLoading(false);
    //     setSubmitting(false);
    // };
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);

        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');

        const requestPayload = {
            name: values.name,
            shortName: values.shortName,
            company: values.company,
            type: 1,
            initiator: values.initiator.length > 0 ? values.initiator.map(user => user.value).join(', ') : '',
            users: values.users.map(user => user.value),
            modifierEmails: values.modifierEmails.map(user => user.value),
            advanceHierarchyEmails: values.advanceHierarchyEmails.map(user => user.value),
            paymentHierarchyEmails: values.paymentHierarchyEmails.map(user => user.value),
        };

        // Show confirmation alert before API hit
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to proceed with creating the purchase project?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.post(`${Api_base_url}/api/project/create-purchase-project`, requestPayload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                });

                console.log("Form submitted successfully:", response.data);
                const message = response.data.statusMessage;

                if (response.data.statusCode === 200) {
                    Swal.fire(response.data.statusMessage || "Success!", "Users successfully create purchase project!", "success");
                } else {
                    Swal.fire({
                        title: "Fail!",
                        text: message,
                        icon: "error",
                        confirmButtonText: "Try Again"
                    });
                }
                resetForm();
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                console.error("Error submitting form:", error);
            }
        } else {
            setLoading(false); // Reset loading state if user cancels
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
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
            navigate("/");
            return;
        }

        // fetchProjects(token, userId);
        fetchData();
    }, []);
    const token = localStorage.getItem("jwttoken");
    const userId = localStorage.getItem("id");

    const formInitialValues = {
        name: '',
        shortName: '',
        company: '',
        type: '',
        initiator: [],
        users: [],
    };

    const formValidationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        shortName: Yup.string().required('Required'),
        company: Yup.string().required('Required'),
        type: Yup.string().required('Required'),
        initiator: Yup.array().min(1, 'Required'),
        users: Yup.array().min(1, 'At least one user is required'),
    });
    // import axios from 'axios';
    // 
    const onFormSubmit = async (values, { setSubmitting, resetForm }) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to create this project?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        if (!confirmResult.isConfirmed) {
            setSubmitting(false);
            return;
        }

        const requestPayload = {
            name: values.name,
            shortName: values.shortName,
            company: values.company,
            type: values.type,
            initiator: values.initiator.length > 0
                ? values.initiator.map(user => user.label).join(', ')
                : '',
            users: values.users.map((user) => user.value),
        };

        try {
            const response = await axios.post(
                `${Api_base_url}/api/project/create-single-project`,
                requestPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'userId': userId,
                    }
                }
            );

            // Axios automatically parses JSON, so response.data is already available
            if (response.data.statusCode === 200) {
                console.log('Form submitted successfully:', response.data);
                Swal.fire('Success!', 'Project created successfully.', 'success');
                resetForm();
            } else {
                console.error('Error submitting form:', response.data.statusMessage);
                Swal.fire('Error!', `Failed to create project: ${response.data.statusMessage}`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);

            // Handle network errors or API errors
            Swal.fire('Error!', error.response?.data?.statusMessage || 'An unexpected error occurred. Please try again later.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // const onFormSubmit = async (values, { setSubmitting, resetForm }) => {
    //     const confirmResult = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'Do you want to create this project?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, create it!',
    //         cancelButtonText: 'No, cancel',
    //     });

    //     if (!confirmResult.isConfirmed) {
    //         setSubmitting(false);
    //         return; // Stop the function if user cancels
    //     }

    //     const requestPayload = {
    //         name: values.name,
    //         shortName: values.shortName,
    //         company: values.company,
    //         type: values.type,
    //         initiator: values.initiator.length > 0
    //             ? values.initiator.map(user => user.label).join(', ')  // Convert to a string
    //             : '',
    //         users: values.users.map((user) => user.value),
    //     };

    //     try {
    //         const response = await fetch(`${Api_base_url}/api/project/create-single-project`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //                 userId: userId,
    //             },
    //             body: JSON.stringify(requestPayload),
    //         });

    //         if (response.data.statusCode === 200) {
    //             const result = await response.json();
    //             console.log('Form submitted successfully:', result);
    //             Swal.fire('Success!', 'Project created successfully.', 'success');
    //             resetForm();
    //         } else {
    //             console.error('Error submitting form:', response.statusText);
    //             Swal.fire('Error!', `Failed to create project: ${response.statusText}`, 'error');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         Swal.fire('Error!', 'An unexpected error occurred. Please try again later.', 'error');
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const onFormSubmit = async (values, { setSubmitting, resetForm }) => {
    //     const requestPayload = {
    //         name: values.name,
    //         shortName: values.shortName,
    //         company: values.company,
    //         type: values.type,
    //         // initiator: values.initiator,
    //         initiator: values.initiator.length > 0
    //             ? values.initiator.map(user => user.label).join(', ')  // Convert to a string
    //             : '',
    //         users: values.users.map((user) => user.value),
    //     };

    //     try {
    //         const response = await fetch(`${Api_base_url}/api/project/create-single-project`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //                 userId: userId,
    //             },
    //             body: JSON.stringify(requestPayload),
    //         });

    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log('Form submitted successfully:', result);
    //             Swal.fire('Success!', 'Project created successfully.', 'success');
    //             resetForm();
    //         } else {
    //             console.error('Error submitting form:', response.statusText);
    //             Swal.fire('Error!', `Failed to create project: ${response.statusText}`, 'error');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         Swal.fire('Error!', 'An unexpected error occurred. Please try again later.', 'error');
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const create = async (e) => {
    //     const token = localStorage.getItem("jwttoken");
    //     const userId = localStorage.getItem("id");
    //     e.preventDefault();

    //     const requestPayload = {
    //         name,
    //         shortName,
    //         company,
    //         type,
    //         initiator,
    //         users: selectedUsers
    //     };

    //     try {
    //         const response = await fetch(`${Api_base_url}/api/project/create-single-project`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //                 userId: userId,
    //             },
    //             body: JSON.stringify(requestPayload),
    //         });

    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log("Form submitted successfully:", result);

    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'Project created successfully.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK'
    //             });

    //         } else {
    //             console.error("Error submitting form:", response.statusText);

    //             Swal.fire({
    //                 title: 'Error!',
    //                 text: `Failed to create project: ${response.statusText}`,
    //                 icon: 'error',
    //                 confirmButtonText: 'Try Again'
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);

    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'An unexpected error occurred. Please try again later.',
    //             icon: 'error',
    //             confirmButtonText: 'OK'
    //         });
    //     }
    // };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {/* Tab Headers */}
            <Tabs
                value={activeTab}
                onChange={handleChange}
                centered
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Purchase Project" />
                <Tab label="Create Project" />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ width: '100%', padding: 3 }}>
                {activeTab === 0 && (
                    <div className="container px-4 pb-4 mt-4">

                        <Card className="card-form p-3">

                            <Box sx={{ width: '100%', padding: 3 }}>
                                <Typography variant="h6" gutterBottom>

                                    <div className="label-form" style={{ top: "-184px" }} >

                                        <h6>  Create Purchase Project</h6>
                                    </div>

                                </Typography>

                                <Card >
                                    <CardContent className="card-body-form">

                                        <Formik
                                            initialValues={{
                                                name: '',
                                                shortName: '',
                                                company: '',
                                                initiator: '',
                                                users: [],
                                                modifierEmails: [],
                                                advanceHierarchyEmails: [],
                                                paymentHierarchyEmails: []
                                            }}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ values, handleChange, setFieldValue, errors, touched, handleBlur }) => (
                                                <Form>
                                                    {/* Name */}
                                                    <div className='row'>
                                                        <div className="col-md-4 mb-4">
                                                            <Field
                                                                name="name"
                                                                placeholder="Project Name"
                                                                className="form-control mb-3"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mb-4">
                                                            {/* Short Name */}
                                                            <Field
                                                                name="shortName"
                                                                placeholder="Short Name"
                                                                className="form-control mb-3"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mb-4">
                                                            {/* Company */}
                                                            {/* <Field
                                                                name="company"
                                                                placeholder="Company"
                                                                className="form-control mb-3"
                                                            /> */}
                                                            <Field
                                                                as={TextField}
                                                                fullWidth
                                                                select
                                                                label="Company"
                                                                name="company"
                                                                value={values.company}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={touched.company && Boolean(errors.company)}
                                                                helperText={touched.company && errors.company}
                                                                margin="normal"
                                                            >
                                                                <MenuItem value="">Select Company</MenuItem>
                                                                {companies.map((company) => (
                                                                    <MenuItem key={company.name} value={company.name}>
                                                                        {company.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-md-4 mb-4">
                                                            {/* Initiator */}
                                                            {/* <Field
                                                                name="initiator"
                                                                placeholder="Initiator"
                                                                className="form-control mb-3"
                                                            /> */}
                                                            <Select
                                                                isMulti
                                                                // onFocus={getUsers}
                                                                options={initiator.map(user => ({
                                                                    value: user.email,
                                                                    label: `${user.name} (${user.email})`
                                                                }))}
                                                                value={values.initiator}
                                                                onChange={selected => setFieldValue('initiator', selected)}
                                                                placeholder="Select Initiator"
                                                                className="mb-3"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mb-4">
                                                            {/* Users */}
                                                            <Select
                                                                isMulti
                                                                onFocus={getUsers}
                                                                options={users.map(user => ({
                                                                    value: user.email,
                                                                    label: `${user.name} (${user.email})`
                                                                }))}
                                                                value={values.users}
                                                                onChange={selected => setFieldValue('users', selected)}
                                                                placeholder="Select Users"
                                                                className="mb-3"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mb-4">
                                                            {/* Modifier Emails */}
                                                            <Select
                                                                isMulti
                                                                options={modifierEmails.map(user => ({
                                                                    value: user.email,
                                                                    label: `${user.name} (${user.email})`
                                                                }))}
                                                                value={values.modifierEmails}
                                                                onChange={selected => setFieldValue('modifierEmails', selected)}
                                                                placeholder="Select Modifier Emails"
                                                                className="mb-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='row'>

                                                        <div className="col-md-4 mb-4">
                                                            {/* Advance Hierarchy Emails */}
                                                            <Select
                                                                isMulti
                                                                options={advanceHierarchyEmails.map(user => ({
                                                                    value: user.email,
                                                                    label: `${user.name} (${user.email})`
                                                                }))}
                                                                value={values.advanceHierarchyEmails}
                                                                onChange={selected => setFieldValue('advanceHierarchyEmails', selected)}
                                                                placeholder="Select Advance Hierarchy Emails"
                                                                className="mb-3"
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mb-4">
                                                            {/* Payment Hierarchy Emails */}
                                                            <Select
                                                                isMulti
                                                                options={paymentHierarchyEmails.map(user => ({
                                                                    value: user.email,
                                                                    label: `${user.name} (${user.email})`
                                                                }))}
                                                                value={values.paymentHierarchyEmails}
                                                                onChange={selected => setFieldValue('paymentHierarchyEmails', selected)}
                                                                placeholder="Select Payment Hierarchy Emails"
                                                                className="mb-3"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Submit Button */}
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>

                                    </CardContent>
                                </Card>


                            </Box>

                        </Card>
                    </div>
                )}
                {activeTab === 1 && (
                    <Card sx={{ maxWidth: 700, margin: '20px auto', padding: 3 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Create Project
                            </Typography>
                            <Formik
                                initialValues={formInitialValues}
                                validationSchema={formValidationSchema}
                                onSubmit={onFormSubmit}
                            >
                                {({ values, handleChange, handleBlur, setFieldValue, isSubmitting, errors, touched }) => (
                                    <Form>

                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    label="Name"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={touched.name && errors.name}
                                                    margin="normal"
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    label="Short Name"
                                                    name="shortName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.shortName}
                                                    error={touched.shortName && Boolean(errors.shortName)}
                                                    helperText={touched.shortName && errors.shortName}
                                                    margin="normal"
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    select
                                                    label="Company"
                                                    name="company"
                                                    value={values.company}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.company && Boolean(errors.company)}
                                                    helperText={touched.company && errors.company}
                                                    margin="normal"
                                                >
                                                    <MenuItem value="">Select Company</MenuItem>
                                                    {companies.map((company) => (
                                                        <MenuItem key={company.name} value={company.name}>
                                                            {company.name}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    select
                                                    label="Type"
                                                    name="type"
                                                    value={values.type}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.type && Boolean(errors.type)}
                                                    helperText={touched.type && errors.type}
                                                    margin="normal"
                                                >
                                                    <MenuItem value="">Select Type</MenuItem>
                                                    {[0, 2].map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                {/* <Select
                                                    isMulti
                                                    name="initiator"
                                                    options={userOptions2}
                                                    value={userOptions2.filter((option) =>
                                                        values.initiator.some((user) => user.value === option.value)
                                                    )}
                                                    onChange={(selected) => {
                                                        setFieldValue(
                                                            "initiator",
                                                            selected.map(user => user.label).join(", ") // Convert array to string
                                                        );
                                                    }}
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    placeholder="Select Initiator"
                                                /> */}


                                                <Select
                                                    isMulti
                                                    name="initiator"
                                                    options={userOptions2}
                                                    value={Array.isArray(values.initiator) ? userOptions2.filter((option) =>
                                                        values.initiator.some((user) => user.value === option.value)
                                                    ) : []} // Ensure initiator is an array
                                                    onChange={(selected) => {
                                                        setFieldValue("initiator", selected); // Keep it as an array
                                                    }}
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    placeholder="Select Initiator"
                                                />




                                                {/* <Select
                                                    isMulti
                                                    name="initiator"
                                                    options={userOptions2}
                                                    value={Array.isArray(values.initiator) ? userOptions2.filter((option) =>
                                                        values.initiator.some((initiator) => initiator.value === option.value)
                                                    ) : []}
                                                    onChange={(selected) => setFieldValue('initiator', selected || [])} // Ensure empty array if no selection
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    placeholder="Select Initiator"
                                                />

                                                {touched.initiator && errors.initiator && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.initiator}
                                                    </Typography>
                                                )} */}
                                                {/* <Select
                                                    isMulti
                                                    name="initiator"
                                                    options={userOptions2}
                                                    value={userOptions2.filter((option) =>
                                                        values.initiator.some((initiator) => initiator.value === option.value)
                                                    )}
                                                    onChange={(selected) => setFieldValue('initiator', selected)}
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    placeholder="Select Initiator"
                                                />

                                                {touched.initiator && errors.initiator && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.initiator}
                                                    </Typography>
                                                )} */}

                                                {/* <Field
                                                    as={TextField}
                                                    fullWidth
                                                    select
                                                    label="Initiator"
                                                    name="initiator"
                                                    value={values.initiator}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.initiator && Boolean(errors.initiator)}
                                                    helperText={touched.initiator && errors.initiator}
                                                    margin="normal"
                                                >
                                                    <MenuItem value="">Select Initiator</MenuItem>
                                                    {initiators.map((initiator, i) => (
                                                        <MenuItem key={i} value={initiator.email}>
                                                            {initiator.email}
                                                        </MenuItem>
                                                    ))}
                                                </Field> */}
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div style={{ margin: '16px 0' }}>
                                                    <Select
                                                        isMulti
                                                        name="users"
                                                        options={userOptions}
                                                        value={userOptions.filter((option) =>
                                                            values.users.some((user) => user.value === option.value)
                                                        )}
                                                        onChange={(selected) => setFieldValue('users', selected)}
                                                        getOptionLabel={(e) => e.label}
                                                        getOptionValue={(e) => e.value}
                                                        placeholder="Select Users"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                sx={{ marginRight: '10px' }}
                                            >
                                                {isSubmitting ? 'Creating...' : 'Create'}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => navigate('/projects')}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>

                )}
            </Box>
        </Box >
    );
};

export default Purchase;
