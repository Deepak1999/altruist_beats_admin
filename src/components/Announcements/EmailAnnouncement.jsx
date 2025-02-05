import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './EmailAnnouncement.css';
import axios from 'axios';
import Api_base_url from '../Api_base_url/Api_base_url';
import Swal from 'sweetalert2';

const EmailAnnouncement = () => {
    const [selection, setSelection] = useState('All');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        const token = localStorage.getItem("jwttoken");
        const userId = localStorage.getItem("id");

        try {
            const response = await axios.get(
                `${Api_base_url}/api/users/all/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            if (response.status === 200) {
                const formattedUsers = response.data.users.map(user => ({
                    label: user.email,
                    value: user.email,
                }));
                setUsers(formattedUsers);
            } else {
                setError('No users found.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectionChange = (event) => {
        setSelection(event.target.value);
        setSelectedUsers([]);
    };

    const handleUserChange = (selectedOptions) => {
        const selectedEmails = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedUsers(selectedEmails);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async () => {

        console.log("SelectType: ", selection);
        console.log("Emails: ", selectedUsers);
        console.log("Subject: ", subject);
        console.log("Message: ", message);

        // const emailData = {
        //     type: selection,
        //     emails: selection === 'Email' && selectedUsers.length > 0 ? selectedUsers : ['all'],
        //     subject: subject,
        //     message: message,
        // };

        // try {
        //     const response = await axios.post(
        //         `${Api_base_url}/api/project/send/email`,
        //         emailData
        //     );

        //     if (response.status === 200) {
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Success!',
        //             text: 'Email sent successfully!',
        //         });
        //     } else {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops...',
        //             text: 'Failed to send email.',
        //         });
        //     }
        // } catch (err) {
        //     console.error(err);
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error!',
        //         text: 'Error sending email.',
        //     });
        // }
    };

    return (
        <div className="announcement-container">
            <h2>Email Announcement</h2>

            <div className="dropdown-row">
                <div className="dropdown-container">
                    <label htmlFor="selection">Select Type</label>
                    <select id="selection" value={selection} onChange={handleSelectionChange}>
                        <option value="All">All</option>
                        <option value="Email">Email</option>
                    </select>
                </div>

                {selection === 'Email' && (
                    <div className="dropdown-container">
                        <label htmlFor="users">Select Emails</label>
                        <Select
                            isMulti
                            name="users"
                            options={users}
                            value={users.filter(option =>
                                selectedUsers.includes(option.value)
                            )}
                            onChange={handleUserChange}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                        />
                    </div>
                )}

                <div className="dropdown-container">
                    <label htmlFor="message">Enter Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Type your Subject here"
                    />
                </div>

                <div className="dropdown-container">
                    <label htmlFor="message">Enter Message</label>
                    <input
                        type="text"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here"
                    />
                </div>
            </div>

            <div className="submit-container">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default EmailAnnouncement;