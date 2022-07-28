import { useNavigate } from "react-router-dom"

export const ProductTemplate = ({data}) => {
    const navigate = useNavigate()

    const onDetailsHandler = () => {
        navigate(`/catalog/details/${data._id}`)
    }

    return (
        <>
            <div className="col">
                <div className="card shadow-sm">
                    <img src={data.imageUrl} style={{width: "50%", height: " 200px", display: "block", margin: "auto"}} alt={data.title + ' image not found'}/>
                    <div className="card-body">
                        <p className="card-text" style={{userSelect: 'none'}}>Price: {data.price}€</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onDetailsHandler}> View </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}