import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../../services/user/authService'
import getCookie from "../../cookies/getCookie";
import { MessageTemplate } from "./MessageTemplate";

export const Messages = () => {
    const [messages, setMessages] = useState([])
    const cookie = getCookie('sessionStorage')

    useEffect(() => {
        authService.getMessages(cookie?._id)
            .then(result => setMessages(result))
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "2% 0 0 0" , fontFamily: "Copperplate Gothic" , userSelect: "none" }}>All messages</h1>
            <button className="btn btn-primary" style={{ margin: "0 3.2%" }} > Sort by date </button>
                        <button className="btn btn-primary" style={{ margin: "0 -2.5%" }} > Sort by read </button>

            {messages.length > 0
                ?
                <div className="row row-cols-1 row-cols-md-1 g-5" style={{ margin: "0 4%" }} >
                    {messages.map(x => <MessageTemplate key={x._id} data={x} cookie={cookie} setMessages={setMessages}/>)}
                </div>
                :
                messages.message || messages.length === 0
                    ?
                    <>
                        <h2 style={{ textAlign: "center", margin: "12% 0 0 0" , userSelect: "none" }}>You don't have messages yet!</h2>
                    </>
                    : <h2 style={{ textAlign: "center", margin: "12% 0 0 0" , userSelect: "none" }}>Loading...</h2>
            }
        </>
    );
};
