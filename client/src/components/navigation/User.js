import { Link } from "react-router-dom"

const User = () => {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/catalog"> Catalog </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/catalog/create"> Create </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/ownProducts"> Own products </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/profile"> Profile </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/dailyWheel"> Daily wheel </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/chat"> Chat </Link>
                </li>
            </ul>
        </>
    )
}

export default User