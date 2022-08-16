import './styles.css'
import markerImage from './images/marker.png'
import wheelImage from './images/wheel.png'
import buttonImage from './images/button.png'
import { useContext, useEffect, useState } from 'react'
import * as authService from '../../services/user/authService'
import { AuthContext } from '../../contexts/AuthContext'
import getCookie from '../cookies/getCookie'
import getWheelResult from './getWheelResult'

export const DailyWheel = () => {
    let [style, setStyles] = useState({})
    let [wheelOption, setWheelOption] = useState(false)

    let { cookies, setCookies } = useContext(AuthContext)
    let cookie = getCookie('sessionStorage')

    useEffect(() => {
        authService.getWheelStatus(cookie)
            .then(result => {
                setWheelOption(result.option)
            })
    }, [])

    const spinHandler = () => {
        let deg = 0;

        deg = Math.floor(5000 + Math.random() * 5000);

        let wheelResult = getWheelResult(deg)

        let cookie = getCookie('sessionStorage')

        authService.changeWheelStatus(cookie, wheelResult)
            .then(result => {
                if (result.message) {

                } else {
                    cookie.money = Number(result.money)

                    setCookies(cookie)
                }
                setWheelOption(false)
            })

        setStyles({
            transition: 'all 10s ease-out',
            transform: `rotate(${deg}deg)`,
            filter: "blur(1px)"
        })

        setTimeout(() => {
            setStyles(state => ({
                ...state,
                ['filter']: "blur(2px)"
            }))
        }, 8000)

        setTimeout(() => {
            setStyles({
                transform: `rotate(${deg}deg)`,
                filter: "blur(0)"
            })
        }, 10000)

    }

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "3% 0 2% 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>Daily wheel!</h1>
            <div>
                <img className="wheel img-fluid rounded mx-auto d-block" style={style} src={wheelImage} alt='image not found' />
                <img className="marker img-fluid rounded mx-auto d-block" style={{ margin: "-0.9% 0 0 0" }} src={markerImage} alt='image not found' />
                {wheelOption
                    ? <img className="button" src={buttonImage} onClick={spinHandler} alt='image not found' />
                    : <h1 style={{ textAlign: "center", margin: "3% 0 1% 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>Come again tomorrow!</h1>
                }
            </div>
        </>
    )
}