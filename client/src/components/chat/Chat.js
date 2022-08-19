import { useContext, useEffect, useState } from "react"
import "./Chat.css"

import * as authService from '../../services/user/authService'
import getCookie from "../cookies/getCookie"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { isInvalidTokenThenRedirect } from "../utils/errorRedirect"

export const ChatSection = () => {
    let [searchValue, setSearchValue] = useState('')
    let [chatTypeMessage, setChatTypeMessage] = useState('')
    let [defaultChats, setDefaultChats] = useState([])
    let [leftSideChats, setLeftSideChats] = useState([])
    let [rightSideChats, setRightSideChats] = useState([])
    let [chatRenderingId, setChatRenderingId] = useState('')
    let [errors, setErrors] = useState('')
    let navigate = useNavigate()

    let cookie = getCookie('sessionStorage')
    let { cookies, setCookies } = useContext(AuthContext)

    useEffect(() => {
        authService.getAllChats(cookie._id)
            .then(result => {
                setLeftSideChats(result)
                setDefaultChats(result)
            })
    }, [])

    const onChangeSearchValueHandler = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        if (searchValue.length == 0) {
            setLeftSideChats(defaultChats)
        } else {
            setLeftSideChats(state => state.filter(x => {
                if (cookie.email == x.fromEmail) {
                    return x.author.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                } else {
                    return x.fromEmail.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                }
            }))
        }
    }, [searchValue])

    const onChatClickHandler = (chatId) => {
        let chat = leftSideChats.find(x => x._id === chatId)

        setRightSideChats(chat.messages)
    }

    const onTypeMessageHandler = (e) => {
        setChatTypeMessage(e.target.value)
    }

    const onChatSubmitHandler = (e) => {
        e.preventDefault()

        if (chatTypeMessage === '' || chatTypeMessage.trim() === '') {
            setChatTypeMessage('')
        } else {
            let parentChatId = rightSideChats[0].parentChatId

            authService.addToChat(chatTypeMessage, cookies, parentChatId)
                .then(result => {
                    if (!result._id) {
                        if (result.message.startsWith('Invalid access') || result.message.startsWith('Chat doesn')) {
                            isInvalidTokenThenRedirect(navigate, result.message, setCookies, null, setErrors, errors)
                        }
                    } else {
                        setChatTypeMessage('')

                        setRightSideChats(state => [...state, result])
                    }
                })
        }
    }


    // function start(chatId) {
    //     if (window.location.pathname != '/chat') {
    //         return
    //     }

    // console.log(chatRenderingId);

    //     setTimeout(function () {
    //         authService.getChatById(chatId)
    //             .then(result => {
    //                 setRightSideChats(result.messages);
    //             })

    //         start(chatId);
    //     }, 3500);
    // }

    return (
        <>
            <section style={{ margin: "3% auto 4% 15%" }}>
                <div className="row rounded-lg overflow-hidden" style={{ '--bs-gutter-x': 0 }}>

                    {/* Users box*/}
                    <div className="col-2 px-0">
                        <div className="bg-white">
                            <div className="bg-gray px-4 py-2 bg-light">
                                <p className="h5 mb-0 py-1">Recent</p>
                            </div>

                            {/* Search */}
                            <div className="row searchBox">
                                <div className="col-sm-12 searchBox-inner">
                                    <div className="form-group has-feedback">
                                        <input
                                            id="searchText"
                                            type="text"
                                            className="form-control"
                                            name="searchText"
                                            placeholder="Search"
                                            value={searchValue}
                                            onChange={onChangeSearchValueHandler}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="messages-box">
                                <div className="list-group rounded-0">
                                    <div className="row sideBar">

                                        {leftSideChats.length > 0
                                            ?
                                            leftSideChats.map(x =>
                                                <div className="row sideBar-body" key={x._id} onClick={() => onChatClickHandler(x._id)}>
                                                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                        <div className="avatar-icon">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9 col-xs-9 sideBar-main">
                                                        <div className="row">
                                                            <div className="col-sm-8 col-xs-8 sideBar-name">
                                                                <span className="name-meta">{cookie.email == x.fromEmail ? x.author : x.fromEmail}</span>
                                                            </div>
                                                            <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                                                                <span className="time-meta pull-right">{x.date.split(' г.,')[1]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : <h6 style={{ textAlign: "center", fontFamily: "Copperplate Gothic", userSelect: "none", color: "grey" }}>No chats found</h6>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Box*/}
                    <div className="col-7 px-0">

                        <div className="px-4 py-4 chat-box bg-white" style={{ minHeight: "90%", maxHeight: "100%" }}>

                            {rightSideChats.length > 0
                                ?
                                rightSideChats.map(x =>
                                    x.author == cookie.email
                                        ?
                                        <div key={x._id}>
                                            {/* Reciever Message*/}
                                            < div className="mediaRight w-50 ml-auto mb-3">
                                                <div className="media-body">
                                                    <div className="bg-primary rounded py-2 px-3 mb-2">
                                                        <p className="text-small mb-0 text-white">{x.message}</p>
                                                    </div>
                                                    <p className="small text-muted">{x.date || '12.12.2012'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div key={x._id}>
                                            {/* Sender Message*/}
                                            < div className="media w-50 mb-3">
                                                <div className="col-sm-8 col-xs-7 heading-name">
                                                    <a className="heading-name-meta">{x.author}</a>
                                                </div>
                                                <div className="media-body ml-3">
                                                    <div className="bg-secondary rounded py-2 px-3 mb-2">
                                                        <p className="text-small mb-0 text-white">{x.message}</p>
                                                    </div>
                                                    <p className="small text-muted">{x.date || '12.12.2012'}</p>
                                                </div>
                                            </div>
                                        </div>
                                )
                                : <h3 style={{ textAlign: "center", fontFamily: "Copperplate Gothic", userSelect: "none", color: "grey" }}>Click some chat</h3>
                            }

                        </div>

                        {/* Typing area */}
                        <form onSubmit={onChatSubmitHandler} className="bg-light" >
                            <div className="input-group" >
                                {rightSideChats.length > 0
                                    ?
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Type a message"
                                            aria-describedby="button-addon2"
                                            className="form-control rounded-0 border-0 py-4 bg-muted"
                                            value={chatTypeMessage}
                                            onChange={onTypeMessageHandler}
                                        />
                                        <button id="button-addon2" type="submit" className="btn btn-link" >
                                            <i className="fa fa-paper-plane" />
                                        </button>
                                    </>
                                    :
                                    <>
                                        <br />
                                        <br />
                                        <br />
                                    </>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            </section >
        </>
    )
}