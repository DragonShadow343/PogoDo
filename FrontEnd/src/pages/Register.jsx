// Desc: Register page for the application. Saves details in local storage for user authentication until databse is connected. 
// Admin and user roles are redirected to their respective pages. Admin is default role.

import React, { useRef, useState, useEffect } from 'react';
import './Register.css';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// Regex for username and password validation with [a-zA-Z] meaning the first character must be a letter (case-insensitive) and [a-zA-Z0-9-_] means the rest of the characters can be letters, numbers, hyphens, or underscores and must be of length 4-24 in total.
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const NAME_REGEX = /^[a-zA-Z]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = '/Users/register';

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [role, setRole] = useState('admin');

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

    // Check if firstName is valid
     useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName]);

    // Check if lastName is valid
    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName]);

    // Check if username is valid
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    // Check if password is valid
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    // Check if email is valid
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // Clear error message when user or password changes
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, user, pwd, matchPwd, role]);

    // Handles data submission from form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validFirstName || !validLastName || !validName || !validPwd || !validMatch || !validEmail) {
            setErrMsg('Invalid form input.');
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, 
                { firstName: firstName, lastName: lastName, username: user, email: email, passcode: pwd, userRole: role },
                { headers: { 'Content-Type': 'application/json', withCredentials: true } }
            );
            console.log(response.data);
            navigate('/login');
        } catch (err) {
            setErrMsg(err.response?.status === 409 ? 'Username already exists.' : 'An error occurred.');
            errRef.current.focus();
        }
    };

    return (
        <div className='bg-[#FFFCF9] h-screen flex justify-center items-center'>
            <section className='bg-gray-800 text-white w-96 box-border rounded-2xl p-8'>
                <p ref={errRef} className={errMsg ? "text-red-700 bg-red-300 border border-red-500 p-2" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                <h1 className='my-4 text-4xl'>Register</h1>
                <form onSubmit={handleSubmit} className='space-y-2 flex flex-col'>

                    {/* UI for First Name */}
                    <label htmlFor="firstName">
                        First Name:
                        <span className={validFirstName ? "valid" : "hidden"}>
                            <FontAwesomeIcon className='text-green-500' icon={faCheck}/>
                        </span>
                        <span className={validFirstName || !firstName ? "hidden" : "invalid"}>
                            <FontAwesomeIcon className='text-red-500' icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        className='bg-white text-black rounded p-2'
                        type="text"
                        id='firstName'
                        autoComplete='off'
                        onChange={(e) => setFirstName(e.target.value)}
                        ref={userRef}
                        required
                        aria-invalid={validFirstName ? 'false' : 'true'}
                        aria-describedby='firstNameNote'
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id="firstNameNote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "absolute left-[-999999px]"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Only letters, numbers, hyphens, and underscores.
                    </p>

                    {/* UI for First Name */}
                    <label htmlFor="lastName">
                        Last Name:
                        <span className={validLastName ? "valid" : "hidden"}>
                            <FontAwesomeIcon className='text-green-500' icon={faCheck}/>
                        </span>
                        <span className={validLastName || !lastName ? "hidden" : "invalid"}>
                            <FontAwesomeIcon className='text-red-500' icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        className='bg-white text-black rounded p-2'
                        type="text"
                        id='lastName'
                        autoComplete='off'
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        aria-invalid={validLastName ? 'false' : 'true'}
                        aria-describedby='LastNameNote'
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    <p id="LastNameNote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "absolute left-[-999999px]"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Only letters, numbers, hyphens, and underscores.
                    </p>

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

                    {/* UI for Email Input */}
                    <label htmlFor="email">
                        Email:
                        <span className={validEmail ? "valid" : "hidden"}>
                            <FontAwesomeIcon className='text-green-500' icon={faCheck}/>
                        </span>
                        <span className={validEmail || !email ? "hidden" : "invalid"}>
                            <FontAwesomeIcon className='text-red-500' icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        className='bg-white text-black rounded p-2'
                        type="email"
                        id='email'
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? 'false' : 'true'}
                        aria-describedby='emailnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "absolute left-[-999999px]"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Enter a valid email address. <br />
                        Example: name@example.com
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
                    
                    {/* UI for role input */}
                    <div className='flex gap-4'>
                        <label><input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Admin</label>
                        <label><input type="radio" value="user" checked={role === 'user'} onChange={() => setRole('user')} /> User</label>
                    </div>

                    <button className={!validMatch || !validName || !validPwd?'border border-[#FFFCF9] bg-[rgba(255,255,255,0.2)] text-gray-400 rounded p-2 my-4 cursor-not-allowed':"border border-[#FFFCF9] text-[#FFFCF9] rounded p-2 my-4 cursor-pointer hover:bg-[#FFFCF9] hover:text-gray-800 transition duration-100"} disabled={!validMatch || !validName || !validPwd ? true: false}>Sign up</button>
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
