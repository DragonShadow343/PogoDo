import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import './Register.css';

const RESET_PASSWORD_URL = '/Users/reset-password';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const errRef = useRef();
    
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false
    });

    //refs for the task cards
    const task1Ref = useRef(null);
    const task2Ref = useRef(null);
    const task3Ref = useRef(null);
    const task4Ref = useRef(null);

    //function to animate the task cards
    const animateTask = (taskRef, speedX, speedY) => {
        const task = taskRef.current;
        if (!task) return;

        let posX = Math.random() * (window.innerWidth - task.offsetWidth);
        let posY = Math.random() * (window.innerHeight - task.offsetHeight);

        const move = () => {
            posX += speedX;
            posY += speedY;

            if (posX + task.offsetWidth > window.innerWidth || posX < 0) {
                speedX = -speedX;
            }
            if (posY + task.offsetHeight > window.innerHeight || posY < 0) {
                speedY = -speedY;
            }

            task.style.left = `${posX}px`;
            task.style.top = `${posY}px`;
            requestAnimationFrame(move);
        };

        move();
    };

    //start animations when the component mounts
    useEffect(() => {
        animateTask(task1Ref, 1, 0.8);
        animateTask(task2Ref, -0.9, 1.1);
        animateTask(task3Ref, 0.7, -0.6);
        animateTask(task4Ref, -1.2, 0.9);
    }, []);

    //validate password requirements
    useEffect(() => {
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        const hasMinLength = newPassword.length >= 8 && newPassword.length <= 24;

        setPasswordRequirements({
            hasUpperCase,
            hasNumber,
            hasSpecialChar,
            hasMinLength
        });
    }, [newPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        //check if passwords match
        if (newPassword !== confirmPassword) {
            setErrMsg('Passwords do not match');
            return;
        }

        //check password requirements
        if (!passwordRequirements.hasUpperCase || 
            !passwordRequirements.hasNumber || 
            !passwordRequirements.hasSpecialChar || 
            !passwordRequirements.hasMinLength) {
            setErrMsg('Password does not meet requirements');
            return;
        }

        try {
            const response = await axios.post(
                RESET_PASSWORD_URL,
                JSON.stringify({ username, newPassword }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Username and new password are required');
            } else if (err.response?.status === 404) {
                setErrMsg('User not found');
            } else {
                setErrMsg('Password reset failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="bg-[#FFFCF9] h-screen flex justify-center items-center relative overflow-hidden">
            {/* moving task structures */}
            <div className="fixed inset-0 pointer-events-none">
                <div ref={task1Ref} className="absolute w-24 h-32 bg-[#A8DADC] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Finish Report</p>
                </div>
                <div ref={task2Ref} className="absolute w-24 h-32 bg-[#FFB4A2] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Call Client</p>
                </div>
                <div ref={task3Ref} className="absolute w-24 h-32 bg-[#6D6875] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Plan Meeting</p>
                </div>
                <div ref={task4Ref} className="absolute w-24 h-32 bg-[#B5838D] opacity-40 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Review Design</p>
                </div>
            </div>

            {success ? (
                <section className='bg-gray-800 text-white w-96 p-8 box-border rounded-2xl relative z-10'>
                    <h1 className='text-2xl font-bold mb-4'>Success!</h1>
                    <p>Your password has been updated.</p>
                    <p>Redirecting to login page...</p>
                </section>
            ) : (
                <section className='bg-gray-800 text-white w-96 p-8 box-border rounded-2xl relative z-10'>
                    <p
                        ref={errRef}
                        className={errMsg ? "text-red-700 bg-red-300 border border-red-500 p-2 rounded mb-4" : "hidden"}
                        aria-live='assertive'
                    >
                        {errMsg}
                    </p>
                    <Link to="/home" className='text-gray-400 p-2 rounded-lg hover:bg-gray-700 duration-100'>
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                    
                    
                    <h1 className='text-4xl text-gray-200 font-bold mb-6 text-center'>Reset Password</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="text"
                            id="username"
                            autoComplete='off'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            placeholder='Username'
                        />
                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="password"
                            id="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            required
                            placeholder='New Password'
                        />
                        {/* upon changing req's to fufill them, they turn green and check with green mark*/}
                        <div className="text-xs text-gray-400 mb-2">
                            <p className={passwordRequirements.hasMinLength ? "text-green-400" : ""}>
                                • 8-24 characters {passwordRequirements.hasMinLength ? "✓" : ""}
                            </p>
                            <p className={passwordRequirements.hasUpperCase ? "text-green-400" : ""}>
                                • At least one uppercase letter {passwordRequirements.hasUpperCase ? "✓" : ""}
                            </p>
                            <p className={passwordRequirements.hasNumber ? "text-green-400" : ""}>
                                • At least one number {passwordRequirements.hasNumber ? "✓" : ""}
                            </p>
                            <p className={passwordRequirements.hasSpecialChar ? "text-green-400" : ""}>
                                • At least one special character {passwordRequirements.hasSpecialChar ? "✓" : ""}
                            </p>


                        </div>




                        <input
                            className='text-gray-400 w-80 p-2 border-b-2 focus:outline-none focus:border-b-[#4ECDC4] transition duration-300'
                            type="password"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                            placeholder='Confirm New Password'
                        />
                        <button
                            className='bg-[#4ECDC4] text-white rounded p-2 my-4 hover:bg-[#3BB4AC] hover:cursor-pointer transition duration-300'
                            disabled={!passwordRequirements.hasUpperCase || 
                                     !passwordRequirements.hasNumber || 
                                     !passwordRequirements.hasSpecialChar || 
                                     !passwordRequirements.hasMinLength}
                        >
                            Reset Password
                        </button>
                    </form>
                    <p className='text-gray-400 text-center'>
                        Remember your password? <Link to='/login' className='underline underline-offset-1 hover:text-gray-300 duration-100'>Sign in</Link>
        
                       </p>
                </section>
            )}
        </div>
    );
};

export default ForgotPassword;