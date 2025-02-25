// Desc: Register page for the application. Saves details in local storage for user authentication until databse is connected. 
// Admin and user roles are redirected to their respective pages. Admin is default role.

import React from 'react'
import './Register.css';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// Regex for username and password validation with [a-zA-Z] meaning the first character must be a letter (case-insensitive) and [a-zA-Z0-9-_] means the rest of the characters can be letters, numbers, hyphens, or underscores and must be of length 4-24 in total.
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    // State for user input, validation for name and focus
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // State for password input, password validation and focus
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // State for password match, password match validation and focus
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Focus on user input
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Check if username is valid
    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    // Check if password is valid
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    // Clear error message when user or password changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    // Handles data submission from form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid username or password.');
            return;
        }

        // 
        // Add code to send user and password to server here
        // 

        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({ username: user, password: pwd, role: 'admin' }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                }
            );
            console.log(response.data);
            setSuccess(true);
        } catch (err) {
            if (!err?.response?.data) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 409) {
                setErrMsg('Username already exists.');
            } else {
                setErrMsg('An error occurred. Please try again later.');
            }
            errRef.current.focus();
        }

        // navigate('/login');
        // setSuccess(true);
    }

    return (
        <div className='bg-blue-400 h-screen flex justify-center items-center'>
            <section className='bg-blue-900 text-white w-96 box-border rounded-2xl p-8'>
                <p ref={errRef} className={errMsg ? "text-red-700 bg-red-300 border border-red-500 p-2" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                <h1 className='my-4 text-4xl'>Register</h1>
                <form onSubmit={handleSubmit} className='space-y-2 flex flex-col'>
                    {/* UI for username input */}
                    <label htmlFor="username" >
                        Username:
                        <span className={validName ? "valid" : "hidden"}>
                            <FontAwesomeIcon className='text-green-500' icon={faCheck}/>
                        </span>
                        <span className={validName || !user ? "hidden" : "invalid"}>
                            <FontAwesomeIcon className='text-red-500' icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        className='bg-white text-black rounded p-2'
                        type="text"
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "absolute left-[-999999px]"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Only letters, numbers, hyphens, and underscores.
                    </p>

                    {/* UI for password input */}
                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? "valid" : "hidden"}>
                            <FontAwesomeIcon className='text-green-500' icon={faCheck}/>
                        </span>
                        <span className={validPwd || !pwd ? "hidden" : "invalid"}>
                            <FontAwesomeIcon className='text-red-500' icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        className='bg-white text-black rounded p-2'
                        type="password"
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd? 'false' : 'true'}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "absolute left-[-999999px]"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters. <br />
                        Must include uppercase and lowercase letters, a number and a special character <br />
                        Allowed special characters: <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='dollar sign'>$</span>
                        <span aria-label='percent'>%</span>
                    </p>

                    {/* UI for password match input */}
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "valid" : "hidden"}>
                            <FontAwesomeIcon className='text-green-500' icon={faCheck}/>
                        </span>
                        <span className={validMatch || !matchPwd ? "hidden" : "invalid"}>
                            <FontAwesomeIcon className='text-red-500' icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        className='bg-white text-black rounded p-2'
                        type="password"
                        id='confirm_pwd'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch? 'false' : 'true'}
                        aria-describedby='confirmnote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "absolute left-[-999999px]"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Password does not match.
                    </p>

                    <button className={!validMatch || !validName || !validPwd?'border border-gray-400 bg-[rgba(255,255,255,0.2)] text-gray-400 rounded p-2 my-4 cursor-not-allowed':"border border-white rounded p-2 my-4 cursor-pointer"} disabled={!validMatch || !validName || !validPwd ? true: false}>Sign up</button>
                </form>

                {/* Link to Login page */}
                <p>
                    Already registered? <br />
                    <span className='flex justify-between'>
                        <Link to='/login' className='underline underline-offset-1'>Sign in</Link><br/>
                        <Link to="/home" className='underline underline-offset-1'>Go back to Home</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default Register;
