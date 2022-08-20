import { Link } from "react-router-dom"
import Picker from 'emoji-picker-react'
import { useEffect } from "react"
import { MessageSection } from "./Message"
import { TypingSection } from "./TypingArea"


export const RightSideChatsSection = ({
    mainChatDiv,
    productInfo,
    rightSideChats,
    cookie,
    setAction,
    action,
    onEmojiClick,
    onChatSubmitHandler,
    chatTypeMessage,
    onTypeMessageHandler,
}) => {

    useEffect(() => {
        mainChatDiv.current.scrollTo(0, mainChatDiv.current.scrollHeight)
    }, [action])

    return (
        <>
            <div className="col-7 px-0" >

                <div ref={mainChatDiv} className="px-4 py-4 chat-box bg-white" style={{ minHeight: "90%", maxHeight: "100%" }}>

                    {productInfo?.productId &&
                        <div
                            style={{
                                opacity: 0.8,
                                borderWidth: "10px",
                                borderColor: "#D3D3D3",
                                borderStyle: "solid",
                                width: "43%",
                                position: "absolute",
                                backgroundColor: "#D3D3D3",
                                borderRadius: "1rem"
                            }}
                        >
                            <h2 style={{ color: "#192e60", userSelect: "none", fontFamily: 'Copperplate Gothic' }}>
                                {productInfo?.productTitle}
                                <Link
                                    to={`/catalog/details/${productInfo?.productId}`}
                                    className="btn btn-primary"
                                    style={{
                                        display: "table",
                                        marginTop: "-35px",
                                        marginLeft: "auto",
                                        marginRight: "0"
                                    }}
                                >
                                    Show
                                </Link>
                            </h2>
                        </div>
                    }

                    {rightSideChats.length > 0
                        ?
                        rightSideChats.map((x, i) =>
                            <MessageSection
                                key={x._id}
                                x={x}
                                i={i}
                                cookie={cookie}
                                setAction={setAction}
                            />
                        )
                        : <h3
                            style={{
                                textAlign: "center",
                                fontFamily: "Copperplate Gothic",
                                userSelect: "none",
                                color: "grey"
                            }}
                        >
                            Click some chat
                        </h3>
                    }

                    {action &&
                        <div onClick={() => setAction(false)}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    }

                </div>


                {/* Typing area */}
                <TypingSection
                    onChatSubmitHandler={onChatSubmitHandler}
                    rightSideChats={rightSideChats}
                    setAction={setAction}
                    chatTypeMessage={chatTypeMessage}
                    onTypeMessageHandler={onTypeMessageHandler}
                />

            </div>
        </>
    )
}