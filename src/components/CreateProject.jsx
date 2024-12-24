import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select

const CreateProjectModal = () => {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for form fields
    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [company, setCompany] = useState("");
    const [type, setType] = useState("");
    const [initiator, setInitiator] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]); // Store selected users as an array

    // State to store users fetched from API
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch users from API
    const fetchUsers = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        try {
            const response = await axios.get(
                "http://192.168.167.5:8560/api/users/all/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.status === 200) {
                setUsers(response.data.users); // Assuming the response has 'users' field
            } else {
                setError("No users found.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    // Handle user selection change in react-select
    const handleUserChange = (selectedOptions) => {
        // Get selected email addresses
        const selectedEmails = selectedOptions ? selectedOptions.map(option => option.email) : [];
        setSelectedUsers(selectedEmails);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestPayload = {
            name,
            shortName,
            company,
            type,
            initiator,
            users: selectedUsers.join(",") // Join emails with a comma before sending
        };

        try {
            const response = await fetch("your-api-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestPayload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Form submitted successfully:", result);
                setIsModalOpen(false); // Close modal after successful submission
            } else {
                console.error("Error submitting form:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Call fetchUsers on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Prepare options for react-select
    const userOptions = users.map(user => ({
        value: user.id,
        label: user.email,
        email: user.email
    }));

    return (
        <div>
            {/* Button to trigger modal */}
            <div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        backgroundColor: "blue",
                        display: "flex",
                        justifyContent: "flex-end",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Create Project
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "400px",
                        }}
                    >
                        <h2>Create Project</h2>
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Short Name:</label>
                                <input
                                    type="text"
                                    name="shortName"
                                    value={shortName}
                                    onChange={(e) => setShortName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Company:</label>
                                <select
                                    name="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    required
                                >
                                    <option value="">Select Company</option>
                                    {/* Map companies here */}
                                </select>
                            </div>
                            <div>
                                <label>Type:</label>
                                <select
                                    name="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Type 1">Type 1</option>
                                    <option value="Type 2">Type 2</option>
                                    <option value="Type 3">Type 3</option>
                                </select>
                            </div>
                            <div>
                                <label>Initiator:</label>
                                <select
                                    name="initiator"
                                    value={initiator}
                                    onChange={(e) => setInitiator(e.target.value)}
                                    required
                                >
                                    <option value="">Select Initiator</option>
                                    {/* Map initiators here */}
                                </select>
                            </div>
                            <div>
                                <label>Users:</label>
                                <Select
                                    isMulti
                                    name="users"
                                    options={userOptions}
                                    value={userOptions.filter(option =>
                                        selectedUsers.includes(option.email)
                                    )}
                                    onChange={handleUserChange}
                                    getOptionLabel={(e) => e.label} // Display the email in the dropdown
                                    getOptionValue={(e) => e.value} // Use user ID as the value
                                />
                            </div>
                            <div>
                                <button type="submit">Create</button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateProjectModal;
