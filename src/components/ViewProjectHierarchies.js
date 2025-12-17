import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Button, Spinner, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './BodyApi.css';
import { useNavigate } from 'react-router-dom';
import Api_base_url from './Api_base_url/Api_base_url';import HomeButton from "./HomeButton"

       import HomeIcon from '@mui/icons-material/Home';
const ViewProjectHierarchies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [siteIds, setSiteIds] = useState([]);
const ho = localStorage.getItem("home");
  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');
    if (!token || !userId) {
      navigate('/');
    }
    // }, [navigate]);

    const fetchSiteIds = async () => {
      try {
        const response = await fetch(
          `${Api_base_url}/api/project/get/project/siteIds`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwttoken')}`,
              userId: localStorage.getItem('id'),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.siteIds)) {
            setSiteIds(data.siteIds);
          } else {
            setSiteIds([]);
            console.error('Site IDs are not an array:', data);
          }
        } else {
          const errorData = await response.json();
          handleResponseErrors(response.status, errorData.statusDescription);
        }
      } catch (error) {
        handleErrors(error);
      }
    };

    fetchSiteIds();
  }, [navigate]);

  const handleSubmit = async (values) => {
    console.log('Form submitted with values:', values);
    setLoading(true);

    const formData = new FormData();

    formData.append('vendorName', values.vendorName);
    formData.append('gstNo', values.gstNo);
    formData.append('panNo', values.panNo);
    formData.append('bankName', values.bankName);
    formData.append('accountNo', values.accountNo);
    formData.append('ifsc', values.ifsc);
    formData.append('siteId', values.siteId);
    formData.append('startDate', values.startDate);
    formData.append('endDate', values.endDate);
    formData.append('monthlyPayment', values.monthlyPayment);
    formData.append('location', values.location);
    formData.append('state', values.state);
    formData.append('siteAddress', values.siteAddress);
    formData.append('incrementPercent', values.incrementPercent);
    formData.append('security', values.security);
    formData.append('area', values.area);
    formData.append('leasePeriod', values.leasePeriod);

    try {
      const response = await axios.post(
        `${Api_base_url}/api/project/create/RentAgreement`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwttoken')}`,
            userId: localStorage.getItem('id'),
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Agreement Created!',
          text: 'The rent agreement has been created successfully.',
        });
      } else {
        const errorMessage = response.data.statusDescription
          ? response.data.statusDescription.statusMessage
          : 'Unexpected error occurred';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (error) => {
    if (error.response) {
      const errorMessage = error.response.data.statusDescription
        ? error.response.data.statusDescription.statusMessage
        : 'An error occurred';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (error.request) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No response from the server.',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


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
      case 500:
        showErrorPopup('Server error');
        break;
      default:
        showErrorPopup(backendMessage || 'Unexpected error occurred');
    }
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

  return (
    <div className="containe px-4 pb-4 mt-4">
     <HomeButton ho={ho} />
      <Card className="p- card-1-v card p-0">
   
        <div className="label" style={{ marginTop: '-18px', position: 'static' }}>
          <h6>Add New Agreement</h6>
        </div>
        <Card.Body className="pt-4">
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
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <div className="row">
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

                  <div className="col-md-3 col-6 mb-4">
                    <label htmlFor="siteId" className="form-label">
                      Site ID
                    </label>
                    <Field as="select" name="siteId" className="form-control">
                      <option value="">Select Site ID</option>
                      {Array.isArray(siteIds) &&
                        siteIds.map((siteId,s) => (
                          <option key={s} value={siteId}>
                            {siteId}
                          </option>
                        ))}
                    </Field>
                  </div>

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
                  <Button
                    className="m-2"
                    type="button"
                    variant="secondary"
                    onClick={() => resetForm()}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button
                    className="m-2"
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Create Agreement'}
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

export default ViewProjectHierarchies;
