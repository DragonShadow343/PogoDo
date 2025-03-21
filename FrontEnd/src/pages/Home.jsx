import React, { useRef, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/POGODO.png.png'; //commented out since test doesnt work with logos and remove
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();

    //refs for the task cards
    const task1Ref = useRef(null);
    const task2Ref = useRef(null);
    const task3Ref = useRef(null);
    const task4Ref = useRef(null);
    const task5Ref = useRef(null);
    const task6Ref = useRef(null);

    //function to animate the task cards
    const animateTask = (taskRef, speedX, speedY) => {
        const task = taskRef.current;
        if (!task) return;

        //random starting position within the viewport
        let posX = Math.random() * (window.innerWidth - task.offsetWidth);
        let posY = Math.random() * (window.innerHeight - task.offsetHeight);

        const move = () => {
            //update position
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
        animateTask(task1Ref, 2, 1.5);
        animateTask(task2Ref, -1.8, 2.2);
        animateTask(task3Ref, 1.5, -1.7);
        animateTask(task4Ref, -2.3, 1.9);
        animateTask(task5Ref, 2.5, -1.2);
        animateTask(task6Ref, -1.5, 2.5);
    }, []);

    return (
        <div className="h-screen w-screen bg-white p-8 relative overflow-hidden">
            {/* Moving Task Structures */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Task Card 1 */}
                <div ref={task1Ref} className="absolute w-24 h-32 bg-[#4ECDC4] opacity-50 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Finish Report</p>
                </div>
                {/* Task Card 2 */}
                <div ref={task2Ref} className="absolute w-24 h-32 bg-[#FF6B6B] opacity-50 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Call Client</p>
                </div>
                {/* Task Card 3 */}
                <div ref={task3Ref} className="absolute w-24 h-32 bg-[#1E293B] opacity-50 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Plan Meeting</p>
                </div>
                {/* Task Card 4 */}
                <div ref={task4Ref} className="absolute w-24 h-32 bg-[#3BB4AC] opacity-50 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Review Design</p>
                </div>
                {/* Task Card 5 */}
                <div ref={task5Ref} className="absolute w-24 h-32 bg-[#FFD700] opacity-50 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Update Budget</p>
                </div>
                {/* Task Card 6 */}
                <div ref={task6Ref} className="absolute w-24 h-32 bg-[#9370DB] opacity-50 rounded-lg shadow-lg">
                    <p className="text-xs p-2 text-white">Prepare Presentation</p>
                </div>
            </div>

            {/* Header Section */}
            <header className="flex justify-between items-center mb-12 relative z-20">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={logo} alt="PogoDo Logo" className="h-16 w-16 mr-4" /> {/* Increased logo size */}
                </div>

                {/* Login/Signup Buttons */}
                <div className="flex space-x-4">
                    <Link 
                        className="px-6 py-2 rounded-full bg-[#1E293B] text-white hover:bg-[#334155] transition duration-300 ease-in-out transform hover:scale-105" 
                        to="/login"
                    >
                        Login
                    </Link>
                    <Link 
                        className="px-6 py-2 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition duration-300 ease-in-out transform hover:scale-105" 
                        to="/register"
                    >
                        Sign up
                    </Link>
                </div>
            </header>

            {/* Main Content Section */}
            <section className="flex flex-col items-center justify-center h-full relative z-10">
            <h2 className="text-6xl font-bold text-[#1E293B] font-poppins bg-gradient-to-r from-[#4ECDC4] to-[#2563EB] bg-clip-text text-transparent leading-tight -mt-4">
                      Welcome to PogoDo
                </h2>
                <p className="text-2xl text-[#64748B] mb-8 font-poppins">
                    Your ultimate task management solution
                </p>
                
                {/* Call to Action Button */}
                <Link 
                    className="px-8 py-3 rounded-full bg-[#1E293B] text-white hover:bg-[#334155] transition duration-300 ease-in-out transform hover:scale-105" 
                    to="/register"
                >
                    Get Started
                </Link>
            </section>
        </div>
    );
};

export default Home;