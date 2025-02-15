import { Link } from "react-router-dom"
import LogoutBtn from "../components/LogoutBtn"

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>Welcome to the Admin page</p>
            <br />
            < LogoutBtn />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin