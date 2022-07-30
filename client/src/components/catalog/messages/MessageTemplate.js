import { changeMessageStatus } from "../../../services/user/authService"

export const MessageTemplate = ({data, cookie, setMessages}) => {

    const statusChange = (e) => {
        e.target.parentElement.className = 'alert alert-dark'

        changeMessageStatus(cookie._id, data._id, cookie.token)
            .then(result => setMessages(state => state.map(x => {
                if(x._id === data._id) {
                    x.read = !x.read

                    return x
                } else {
                    return x
                }
            })))
    }

    return (
        <>
            <div className={`alert alert-${data.read ? 'dark' : 'success'}`} role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p>{data.title}</p>
                <hr />
                <p className="mb-0">Date: {data.date}</p>
                {!data.read ? <button className="btn btn-primary" onClick={statusChange}> Marked as read </button> : ''}
            </div>
        </>
    )
}