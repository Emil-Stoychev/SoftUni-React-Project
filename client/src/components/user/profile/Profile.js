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
            <h1 style={{ textAlign: "center", userSelect: "none", fontFamily: "Copperplate Gothic", color: "navajowhite", marginTop: '2%' }}>PROFILE</h1>
            <div className="row d-flex justify-content-center" style={{margin: '0 0 2% 0'}}>
                <div className="card col-md-8 col-lg-6" style={{ width: "36rem"}}>
                    <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" className="card-img-top" alt="user-image" />
                    <div className="card-body">
                        <h5 className="card-title" style={{ textAlign: "center" }}> {user?.email?.split('@')[0]} </h5>
                        <p className="card-text">Email: {user?.email}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Money: {user?.money}€</li>
                        <li className="list-group-item"> Own products: {user?.ownProducts?.length}{" "}
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "47%" }} onClick={() => navigate('/ownProducts')}> Click to see </button>
                        </li>
                        <li className="list-group-item"> Your messages: {user?.messages?.length}{" "}
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "46%" }} onClick={() => navigate('/messages')}> Click to see </button>
                        </li>
                        <li className="list-group-item"> Liked products: {user?.likedProducts?.length}{" "}
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "46%" }} onClick={() => navigate('/likedProducts')}> Click to see </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}