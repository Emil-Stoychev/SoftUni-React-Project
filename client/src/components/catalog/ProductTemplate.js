import { useNavigate } from "react-router-dom"

export const Product = ({data}) => {
    const navigate = useNavigate()

    const detailsClickHandler = () => {
        navigate(`/catalog/details/${data._id}`)
    }

    return (
        <div className="col">
            <div className="card">
                <img className='img-fluid img-thumbnail' src={data.images[0].dataString} style={{width: "100%", height: "auto", maxHeight: "38vh"}} alt={data.title + ' image not found'}/>
                <div className="card-body">
                    <h5 className="card-title" style={{ userSelect: "none",fontFamily: "Copperplate Gothic" }}>{data.title}</h5>
                    <p className="card-text" style={{ userSelect: "none" }}><b>Price:</b> {data.price}€</p>
                    <button type="button" className="btn btn-primary" onClick={detailsClickHandler}> Details </button>
                    <button type="button" className="btn btn-outline-primary disabled" style={{ margin: "2%" }}> Likes: {data.likes.length} </button>
                    <button type="button" className="btn btn-outline-primary disabled"> Comments: {data.comments.length} </button>
                </div>
            </div>
        </div>
    )
}