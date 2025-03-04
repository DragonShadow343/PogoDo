import { Link } from "react-router-dom"
import Sidebar from "../../components/adminComponents/Sidebar"
import HomeRightBar from "../../components/adminComponents/HomeRightBar/HomeRightBar"

const Admin = () => {
    return (
        <section className="flex">
            <Sidebar />
            <HomeRightBar />
        </section>
    )
}

export default Admin