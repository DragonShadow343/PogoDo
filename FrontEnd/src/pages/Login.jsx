// Desc: Login page for the application. Uses saved details in local storage to authenticate user. 
// Admin and user roles are redirected to their respective pages. Admin is default role.

import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import './Register.css';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    // State for user input and password
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Focus on user input
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Shows if successful login by updating success state
    useEffect(() => {
        if (success) {
            // Clear user and password
            setPwd('');
            setUser('');
        }

    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 
        // Add code to send user and password to server here
        // 
        
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });

            // Clear input fields immediately
            setTimeout(() => {
                setPwd('');
                setUser('');
            }, 100);
            setSuccess(true);
        } catch (err) {
            if (!err?.response?.data) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response.status === 402) {
                setErrMsg('Username or Password is empty');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    
    };

    return ( 
        <>
            {success ? (
                // Show this if login is successful
                    <section>
                        <h1>You are logged in</h1>
                        <br />
                        <p>
                            <a href="#">Got to Home</a>
                        </p>
                    </section>
                ) : (
                    // Show this if login is not successful
            <section>
                <p ref={errRef} className={errMsg ? "errMsg": "offscreen"} aria-live='assertive'>{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)} 
                        value={user}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)} 
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an account? <br />
                    <span className='line'>
                        <Link to="/register">Sign up</Link><br />
                        <Link to="/home">Go to the link page</Link>
                    </span>
                </p>
            </section>
            )}
        </>
    )
}

export default Login
