import removeCookie from "../cookies/removeCookie"

export const likeErrorRedirect = (navigate, message, setCookies, setUser, setErrors, errors) => {
    removeCookie('sessionStorage')
    setCookies('')
    setUser('')
    setErrors(message + ' Automatically redirect after 3 seconds!')

    if(!errors.includes('Automatically redirect after 3 seconds!')) {
        setTimeout(() => {
            setErrors('')
            return navigate('/user/login', { replace: true })
        }, 3000);
    }
}