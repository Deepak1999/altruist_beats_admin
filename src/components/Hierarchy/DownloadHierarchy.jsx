import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik";
import { Button, Card } from "react-bootstrap";
import Select from "react-select";
import './a.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from '@mui/icons-material/Home';
import HomeButton from "../HomeButton"
import Api_base_url from '../Api_base_url/Api_base_url';

const DownloadHierarchy = () => {

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const ho = localStorage.getItem("home");
    const [companies, setCompanies] = useState([]);

    const typeOptions = [
        { value: 0, label: "Expense" },
        { value: 1, label: "Purchase" },
        { value: 2, label: "Claim" },
    ];

    const handleFetchCompanies = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("authorization");
            const userId = localStorage.getItem("userid");

            const response = await fetch(`${Api_base_url}/api/project/get/companies`,
                {
                    method: "GET",
                    headers: {
                        authorization: token,
                        userid: userId,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch companies");
            }

            const data = await response.json();

            const options =
                data.companies
                    ?.filter((item) => item.isActive === 1)
                    .map((item) => ({
                        value: item.id,
                        label: item.name,
                    })) || [];

            setCompanies(options);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchProjects = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");

            const response = await fetch(`${Api_base_url}/api/project/getprojects`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userid: userId,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }

            const data = await response.json();

            const options = data.map((item) => ({
                value: item.id,
                label: item.name,
            }));

            setProjects(options);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");

            const payload = {
                companyIds: values.companyIds?.map(c => c.value),
                projectIds: values.projectIds?.map(p => p.value),
                types: values.type?.map(t => t.value),
            };

            const response = await fetch(`${Api_base_url}/api/project/download-hierarchy`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userid: userId,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Download failed");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "hierarchy.txt";
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        handleFetchCompanies();
        handleFetchProjects();
    }, []);

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
                                companyIds: [],
                                projectIds: [],
                                type: [],
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ values, setFieldValue, isSubmitting, resetForm }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Business Company</label>
                                            <Select
                                                isMulti
                                                options={companies}
                                                value={values.companyIds}
                                                onChange={(val) => setFieldValue("companyIds", val)}
                                                placeholder="Select Business Company"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Type</label>
                                            <Select
                                                isMulti
                                                options={typeOptions}
                                                value={values.type}
                                                onChange={(val) => setFieldValue("type", val)}
                                                placeholder="Select Type"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Project</label>
                                            <Select
                                                isMulti
                                                options={projects}
                                                value={values.projectIds}
                                                onChange={(val) => setFieldValue("projectIds", val)}
                                                placeholder="Select Projects"
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
                                            {isSubmitting ? "Downloading..." : "Download"}
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