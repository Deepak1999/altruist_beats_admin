import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import './BodyApi.css';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Api_base_url from './Api_base_url/Api_base_url';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .matches(/@altruistindia\.com$/, 'Email must be a Gmail address')
        .required('Email is required'),
});

const initialValues = {
    name: '',
    email: '',
};

const SignUpUsers = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');
        if (!token || !userId) {

            navigate('/'); // Redirect to login if no token is found
        }
    }, [navigate]);

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showSuccessPopup = () => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data saved successfully!',
            showConfirmButton: false,
            timer: 1000,
        });
    };

    const showErrorPopup = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            showConfirmButton: false,
            timer: 2000,
        });
    };


    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     const token = localStorage.getItem('jwttoken');
    //     const userId = localStorage.getItem('id');

    //     // Show confirmation popup
    //     const confirmation = await Swal.fire({
    //         title: 'Confirm Submission',
    //         text: 'Are you sure you want to submit this form?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, submit it!',
    //         cancelButtonText: 'No, cancel',
    //     });

    //     if (!confirmation.isConfirmed) {
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(
    //             `${Api_base_url}/api/users/sign-up`,
    //             values,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                     'userId': userId
    //                 },
    //             }
    //         );

    //         if (response.data.statusCode === 200) {
    //             Swal.fire({
    //                 title: "Success!",
    //                 text: response.data.statusMessage || "Users successfully added to the Hierarchy!",
    //                 icon: "success",
    //                 confirmButtonColor: "#3085d6",
    //             });




    //         } else {
    //             Swal.fire({
    //                 title: "Error!",
    //                 text: response.data.statusMessage || "Failed to shift hierarchy.",
    //                 icon: "error",
    //                 confirmButtonColor: "#d33",

    //             }
    //             );


    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             const status = response.data.statusCode;
    //             const statusMessage = response.data.statusMessage || 'Unexpected error occurred.';

    //             switch (status) {
    //                 case 409:
    //                     Swal.fire('Error', statusMessage, 'error');
    //                     break;
    //                 case 400:
    //                     Swal.fire('Error', 'Bad Request: Please check the input data.', 'error');
    //                     break;
    //                 case 401:
    //                     Swal.fire('Error', 'Unauthorized: Please log in to proceed.', 'error');
    //                     break;
    //                 case 404:
    //                     Swal.fire('Error', 'Not Found: The requested resource could not be found.', 'error');
    //                     break;
    //                 case 500:
    //                     Swal.fire('Error', 'Server Error: Please try again later.', 'error');
    //                     break;
    //                 default:
    //                     Swal.fire('Error', statusMessage, 'error');
    //             }
    //         } else {
    //             Swal.fire('Error', 'No response from server. Please check your connection.', 'error');
    //         }
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');

        // Show confirmation popup
        const confirmation = await Swal.fire({
            title: 'Confirm Submission',
            text: 'Are you sure you want to create user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        if (!confirmation.isConfirmed) {
            return;
        }

        try {
            const response = await axios.post(
                `${Api_base_url}/api/users/sign-up`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'userId': userId
                    },
                }
            );

            if (response.data.statusCode === 200 || response.data.statusCode === 201 ) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.statusMessage || "Users successfully added to the Hierarchy!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.statusMessage || "Failed to shift hierarchy.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                resetForm();
            }
        } catch (error) {
            if (error.response) {
                const status = error.response?.data?.statusCode;
                const statusMessage = error.response?.data?.statusMessage || 'Unexpected error occurred.';

                switch (status) {
                    case 409:
                        Swal.fire('Error', statusMessage, 'error');
                        break;
                    case 400:
                        Swal.fire('Error', 'Bad Request: Please check the input data.', 'error');
                        break;
                    case 401:
                        Swal.fire('Error', 'Unauthorized: Please log in to proceed.', 'error');
                        break;
                    case 404:
                        Swal.fire('Error', 'Not Found: The requested resource could not be found.', 'error');
                        break;
                    case 500:
                        Swal.fire('Error', 'Server Error: Please try again later.', 'error');
                        break;
                    default:
                        Swal.fire('Error', statusMessage, 'error');
                }
            } else {
                Swal.fire('Error', 'No response from server. Please check your connection.', 'error');
                resetForm();
            }
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     const token = localStorage.getItem('jwttoken');
    //     const userId = localStorage.getItem('id');

    //     // Show confirmation popup
    //     const confirmation = await Swal.fire({
    //         title: 'Confirm Submission',
    //         text: 'Are you sure you want to submit this form?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, submit it!',
    //         cancelButtonText: 'No, cancel',
    //     });

    //     // If user cancels, do nothing
    //     if (!confirmation.isConfirmed) {
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(
    //             `${Api_base_url}/api/users/sign-up`,
    //             values,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                     'userId': userId
    //                 },
    //             }
    //         );

    //         if (response.data.statusCode === 200) {
    //             Swal.fire('Success', 'User registered successfully!', 'success');
    //             resetForm();
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             const statusCode = error.response.data.statusCode;
    //             const statusMessage = error.response.data?.statusMessage || 'Unexpected error occurred.';

    //             switch (statusCode) {
    //                 case 409:
    //                     Swal.fire('Error', 'Email Already Exists. Try Login !!!', 'error');
    //                     break;
    //                 case 400:
    //                     Swal.fire('Error', 'Bad Request: Please check the input data.', 'error');
    //                     break;
    //                 case 401:
    //                     Swal.fire('Error', 'Unauthorized: Please log in to proceed.', 'error');
    //                     break;
    //                 case 404:
    //                     Swal.fire('Error', 'Not Found: The requested resource could not be found.', 'error');
    //                     break;
    //                 case 500:
    //                     Swal.fire('Error', 'Server Error: Please try again later.', 'error');
    //                     break;
    //                 default:
    //                     Swal.fire('Error', statusMessage, 'error');
    //             }
    //         } else {
    //             Swal.fire('Error', 'No response from server. Please check your connection.', 'error');
    //         }
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //     setIsLoading(true);
    //     setSubmissionStatus(null);
    //     const token = localStorage.getItem('jwttoken');
    //     const userId = localStorage.getItem('id');
    //     try {
    //         const response = await axios.post(
    //             `${Api_base_url}/api/users/sign-up`,
    //             values,  // Pass the form values directly
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                     'userId': userId
    //                 },
    //             }
    //         );

    //         if (response.status === 200) {
    //             showSuccessPopup();
    //             resetForm();
    //         } else {
    //             switch (response.status) {
    //                 case 400:
    //                     showErrorPopup('Bad Request: Please check the input data.');
    //                     break;
    //                 case 401:
    //                     showErrorPopup('Unauthorized: Please log in to proceed.');
    //                     break;
    //                 case 404:
    //                     showErrorPopup('Not Found: The requested resource could not be found.');
    //                     break;
    //                 case 500:
    //                     showErrorPopup('Server Error: Please try again later.');
    //                     break;
    //                 default:
    //                     showErrorPopup('Unexpected error occurred. Please try again.');
    //             }
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             const status = error.response.status;
    //             switch (status) {
    //                 case 400:
    //                     showErrorPopup('Bad Request: Please check the input data.');
    //                     break;
    //                 case 401:
    //                     showErrorPopup('Unauthorized: Please log in to proceed.');
    //                     break;
    //                 case 404:
    //                     showErrorPopup('Not Found: The requested resource could not be found.');
    //                     break;
    //                 case 500:
    //                     showErrorPopup('Server Error: Please try again later.');
    //                     break;
    //                 default:
    //                     showErrorPopup(`Error: ${error.response.data.message || 'Failed to save data'}`);
    //             }
    //         } else if (error.request) {
    //             showErrorPopup('Error: No response from server. Please check your connection or try again later.');
    //         } else {
    //             showErrorPopup(`Error: ${error.message}`);
    //         }
    //     } finally {
    //         setSubmitting(false);
    //         setIsLoading(false);
    //     }
    // };

    return (
        <div className="container mt-4">
            {isLoading && <Loader loading={isLoading} />}

            <div className="label" style={{ marginTop: '177px' }}>
                <h6>Sign Up Users</h6>
            </div>

            <Card className="p-3" style={{
                width: "96rem",
                marginTop: "69px",
                marginLeft: "-92px",
                marginRight: "-90px",
            }}>
                <Card.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="row">
                                    <div className="form-group mb-3 card-1"
                                        style={{ height: "10rem" }}>
                                        <div className="col-md-4 ">
                                            <label htmlFor="name" className="mb-1">Name *</label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter your name"
                                            />
                                            <ErrorMessage name="name" component="div" style={{ color: "red", fontSize: "12px" }} />
                                        </div>
                                        <div className="col-md-4 " style={{ marginLeft: "72px" }}>
                                            <label htmlFor="email">Email *</label>
                                            <Field

                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                            />
                                            <ErrorMessage name="email" component="div" style={{ color: "red", fontSize: "12px" }} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex",
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="me-2"
                                        disabled={isSubmitting || isLoading}
                                    >
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    <Button
                                        type="reset"
                                        variant="danger"
                                        disabled={isSubmitting || isLoading}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>

            {submissionStatus && (
                <Alert
                    variant={submissionStatus.type === 'success' ? 'success' : 'danger'}
                    className="mt-4"
                >
                    {submissionStatus.message}
                </Alert>
            )}
        </div>
    );
};

export default SignUpUsers;
