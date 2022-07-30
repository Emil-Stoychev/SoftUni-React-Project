import { Link } from "react-router-dom"

const User = () => {
    return (
        <>
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
        </>
    )
}

export default User