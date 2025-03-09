import { Link } from "react-router-dom"
import Sidebar from "../../components/userComponents/Sidebar"
import HomeRightBar from "../../components/userComponents/HomeRightBar/HomeRightBar"

const User = () => {
    return (
        <section className="flex">
            <Sidebar />
            <HomeRightBar />
        </section>
    )
}

export default User