import React, { useRef, useState, useEffect } from 'react';
import './Register.css';
import { faCheck, faTimes, faInfoCircle, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// Regex for username and password validation
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

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Refs for the task cards
    const task1Ref = useRef(null);
    const task2Ref = useRef(null);
    const task3Ref = useRef(null);
    const task4Ref = useRef(null);

    //fnction to animate the task cards
    const animateTask = (taskRef, speedX, speedY) => {
        const task = taskRef.current;
        if (!task) return;

        // random starting position within the viewport
        let posX = Math.random() * (window.innerWidth - task.offsetWidth);
        let posY = Math.random() * (window.innerHeight - task.offsetHeight);

        const move = () => {
            // update position
            posX += speedX;
            posY += speedY;

            // bounce off the edges of the viewport
            if (posX + task.offsetWidth > window.innerWidth || posX < 0) {
                speedX = -speedX;
            }
            if (posY + task.offsetHeight > window.innerHeight || posY < 0) {
                speedY = -speedY;
            }

            //apply new position
            task.style.left = `${posX}px`;
            task.style.top = `${posY}px`;

            // Request the next frame
            requestAnimationFrame(move);
        };

        //start the animation
        move();
    };

    //start animations when the component mounts
    useEffect(() => {
        animateTask(task1Ref, 1, 0.8); // Slower speed
        animateTask(task2Ref, -0.9, 1.1); // Slower speed
        animateTask(task3Ref, 0.7, -0.6); // Slower speed
        animateTask(task4Ref, -1.2, 0.9); // Slower speed
    }, []);

    //focus on user input
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

    // Clear error message when inputs change
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
            const response = await axios.post(
                REGISTER_URL,
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
        <div className="bg-[#FFFCF9] h-screen flex justify-center items-center relative overflow-hidden">
            {/* Moving Task Structures */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Task Card 1 */}
                <div ref={task1Ref} className="absolute w-24 h-32 bg-[#A8DADC] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Finish Report</p>
                </div>
                {/* Task Card 2 */}
                <div ref={task2Ref} className="absolute w-24 h-32 bg-[#FFB4A2] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Call Client</p>
                </div>
                {/* Task Card 3 */}
                <div ref={task3Ref} className="absolute w-24 h-32 bg-[#6D6875] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Plan Meeting</p>
                </div>
                {/* Task Card 4 */}
                <div ref={task4Ref} className="absolute w-24 h-32 bg-[#B5838D] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Review Design</p>
                </div>
            </div>

            <section className='bg-gray-800 text-white w-fit box-border rounded-2xl p-8 relative z-10'>
                <p ref={errRef} className={errMsg ? "text-red-700 bg-red-300 border border-red-500 p-2 rounded mb-4" : "offscreen"} aria-live='assertive'>
                    {errMsg}
                </p>
                    <Link to="/home" className='text-gray-400 p-2 rounded-lg hover:bg-gray-700 duration-100'><FontAwesomeIcon icon={faHouse} /></Link>
                    <h1 className='my-4 text-4xl text-gray-200 font-bold text-center'>Register</h1>
                <form onSubmit={handleSubmit} className='gap-5 flex flex-col'>

                    {/* UI for First Name */}
                    <div className='flex justify-between items-center'>
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
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
                            placeholder='First Name'
                        />
                        <div className='absolute right-8'>
                            <span className={validFirstName ? "valid" : "hidden"}>
                                <FontAwesomeIcon className='text-green-500' icon={faCheck} />
                            </span>
                            <span className={validFirstName || !firstName ? "hidden" : "invalid"}>
                                <FontAwesomeIcon className='text-red-500' icon={faTimes} />
                            </span>
                        </div>
                        <p id="firstNameNote" className={`absolute ${firstNameFocus && firstName && !validFirstName ? "information" : "left-[-999999px]"}`}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Only letters, numbers, hyphens, and underscores.
                        </p>
                    </div>


                    {/* UI for Last Name */}
                    <div className='flex justify-between items-center'> 
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="text"
                            id='lastName'
                            autoComplete='off'
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            aria-invalid={validLastName ? 'false' : 'true'}
                            aria-describedby='LastNameNote'
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                            placeholder='Last Name'
                        />
                        <div className='absolute right-8'>
                            <span className={validLastName ? "valid" : "hidden"}>
                                <FontAwesomeIcon className='text-green-500' icon={faCheck} />
                            </span>
                            <span className={validLastName || !lastName ? "hidden" : "invalid"}>
                                <FontAwesomeIcon className='text-red-500' icon={faTimes} />
                            </span>
                        </div>
                        <p id="LastNameNote" className={`absolute ${lastNameFocus && lastName && !validLastName ? "information" : "left-[-999999px]"}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Only letters, numbers, hyphens, and underscores.
                        </p>
                    </div>

                    {/* UI for Username */}
                    <div className='flex justify-between items-center'>
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="text"
                            id='username'
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            placeholder='Username'
                        />
                        <div className='absolute right-8'>
                            <span className={validName ? "valid" : "hidden"}>
                                <FontAwesomeIcon className='text-green-500' icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hidden" : "invalid"}>
                                <FontAwesomeIcon className='text-red-500' icon={faTimes} />
                            </span>
                        </div>
                        <p id="uidnote" className={userFocus && user && !validName ? "information" : "absolute left-[-999999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Only letters, numbers, hyphens, and underscores.
                        </p>
                    </div>

                    {/* UI for Email */}
                    <div className='flex justify-between items-center'>
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="email"
                            id='email'
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby='emailnote'
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            placeholder='Email'
                        />
                        <div className='absolute right-8'>
                            <span className={validEmail ? "valid" : "hidden"}>
                                <FontAwesomeIcon className='text-green-500' icon={faCheck} />
                            </span>
                            <span className={validEmail || !email ? "hidden" : "invalid"}>
                                <FontAwesomeIcon className='text-red-500' icon={faTimes} />
                            </span>
                        </div>
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "information translate-y-[-1.5rem]" : "absolute left-[-999999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter a valid email address. <br />
                            Example: name@example.com
                        </p>
                    </div>

                    {/* UI for Password */}
                    <div className='flex justify-between items-center'>
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="password"
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby='pwdnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            placeholder='Password'
                        />
                        <div className='absolute right-8'>
                            <span className={validPwd ? "valid" : "hidden"}>
                                <FontAwesomeIcon className='text-green-500' icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hidden" : "invalid"}>
                                <FontAwesomeIcon className='text-red-500' icon={faTimes} />
                            </span>
                        </div>
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "information translate-y-[0.75rem]" : "absolute left-[-999999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. <br />
                            Must include uppercase and lowercase letters, a number, and a special character. <br />
                            Allowed special characters: !@#$%
                        </p>
                    </div>

                    {/* UI for Confirm Password */}
                    <div className='flex justify-between items-center'>
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="password"
                            id='confirm_pwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder='Confirm Password'
                        />
                        <div className='absolute right-8'>
                            <span className={validMatch && matchPwd ? "valid" : "hidden"}>
                                <FontAwesomeIcon className='text-green-500' icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hidden" : "invalid"}>
                                <FontAwesomeIcon className='text-red-500' icon={faTimes} />
                            </span>
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "information translate-y-[-2.2rem]" : "absolute left-[-999999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Password does not match.
                        </p>
                    </div>


                    {/* UI for Role Selection */}
                    <div className='flex gap-4'>
                        <label className='text-gray-400'>
                            <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Admin
                        </label>
                        <label className='text-gray-400'>
                            <input type="radio" value="user" checked={role === 'user'} onChange={() => setRole('user')} /> User
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        className={`border border-[#FFFCF9] text-[#FFFCF9] rounded p-2 my-4 transition duration-100 ${
                            !validMatch || !validName || !validPwd
                                ? 'bg-[rgba(255,255,255,0.2)] text-gray-400 cursor-not-allowed'
                                : 'hover:bg-[#FFFCF9] hover:text-gray-800 cursor-pointer'
                        }`}
                        disabled={!validMatch || !validName || !validPwd}
                    >
                        Sign up
                    </button>
                </form>

                {/* Link to Login Page */}
                <p className='text-gray-400'>
                    Already registered? <Link to='/login' className='underline underline-offset-1 hover:text-gray-300 duration-100'>Login</Link>
                </p>
            </section>
        </div>
    );
};

export default Register;