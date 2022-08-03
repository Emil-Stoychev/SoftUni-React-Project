import { Link } from "react-router-dom"

import { logout } from '../user/logout/Logout'

import User from './User'
import Guest from './Guest'
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export const Navigation = () => {
    let {cookies, setCookies} = useContext(AuthContext)

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
                            <li className="nav-item">
                                <Link className="nav-link active" style={{ color: "white", margin: "-30% 0 0 -30%", userSelect: "none" }} aria-current="page" to='/messages' >&#x2709;<span style={{color: "red"}}>*</span> Messages </Link>
                            </li>
                            <Link className="nav-link disabled" style={{ color: "#f1ce99", userSelect: "none" }} to=''>{cookies?.money ? `Balance: ${cookies?.money}€` : ''}</Link>
                            <Link className="nav-link disabled" style={{ color: "#f1ce99", margin: "0 2%", userSelect: "none" }} to=''>{cookies?.email ? cookies?.email : ''}</Link>
                            <li className="nav-item">
                                <Link className="nav-link active" style={{ color: "white", margin: "-45% 0 0 -30%", userSelect: "none" }} aria-current="page" to='/user/login' onClick={() => logout(setCookies)}>Logout </Link>
                            </li>
                        </>
                        : ''
                    }

                </div>
            </div>
        </nav>
    )
}