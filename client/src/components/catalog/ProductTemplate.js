import { useNavigate } from "react-router-dom"

export const Product = ({data}) => {
    const navigate = useNavigate()

    const detailsClickHandler = () => {
        navigate(`/catalog/details/${data._id}`)
    }

    return (
        <div className="col">
            <div className="card">
                <img src={data.imageUrl} style={{width: "50%", height: "250px", display: "block", margin: "auto"}} alt={data.title + ' image not found'}/>
                <div className="card-body">
                    <h5 className="card-title" style={{ userSelect: "none" }}>{data.title}</h5>
                    <p className="card-text" style={{ userSelect: "none" }}>Price: {data.price}€</p>
                    <button type="button" className="btn btn-primary" onClick={detailsClickHandler}> Details </button>
                    <button type="button" className="btn btn-outline-primary disabled" style={{ margin: "2%" }}> Likes: {data.likes.length} </button>
                </div>
            </div>
        </div>
    )
}