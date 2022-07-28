export const CommentTemplateSection = () => {
    return (
        <>
            <h1 style={{ marginLeft: "25%" }}> Comment from {"{"}username{"}"} </h1>
            <div style={{ margin: "0 25% 0 25%" }}>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label"> peter@abv.bg </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="colFormLabel" disabled="" />
                        <button type="submit" className="btn btn-primary"> Edit </button>
                        <button type="submit" className="btn btn-primary"> Delete </button>
                    </div>
                </div>
            </div>
        </>
    )
}