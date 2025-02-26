import { Link } from "react-router-dom"
import LogoutBtn from "../components/LogoutBtn"

const User = () => {
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            < LogoutBtn />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default User