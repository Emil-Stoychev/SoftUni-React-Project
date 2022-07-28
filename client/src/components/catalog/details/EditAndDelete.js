import { useNavigate } from "react-router-dom"

export const EditAndDelete = ({ onDeleteClickHandler, product }) => {
    const navigate = useNavigate()

    return (
        <>
            <button type="button" className="btn btn-primary" style={{ margin: "0 1% 0 0" }} onClick={() => navigate(`/catalog/edit/${product._id}`)}> Edit </button>
            <button type="button" className="btn btn-primary" style={{ margin: "0 1% 0 0" }} onClick={() => onDeleteClickHandler('delete', true)} > Delete </button>
            <button type="button" className="btn btn-outline-primary disabled" style={{ margin: "0 1% 0 0" }}> Likes: {product?.likes.length} </button>
        </>
    )
}