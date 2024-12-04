
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Rent.css';

const Add_Rent = () => {

    const [rentAgreements, setRentAgreements] = useState([]);
    const [error, setError] = useState(null);

    const fetchRentAgreements = async () => {
        try {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");
            const response = await axios.get("http://192.168.167.5:8560/api/project/get/rent", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });
            setRentAgreements(response.data.rentAgreements || []);
        } catch (err) {
            setError("Failed to fetch rent agreements.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRentAgreements();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <table border="1" style={{ width: "auto", height: "auto", textAlign: "left", marginLeft: "50px", marginRight: "50px", marginBottom: "50px" }}>
                <thead>
                    <tr>
                        <th>Site ID</th>
                        <th>Vendor Code</th>
                        <th>State</th>
                        <th>Location</th>
                        <th>Area</th>
                        <th>Monthly Payment</th>
                        <th>Lease Period</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {rentAgreements.map((agreement) => (
                        <tr key={agreement.id}>
                            <td>{agreement.siteId}</td>
                            <td>{agreement.vendorCode}</td>
                            <td>{agreement.state}</td>
                            <td>{agreement.location}</td>
                            <td>{agreement.area}</td>
                            <td>{agreement.monthlyPayment}</td>
                            <td>{agreement.leasePeriod}</td>
                            <td>{agreement.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <div className="rent_container mt-4">
                <div className="label-form" style={{ top: "-95px", marginTop: "175px" }}>
                    <h6>Rent Agrement Detail</h6>
                </div>
                <div style={{
                    backgroundColor: "rgba(162, 224, 255, 0.1)",
                    position: "relative",
                    width: "94rem",
                    padding: "10px 20px",
                    border: "1px solid #48a8dd",
                    borderRadius: "6px",
                    fontSize: "16px",
                    marginRight: "-106px",
                    marginLeft: "8px",
                    boxShadow: "0px -2px 11px 0px rgba(0, 0, 0, 0.1), 4px 2px 4px 4px rgba(0, 0, 0, 0.06)"
                }}>
                    <div className="card-body-form">
                        <div className="card-1-form">
                            <Formik>
                                {() => (
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="startDate" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Start Date *</label>
                                                    <Field
                                                        type="date"
                                                        id="startDate"
                                                        name="startDate"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Start Date"
                                                    />
                                                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="endDate" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }} > End Date *</label>
                                                    <Field
                                                        type="date"
                                                        id="endDate"
                                                        name="endDate"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="End Date"
                                                    />
                                                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="siteId" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Site ID *</label>
                                                    <Field
                                                        type="text"
                                                        id="siteId"
                                                        name="siteId"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Site ID"
                                                    />
                                                    <ErrorMessage name="siteId" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Location *</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Location"
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>


                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="label" style={{ top: "153px", marginTop: "175px" }}>
                    <h6>Vender Detail</h6>
                </div>
                <div className="card-form p-3">
                    <div className="card-body-form">
                        <div className="card-1-form">
                            <Formik>
                                {() => (
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="startDate" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Vender Name *</label>
                                                    <Field
                                                        type="text"
                                                        id="siteId"
                                                        name="siteId"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter Vendor Name"
                                                    />
                                                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="endDate" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>GST *</label>
                                                    <Field
                                                        type="text"
                                                        id="siteId"
                                                        name="siteId"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter GST No."
                                                    />
                                                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="siteId" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>PAN *</label>
                                                    <Field
                                                        type="text"
                                                        id="siteId"
                                                        name="siteId"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter PAN No."
                                                    />
                                                    <ErrorMessage name="siteId" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Bank Name *</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter Bank name"
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Account No. *</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter Account No."
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>IFSC*</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter IFSC No."

                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>State*</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter State"
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>PIN Code*</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter PIN Code"
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Address*</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter Address"
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>E-mail*</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location"
                                                        style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter E-mail"
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="location" style={{
                                                        fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem", color: "#4b6584", position: "absolute", marginLeft: "10px", marginTop: "-9px", width: "fit-content",
                                                        backgroundColor: "white",
                                                    }}>Phone No*</label>
                                                    <Field
                                                        type="text"
                                                        id="location"
                                                        name="location" style={{ marginTop: "35px" }}
                                                        className="form-control"
                                                        placeholder="Enter Phone No."
                                                    />
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
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
                                            >
                                                Submit
                                            </Button>
                                            <Button
                                                type="reset"
                                                variant="danger"
                                            >
                                                Reset
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Add_Rent;
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Button, Card } from 'react-bootstrap';
// import './Add_Rent.css';

// const Add_Rent = () => {
//     return (
//         <div>
//             <div className="container mt-4">
//                 <div className="label-form" style={{ marginTop: '177px' }}>
//                     <h6>Rent Agreement Detail</h6>
//                 </div>
//                 <div className="card-form p-3">
//                     <div className="card-body-form">
//                         <div className="card-1-form">
//                             <Formik
//                                 initialValues={{
//                                     startDate: '',
//                                     endDate: '',
//                                     siteId: '',
//                                     location: ''
//                                 }}
//                                 onSubmit={(values) => {
//                                     console.log(values);
//                                 }}
//                             >
//                                 {() => (
//                                     <Form>
//                                         <div className="row">
//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="startDate" className="form-label">Start Date *</label>
//                                                     <Field
//                                                         type="date"
//                                                         id="startDate"
//                                                         name="startDate"
//                                                         className="form-control"
//                                                         placeholder="Start Date"
//                                                     />
//                                                     <ErrorMessage name="startDate" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="endDate" className="form-label">End Date *</label>
//                                                     <Field
//                                                         type="date"
//                                                         id="endDate"
//                                                         name="endDate"
//                                                         className="form-control"
//                                                         placeholder="End Date"
//                                                     />
//                                                     <ErrorMessage name="endDate" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="siteId" className="form-label">Site ID *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="siteId"
//                                                         name="siteId"
//                                                         className="form-control"
//                                                         placeholder="Site ID"
//                                                     />
//                                                     <ErrorMessage name="siteId" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="location" className="form-label">Location *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="location"
//                                                         name="location"
//                                                         className="form-control"
//                                                         placeholder="Location"
//                                                     />
//                                                     <ErrorMessage name="location" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <Button type="submit" className="btn btn-primary">Submit</Button>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="container mt-4">
//                 <div className="label" style={{ marginTop: '177px' }}>
//                     <h6>Vendor Detail</h6>
//                 </div>
//                 <div className="card-form p-3">
//                     <div className="card-body-form">
//                         <div className="card-1-form">
//                             <Formik
//                                 initialValues={{
//                                     vendorName: '',
//                                     gst: '',
//                                     pan: '',
//                                     bankName: '',
//                                     accountNo: '',
//                                     ifsc: ''
//                                 }}
//                                 onSubmit={(values) => {
//                                     console.log(values);
//                                 }}
//                             >
//                                 {() => (
//                                     <Form>
//                                         <div className="row">
//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="vendorName" className="form-label">Vendor Name *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="vendorName"
//                                                         name="vendorName"
//                                                         className="form-control"
//                                                         placeholder="Enter Vendor Name"
//                                                     />
//                                                     <ErrorMessage name="vendorName" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="gst" className="form-label">GST *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="gst"
//                                                         name="gst"
//                                                         className="form-control"
//                                                         placeholder="Enter GST No."
//                                                     />
//                                                     <ErrorMessage name="gst" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="pan" className="form-label">PAN *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="pan"
//                                                         name="pan"
//                                                         className="form-control"
//                                                         placeholder="Enter PAN No."
//                                                     />
//                                                     <ErrorMessage name="pan" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="bankName" className="form-label">Bank Name *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="bankName"
//                                                         name="bankName"
//                                                         className="form-control"
//                                                         placeholder="Enter Bank Name"
//                                                     />
//                                                     <ErrorMessage name="bankName" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="accountNo" className="form-label">Account No. *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="accountNo"
//                                                         name="accountNo"
//                                                         className="form-control"
//                                                         placeholder="Enter Account No."
//                                                     />
//                                                     <ErrorMessage name="accountNo" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-3 mb-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="ifsc" className="form-label">IFSC *</label>
//                                                     <Field
//                                                         type="text"
//                                                         id="ifsc"
//                                                         name="ifsc"
//                                                         className="form-control"
//                                                         placeholder="Enter IFSC No."
//                                                     />
//                                                     <ErrorMessage name="ifsc" component="div" className="text-danger" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <Button type="submit" className="btn btn-primary">Submit</Button>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Add_Rent;
