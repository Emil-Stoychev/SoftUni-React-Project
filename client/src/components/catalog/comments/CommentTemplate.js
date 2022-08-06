export const CommentTemplateSection = ({cookies, data}) => {
    return (
        <>
            <div className="d-flex flex-start">
                <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width={65} height={65} />
                <div className="flex-grow-1 flex-shrink-1">
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1"> {data.email.split('@')[0]} <span className="small">- {data.date}</span></p>

                            {cookies._id == data.authorId &&
                                <div>
                                    <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                        <span className="small" >&#8617; reply</span>
                                    </a>
                                    <a href="#!" >
                                        <span className="small">&#9998; edit</span>
                                    </a>
                                </div>
                            }

                        </div>
                        <p className="small mb-0">{data.title}</p>
                    </div>

                    {/* NESTED COMMENTS */}
                    {/* <div className="d-flex flex-start mt-4">
                                                    <a className="me-3" href="#">
                                                        <img className="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar" width={65} height={65} />
                                                    </a>
                                                    <div className="flex-grow-1 flex-shrink-1">
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="mb-1">
                                                                    Simona Disa <span className="small">- 3 hours ago</span>
                                                                </p>

                                                                {cookies.token &&
                                                                    <div>
                                                                        <a href="#!" style={{ margin: "0 30% 0 -80%" }}>
                                                                            <span className="small" >&#8617; reply</span>
                                                                        </a>
                                                                        <a href="#!" >
                                                                            <span className="small">&#9998; edit</span>
                                                                        </a>
                                                                    </div>
                                                                }

                                                            </div>
                                                            <p className="small mb-0">
                                                                letters, as opposed to using 'Content here, content here',
                                                                making it look like readable English.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> */}

                </div>
            </div>
        </>
    )
}