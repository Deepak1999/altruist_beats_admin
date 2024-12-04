
// // // import React, { useState, useEffect } from 'react';
// // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // import { Button, Card } from 'react-bootstrap';
// // // import * as Yup from 'yup';
// // // import axios from 'axios';
// // // import './BodyApi.css';
// // // import Loader from './Loader';
// // // import Swal from 'sweetalert2';

// // // const validationSchema = Yup.object({
// // //     projectId: Yup.string().required('Project ID is required'),
// // //     user: Yup.string().required('User is required'),
// // // });

// // // const initialValues = {
// // //     projectId: '',
// // //     user: '',
// // // };

// // // const AddSingleMultipleProjectUsers = () => {
// // //     const [isLoading, setIsLoading] = useState(false);
// // //     const [projects, setProjects] = useState([]);

// // //     const showSuccessPopup = () => {
// // //         Swal.fire({
// // //             icon: 'success',
// // //             title: 'Success',
// // //             text: 'Data saved successfully!',
// // //             showConfirmButton: false,
// // //             timer: 1000,
// // //         });
// // //     };

// // //     const showErrorPopup = (message = 'Something went wrong!') => {
// // //         Swal.fire({
// // //             icon: 'error',
// // //             title: 'Oops...',
// // //             text: message,
// // //             showConfirmButton: false,
// // //             timer: 1000,
// // //         });
// // //     };

// // //     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
// // //         setIsLoading(true);
// // //         console.log('Submitting values:', values);

// // //         const token = localStorage.getItem('jwttoken');
// // //         const userId = localStorage.getItem('id');

// // //         if (!token || !userId) {
// // //             showErrorPopup('Unauthorized: Please log in first.');
// // //             setSubmitting(false);
// // //             setIsLoading(false);
// // //             return;
// // //         }

// // //         try {
// // //             const response = await axios.post(
// // //                 'http://192.168.167.5:8560/api/project-users/add-singleproject-users',
// // //                 [{ values }],
// // //                 {
// // //                     headers: {
// // //                         'Content-Type': 'application/json',
// // //                         'Authorization': `Bearer ${token}`,
// // //                         'userId': userId,
// // //                     },
// // //                 }
// // //             );

