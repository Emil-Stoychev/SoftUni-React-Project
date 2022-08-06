import { Link } from "react-router-dom"

const Guest = () => {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <Link className="navbar-brand" to="/" style={{ color: "white" }}>Welcome </Link>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/catalog">Catalog </Link>
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/user/login">Login </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/user/register">Register </Link>
                </li>
            </ul>
        </>
    )
}

export default Guest