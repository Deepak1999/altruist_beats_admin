
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import { Button, Spinner, Alert, Card } from 'react-bootstrap';
// // import Swal from 'sweetalert2';
// // import './BodyApi.css';
// // import Loader from './Loader';

// // const ViewProjectHierarchies = () => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const validationSchema = Yup.object({
// //     projectName: Yup.string().required('Project Name is required'),
// //     pageNo: Yup.number().required('Page Number is required').min(1, 'Page must be greater than 0'),
// //   });

// //   const showSuccessPopup = () => {
// //     Swal.fire({
// //       icon: 'success',
// //       title: 'Success',
// //       text: 'Data fetched successfully!',
// //       showConfirmButton: false,
// //       timer: 1000,
// //     });
// //   };

// //   const showErrorPopup = (message = 'Something went wrong!') => {
// //     Swal.fire({
// //       icon: 'error',
// //       title: 'Oops...',
// //       text: message,
// //       showConfirmButton: false,
// //       timer: 1000,
// //     });
// //   };
// //   const fetchData = async (values, { resetForm }) => {
// //     setLoading(true);
// //     setError(null);

// //     const token = localStorage.getItem('jwttoken');
// //     const userId = localStorage.getItem('id');

// //     try {
// //       const response = await axios.get('http://192.168.167.5:8560/api/project/view-projects-hierarchy', {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //           'Authorization': `Bearer ${token}`,
// //           'userId': userId,
// //         },
// //         params: {
// //           name: values.projectName,
// //           page: values.pageNo,
// //         },
// //       });

// //       if (response.status === 200) {
// //         if (response.data && response.data.length === 0) {
// //           showErrorPopup('Error: This project does not exist.');
// //         } else {
// //           setData(response.data);
// //           showSuccessPopup();
// //           resetForm();
// //         }
// //       } else {
// //         handleResponseErrors(response.status);
// //       }
// //     } catch (error) {
// //       handleErrors(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // const fetchData = async (values, { resetForm }) => {
// //   //   setLoading(true);
// //   //   setError(null);
// //   //   try {

// //   //     const response = await axios.get('http://192.168.167.5:8560/api/project/view-projects-hierarchy', {
// //   //        headers: {
// //   //         'Content-Type': 'multipart/form-data',
// //   //         'Authorization': `Bearer ${token}`,  // Include token in Authorization header
// //   //         'userId': userId, // Include userId in headers
// //   //       }
// //   //       params: {
// //   //         name: values.projectName,
// //   //         page: values.pageNo,
// //   //       },
// //   //     });

