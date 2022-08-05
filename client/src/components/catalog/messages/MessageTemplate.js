import { changeMessageStatus } from "../../../services/user/authService"
import { TextError } from "../../error/TextError"
import { isInvalidTokenThenRedirect } from "../../utils/errorRedirect"

export const MessageTemplate = ({ data, cookie, setMessages, navigate, setCookies, setErrors, errors }) => {

    const statusChange = (e) => {
        changeMessageStatus(cookie._id, data._id, cookie.token)
            .then(result => {
                if (result.message) {
                    if (result.message.startsWith('Invalid access')) {
                        isInvalidTokenThenRedirect(navigate, result.message, setCookies, null, setErrors, errors)
                    } else {
                        setErrors(result.message)
                    }
                } else {
                    e.target.parentElement.className = 'alert alert-dark'

                    setMessages(state => state.map(x => {
                        if (x._id === data._id) {
                            x.read = !x.read

                            return x
                        } else {
                            return x
                        }
                    }
                    ))
                }
            })
    }

    let word = data.title.includes('deleted') ? 'DELETED PRODUCT' : data.title.includes('edited') ? 'EDITED PRODUCT' : data.title.includes('created') ? 'CREATED PRODUCT' : data.title.includes('have purchased') ? 'PURCHASED NEW PRODUCT' : data.title.includes('was purchased') ? 'PRODUCT SOLD' : ''

    return (
        <>
            <div className={`alert alert-${data.read ? 'dark' : ' bg-info'}`} role="alert">
                <h4 className="alert-heading">{word}!</h4>
                <p>{data.title}</p>
                <hr />
                <p className="mb-0">Date: {data.date}</p>

                {errors && <TextError message={errors} />}

                {!data.read ? <button className="btn btn-primary" style={{ margin: "1% 0 0 0" }} onClick={statusChange}> Marked as read </button> : ''}
            </div>
        </>
    )
}