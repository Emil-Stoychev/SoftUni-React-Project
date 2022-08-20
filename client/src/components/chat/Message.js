export const MessageSection = ({x, i, cookie, setAction}) => {
    return (
        <>
            {x.author == cookie.email
                ?
                <div onClick={() => setAction(false)} style={i == 0 ? { marginTop: "10%" } : {}}>
                    {/* Reciever Message*/}
                    < div className="mediaRight w-50 ml-auto mb-3">
                        <div className="media-body">
                            <div className="bg-primary rounded py-2 px-3 mb-0">
                                <p className="text-small mb-0 text-white">{x.message}</p>
                            </div>
                            <p className="small text-muted">{x.date || '12.12.2012'}</p>
                        </div>
                    </div>
                </div>
                :
                <div onClick={() => setAction(false)} style={i == 0 ? { marginTop: "10%" } : {}}>
                    {/* Sender Message*/}
                    < div className="media w-50 mb-3">
                        <div className="col-sm-8 col-xs-7 heading-name">
                            <a className="heading-name-meta">{x.author}</a>
                        </div>
                        <div className="media-body ml-3">
                            <div className="bg-secondary rounded py-2 px-3 mb-0">
                                <p className="text-small mb-0 text-white">{x.message}</p>
                            </div>
                            <p className="small text-muted">{x.date || '12.12.2012'}</p>
                        </div>
                    </div>
                </div>}
        </>
    )
}