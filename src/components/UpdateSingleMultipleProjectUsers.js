
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import './BodyApi.css';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Api_base_url from './Api_base_url/Api_base_url';

const validationSchema = Yup.object({
  projectId: Yup.string().required('Project ID is required'),
  hierarchy: Yup.string().required('Hierarchy is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const initialValues = {
  projectId: '',
  hierarchy: '',
  email: '',
};

const UpdateSingleMultipleProjectUsers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');
    if (!token || !userId) {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]); // State to store projects

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${Api_base_url}/api/project/getprojects`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwttoken')}`,
            'userId': localStorage.getItem('id'),
          },
        });
        console.log("Fetched Projects Data:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Error details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load projects. Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const showSuccessPopup = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
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

    // Check if projects array is empty at the time of submission
    if (projects.length === 0) {
      showErrorPopup('Project data is missing. Please try again later.');
      setSubmitting(false);
      setIsLoading(false);
      return;
    }

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
        `${Api_base_url}/api/project/update-singleproject-hierarchy`,
        [values],
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'userId': userId,
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
        <h6>Update Single Multiple Project Users</h6>
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
                  <div className='card-1'>
                    <div className="form-group mb-3 col-md-4 mt-37">
                      <label htmlFor="projectId" className="form-label">Project ID *</label>
                      <Field as="select" id="projectId" name="projectId" className="form-control">
                        <option value="" label="Select project" />
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="projectId" component="div" className="text-danger" />
                    </div>

                    <div className="form-group mb-3 col-md-4 mt-37">
                      <label htmlFor="hierarchy" className="form-label">Hierarchy *</label>
                      <Field
                        type="text"
                        id="hierarchy"
                        name="hierarchy"
                        className="form-control"
                        placeholder='Hierarchy'
                      />
                      <ErrorMessage name="hierarchy" component="div" className="text-danger" />
                    </div>

                    <div className="form-group mb-3 col-md-4 mt-37">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder='Email'
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
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
    </div>
  );
};

export default UpdateSingleMultipleProjectUsers;
