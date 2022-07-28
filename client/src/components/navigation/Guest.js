import { Link } from "react-router-dom"

const Guest = () => {
    return (
        <>
            <Link className="navbar-brand" to="/" style={{ color: "white" }}>Welcome </Link>
            <li className="nav-item">
                <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/catalog">Catalog </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/user/login">Login </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/user/register">Register </Link>
            </li>
        </>
    )
}

export default Guest