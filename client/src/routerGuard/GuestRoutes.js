import { Navigate, Outlet } from "react-router-dom";
import getCookie from "../components/cookies/getCookie";

const GuestRoutes = () => {
    if(getCookie('sessionStorage').token) {
        return <Navigate to={'/catalog'} replace/>
    }

    return <Outlet />
}

export default GuestRoutes