// // //             if (response.status === 200) {
// // //                 if (response.data.noChange) {
// // //                     showErrorPopup('No changes made: The hierarchy is the same as the existing one.');
// // //                 } else {
// // //                     showSuccessPopup();
// // //                     resetForm();
// // //                 }
// // //             }
// // //         } catch (error) {
// // //             if (error.response) {
// // //                 const status = error.response.status;
// // //                 switch (status) {
// // //                     case 400:
// // //                         showErrorPopup('Bad Request: Please check the input data.');
// // //                         break;
// // //                     case 401:
// // //                         showErrorPopup('Unauthorized: Please log in to proceed.');
// // //                         break;
// // //                     case 404:
// // //                         showErrorPopup('Not Found: The requested resource could not be found.');
// // //                         break;
// // //                     case 500:
// // //                         showErrorPopup('Server Error: Please try again later.');
// // //                         break;
// // //                     default:
// // //                         showErrorPopup(`Error: ${error.response.data.message || 'Failed to save data'}`);
// // //                 }
// // //             } else if (error.request) {
// // //                 showErrorPopup('Error: No response from server. Please check your connection or try again later.');
// // //             } else {
// // //                 showErrorPopup(`Error: ${error.message}`);
// // //             }
// // //         } finally {
// // //             setSubmitting(false);
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     const fetchProjects = async () => {
// // //         setIsLoading(true);
// // //         try {
// // //             const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects');
// // //             setProjects(response.data); // Assuming the response data contains an array of projects
// // //             setIsLoading(false);
// // //         } catch (error) {
// // //             showErrorPopup('Error fetching project list');
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchProjects(); // Fetch the project list on component mount
// // //     }, []);

// // //     return (
// // //         <div className="container mt-4">
// // //             {isLoading && <Loader loading={isLoading} />}
// // //             <div className="label" style={{ marginTop: '177px' }}>
// // //                 <h6>Add Single/Multiple Project Users</h6>
// // //             </div>
// // //             <Card className="p-3">
// // //                 <Card.Body>
// // //                     <Formik
// // //                         initialValues={initialValues}
// // //                         validationSchema={validationSchema}
// // //                         onSubmit={handleSubmit}
// // //                     >
// // //                         {({ isSubmitting, setFieldValue }) => (
// // //                             <Form>
// // //                                 <div className="row">
// // //                                     <div className="form-group mb-3 card-1">
// // //                                         <div className="col-md-4 mt-37">
// // //                                             <label htmlFor="projectId" className="form-label">Project *</label>
// // //                                             <Field
// // //                                                 as="select"
// // //                                                 id="projectId"
// // //                                                 name="projectId"
// // //                                                 className="form-control"
// // //                                                 onChange={(e) => {
// // //                                                     const selectedProjectId = e.target.value;
// // //                                                     setFieldValue('projectId', selectedProjectId);
// // //                                                 }}
// // //                                             >
// // //                                                 <option value="">Select Project</option>
// // //                                                 {projects.map((project) => (
// // //                                                     <option key={project.id} value={project.id}>
// // //                                                         {project.name}
// // //                                                     </option>
// // //                                                 ))}
// // //                                             </Field>
// // //                                             <ErrorMessage name="projectId" component="div" className="text-danger" />
// // //                                         </div>
// // //                                         <div className="col-md-4 mt-37">
// // //                                             <label htmlFor="user" className="form-label">User *</label>
// // //                                             <Field
// // //                                                 type="text"
// // //                                                 id="user"
// // //                                                 name="user"
// // //                                                 className="form-control"
// // //                                                 placeholder='User Name'
// // //                                             />
// // //                                             <ErrorMessage name="user" component="div" className="text-danger" />
// // //                                         </div>
// // //                                     </div>
// // //                                 </div>

// // //                                 <div style={{
// // //                                     display: "flex",
// // //                                     justifyContent: 'center',
// // //                                     alignItems: 'center'
// // //                                 }}>
// // //                                     <Button
// // //                                         type="submit"
// // //                                         variant="primary"
// // //                                         className="me-2"
// // //                                         disabled={isSubmitting || isLoading}
// // //                                     >
// // //                                         {isLoading ? 'Submitting...' : 'Submit'}
// // //                                     </Button>
// // //                                     <Button
// // //                                         type="reset"
// // //                                         variant="danger"
// // //                                         disabled={isSubmitting || isLoading}
// // //                                     >
// // //                                         Reset
// // //                                     </Button>
// // //                                 </div>
// // //                             </Form>
// // //                         )}
// // //                     </Formik>
// // //                 </Card.Body>
// // //             </Card>
// // //         </div>
// // //     );
// // // };

// // // export default AddSingleMultipleProjectUsers;
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import { Button, Card } from 'react-bootstrap';
// // import * as Yup from 'yup';
// // import axios from 'axios';
// // import './BodyApi.css';
// // import Loader from './Loader';
// // import Swal from 'sweetalert2';

// // const validationSchema = Yup.object({
// //     projectId: Yup.string().required('Project ID is required'),
// //     user: Yup.string().required('User is required'),
// // });

// // const initialValues = {
// //     projectId: '',
// //     user: '',
// // };

// // const AddSingleMultipleProjectUsers = () => {
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [projects, setProjects] = useState([]);

// //     const showSuccessPopup = () => {
// //         Swal.fire({
// //             icon: 'success',
// //             title: 'Success',
// //             text: 'Data saved successfully!',
// //             showConfirmButton: false,
// //             timer: 1000,
// //         });
// //     };

// //     const showErrorPopup = (message = 'Something went wrong!') => {
// //         Swal.fire({
// //             icon: 'error',
// //             title: 'Oops...',
// //             text: message,
// //             showConfirmButton: false,
// //             timer: 1000,
// //         });
// //     };

// //     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
// //         setIsLoading(true);
// //         console.log('Submitting values:', values);

// //         const token = localStorage.getItem('jwttoken');
// //         const userId = localStorage.getItem('id');

// //         if (!token || !userId) {
// //             showErrorPopup('Unauthorized: Please log in first.');
// //             setSubmitting(false);
// //             setIsLoading(false);
// //             return;
// //         }

// //         try {
// //             const response = await axios.post(
// //                 'http://192.168.167.5:8560/api/project-users/add-singleproject-users',
// //                 [{ values }],
// //                 {
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         'Authorization': `Bearer ${token}`,
// //                         'userId': userId,
// //                     },
// //                 }
// //             );

// //             if (response.status === 200) {
// //                 if (response.data.noChange) {
// //                     showErrorPopup('No changes made: The hierarchy is the same as the existing one.');
// //                 } else {
// //                     showSuccessPopup();
// //                     resetForm();
// //                 }
// //             }
// //         } catch (error) {
// //             if (error.response) {
// //                 const status = error.response.status;
// //                 switch (status) {
// //                     case 400:
// //                         showErrorPopup('Bad Request: Please check the input data.');
// //                         break;
// //                     case 401:
// //                         showErrorPopup('Unauthorized: Please log in to proceed.');
// //                         break;
// //                     case 404:
// //                         showErrorPopup('Not Found: The requested resource could not be found.');
// //                         break;
// //                     case 500:
// //                         showErrorPopup('Server Error: Please try again later.');
// //                         break;
// //                     default:
// //                         showErrorPopup(`Error: ${error.response.data.message || 'Failed to save data'}`);
// //                 }
// //             } else if (error.request) {
// //                 showErrorPopup('Error: No response from server. Please check your connection or try again later.');
// //             } else {
// //                 showErrorPopup(`Error: ${error.message}`);
// //             }
// //         } finally {
// //             setSubmitting(false);
// //             setIsLoading(false);
// //         }
// //     };

// //     const fetchProjects = useCallback(async () => {
// //         setIsLoading(true);
// //         try {
// //             const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects');
// //             setProjects(response.data); // Assuming the response data contains an array of projects
// //         } catch (error) {
// //             showErrorPopup('Error fetching project list');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         fetchProjects(); // Fetch the project list on component mount
// //     }, [fetchProjects]);

// //     return (
// //         <div className="container mt-4">
// //             {isLoading && <Loader loading={isLoading} />}
// //             <div className="label" style={{ marginTop: '177px' }}>
// //                 <h6>Add Single/Multiple Project Users</h6>
// //             </div>
// //             <Card className="p-3">
// //                 <Card.Body>
// //                     <Formik
// //                         initialValues={initialValues}
// //                         validationSchema={validationSchema}
// //                         onSubmit={handleSubmit}
// //                     >
// //                         {({ isSubmitting, setFieldValue }) => (
// //                             <Form>
// //                                 <div className="row">
// //                                     <div className="form-group mb-3 card-1">
// //                                         <div className="col-md-4 mt-37">
// //                                             <label htmlFor="projectId" className="form-label">Project *</label>
// //                                             <Field
// //                                                 as="select"
// //                                                 id="projectId"
// //                                                 name="projectId"
// //                                                 className="form-control"
// //                                                 onChange={(e) => {
// //                                                     const selectedProjectId = e.target.value;
// //                                                     setFieldValue('projectId', selectedProjectId);
// //                                                 }}
// //                                             >
// //                                                 <option value="">Select Project</option>
// //                                                 {projects.map((project) => (
// //                                                     <option key={project.id} value={project.id}>
// //                                                         {project.name}
// //                                                     </option>
// //                                                 ))}
// //                                             </Field>
// //                                             <ErrorMessage name="projectId" component="div" className="text-danger" />
// //                                         </div>
// //                                         <div className="col-md-4 mt-37">
// //                                             <label htmlFor="user" className="form-label">User *</label>
// //                                             <Field
// //                                                 type="text"
// //                                                 id="user"
// //                                                 name="user"
// //                                                 className="form-control"
// //                                                 placeholder='User Name'
// //                                             />
// //                                             <ErrorMessage name="user" component="div" className="text-danger" />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div style={{
// //                                     display: "flex",
// //                                     justifyContent: 'center',
// //                                     alignItems: 'center'
// //                                 }}>
// //                                     <Button
// //                                         type="submit"
// //                                         variant="primary"
// //                                         className="me-2"
// //                                         disabled={isSubmitting || isLoading}
// //                                     >
// //                                         {isLoading ? 'Submitting...' : 'Submit'}
// //                                     </Button>
// //                                     <Button
// //                                         type="reset"
// //                                         variant="danger"
// //                                         disabled={isSubmitting || isLoading}
// //                                     >
// //                                         Reset
// //                                     </Button>
// //                                 </div>
// //                             </Form>
// //                         )}
// //                     </Formik>
// //                 </Card.Body>
// //             </Card>
// //         </div>
// //     );
// // };

// // export default AddSingleMultipleProjectUsers;

// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Button, Card } from 'react-bootstrap';
// import * as Yup from 'yup';
// import axios from 'axios';
// import './BodyApi.css';
// import Loader from './Loader';
// import Swal from 'sweetalert2';

// const validationSchema = Yup.object({
//     projectId: Yup.string().required('Project ID is required'),
//     user: Yup.string().required('User is required'),
// });

// const initialValues = {
//     projectId: '',
//     user: '',
// };

// const AddSingleMultipleProjectUsers = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [projects, setProjects] = useState([]);

//     const showSuccessPopup = () => {
//         Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: 'Data saved successfully!',
//             showConfirmButton: false,
//             timer: 1000,
//         });
//     };

//     const showErrorPopup = (message = 'Something went wrong!') => {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: message,
//             showConfirmButton: false,
//             timer: 1000,
//         });
//     };

//     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//         setIsLoading(true);
//         console.log('Submitting values:', values);

//         const token = localStorage.getItem('jwttoken');
//         const userId = localStorage.getItem('id');

//         if (!token || !userId) {
//             showErrorPopup('Unauthorized: Please log in first.');
//             setSubmitting(false);
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://192.168.167.5:8560/api/project-users/add-singleproject-users',
//                 [{ values }],
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                         'userId': userId,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 if (response.data.noChange) {
//                     showErrorPopup('No changes made: The hierarchy is the same as the existing one.');
//                 } else {
//                     showSuccessPopup();
//                     resetForm();
//                 }
//             }
//         } catch (error) {
//             if (error.response) {
//                 const status = error.response.status;
//                 switch (status) {
//                     case 400:
//                         showErrorPopup('Bad Request: Please check the input data.');
//                         break;
//                     case 401:
//                         showErrorPopup('Unauthorized: Please log in to proceed.');
//                         break;
//                     case 404:
//                         showErrorPopup('Not Found: The requested resource could not be found.');
//                         break;
//                     case 500:
//                         showErrorPopup('Server Error: Please try again later.');
//                         break;
//                     default:
//                         showErrorPopup(`Error: ${error.response.data.message || 'Failed to save data'}`);
//                 }
//             } else if (error.request) {
//                 showErrorPopup('Error: No response from server. Please check your connection or try again later.');
//             } else {
//                 showErrorPopup(`Error: ${error.message}`);
//             }
//         } finally {
//             setSubmitting(false);
//             setIsLoading(false);
//         }
//     };

//     const fetchProjects = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects');
//             setProjects(response.data); // Assuming the response data contains an array of projects
//             setIsLoading(false);
//         } catch (error) {
//             showErrorPopup('Error fetching project list');
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjects(); // Fetch the project list on component mount
//     }, []);

//     return (
//         <div className="container mt-4">
//             {isLoading && <Loader loading={isLoading} />}
//             <div className="label" style={{ marginTop: '177px' }}>
//                 <h6>Add Single/Multiple Project Users</h6>
//             </div>
//             <Card className="p-3">
//                 <Card.Body>
//                     <Formik
//                         initialValues={initialValues}
//                         validationSchema={validationSchema}
//                         onSubmit={handleSubmit}
//                     >
//                         {({ isSubmitting, setFieldValue }) => (
//                             <Form>
//                                 <div className="row">
//                                     <div className="form-group mb-3 card-1">
//                                         <div className="col-md-4 mt-37">
//                                             <label htmlFor="projectId" className="form-label">Project *</label>
//                                             <Field
//                                                 as="select"
//                                                 id="projectId"
//                                                 name="projectId"
//                                                 className="form-control"
//                                                 onChange={(e) => {
//                                                     const selectedProjectId = e.target.value;
//                                                     setFieldValue('projectId', selectedProjectId);
//                                                 }}
//                                             >
//                                                 <option value="">Select Project</option>
//                                                 {projects.map((project) => (
//                                                     <option key={project.id} value={project.id}>
//                                                         {project.name}
//                                                     </option>
//                                                 ))}
//                                             </Field>
//                                             <ErrorMessage name="projectId" component="div" className="text-danger" />
//                                         </div>
//                                         <div className="col-md-4 mt-37">
//                                             <label htmlFor="user" className="form-label">User *</label>
//                                             <Field
//                                                 type="text"
//                                                 id="user"
//                                                 name="user"
//                                                 className="form-control"
//                                                 placeholder='User Name'
//                                             />
//                                             <ErrorMessage name="user" component="div" className="text-danger" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div style={{
//                                     display: "flex",
//                                     justifyContent: 'center',
//                                     alignItems: 'center'
//                                 }}>
//                                     <Button
//                                         type="submit"
//                                         variant="primary"
//                                         className="me-2"
//                                         disabled={isSubmitting || isLoading}
//                                     >
//                                         {isLoading ? 'Submitting...' : 'Submit'}
//                                     </Button>
//                                     <Button
//                                         type="reset"
//                                         variant="danger"
//                                         disabled={isSubmitting || isLoading}
//                                     >
//                                         Reset
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

// export default AddSingleMultipleProjectUsers;
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import './BodyApi.css';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    projectId: Yup.string().required('Project ID is required'),
    user: Yup.string().required('User is required'),
});

