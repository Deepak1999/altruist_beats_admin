import React from "react";
import HomeButton from "../HomeButton";
import { Formik, Form } from "formik";
import { Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Api_base_url from "../Api_base_url/Api_base_url";

const AddUsers = () => {

    const ho = localStorage.getItem("home");
    const token = localStorage.getItem("jwttoken");
    const userId = localStorage.getItem("id");

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("file", values.updateHierarchy);
            formData.append("userId", userId);

            const response = await fetch(`${Api_base_url}/api/users/add-users`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            toast.success("Users uploaded successfully");
            resetForm();
        } catch (error) {
            toast.warning("Failed to upload users");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <HomeButton ho={ho} />
            <div className="container px-4 pb-4 mt-4">
                <ToastContainer />
                <Card className="card-form p-3">
                    <div className="label" style={{ marginTop: "-1px" }}>
                        <h6>Bulk Users Create</h6>
                    </div>
                    <Card.Body className="card-1-form d-block">
                        <Formik
                            initialValues={{
                                updateHierarchy: null,
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting, resetForm }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Upload File</label>
                                            <input
                                                type="file"
                                                name="updateHierarchy"
                                                className="form-control"
                                                accept=".csv,.xlsx"
                                                onChange={(event) => {
                                                    setFieldValue(
                                                        "updateHierarchy",
                                                        event.currentTarget.files[0]
                                                    );
                                                }}
                                                required
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
                                            {isSubmitting ? "Submitting..." : "Submit"}
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
            <ToastContainer />
        </>
    );
};

export default AddUsers;