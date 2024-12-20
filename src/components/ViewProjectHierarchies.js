// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Button, Spinner, Alert, Card } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import './BodyApi.css';
// import Loader from './Loader';
// import { useNavigate } from 'react-router-dom';

// const ViewProjectHierarchies = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('jwttoken');
//     const userId = localStorage.getItem('id');
//     if (!token || !userId) {
//       navigate('/');
//     }
//   }, [navigate]);

//   // Fetch Project Names
//   useEffect(() => {
//     const fetchProjects = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('jwttoken')}`,
//             userId: localStorage.getItem('id'),
//           },
//         });

//         if (response.status === 200) {
//           setProjects(response.data);
//         } else {
//           handleResponseErrors(response.status);
//         }
//       } catch (error) {
//         handleErrors(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const validationSchema = Yup.object({
//     projectName: Yup.string().required('Project Name is required'),
//     pageNo: Yup.number()
//       .required('Page Number is required')
//       .min(1, 'Page must be greater than 0'),
//   });

//   const handleResponseErrors = (status, backendMessage) => {
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
//         showErrorPopup(backendMessage || 'Unexpected error occurred');
//     }
//   };

//   const handleErrors = (error) => {
//     if (error.response) {
//       handleResponseErrors(error.response.status);

//       const backendMessage = error.response.data?.message;
//     } else if (error.request) {
//       showErrorPopup('No response from server');
//     } else {
//       showErrorPopup(error.message);
//     }
//   };

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

//   const fetchData = async (values, { resetForm }) => {
//     setLoading(true);
//     setError(null);

//     const token = localStorage.getItem('jwttoken');
//     const userId = localStorage.getItem('id');

//     try {
//       const response = await axios.get(
//         'http://192.168.167.5:8560/api/project/view-projects-hierarchy',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             userId: userId,
//           },
//           params: {
//             name: values.projectName,
//             page: values.pageNo,
//           },
//         }
//       );

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
//       <div className="label" style={{ marginTop: '177px' }}>
//         <h6>Add New Agreement</h6>
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
//                   <div className="card-1">
//                     <div className="col-md-4 mb-4">
//                       <label htmlFor="pageNo" className="form-label">
//                       Vendor Name
//                       </label>
//                       <Field
//                         type="text"
//                         id="pageNo"
//                         name="pageNo"
//                         className="form-control"
//                         placeholder="Enter Vendor Name"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-center align-items-center">
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
//       </Card>
//     </div>
//   );
// };

