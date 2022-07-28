import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../../../services/user/authService'
import getCookie from '../../cookies/getCookie'

export const ProfileSection = () => {
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    
    const cookie = getCookie('sessionStorage')

    useEffect(() => {
        authService.getUserById(cookie._id)
            .then(result => setUser(result))
    }, [])

    return (
        <>
            <h1 style={{ marginLeft: "40%" }}>PROFILE PAGE</h1>
            <div className="card" style={{ width: "32rem", margin: "0 0 0 34%" }}>
                <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" className="card-img-top" alt="user-image" />
                <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}> {user?.email?.split('@')[0]} </h5>
                    <p className="card-text">Email: {user?.email}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Money: {user?.money}€</li>
                    <li className="list-group-item"> Own products: {user?.ownProducts?.length}{" "}
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "52%" }} onClick={() => navigate('/ownProducts')}> Click to see </button>
                    </li>
                    <li className="list-group-item"> Purchased products: {user?.purchasedProducts?.length}{" "}
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "43.6%" }} onClick={() => navigate('/purchasedProducts')}> Click to see </button>
                    </li>
                    <li className="list-group-item"> Liked products: {user?.likedProducts?.length}{" "}
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "51%" }} onClick={() => navigate('/likedProducts')}> Click to see </button>
                    </li>
                </ul>
            </div>
        </>
    )
}