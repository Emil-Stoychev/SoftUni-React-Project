import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import getCookie from "../cookies/getCookie"

export const ErrorSection = () => {
    const cookie = getCookie('sessionStorage')
    const path = window.location.pathname
    const navigate = useNavigate()

    useEffect(() => {
        if(cookie._id && path === '/') {
            return navigate('/catalog')
        }
    })

    let [pathName, name] = pathEngine(cookie, path)

    return (
        <>
            <div style={{ margin: "12%" }}>
                <div className="text-center">
                    <h1 className="display-1 fw-bold" style={{fontFamily: "Copperplate, Papyrus, fantasy" , userSelect: "none" , color: "navajowhite"}}>404</h1>
                    <p className="fs-3" style={{fontFamily: "Copperplate Gothic" , userSelect: "none" , color: "navajowhite"}}> <span className="text-danger" >Opps!</span> Page not found.</p>
                    <p className="lead" style={{userSelect: "none" , color: "navajowhite"}}>
                        The page you’re looking for doesn’t exist.
                    </p>
                    <a href={pathName} className="btn btn-primary">{name}</a>
                </div>
            </div>
        </>
    )
}

function pathEngine(cookie, path) {
    let pathName = ''
    let name = ''

    let guestPaths = ['/', '/user/login', '/user/register']
    let userPaths = ['/catalog/create', '/profile', '/ownProducts', '/likedProducts', '/purchasedProducts']

    if (cookie._id) {
        if (guestPaths.includes(path)) {
            pathName = '/catalog'
            name = 'Go to Catalog'
        } else {
            pathName = '/catalog'
            name = 'Go to Catalog'
        }
    } else {
        if(userPaths.includes(path) || path.startsWith('/catalog/edit/')) {
            pathName = '/user/login'
            name = 'Go to Login'
        } else {
            pathName = '/catalog'
            name = 'Go to Catalog'
        }
    }

    return [pathName, name]
}