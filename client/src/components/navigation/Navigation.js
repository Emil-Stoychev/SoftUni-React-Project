import { Link } from "react-router-dom"

import { logout } from '../user/logout/Logout'

import User from './User'
import Guest from './Guest'
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export const Navigation = () => {
    let { cookies, setCookies } = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {cookies?._id ? <User /> : <Guest />}
                    </ul>

                    {cookies?.email
                        ?
                        <>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item">
                                    <Link className="nav-link active" style={{ color: "white", userSelect: "none" }} aria-current="page" to='/messages' ><span style={{ color: "red" }}>*</span>&#x2709; Messages </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" style={{ color: "#f1ce99", userSelect: "none" }} to=''>{cookies?.money ? `Balance: ${cookies?.money}€` : ''}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" style={{ color: "#f1ce99", userSelect: "none" }} to=''>{cookies?.email ? cookies?.email : ''}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" style={{ color: "white", userSelect: "none" }} aria-current="page" to='/user/login' onClick={() => logout(setCookies)}>Logout </Link>
                                </li>
                            </ul>
                        </>
                        : ''
                    }


                </div>
            </div>
        </nav>
    )
}