import { useContext, useEffect, useRef, useState } from "react"
import "./Chat.css"


import * as authService from '../../services/user/authService'
import getCookie from "../cookies/getCookie"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { isInvalidTokenThenRedirect } from "../utils/errorRedirect"
import { SearchSection } from "./Search"
import { LeftSideChatsSection } from "./LeftSideChats"
import { RightSideChatsSection } from "./RightSideChats"

export const ChatSection = () => {
    const [searchValue, setSearchValue] = useState('')
    const [chatTypeMessage, setChatTypeMessage] = useState('')
    const [defaultChats, setDefaultChats] = useState([])
    const [leftSideChats, setLeftSideChats] = useState([])
    const [rightSideChats, setRightSideChats] = useState([])
    const [productInfo, setProductInfo] = useState({
        productTitle: "",
        productId: "",
    })
    const [action, setAction] = useState(false)
    const [errors, setErrors] = useState('')
    let navigate = useNavigate()

    window.onload = window.scrollTo(0, 0)

    let mainChatDiv = useRef(null)

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

    const onEmojiClick = (event, emojiObject) => {
        setChatTypeMessage(state => state + emojiObject.emoji)
    }

    useEffect(() => {
        mainChatDiv.current.scrollTo(0, mainChatDiv.current.scrollHeight)
    }, [rightSideChats])

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

        setProductInfo({
            productTitle: chat.productTitle,
            productId: chat.productId
        })
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
            <section style={{ margin: "3% auto 4% 15%" }} >
                <div className="row rounded-lg overflow-hidden" style={{ '--bs-gutter-x': 0 }}>

                    {/* Users box*/}
                    <div className="col-2 px-0" onClick={() => setAction(false)}>
                        <div className="bg-white">
                            <div className="bg-gray px-4 py-2 bg-light">
                                <p className="h5 mb-0 py-1" style={{ fontFamily: 'Copperplate Gothic' }}>Recent</p>
                            </div>

                            {/* Search */}
                            <SearchSection
                                searchValue={searchValue}
                                onChangeSearchValueHandler={onChangeSearchValueHandler}
                            />

                            {/* Users Box*/}
                            <LeftSideChatsSection
                                leftSideChats={leftSideChats}
                                cookie={cookie}
                                onChatClickHandler={onChatClickHandler}
                            />

                        </div>
                    </div>

                    {/* Chat Box*/}
                    <RightSideChatsSection
                        mainChatDiv={mainChatDiv}
                        productInfo={productInfo}
                        rightSideChats={rightSideChats}
                        cookie={cookie}
                        setAction={setAction}
                        action={action}
                        onEmojiClick={onEmojiClick}
                        onChatSubmitHandler={onChatSubmitHandler}
                        chatTypeMessage={chatTypeMessage}
                        onTypeMessageHandler={onTypeMessageHandler}
                    />

                </div>
            </section >
        </>
    )
}