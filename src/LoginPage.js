import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

import beats from './assests/beats.png';
import Api_base_url from './components/Api_base_url/Api_base_url';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const apiEndpoint = `${Api_base_url}/auth/login`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        const { username, password } = credentials;

        if (!username || !password) {
            setError('Username and password are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(apiEndpoint, { email: username, password });
            const id = response.data.userId;
            const token = response.data.jwttoken;
            const name = response.data.username;

            localStorage.setItem('jwttoken', token);
            localStorage.setItem('id', id);
            localStorage.setItem('username', name);
            // localStorage.setItem('password', password);
            // navigate('/create-projects');
            navigate('/projects');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error) => {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data.message || error.response.statusText;

            switch (status) {
                case 400:
                    setError('Bad Request: ' + message);
                    break;
                case 401:
                    setError('Unauthorized: ' + message);
                    break;
                case 403:
                    setError('Forbidden: ' + message);
                    break;
                case 404:
                    setError('Not Found: ' + message);
                    break;
                case 500:
                    setError('Server Error: ' + message);
                    break;
                default:
                    setError('An error occurred: ' + message);
                    break;
            }
        } else if (error.request) {
            setError('No response received. Please check your network connection.');
        } else {
            setError('An error occurred: ' + error.message);
        }
    };

    return (
        <div className='container'>
            <Container className='container' component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <img src={beats} className='beats' alt="Login visual" />
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
                        type="password"
                        style={{ marginBottom: "25px" }}
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
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