// export default ViewProjectHierarchies;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './BodyApi.css';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const ViewProjectHierarchies = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');
    if (!token || !userId) {
      navigate('/');
    }
  }, [navigate]);

  // Fetch Project Names
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://192.168.167.5:8560/api/project/getprojects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwttoken')}`,
            userId: localStorage.getItem('id'),
          },
        });

        if (response.status === 200) {
          setProjects(response.data);
        } else {
          handleResponseErrors(response.status);
        }
      } catch (error) {
        handleErrors(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleResponseErrors = (status, backendMessage) => {
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
        showErrorPopup(backendMessage || 'Unexpected error occurred');
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

  const fetchData = async (values, { resetForm }) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');

    try {
      const response = await axios.get(
        'http://192.168.167.5:8560/api/project/view-projects-hierarchy',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
          params: {
            name: values.projectName,
            page: values.pageNo,
          },
        }
      );

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
    <div className="containe px-4 pb-4 mt-4">
      

      <Card className="p- card-1-v card p-0">
      <div className="label" style={{ marginTop: '-18px', position:"static", }}>
        <h6>Add New Agreement</h6>
      </div>
        <Card.Body className='pt-4'>
          <Formik
            initialValues={{
              vendorName: '',
              gstNo: '',
              panNo: '',
              bankName: '',
              accountNo: '',
              ifsc: '',
              siteId: '',
              startDate: '',
              endDate: '',
              monthlyPayment: '',
              location: '',
              state: '',
              siteAddress: '',
              incrementPercent: '',
              security: '',
              area: '',
              leasePeriod: '',
            }}
            onSubmit={fetchData}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <div className="row">
                  {/* Vendor Name */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="vendorName" className="form-label">
                      Vendor Name
                    </label>
                    <Field
                      type="text"
                      id="vendorName"
                      name="vendorName"
                      className="form-control"
                      placeholder="Enter Vendor Name"
                    />
                  </div>

                  {/* GST Number */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="gstNo" className="form-label">
                      GST Number
                    </label>
                    <Field
                      type="text"
                      id="gstNo"
                      name="gstNo"
                      className="form-control"
                      placeholder="Enter GST Number"
                    />
                  </div>

                  {/* PAN Number */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="panNo" className="form-label">
                      PAN Number
                    </label>
                    <Field
                      type="text"
                      id="panNo"
                      name="panNo"
                      className="form-control"
                      placeholder="Enter PAN Number"
                    />
                  </div>

                  {/* Bank Name */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="bankName" className="form-label">
                      Bank Name
                    </label>
                    <Field
                      type="text"
                      id="bankName"
                      name="bankName"
                      className="form-control"
                      placeholder="Enter Bank Name"
                    />
                  </div>

                  {/* Account Number */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="accountNo" className="form-label">
                      Account Number
                    </label>
                    <Field
                      type="text"
                      id="accountNo"
                      name="accountNo"
                      className="form-control"
                      placeholder="Enter Account Number"
                    />
                  </div>

                  {/* IFSC Code */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="ifsc" className="form-label">
                      IFSC Code
                    </label>
                    <Field
                      type="text"
                      id="ifsc"
                      name="ifsc"
                      className="form-control"
                      placeholder="Enter IFSC Code"
                    />
                  </div>

                  {/* Site ID */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="siteId" className="form-label">
                      Site ID
                    </label>
                    <Field
                      type="text"
                      id="siteId"
                      name="siteId"
                      className="form-control"
                      placeholder="Enter Site ID"
                    />
                  </div>

                  {/* Start Date */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="startDate" className="form-label">
                      Start Date
                    </label>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="form-control"
                    />
                  </div>

                  {/* End Date */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <Field
                      type="date"
                      id="endDate"
                      name="endDate"
                      className="form-control"
                    />
                  </div>

                  {/* Monthly Payment */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="monthlyPayment" className="form-label">
                      Monthly Payment
                    </label>
                    <Field
                      type="number"
                      id="monthlyPayment"
                      name="monthlyPayment"
                      className="form-control"
                      placeholder="Enter Monthly Payment"
                    />
                  </div>

                  {/* Location */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      placeholder="Enter Location"
                    />
                  </div>

                  {/* State */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <Field
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      placeholder="Enter State"
                    />
                  </div>

                  {/* Site Address */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="siteAddress" className="form-label">
                      Site Address
                    </label>
                    <Field
                      type="text"
                      id="siteAddress"
                      name="siteAddress"
                      className="form-control"
                      placeholder="Enter Site Address"
                    />
                  </div>

                  {/* Increment Percent */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="incrementPercent" className="form-label">
                      Increment Percent
                    </label>
                    <Field
                      type="number"
                      id="incrementPercent"
                      name="incrementPercent"
                      className="form-control"
                      placeholder="Enter Increment Percent"
                    />
                  </div>

                  {/* Security */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="security" className="form-label">
                      Security
                    </label>
                    <Field
                      type="text"
                      id="security"
                      name="security"
                      className="form-control"
                      placeholder="Enter Security"
                    />
                  </div>

                  {/* Area */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="area" className="form-label">
                      Area
                    </label>
                    <Field
                      type="text"
                      id="area"
                      name="area"
                      className="form-control"
                      placeholder="Enter Area"
                    />
                  </div>

                  {/* Lease Period */}
                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="leasePeriod" className="form-label">
                      Lease Period
                    </label>
                    <Field
                      type="text"
                      id="leasePeriod"
                      name="leasePeriod"
                      className="form-control"
                      placeholder="Enter Lease Period"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <Button className='m-2'
                    type="button"
                    variant="secondary"
                    onClick={() => resetForm()}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button className='m-2'
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>

      {/* Render data if available */}
      {data && (
        <div className="mt-4">
          <h5>Data:</h5>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ViewProjectHierarchies;
