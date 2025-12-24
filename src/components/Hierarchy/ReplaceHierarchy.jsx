
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { Button, Card } from "react-bootstrap";
import Select from "react-select";
import Api_base_url from "../Api_base_url/Api_base_url";
import './a.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from '@mui/icons-material/Home';
import HomeButton from "../HomeButton";
const Replace = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ho = localStorage.getItem("home");
  useEffect(() => {
    console.log("Fetching Projects...");
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("jwttoken");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
      console.warn("No token or userId found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${Api_base_url}/api/project/getprojects`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );

      console.log("Fetched Projects Response:", response.data);

      if (!response.data || !Array.isArray(response.data)) {
        console.error("Unexpected API response format:", response.data);
        setError("Invalid project data received.");
        return;
      }

      const formattedProjects = response.data.map((project) => ({
        label: project.name,
        value: project.id.toString(),
      }));

      setProjects(formattedProjects);
      console.log("Updated Projects:", formattedProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwttoken");
    const userId = localStorage.getItem("id");

    try {
      const response = await axios.get(`${Api_base_url}/api/users/all/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      });

      console.log("Fetched Users Response:", response.data);

      if (response.status === 200 && response.data.users) {
        const formattedUsers = response.data.users.map((user) => ({
          label: user.email,
          value: user.email,
        }));
        setUsers(formattedUsers);
      } else {
        setError("No users found.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const requestData = {

      email: values.emails.map((email) => email.value).join(","),
      // //  projectId: values.projectIds.map((project) => project.value).join(","),
      // projectId: values.projectIds.length ? values.projectIds.map(project => Number(project.value)).join(",") : null, // Convert to comma-separated integers

      projectId: values.projectIds.length ? Number(values.projectIds[0].value) : null,
      hierarchy: values.updateHierarchy,
    };

    const token = localStorage.getItem("jwttoken");
    const userId = localStorage.getItem("id");

    // if (!token || !userId) {
    //   console.warn("No token or userId found. Cannot proceed with submission.");
    //   setSubmitting(false);
    //   return;
    // }
    // if (!values.emails || values.emails.length === 0) {
    //   alert("Please select at least one email.");
    //   setSubmitting(false);
    //   return;
    // }

    try {
      const response = await axios.post(
        // `${Api_base_url}/api/project/update-singleproject-hierarchyShift`,
        `${Api_base_url}/api/project/update-project-hierarchy-shift`,
        [requestData],
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );

      console.log("Response:", response.data);

      console.log("Response:", response.data);

      if (response.data.statusCode === 200) {
        if (response.data.statusMessage) {
          toast.success(<div>
            <span style={{ color: "green", fontWeight: "bold" }} />
            {response.data.statusMessage}
          </div>);
        }
      }

      else {
        if (response.data.statusCode !== 200 && response.data.statusCode !== 400) {
          toast.error(
            <div>
              <span style={{ color: "red", fontWeight: "bold" }} />
              {response.data.statusMessage}
            </div>
          );
        }
        else if (response.data.statusCode === 400) {
          toast.error("Bad request");
        }
        else {
          toast.error("Something went wrong. Please try again.");
        }
      }

      resetForm();

    }
    catch (error) {
      console.error("Error updating hierarchy:", error);

      // Display the error message in the toast
      toast.error("Failed to update project hierarchy.");
    }

    setSubmitting(false);
  };

  return (
    <>
      <HomeButton ho={ho} />

      <div className="container px-4 pb-4 mt-4">
        <ToastContainer />
        <Card className="card-form p-3">
          <div className="label" style={{ marginTop: "-1px" }}>
            <h6>Replace Hierarchy</h6>
          </div>
          <Card.Body className="card-1-form d-block">
            <Formik
              initialValues={{
                projectIds: [],
                emails: [],
                updateHierarchy: "",  // Added this field
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting, resetForm }) => (
                <Form>
                  <div className="row">
                    {/* Multi-select Project ID */}
                    <div className="col-md-4 mb-4">
                      <label className="form-label">Select Projects</label>
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

                    {/* Multi-select Emails */}
                    <div className="col-md-4 mb-4">
                      <label className="form-label">Select Emails</label>
                      <Select
                        isMulti
                        options={users}
                        value={values.emails}
                        onChange={(selectedOptions) =>
                          setFieldValue("emails", selectedOptions)
                        }
                        isLoading={loading}
                        placeholder="Select Users"
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>

                    <div className="col-md-4 mb-4">
                      <label className="form-label">Hierarchy</label>
                      <Field
                        type="number"
                        name="updateHierarchy"
                        className="form-control"
                        placeholder="Enter Updated Hierarchy"
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
    </>
  );
};

export default Replace;
