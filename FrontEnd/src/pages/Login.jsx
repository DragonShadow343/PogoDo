// Desc: Login page for the application. Uses saved details in local storage to authenticate user. 
// Admin and user roles are redirected to their respective pages. Admin is default role.

import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import './Register.css';

import axios from '../api/axios';
const LOGIN_URL = '/Users/login';

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
    
        try {
            const response = await axios.post(LOGIN_URL, 
                { username: user, passcode: pwd },
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            ).then( response => {

                console.log("Full response from backend:", response);

                const { username, role } = response?.data || {};

                // Store user data in sessionStorage
                sessionStorage.setItem("loggedInUser", JSON.stringify({ username, role }));
        
                // Update AuthContext
                setAuth({ username, role });
        
                // Clear input fields immediately
                setUser('');
                setPwd('');
                setSuccess(true);
        
                // Redirect based on role
                navigate(role === "admin" ? "/admin/home" : "/user/home");

            });
    
    
        } catch (err) {
            console.log("Login failed:", err);
            console.log("Error details:", err.response?.status, err.response?.data);
            if (err?.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err?.response?.status === 402) {
                setErrMsg('Username or Password is empty');
            } else if (!err?.response?.data) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };
    

    return ( 
        <div className="bg-[#FFFCF9] h-screen flex justify-center items-center">
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
            <section className='bg-gray-800 text-white w-96 p-8 box-border rounded-2xl'>
                <p ref={errRef} className={errMsg ? "text-red-700 bg-red-300 border border-red-500 p-2": "hidden"} aria-live='assertive'>{errMsg}</p>
                <h1 className='text-4xl my-4'>Sign In</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
                    <label htmlFor="username">Username:</label>
                    <input
                        className='bg-white text-black rounded p-2'
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
                        className='bg-white text-black rounded p-2'
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)} 
                        value={pwd}
                        required
                    />
                    <button className='border border-[#FFFCF9] text-[#FFFCF9] rounded p-2 my-4 hover:cursor-pointer hover:bg-[#FFFCF9] hover:text-gray-800 transition duration-100'>Sign In</button>
                </form>
                <p>
                    Need an account? <br />
                    <span className='flex justify-between'>
                        <Link to="/register" className='underline underline-offset-1'>Sign up</Link><br />
                        <Link to="/home" className='underline underline-offset-1'>Go back to Home</Link>
                    </span>
                </p>
            </section>
            )}
        </div>
    )
}

export default Login
