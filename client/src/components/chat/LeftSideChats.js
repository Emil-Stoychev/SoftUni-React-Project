export const LeftSideChatsSection = ({ leftSideChats, cookie, onChatClickHandler }) => {
    return (
        <>
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
                                                <span className="name-meta" style={{ fontFamily: 'Cursive' }}>{cookie.email == x.fromEmail ? x.author : x.fromEmail}</span>
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
        </>
    )
}