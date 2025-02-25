import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import HomeRightBar from "../components/HomeRightBar/HomeRightBar"

const Admin = () => {
    return (
        <section className="flex">
            <Sidebar />
            <HomeRightBar />
        </section>
    )
}

export default Admin