const initialValues = {
    projectId: '',
    user: '',
};

const AddSingleMultipleProjectUsers = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');
        if (!token || !userId) {

            navigate('/'); // Redirect to login if no token is found
        }
    }, [navigate]);


    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);

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
                'http://192.168.167.5:8560/api/project-users/add-singleproject-users',
                [{ values }],
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
                    showSuccessPopup();
                    resetForm();
                }
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 400:
                        showErrorPopup('Bad Request: Please check the input data.');
                        break;
                    case 401:
                        showErrorPopup('Unauthorized: Please log in to proceed.');
                        break;
                    case 404:
                        showErrorPopup('Not Found: The requested resource could not be found.');
                        break;
                    case 500:
                        showErrorPopup('Server Error: Please try again later.');
                        break;
                    default:
                        showErrorPopup(`Error: ${error.response.data.message || 'Failed to save data'}`);
                }
            } else if (error.request) {
                showErrorPopup('Error: No response from server. Please check your connection or try again later.');
            } else {
                showErrorPopup(`Error: ${error.message}`);
            }
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    const fetchProjects = async () => {
        // setIsLoading(true);
        try {
            const token = localStorage.getItem('jwttoken');
            const userId = localStorage.getItem('id');

            const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                },
            });
            setProjects(response.data); // Assuming the response data contains an array of projects
        } catch (error) {
            console.error('Error fetching project list:', error);
            showErrorPopup('Error fetching project list');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects(); // Fetch the project list on component mount
    }, []);

    return (
        <div className="container mt-4">
            {isLoading && <Loader loading={isLoading} />}
            <div className="label" style={{ marginTop: '177px' }}>
                <h6>Add Single/Multiple Project Users</h6>
            </div>
            <Card className="p-3">
                <Card.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="row">
                                    <div className="form-group mb-3 card-1">
                                        <div className="col-md-4 mt-37">
                                            <label htmlFor="projectId" className="form-label">Project *</label>
                                            <Field
                                                as="select"
                                                id="projectId"
                                                name="projectId"
                                                className="form-control"
                                                onChange={(e) => {
                                                    const selectedProjectId = e.target.value;
                                                    setFieldValue('projectId', selectedProjectId);
                                                }}
                                            >
                                                <option value="">Select Project</option>
                                                {projects.map((project) => (
                                                    <option key={project.id} value={project.id}>
                                                        {project.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="projectId" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-4 mt-37">
                                            <label htmlFor="user" className="form-label">User *</label>
                                            <Field
                                                type="text"
                                                id="user"
                                                name="user"
                                                className="form-control"
                                                placeholder='User Name'
                                            />
                                            <ErrorMessage name="user" component="div" className="text-danger" />
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

export default AddSingleMultipleProjectUsers;
