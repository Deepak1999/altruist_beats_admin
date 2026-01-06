import React, { useState } from 'react'
import { Formik, Form, Field } from "formik";
import { Button, Card } from "react-bootstrap";
import Select from "react-select";
import './a.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from '@mui/icons-material/Home';
import HomeButton from "../HomeButton"

const DownloadHierarchy = () => {

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const ho = localStorage.getItem("home");

    return (
        <>
            <HomeButton ho={ho} />
            <div className="container px-4 pb-4 mt-4">
                <ToastContainer />
                <Card className="card-form p-3">
                    <div className="label" style={{ marginTop: "-1px" }}>
                        <h6>Download Hierarchy</h6>
                    </div>
                    <Card.Body className="card-1-form d-block">
                        <Formik
                            initialValues={{
                                projectIds: [],
                                emails: [],
                                updateHierarchy: "",
                            }}
                        // onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue, isSubmitting, resetForm }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Business Company</label>
                                            <Select
                                                isMulti
                                                options={projects}
                                                value={values.projectIds}
                                                onChange={(selectedOptions) =>
                                                    setFieldValue("projectIds", selectedOptions)
                                                }
                                                isLoading={loading}
                                                placeholder="Select Business Company"
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Project ID</label>
                                            <Select
                                                isMulti
                                                options={projects}
                                                value={values.projectIds}
                                                onChange={(selectedOptions) =>
                                                    setFieldValue("projectIds", selectedOptions)
                                                }
                                                isLoading={loading}
                                                placeholder="Select Projects"
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            className="m-2"
                                            type="submit"
                                            variant="primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Download"}
                                        </Button>
                                        <Button
                                            className="m-2"
                                            type="button"
                                            variant="danger"
                                            onClick={() => resetForm()}
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
        </>
    );
};

export default DownloadHierarchy;