
import React, { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import beats from './assests/beats.png';
import Api_base_url from './components/Api_base_url/Api_base_url';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const LoginPage = ({ fetchModules = () => { } }) => {

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [modules, setModules] = useState();
    const apiEndpoint = `${Api_base_url}/auth/login`;
    const apiEndpoint2 = `${Api_base_url}/auth/user-auth`;
    const [showPassword, setShowPassword] = useState(false);
    const loginCalled = useRef(false);
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.hash.substring(2));
    //     const userId = params.get('userId');
    //     const password = params.get('password');
    //     const qStr = params.get('qStr');

    //     console.log('Params:', window.location.hash.substring(2));
    //     console.log('UserId:', userId);
    //     console.log('Password:', password);
    //     console.log('qStr:', qStr);

    //     if (userId && password) {
    //         // setCredentials({ username: userId, password });
    //         handleLoginParams(userId, password);
    //     }
    // }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const aesKey = "nLHwvZLv6ZCuY+KCjZXjVmRSS4XNd/mYOoDSJw0eiNM=";
    const decryptBody = (encryptedBody, aesKey) => {
        try {
            console.log("🔒 Encrypted Body:", encryptedBody);
            const keyBytes = CryptoJS.enc.Base64.parse(aesKey);
            console.log("🗝 Key Bytes:", keyBytes.toString());

            const decrypted = CryptoJS.AES.decrypt(encryptedBody, keyBytes, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });

            const decryptedBody = decrypted.toString(CryptoJS.enc.Utf8);
            console.log("🔓 Decrypted Body:", decryptedBody);

            if (!decryptedBody) {
                console.error("Decryption failed: Empty result");
                return null;
            }

            return JSON.parse(decryptedBody);
        } catch (error) {
            console.error('❌ Decryption error:', error);
            return null;
        }
    };

    // const decryptBody = (encryptedBody, aesKey) => {
    //     try {
    //         const keyBytes = CryptoJS.enc.Base64.parse(aesKey);
    //         if (keyBytes.words.length !== 8) {
    //             console.error('Invalid AES key length', aesKey);
    //             throw new Error('Invalid AES key length');
    //         }
    //         const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 8));
    //         const decrypted = CryptoJS.AES.decrypt(encryptedBody, key, {
    //             mode: CryptoJS.mode.ECB,
    //             padding: CryptoJS.pad.Pkcs7
    //         });
    //         const decryptedBody = decrypted.toString(CryptoJS.enc.Utf8);
    //         console.log("Decrypted Body:", decryptedBody);
    //         return JSON.parse(decryptedBody);
    //     } catch (error) {
    //         console.error('Decryption error:', error);
    //         return null;
    //     }
    // };

    const handleDecryption = () => {
        const params = new URLSearchParams(window.location.hash.substring(2));
        const encryptedQuery = params.get('qStr');

        if (encryptedQuery) {
            console.log("Encrypted Query:", encryptedQuery);
            const decryptedData = decryptBody(encryptedQuery, aesKey);

            if (decryptedData) {
                const { userId, password } = decryptedData;
                console.log("Decrypted Data:", decryptedData);

                handleLoginParams(userId, password);
            }
        }
    };

    const handleLoginParams = async (userId, encryptedPassword) => {
        if (loginCalled.current) return; // Ensure function runs only once
        loginCalled.current = true;

        try {
            console.log("Encrypted Password:", encryptedPassword);
            const response = await axios.post(apiEndpoint2, {
                id: userId,
                password: encryptedPassword
            });
            console.log("userId:", userId);
            console.log("encryptedPassword:", encryptedPassword);
            console.log("response:", response);
            const { userId: id, jwttoken, name, roleId } = response.data;

            // Save to local storage
            localStorage.setItem('jwttoken', jwttoken);
            localStorage.setItem('id', id);
            localStorage.setItem('username', name);
            localStorage.setItem('roleId', roleId);

            localStorage.setItem('home', "1");


            console.log("✅ Login Successful");
            await fetchModules();
            navigate('/projects');


        } catch (error) {
            console.error('❌ Login failed:', error);
        }
    };



    React.useEffect(() => {
        handleDecryption();
    }, []);



    const handleLogin = async () => {
        setLoading(true);
        setError('');

        const { username, password } = credentials;

        if (!username || !password) {
            setError('Username and password are required.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(apiEndpoint, { email: username, password });
            const { userId: id, jwttoken, name, roleId } = response.data;

            localStorage.setItem('jwttoken', jwttoken);
            localStorage.setItem('id', id);
            localStorage.setItem('username', name);


            // localStorage.setItem('username', name);
            localStorage.setItem('roleId', roleId);


            console.log("loginnnnnnnnnnnnnnnnnn", response.data.statusMessage)
            await fetchModules();
            navigate('/projects');
            // navigate('/home');

        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };




    const handleError = (error) => {
        if (error.response) {
            console.log("Error Response:", error.response.status);
            console.log("Error ResponseCCCCCCCCC:", error.response.data.statusMessage);

            setError(error.response.data.statusMessage);
            console.log("Error:", error.response.data.statusMessage);

        } else if (error.request) {
            setError('No response received. Please check your network connection.');
        } else {
            setError('An error occurred: ' + error.message);
        }
    };

    const handleSubmit = () => {
        const params = new URLSearchParams(window.location.hash.substring(2));
        const userId = params.get('userId');
        const password = params.get('password');
        const qStr = params.get("qStr")

        if ((userId && password) || qStr) {
            handleLoginParams(userId, password);
        } else {
            handleLogin();
        }
    };

    return (
        <div className="container">
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <img src={beats} className="beats" alt="Login visual" />
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        style={{ marginBottom: '25px' }}
                        value={credentials.password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        style={{ marginBottom: '25px' }}
                        value={credentials.password}
                        onChange={handleChange}
                    /> */}
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        // onClick={handleLoginParams}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;
