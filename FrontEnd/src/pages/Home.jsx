import { useNavigate, Link } from "react-router-dom";

const Home = ( {data} ) => {
    const navigate = useNavigate();

    const logout = async () => {
        navigate('/');
    }

    return (
        <>
            <section>
                <h1>Home</h1>
                <br />
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Sign up</Link>
                <br />
                <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div>
            </section>
            <div>
                Backend data: <pre>{data}</pre>
            </div>
        </>
    )
}

export default Home