import { useContext, useEffect, useState } from 'react'
import './styles.css'

import markerImage from './images/marker.png'
import wheelImage from './images/wheel.png'
import buttonImage from './images/button.png'
import cloudImage from './images/cloud.png'
import heartImage from './images/heart.png'
import hipnosaImage from './images/hipnosa.png'
import kissImage from './images/kiss.png'
import lollipopImage from './images/lollipop.png'
import moonImage from './images/moon.png'
import rainbowImage from './images/rainbow.png'
import starImage from './images/star.png'

import * as authService from '../../services/user/authService'
import { AuthContext } from '../../contexts/AuthContext'
import getCookie from '../cookies/getCookie'
import getWheelResult from './getWheelResult'
import getWheelSurprise from './getWheelSurprise'

export const DailyWheel = () => {
    let [style, setStyles] = useState({})
    let [wheelOption, setWheelOption] = useState(false)
    let [surprise, setSurprise] = useState('')

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

        let surprise = getWheelSurprise(wheelResult)

        let cookie = getCookie('sessionStorage')

        authService.changeWheelStatus(cookie, wheelResult)
            .then(result => {
                if (result.message) {

                } else {
                    let sessionCookie = cookie
                    sessionCookie.money = Number(result.money)

                    setCookies(sessionCookie)
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

            setSurprise(surprise)
        }, 10000)

    }

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "3% 0 2% 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>Daily wheel!</h1>
            <div>
                <img className="wheel img-fluid rounded mx-auto d-block" style={style} src={wheelImage} alt='image not found' />
                <img className="marker img-fluid rounded mx-auto d-block" style={{ margin: "-0.9% 0 0 0" }} src={markerImage} alt='image not found' />

                {surprise && <h1 style={{ textAlign: "center", margin: "3% 0 1% 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>Congrats: {surprise}€</h1>}

                {wheelOption
                    ? <img className="button" src={buttonImage} onClick={spinHandler} alt='image not found' />
                    : <h1 style={{ textAlign: "center", margin: "3% 0 1% 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>Come again tomorrow!</h1>
                }
            </div>

            <h1 style={{ textAlign: "center", margin: "5% 0 1% 0", fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}>Possible prices</h1>

            <div className="row" style={{margin: '1%'}}>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={starImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Star</p>
                                    <p className="text-muted mb-0">100€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={hipnosaImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Hipnosa</p>
                                    <p className="text-muted mb-0">50€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={rainbowImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Rainbow</p>
                                    <p className="text-muted mb-0">40€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={cloudImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Cloud</p>
                                    <p className="text-muted mb-0">35€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={lollipopImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Lollipop</p>
                                    <p className="text-muted mb-0">30€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={heartImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Heart</p>
                                    <p className="text-muted mb-0">25€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={kissImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Kiss</p>
                                    <p className="text-muted mb-0">15€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={moonImage}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Moon</p>
                                    <p className="text-muted mb-0">10€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}