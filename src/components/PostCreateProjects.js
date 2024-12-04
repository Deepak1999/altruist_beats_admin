
// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Loader from './Loader';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './FormApi.css';
// import { useLocation } from 'react-router-dom';

// function PostCreateProjects() {
//     const location = useLocation();
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [message, setMessage] = useState('');
//     const [uploading, setUploading] = useState(false);
//     const fileInputRef = useRef(null);

//     const token = localStorage.getItem('jwttoken');
//     const userId = localStorage.getItem('id'); 
//     const onFileChange = (event) => {
//         const files = Array.from(event.target.files);
//         setSelectedFiles(files);
//     };

//     const showPopup = (icon, title, text) => {
//         Swal.fire({
//             icon: icon,
//             title: title,
//             text: text,
//             showConfirmButton: false,
//             timer: 1500,
//         });
//     };

//     const handleAPIResponse = (status, data) => {
//         switch (status) {
//             case 200:
//                 showPopup('success', 'Success', 'Files uploaded successfully!');
//                 setMessage('Files uploaded successfully');
//                 break;
//             case 400:
//                 showPopup('error', 'Bad Request', 'Invalid file format. Please upload xlsx, xls, or csv files.');
//                 setMessage('Bad request. Please check the file format.');
//                 break;
//             case 401:
//                 showPopup('error', 'Unauthorized', 'You are not authorized to upload files. Please log in.');
//                 setMessage('Unauthorized. Please log in.');
//                 break;
//             case 403:
//                 showPopup('error', 'Forbidden', 'You do not have permission to upload files.');
//                 setMessage('Forbidden. You do not have permission.');
//                 break;
//             case 500:
//                 showPopup('error', 'Server Error', 'An error occurred on the server. Please try again later.');
//                 setMessage('Server error. Please try again later.');
//                 break;
//             default:
//                 showPopup('error', 'Error', `Unexpected error: ${status}. Please try again.`);
//                 setMessage(`Unexpected error: ${status}. Please try again.`);
//         }
//     };

//     const handleFileUploadError = (error) => {
//         if (error.response) {
//             handleAPIResponse(error.response.status, error.response.data);
//         } else if (error.request) {
//             showPopup('error', 'Network Error', 'No response from the server. Please check your network connection.');
//             setMessage('Network error. Please check your connection.');
//         } else {
//             showPopup('error', 'Error', 'An error occurred while setting up the request. Please try again.');
//             setMessage('Error setting up the request. Please try again.');
//         }
//     };

//     const onFileUpload = () => {
//         if (selectedFiles.length === 0) {
//             setMessage('Please select a file to upload');
//             showPopup('error', 'No File Selected', 'Please select a file to upload.');
//             return;
//         }

//         if (!token) {
//             showPopup('error', 'Unauthorized', 'Please log in to upload files.');
//             return;
//         }

//         setUploading(true);
//         setMessage('Uploading...');

//         const uploadPromises = selectedFiles.map((file) => {
//             const formData = new FormData();
//             formData.append('file', file);

//             return axios.post('http://192.168.167.5:8560/api/project/create-project', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`,  // Include token in Authorization header
//                     'userId': userId, // Include userId in headers
//                 }
//             })
//                 .then((response) => {
//                     handleAPIResponse(response.status, response.data);
//                 })
//                 .catch((error) => {
//                     handleFileUploadError(error);
//                 });
//         });

//         Promise.all(uploadPromises)
//             .finally(() => {
//                 setUploading(false);
//             });
//     };

//     const handleReset = () => {
//         setSelectedFiles([]);
//         setMessage('');
//         setUploading(false);

//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     return (
//         <div className="container mt-4">
//             {uploading && <Loader loading={uploading} />}
//             <div className={`content-wrapper ${uploading ? 'loading-active' : ''}`}>
//                 <div className="label-form" style={{ marginTop: '177px' }}>

//                     <h6>Create Projects</h6>
//                 </div>
//                 <div className="card-form p-3">
//                     <div className="card-body-form">
//                         <div className="card-1-form">
//                             <label htmlFor="fileInput" className="form-label-form">
//                                 Supported format: xlsx, xls, csv
//                             </label>
//                             <br />
//                             <input
//                                 type="file"
//                                 id="fileInput"
//                                 ref={fileInputRef}
//                                 onChange={onFileChange}
//                                 className="form-control-form mb-3"
//                                 multiple
//                             />
//                         </div>
//                         <div className="d-flex">
//                             <button className="btn btn-primary me-2" onClick={onFileUpload} disabled={uploading}>
//                                 {uploading ? 'Uploading...' : 'Submit'}
//                             </button>
//                             <button className="btn btn-danger" onClick={handleReset}>
//                                 Reset
//                             </button>
//                         </div>

