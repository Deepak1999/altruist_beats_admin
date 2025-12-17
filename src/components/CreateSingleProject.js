
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import './BodyApi.css';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api_base_url from './Api_base_url/Api_base_url'; 
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    shortName: Yup.string().required('Short Name is required'),
    company: Yup.string().required('Company is required'),
    type: Yup.number().required('Type is required'),
    initiator: Yup.string().email('Invalid email address').required('Initiator is required'),
    users: Yup.array()
        .of(Yup.string().email('Invalid email address'))
        .min(1, 'At least one user is required')
        .required('Users are required'),
});

const initialValues = {
    name: '',
    shortName: '',
    company: '',
    type: 0,
    initiator: '',
    users: [''],
};

const CreateSingleProject = () => {
const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');
    if (!token || !userId) {

      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

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

    const showErrorPopup = (message = 'Something went wrong!') => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            showConfirmButton: false,
            timer: 1000,
        });
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setIsLoading(true);
        console.log('Submitting values:', values);

        // Retrieve token and userId from localStorage
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');

        if (!token || !userId) {
            showErrorPopup('Unauthorized: Please log in first.');
            setSubmitting(false);
            setIsLoading(false);
            return;
        }


        try {

            const response = await axios.post(
                `${Api_base_url}/api/project/create-single-project`,
                {
                    values,

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'userId': userId
                    },
                }
            );

            if (response.status === 200) {
                if (response.data.noChange) {
                    showErrorPopup('No changes made: The hierarchy is the same as the existing one.');
                } else {
                    showSuccessPopup('Data saved successfully!');
                    resetForm();
                }
            }
        } catch (error) {
            const status = error.response?.status;
            console.error('Error response:', error.response);
            switch (status) {
                case 400:
                    showErrorPopup('Bad Request: Please check the input data.');
                    break;
                case 401:
                    showErrorPopup('Unauthorized: Please log in to proceed.');
                    break;
                case 404:
                    showErrorPopup('Error: Project ID or email does not exist in the database.');
                    break;
                case 500:
                    showErrorPopup('Server Error: Please try again later.');
                    break;
                default:
                    showErrorPopup(`Error: ${error.message || 'Failed to save data'}`);
            }
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };


    return (
        <div className="container mt-4">
            {isLoading && <Loader loading={isLoading} />}
            <div className="label" style={{ marginTop: '177px' }}>
                <h6>Create Single Project</h6>
            </div>

            <Card className="p-3">
                <Card.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="row">
                                    <div className='card-1' style={{ gap: '41px' }}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="name" className="form-label">Name *</label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder='Name'
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="shortName" className="form-label">Short Name *</label>
                                            <Field
                                                type="text"
                                                id="shortName"
                                                name="shortName"
                                                className="form-control"
                                                placeholder='Short Name'
                                            />
                                            <ErrorMessage name="shortName" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="company" className="form-label">Company *</label>
                                            <Field
                                                type="text"
                                                id="company"
                                                name="company"
                                                className="form-control"
                                                placeholder='Company Name'
                                            />
                                            <ErrorMessage name="company" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="type" className="form-label">Type *</label>
                                            <Field
                                                type="number"
                                                id="type"
                                                name="type"
                                                className="form-control"
                                                placeholder='Type'
                                            />
                                            <ErrorMessage name="type" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="initiator" className="form-label">Initiator Email *</label>
                                            <Field
                                                type="email"
                                                id="initiator"
                                                name="initiator"
                                                className="form-control"
                                                placeholder='Initiator Email'
                                            />
                                            <ErrorMessage name="initiator" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="users" className="form-label">Users *</label>
                                            <FieldArray name="users">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.users.map((_, index) => (
                                                            <div key={index} className="d-flex mb-2">
                                                                <Field
                                                                    type="email"
                                                                    name={`users[${index}]`}
                                                                    placeholder="Enter email"
                                                                    className="form-control me-2"
                                                                />
                                                                {form.values.users.length > 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="danger"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        ))}

                                                    </>
                                                )}
                                            </FieldArray>
                                            <ErrorMessage name="users" component="div" className="text-danger" />
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
                                        disabled={isSubmitting || isLoading}
                                    >
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    <Button
                                        type="reset"
                                        variant="danger"
                                        className="ms-2"
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
        </div>
    );
};

export default CreateSingleProject;
