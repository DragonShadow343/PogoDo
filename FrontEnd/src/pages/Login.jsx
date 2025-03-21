import React, { useRef, useEffect } from 'react';
import { useRef as useLoginRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import './Register.css';
import axios from '../api/axios';

const LOGIN_URL = '/Users/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const userRef = useLoginRef();
    const errRef = useLoginRef();

    //state for user input and password
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //refs for the task cards
    const task1Ref = useRef(null);
    const task2Ref = useRef(null);
    const task3Ref = useRef(null);
    const task4Ref = useRef(null);

    //function to animate the task cards
    const animateTask = (taskRef, speedX, speedY) => {
        const task = taskRef.current;
        if (!task) return;

        //random starting position within the viewport
        let posX = Math.random() * (window.innerWidth - task.offsetWidth);
        let posY = Math.random() * (window.innerHeight - task.offsetHeight);

        const move = () => {
        
            posX += speedX;
            posY += speedY;

            //bounce off the edges of the viewport
            if (posX + task.offsetWidth > window.innerWidth || posX < 0) {
                speedX = -speedX;
            }
            if (posY + task.offsetHeight > window.innerHeight || posY < 0) {
                speedY = -speedY;
            }

            //apply new position
            task.style.left = `${posX}px`;
            task.style.top = `${posY}px`;

            //request the next frame
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

    
    useEffect(() => {
        userRef.current.focus();
    }, []);

    
    useEffect(() => {
        if (success) {
            
            setPwd('');
            setUser('');
        }
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                { username: user, passcode: pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            ).then(response => {
                console.log("Full response from backend:", response);

                const { username, role } = response?.data || {};

                
                sessionStorage.setItem("loggedInUser", JSON.stringify({ username, role }));

                
                setAuth({ username, role });

                
                setUser('');
                setPwd('');
                setSuccess(true);

                //redirect based on role
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

            {success ? (
                //show this if login is successful
                <section>
                    <h1>You are logged in</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                //show this if login is not successful
                <section className='bg-gray-800 text-white w-96 p-8 box-border rounded-2xl relative z-10'>
                    <p
                        ref={errRef}
                        className={errMsg ? "text-red-700 bg-red-300 border border-red-500 p-2 rounded mb-4" : "hidden"}
                        aria-live='assertive'
                    >
                        {errMsg}
                    </p>
                    <h1 className='text-4xl font-bold mb-6 text-center'>Sign In</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                        <label htmlFor="username" className='text-sm font-medium'>Username:</label>
                        <input
                            className='bg-white text-gray-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]'
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password" className='text-sm font-medium'>Password:</label>
                        <input
                            className='bg-white text-gray-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button
                            className='bg-[#4ECDC4] text-white rounded p-2 mt-4 hover:bg-[#3BB4AC] transition duration-300'
                        >
                            Sign In
                        </button>
                    </form>
                    <p className='mt-4 text-center'>
                        Need an account? <br />
                        <span className='flex justify-between'>
                            <Link to="/register" className='underline underline-offset-1'>Sign up</Link>
                            <Link to="/home" className='underline underline-offset-1'>Go back to Home</Link>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
};

export default Login;