//                         {message && (
//                             <div className={`alert ${message.toLowerCase().includes('error') || message.includes('bad') ? 'alert-danger' : 'alert-success'}`}>
//                                 {message}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PostCreateProjects;
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from './Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormApi.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PostCreateProjects() {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwttoken');
        const userId = localStorage.getItem('id');
        if (!token || !userId) {

            navigate('/'); // Redirect to login if no token is found
        }
    }, [navigate]);


    const [selectedFiles, setSelectedFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const token = localStorage.getItem('jwttoken');
    const userId = localStorage.getItem('id');

    const onFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const showPopup = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const handleAPIResponse = (status, data) => {
        switch (status) {
            case 200:
                showPopup('success', 'Success', 'Files uploaded successfully!');
                setMessage('Files uploaded successfully');
                break;
            case 400:
                showPopup('error', 'Bad Request', 'Invalid file format. Please upload xlsx, xls, or csv files.');
                setMessage('Bad request. Please check the file format.');
                break;
            case 401:
                showPopup('error', 'Unauthorized', 'You are not authorized to upload files. Please log in.');
                setMessage('Unauthorized. Please log in.');
                break;
            case 403:
                showPopup('error', 'Forbidden', 'You do not have permission to upload files.');
                setMessage('Forbidden. You do not have permission.');
                break;
            case 500:
                showPopup('error', 'Server Error', 'An error occurred on the server. Please try again later.');
                setMessage('Server error. Please try again later.');
                break;
            default:
                showPopup('error', 'Error', `Unexpected error: ${status}. Please try again.`);
                setMessage(`Unexpected error: ${status}. Please try again.`);
        }
    };

    const handleFileUploadError = (error) => {
        if (error.response) {
            handleAPIResponse(error.response.status, error.response.data);
        } else if (error.request) {
            showPopup('error', 'Network Error', 'No response from the server. Please check your network connection.');
            setMessage('Network error. Please check your connection.');
        } else {
            showPopup('error', 'Error', 'An error occurred while setting up the request. Please try again.');
            setMessage('Error setting up the request. Please try again.');
        }
    };

    const onFileUpload = () => {
        if (selectedFiles.length === 0) {
            setMessage('Please select a file to upload');
            showPopup('error', 'No File Selected', 'Please select a file to upload.');
            return;
        }

        if (!token) {
            showPopup('error', 'Unauthorized', 'Please log in to upload files.');
            return;
        }

        setUploading(true);
        setMessage('Uploading...');

        const uploadPromises = selectedFiles.map((file) => {
            const formData = new FormData();
            formData.append('file', file);

            return axios.post('http://192.168.167.5:8560/api/project/create-project', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,  // Include token in Authorization header
                    'userId': userId, // Include userId in headers
                }
            })
                .then((response) => {
                    handleAPIResponse(response.status, response.data);
                })
                .catch((error) => {
                    handleFileUploadError(error);
                });
        });

        Promise.all(uploadPromises)
            .finally(() => {
                setUploading(false);
            });
    };

    const handleReset = () => {
        setSelectedFiles([]);
        setMessage('');
        setUploading(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="container mt-4">
            {uploading && <Loader loading={uploading} />}
            <div className={`content-wrapper ${uploading ? 'loading-active' : ''}`}>
                <div className="label-form" style={{ marginTop: '177px' }}>

                    <h6>Create Projects</h6>
                </div>
                <div className="card-form p-3">
                    <div className="card-body-form">
                        <div className="card-1-form">
                            <label htmlFor="fileInput" className="form-label-form">
                                Supported format: xlsx, xls, csv
                            </label>
                            <br />
                            <input
                                type="file"
                                id="fileInput"
                                ref={fileInputRef}
                                onChange={onFileChange}
                                className="form-control-form mb-3"
                                multiple
                            />
                        </div>
                        <div className="d-flex">
                            <button className="btn btn-primary me-2" onClick={onFileUpload} disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Submit'}
                            </button>
                            <button className="btn btn-danger" onClick={handleReset}>
                                Reset
                            </button>
                        </div>

                        {message && (
                            <div className={`alert ${message.toLowerCase().includes('error') || message.includes('bad') ? 'alert-danger' : 'alert-success'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCreateProjects;
