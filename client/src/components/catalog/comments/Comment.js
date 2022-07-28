export const CommentSection = () => {
    return (
        <>
            <h1 style={{ marginLeft: "25%" }}>BONUS: COMMENTS PAGE</h1>
            <form>
                <div style={{ margin: "0 25% 0 25%" }}>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label"> Email </label>
                        <div className="col-sm-10">
                            <input type="text" readOnly="" className="form-control-plaintext" id="staticEmail" defaultValue="email@example.com" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label"> Comment </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary"> Comment </button>
                </div>
            </form>
        </>
    )
}