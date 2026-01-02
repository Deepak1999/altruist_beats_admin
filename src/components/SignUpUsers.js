import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert, Card, ToastContainer } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import './BodyApi.css';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Api_base_url from './Api_base_url/Api_base_url';
import { toast } from 'react-toastify';

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
    bankName: '',
    ifscCode: '',
    accountNo: '',
    holderName: '',
    roleId: ''
};

const SignUpUsers = () => {

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');
        if (!token || !userId) {

            navigate('/');
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

    const handleGetRoles = async () => {

        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');

        if (!userId || !token) {
            toast.error("Missing necessary data in localStorage");
            return;
        }

        try {
            const response = await fetch(`${Api_base_url}/api/users/get-all-roles`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                        'userId': userId
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                if (Array.isArray(data)) {
                    setRoles(data);
                } else {
                    toast.error("Invalid role data format");
                }
            } else {
                toast.error("Failed to fetch roles with status: " + response.status);
            }
        } catch (error) {
            toast.error("Error during fetch: " + error.message);
        }
    };

    useEffect(() => {
        handleGetRoles();
    }, []);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');

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
                `${Api_base_url}/api/users/sign-up/v2`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'userId': userId
                    },
                }
            );

            if (response.data.statusCode === 200 || response.data.statusCode === 201) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.statusMessage || "Users successfully added to the Hierarchy!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
                resetForm();
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
                                    <div className="col-md-3 mb-3">
                                        <label>Name</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                        />
                                        {/* <ErrorMessage name="name" component="div" className="text-danger small" /> */}
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                        />
                                        {/* <ErrorMessage name="email" component="div" className="text-danger small" /> */}
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>Bank Name</label>
                                        <Field
                                            type="text"
                                            name="bankName"
                                            className="form-control"
                                            placeholder="Enter bank name"
                                        />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>IFSC Code</label>
                                        <Field
                                            type="text"
                                            name="ifscCode"
                                            className="form-control"
                                            placeholder="Enter IFSC code"
                                        />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>Account No</label>
                                        <Field
                                            type="text"
                                            name="accountNo"
                                            className="form-control"
                                            placeholder="Enter account number"
                                        />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>Holder Name</label>
                                        <Field
                                            type="text"
                                            name="holderName"
                                            className="form-control"
                                            placeholder="Enter holder name"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Select RoleID</label>

                                        <Field as="select" name="roleId" className="form-control">
                                            <option value="">Select Role_ID</option>

                                            {roles.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.role}
                                                </option>
                                            ))}
                                        </Field>
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
            <ToastContainer />
        </div>
    );
};

export default SignUpUsers;