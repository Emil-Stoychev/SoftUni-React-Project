import { Navigate, Outlet } from "react-router-dom";
import getCookie from "../components/cookies/getCookie";

const PrivateRoutes = () => {
    if(!getCookie('sessionStorage').token) {
        return <Navigate to={'/user/login'} replace/>
    }

    return <Outlet />
}

export default PrivateRoutes