export const TypingSection = ({
    onChatSubmitHandler,
    rightSideChats,
    setAction,
    chatTypeMessage,
    onTypeMessageHandler
}) => {
    return (
        <>
            <form onSubmit={onChatSubmitHandler} className="bg-light" >
                <div className="input-group" >
                    {rightSideChats.length > 0
                        ?
                        <>
                            <button
                                type="button"
                                className='btn btn-primary'
                                onClick={() => setAction(state => !state)}
                            >
                                &#128516;
                            </button>

                            <input
                                type="text"
                                placeholder="Type a message"
                                aria-describedby="button-addon2"
                                className="form-control rounded-0 border-0 py-4 bg-muted"
                                value={chatTypeMessage}
                                onChange={onTypeMessageHandler}
                                onClick={() => setAction(false)}
                            />
                            <button id="button-addon2" type="submit" className="btn btn-primary" >
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
        </>
    )
}