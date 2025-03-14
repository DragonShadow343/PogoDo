import { useNavigate, Link } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const logout = async () => {
        navigate('/');
    }

    return (
        <div className="h-screen w-screen bg-[#FFFCF9] p-8">
            <section className="bg-[rgba(0,0,0,0.1)] text-gray-800 mx-auto w-[70vw] rounded-full p-8 flex justify-between">
                <h1 className="">PogoDo</h1>
                <div className="">
                    <Link className="mx-8 rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)]" to="/login">Login</Link>
                    <Link className="mx-8 rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)]" to="/register">Sign up</Link>
                </div>
            </section>
            <section className="">
                
            </section>
        </div>
    )
}

export default Home