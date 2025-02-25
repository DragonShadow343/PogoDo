import { useNavigate, Link } from "react-router-dom";

const Home = ( {data} ) => {
    const navigate = useNavigate();

    const logout = async () => {
        navigate('/');
    }

    return (
        <div className="h-screen bg-blue-400">
            <section className="bg-blue-900 text-white flex w-screen p-8 box-content">
                <h1 className="flex-[0.8]">Home</h1>
                <Link className="mx-8" to="/login">Login</Link>
                <Link className="mx-8" to="/register">Sign up</Link>
            </section>
            {/* <div>
                Backend data: <pre>{data}</pre>
            </div> */}
        </div>
    )
}

export default Home