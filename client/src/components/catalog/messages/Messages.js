import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../../services/user/authService'
import getCookie from "../../cookies/getCookie";
import { MessageTemplate } from "./MessageTemplate";

export const Messages = () => {
    const [messages, setMessages] = useState([])
    const cookie = getCookie('sessionStorage')
    const navigate = useNavigate()

    useEffect(() => {
        authService.getMessages(cookie?._id)
            .then(result => setMessages(['1', '2', '3', '1', '2', '3']))
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "2% 0 0 0" }}>All messages</h1>

            {messages.length > 0
                ?
                <div className="row row-cols-1 row-cols-md-1 g-5" style={{ margin: "0 4%" }} >
                    {messages.map(x => <MessageTemplate key={x._id} data={x} />)}
                </div>
                :
                messages.message || messages.length === 0
                    ?
                    <>
                        <h2 style={{ textAlign: "center", margin: "12% 0 0 0" }}>You don't have messages yet!</h2>
                    </>
                    : <h2 style={{ textAlign: "center", margin: "12% 0 0 0" }}>Loading...</h2>
            }
        </>
    );
};