// //   //     if (response.status === 200) {
// //   //       if (response.data && response.data.length === 0) {
// //   //         showErrorPopup('Error: This project does not exist.');
// //   //       } else {
// //   //         setData(response.data);
// //   //         showSuccessPopup();
// //   //         resetForm();
// //   //       }
// //   //     } else {
// //   //       switch (response.status) {
// //   //         case 400:
// //   //           showErrorPopup('Bad Request: Please check the input data.');
// //   //           break;
// //   //         case 401:
// //   //           showErrorPopup('Unauthorized: Please log in to proceed.');
// //   //           break;
// //   //         case 404:
// //   //           showErrorPopup('Not Found: The requested resource could not be found.');
// //   //           break;
// //   //         case 500:
// //   //           showErrorPopup('Server Error: Please try again later.');
// //   //           break;
// //   //         default:
// //   //           showErrorPopup('Unexpected error occurred. Please try again.');
// //   //       }
// //   //     }
// //   //   } catch (error) {
// //   //     if (error.response) {
// //   //       const status = error.response.status;
// //   //       switch (status) {
// //   //         case 400:
// //   //           showErrorPopup('Bad Request: Please check the input data.');
// //   //           break;
// //   //         case 401:
// //   //           showErrorPopup('Unauthorized: Please log in to proceed.');
// //   //           break;
// //   //         case 404:
// //   //           showErrorPopup('Not Found: The requested resource could not be found.');
// //   //           break;
// //   //         case 500:
// //   //           showErrorPopup('Server Error: Please try again later.');
// //   //           break;
// //   //         default:
// //   //           showErrorPopup(`Error: ${error.response.data.message || 'Failed to save data'}`);
// //   //       }
// //   //     } else if (error.request) {
// //   //       showErrorPopup('Error: No response from server. Please check your connection or try again later.');
// //   //     } else {
// //   //       showErrorPopup(`Error: ${error.message}`);
// //   //     }
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   return (
// //     <div className="container mt-4">
// //       {loading && <Loader loading={loading} />}

// //       <div className="label" style={{ marginTop: '179px' }}>
// //         <h6>View Project Hierarchies</h6>
// //       </div>

// //       <Card className="p-3 card-1-v">
// //         <Card.Body>
// //           <Formik
// //             initialValues={{ projectName: '', pageNo: '' }}
// //             validationSchema={validationSchema}
// //             onSubmit={fetchData}
// //           >
// //             {({ isSubmitting, resetForm }) => (
// //               <Form>
// //                 <div className="row">
// //                   <div className='card-1'>

// //                     <div className="col-md-4 mb-4">
// //                       <label htmlFor="rojectName" style={{
// //                         fontWeight: "bold",
// //                         fontSize: "0.9rem",
// //                         marginBottom: "-26px",
// //                         color: "#4b6584",
// //                         paddingBottom: "-15px",
// //                         position: "absolute",
// //                         marginLeft: "10px",
// //                         marginTop: " 61px !important",
// //                         width: " fit-content",
// //                         backgroundColor: "white",
// //                       }}>Project Name*</label>
// //                       <Field
// //                         style={{ marginTop: '15px' }}
// //                         type="text"
// //                         id="projectName"
// //                         name="projectName"
// //                         className="form-control"
// //                         placeholder="Enter project name"
// //                       />
// //                       <ErrorMessage name="projectName" component="div" className="text-danger" />
// //                     </div>

// //                     <div className="col-md-4 mb-4">
// //                       <label htmlFor="pageNo" style={{
// //                         fontWeight: "bold",
// //                         fontSize: "0.9rem",
// //                         marginBottom: "-26px",
// //                         color: "#4b6584",
// //                         paddingBottom: "-15px",
// //                         position: "absolute",
// //                         marginLeft: "2px !important",
// //                         marginTop: " 61px !important",
// //                         width: " fit-content",
// //                         backgroundColor: "white",
// //                       }}>Page Number*</label>
// //                       <Field
// //                         style={{
// //                           marginTop: '15px',
// //                           margineft: '-481px'
// //                         }}
// //                         type="number"
// //                         id="pageNo"
// //                         name="pageNo"
// //                         className="form-control"
// //                         placeholder="Enter page number"
// //                       />
// //                       <ErrorMessage name="pageNo" component="div" className="text-danger" />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div style={{
// //                   display: "flex",
// //                   justifyContent: 'center',
// //                   alignItems: 'center'
// //                 }}>
// //                   <Button
// //                     type="submit"
// //                     variant="primary"
// //                     className="me-2"
// //                     disabled={isSubmitting || loading}
// //                   >
// //                     {loading ? (
// //                       <Spinner as="span" animation="border" size="sm" />
// //                     ) : (
// //                       'Submit'
// //                     )}
// //                   </Button>

// //                   <Button
// //                     type="reset"
// //                     variant="danger"
// //                     onClick={() => {
// //                       resetForm();
// //                       setData(null);
// //                       setError(null);
// //                     }}
// //                     disabled={isSubmitting || loading}
// //                   >
// //                     Reset
// //                   </Button>

// //                 </div>
// //               </Form>
// //             )}
// //           </Formik>

// //         </Card.Body>

// //         <div className="mt-4">
// //           {error && <Alert variant="danger">Error: {error.message}</Alert>}
// //           {data ? (
// //             <Card className="mt-3 card-v">
// //               <div className="label-2">
// //                 <h6>Response</h6>
// //               </div>
// //               <Card.Body>
// //                 <table>
// //                   <thead>
// //                     <tr>
// //                       {Object.keys(data[0])
// //                         .filter((key) => key !== 'userid' && key !== 'company' && key !== 'projectid')
// //                         .map((key) => {
// //                           const displayKey = key === 'projectcompany' ? 'Company' : key === 'projectname' ? 'Project Name' : key === 'hierarchy' ? 'Hierarchy' : key === 'username' ? 'Name' : key === 'useremail' ? 'User E-mail' : key;
// //                           return <th key={key}>{displayKey}</th>;
// //                         })}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {data.map((item, index) => (
// //                       <tr key={index}>
// //                         {Object.entries(item)
// //                           .filter(([key]) => key !== 'userid' && key !== 'company' && key !== 'projectid')
// //                           .map(([key, value], i) => {
// //                             const displayKey = key === 'projectcompany' ? 'Company' : key === 'projectname' ? 'Project Name' : key === 'hierarchy' ? 'Hierarchy' : key === 'username' ? 'Name' : key === 'useremail' ? 'User E-mail' : key;
// //                             return <td key={i}>{value}</td>;
// //                           })}
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </Card.Body>

// //             </Card>
// //           ) : (
// //             <p> </p>
// //           )}
// //         </div>
// //       </Card >
// //     </div >
// //   );
// // };

// // export default ViewProjectHierarchies;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Button, Spinner, Alert, Card } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import './BodyApi.css';
// import Loader from './Loader';

// const ViewProjectHierarchies = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [projects, setProjects] = useState([]); // State for project names

//   useEffect(() => {
//     // Fetch project names when component mounts
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects');
//         if (response.status === 200) {
//           setProjects(response.data); // Assuming response.data is an array of project names
//         }
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const validationSchema = Yup.object({
//     projectName: Yup.string().required('Project Name is required'),
//     pageNo: Yup.number().required('Page Number is required').min(1, 'Page must be greater than 0'),
//   });

//   const showSuccessPopup = () => {
//     Swal.fire({
//       icon: 'success',
//       title: 'Success',
//       text: 'Data fetched successfully!',
//       showConfirmButton: false,
//       timer: 1000,
//     });
//   };

//   const showErrorPopup = (message = 'Something went wrong!') => {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: message,
//       showConfirmButton: false,
//       timer: 1000,
//     });
//   };
//   const handleResponseErrors = (status) => {
//     switch (status) {
//       case 400:
//         showErrorPopup('Bad Request');
//         break;
//       case 401:
//         showErrorPopup('Unauthorized');
//         break;
//       case 403:
//         showErrorPopup('Forbidden');
//         break;
//       case 404:
//         showErrorPopup('Project not found');
//         break;
//       case 500:
//         showErrorPopup('Server error');
//         break;
//       default:
//         showErrorPopup('Unexpected error');
//     }
//   };

//   const handleErrors = (error) => {
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       handleResponseErrors(error.response.status);
//     } else if (error.request) {
//       // Request was made but no response received
//       showErrorPopup('No response from server');
//     } else {
//       // Something happened in setting up the request
//       showErrorPopup(error.message);
//     }
//   };

//   const fetchData = async (values, { resetForm }) => {
//     setLoading(true);
//     setError(null);

//     const token = localStorage.getItem('jwttoken');
//     const userId = localStorage.getItem('id');

//     try {
//       const response = await axios.get('http://192.168.167.5:8560/api/project/view-projects-hierarchy', {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`,
//           'userId': userId,
//         },
//         params: {
//           name: values.projectName,
//           page: values.pageNo,
//         },
//       });

//       if (response.status === 200) {
//         if (response.data && response.data.length === 0) {
//           showErrorPopup('Error: This project does not exist.');
//         } else {
//           setData(response.data);
//           showSuccessPopup();
//           resetForm();
//         }
//       } else {
//         handleResponseErrors(response.status);
//       }
//     } catch (error) {
//       handleErrors(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {loading && <Loader loading={loading} />}

//       <div className="label" style={{ marginTop: '177px' }}>
//         <h6>View Project Hierarchies</h6>
//       </div>

//       <Card className="p-3 card-1-v">
//         <Card.Body>
//           <Formik
//             initialValues={{ projectName: '', pageNo: '' }}
//             validationSchema={validationSchema}
//             onSubmit={fetchData}
//           >
//             {({ isSubmitting, resetForm }) => (
//               <Form>
//                 <div className="row">
//                   <div className='card-1'>
//                     <div className="col-md-4 mb-4">
//                       <label htmlFor="projectName" style={{
//                         fontWeight: "bold",
//                         fontSize: "0.9rem",
//                         marginBottom: "-26px",
//                         color: "#4b6584",
//                         paddingBottom: "-15px",
//                         position: "absolute",
//                         marginLeft: "10px",
//                         marginTop: " 61px !important",
//                         width: " fit-content",
//                         backgroundColor: "white",
//                       }}>Project Name*</label>
//                       <Field as="select" id="projectName" name="projectName" className="form-control" style={{ marginTop: '15px' }}>
//                         <option value="">Select a project</option>
//                         {projects.map((project, index) => (
//                           <option key={index} value={project.name}>{project.name}</option> // Adjust this based on your data structure
//                         ))}
//                       </Field>
//                       <ErrorMessage name="projectName" component="div" className="text-danger" />
//                     </div>

//                     <div className="col-md-4 mb-4">
//                       <label htmlFor="pageNo" style={{
//                         fontWeight: "bold",
//                         fontSize: "0.9rem",
//                         marginBottom: "-26px",
//                         color: "#4b6584",
//                         paddingBottom: "-15px",
//                         position: "absolute",
//                         marginLeft: "2px !important",
//                         marginTop: " 61px !important",
//                         width: " fit-content",
//                         backgroundColor: "white",
//                       }}>Page Number*</label>
//                       <Field
//                         style={{ marginTop: '15px' }}
//                         type="number"
//                         id="pageNo"
//                         name="pageNo"
//                         className="form-control"
//                         placeholder="Enter page number"
//                       />
//                       <ErrorMessage name="pageNo" component="div" className="text-danger" />
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{
//                   display: "flex",
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}>
//                   <Button
//                     type="submit"
//                     variant="primary"
//                     className="me-2"
//                     disabled={isSubmitting || loading}
//                   >
//                     {loading ? (
//                       <Spinner as="span" animation="border" size="sm" />
//                     ) : (
//                       'Submit'
//                     )}
//                   </Button>

//                   <Button
//                     type="reset"
//                     variant="danger"
//                     onClick={() => {
//                       resetForm();
//                       setData(null);
//                       setError(null);
//                     }}
//                     disabled={isSubmitting || loading}
//                   >
//                     Reset
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </Card.Body>

//         <div className="mt-4">
//           {error && <Alert variant="danger">Error: {error.message}</Alert>}
//           {data ? (
//             <Card className="mt-3 card-v">
//               <div className="label-2">
//                 <h6>Response</h6>
//               </div>
//               <Card.Body>
//                 <table>
//                   <thead>
//                     <tr>
//                       {Object.keys(data[0])
//                         .filter((key) => key !== 'userid' && key !== 'company' && key !== 'projectid')
//                         .map((key) => {
//                           return (
//                             <th key={key}>
//                               {key === 'projectcompany' ? 'Company'
//                                 : key === 'projectname' ? 'Project Name'
//                                   : key === 'hierarchy' ? 'Hierarchy'
//                                     : key === 'username' ? 'Name'
//                                       : key === 'useremail' ? 'User E-mail'
//                                         : key}
//                             </th>
//                           );
//                         })}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((item, index) => (
//                       <tr key={index}>
//                         {Object.entries(item)
//                           .filter(([key]) => key !== 'userid' && key !== 'company' && key !== 'projectid')
//                           .map(([key, value], i) => {
//                             const displayKey = key === 'projectcompany' ? 'Company' : key === 'projectname' ? 'Project Name' : key === 'hierarchy' ? 'Hierarchy' : key === 'username' ? 'Name' : key === 'useremail' ? 'User E-mail' : key;
//                             return <td key={i}>{value}</td>;
//                           })}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </Card.Body>
//             </Card>
//           ) : (
//             <p> </p>
//           )}
//         </div>
//       </Card >
//     </div >
//   );
// };

// export default ViewProjectHierarchies;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './BodyApi.css';
import Loader from './Loader';  
import { useNavigate } from 'react-router-dom';


const ViewProjectHierarchies = () => {

const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');
    if (!token || !userId) {

      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]); // State for project names

  useEffect(() => {
    // Fetch project names when component mounts
    const fetchProjects = async () => {
      // setLoading(true);
      try {
        const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwttoken')}`,
            'userId': localStorage.getItem('id'),
          },
        });

        if (response.status === 200) {
          setProjects(response.data); // Assuming response.data is an array of project names
        } else {
          handleResponseErrors(response.status);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        handleErrors(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    pageNo: Yup.number().required('Page Number is required').min(1, 'Page must be greater than 0'),
  });

  const showSuccessPopup = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Data fetched successfully!',
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

  const handleResponseErrors = (status) => {
    switch (status) {
      case 400:
        showErrorPopup('Bad Request');
        break;
      case 401:
        showErrorPopup('Unauthorized');
        break;
      case 403:
        showErrorPopup('Forbidden');
        break;
      case 404:
        showErrorPopup('Project not found');
        break;
      case 500:
        showErrorPopup('Server error');
        break;
      default:
        showErrorPopup('Unexpected error');
    }
  };

  const handleErrors = (error) => {
    if (error.response) {
      handleResponseErrors(error.response.status);
    } else if (error.request) {
      showErrorPopup('No response from server');
    } else {
      showErrorPopup(error.message);
    }
  };

  const fetchData = async (values, { resetForm }) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');

    try {
      const response = await axios.get('http://192.168.167.5:8560/api/project/view-projects-hierarchy', {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'userId': userId,
        },
        params: {
          name: values.projectName,
          page: values.pageNo,
        },
      });

      if (response.status === 200) {
        if (response.data && response.data.length === 0) {
          showErrorPopup('Error: This project does not exist.');
        } else {
          setData(response.data);
          showSuccessPopup();
          resetForm();
        }
      } else {
        handleResponseErrors(response.status);
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {loading && <Loader loading={loading} />}

      <div className="label" style={{ marginTop: '177px' }}>
        <h6>View Project Hierarchies</h6>
      </div>

      <Card className="p-3 card-1-v">
        <Card.Body>
          <Formik
            initialValues={{ projectName: '', pageNo: '' }}
            validationSchema={validationSchema}
            onSubmit={fetchData}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <div className="row">
                  <div className="card-1">
                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="projectName"
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          marginBottom: "-26px",
                          color: "#4b6584",
                          paddingBottom: "-15px",
                          position: "absolute",
                          marginLeft: "10px",
                          marginTop: "61px !important",
                          width: "fit-content",
                          backgroundColor: "white",
                        }}
                      >
                        Project Name*
                      </label>
                      <Field
                        as="select"
                        id="projectName"
                        name="projectName"
                        className="form-control"
                        style={{ marginTop: '15px' }}
                      >
                        <option value="">Select a project</option>
                        {projects.map((project, index) => (
                          <option key={index} value={project.name}>
                            {project.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="projectName" component="div" className="text-danger" />
                    </div>

                    <div className="col-md-4 mb-4">
                      <label
                        htmlFor="pageNo"
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          marginBottom: "-26px",
                          color: "#4b6584",
                          paddingBottom: "-15px",
                          position: "absolute",
                          marginLeft: "2px !important",
                          marginTop: "61px !important",
                          width: "fit-content",
                          backgroundColor: "white",
                        }}
                      >
                        Page Number*
                      </label>
                      <Field
                        style={{ marginTop: '15px' }}
                        type="number"
                        id="pageNo"
                        name="pageNo"
                        className="form-control"
                        placeholder="Enter page number"
                      />
                      <ErrorMessage name="pageNo" component="div" className="text-danger" />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="me-2"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : (
                      'Submit'
                    )}
                  </Button>

                  <Button
                    type="reset"
                    variant="danger"
                    onClick={() => {
                      resetForm();
                      setData(null);
                      setError(null);
                    }}
                    disabled={isSubmitting || loading}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>

        <div className="mt-4">
          {error && <Alert variant="danger">Error: {error.message}</Alert>}
          {data ? (
            <Card className="mt-3 card-v">
              <div className="label-2">
                <h6>Response</h6>
              </div>
              {/* <Card.Body>
                <table>
                  <thead>
                    <tr>
                      {Object.keys(data[0])
                        .filter((key) => key !== 'userid' && key !== 'company' && key !== 'projectid')
                        .map((key) => {
                          return (
                            <th key={key}>
                              {key === 'projectcompany' ? 'Company'
                                : key === 'projectname' ? 'Project Name'
                                  : key === 'hierarchy' ? 'Hierarchy'
                                    : key === 'username' ? 'Name'
                                      : key === 'useremail' ? 'User E-mail'
                                        : key}
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {Object.entries(item)
                          .filter(([key]) => key !== 'userid' && key !== 'company' && key !== 'projectid')
                          .map(([key, value], i) => (
                            <td key={i}>{value}</td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body> */}
             
              <Card.Body>
                <table>
                  <thead>
                    <tr>
                      {Object.keys(data[0])
                        .filter((key) => key !== 'userid' && key !== 'projectcompany' && key !== 'projectid' && key !== 'company')
                        .map((key) => {
                          return (
                            <th key={key}>
                              {
                                 key === 'projectname' ? 'Project Name'
                                  : key === 'hierarchy' ? 'Hierarchy'
                                    : key === 'username' ? 'Name'
                                      : key === 'useremail' ? 'User E-mail'
                                        : key}
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {Object.entries(item)
                          .filter(([key]) => key !== 'userid' && key !== 'projectcompany' && key !== 'projectid' && key !== 'company')
                          .map(([key, value], i) => (
                            <td key={i}>{value}</td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>


            </Card>
          ) : (
            <p> </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewProjectHierarchies;
