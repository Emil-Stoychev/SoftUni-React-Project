import { useEffect, useState } from "react";

import * as authService from '../../../services/user/authService'
import getCookie from "../../cookies/getCookie";
import { MessageTemplate } from "./MessageTemplate";

export const Messages = () => {
    const [messages, setMessages] = useState([])
    const [type, setType] = useState(false)
    const cookie = getCookie('sessionStorage')

    useEffect(() => {
        authService.getMessages(cookie?._id)
            .then(result => {
                setMessages(result)
            })
    }, [])

    const sortByRead = () => {
        if(type) {
            setMessages(messages.sort((a,b) => a.read - b.read));
            setType(!type)
        } else {
            setMessages(messages.sort((a,b) => b.read - a.read));
            setType(!type)
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "2% 0 0 0" , fontFamily: "Copperplate Gothic" , userSelect: "none" , color: "navajowhite" }}>All messages</h1>
            <button className="btn btn-primary" style={{ margin: "0 3.2%" }} onClick={sortByRead}> Sort by read </button>

            {messages.length > 0
                ?
                <div className="row row-cols-1 row-cols-md-1 g-5" style={{ margin: "0 4% 25%" }} >
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
