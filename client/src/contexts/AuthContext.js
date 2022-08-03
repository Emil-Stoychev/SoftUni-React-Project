import { createContext, useEffect, useState } from "react";
import getCookie from "../components/cookies/getCookie";

export const AuthContext = createContext()

export const AuthContextProvider = ({
    children,
}) => {
    const [cookies, setCookies] = useState('')

    useEffect(() => {
      let cookie = getCookie('sessionStorage')
  
      if (cookie._id) {
        setCookies(cookie)
      }
  
    }, [])


    return (
        <AuthContext.Provider value={{cookies, setCookies}}>
            {children}
        </AuthContext.Provider>
    )
}