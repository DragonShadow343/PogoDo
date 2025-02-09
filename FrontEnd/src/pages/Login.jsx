import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    // State for user input and password
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // sample username and password
    const sampleUser = 'user';
    const samplePwd = 'password';

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
    
        if (user === sampleUser && pwd === samplePwd) {
            setSuccess(true);
        } else {
            console.log('Invalid username or password.');
            setErrMsg('Invalid username or password.');
    
            // Clear input fields immediately
            setTimeout(() => {
                setPwd('');
                setUser('');
            }, 100);
    
            // Keep the error message visible for 5 seconds
            setTimeout(() => {
                setErrMsg('');
            }, 5000);
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
                        <Link to="/register">Sign up</Link>
                    </span>
                </p>
            </section>
            )}
        </>
    )
}

export default Login
