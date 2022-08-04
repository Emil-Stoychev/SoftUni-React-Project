export const CommentSection = () => {
    return (
        <div className="row d-flex justify-content-center" style={{margin: "0 0 2% 0"}}>
            <div className="col-md-8 col-lg-6">
                <div
                    className="card shadow-0 border"
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <div className="card-body p-4">
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="addANote"
                                className="form-control"
                                placeholder="Type comment..."
                            />
                            <label className="form-label" htmlFor="addANote">
                                + Add a note
                            </label>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-start">
                                    <img
                                        className="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                                        alt="avatar"
                                        width={65}
                                        height={65}
                                    />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    Maria Smantha <span className="small">- 2 hours ago</span>
                                                </p>
                                                <a href="#!">
                                                    <span className="small">&#8617; reply</span>
                                                </a>
                                            </div>
                                            <p className="small mb-0">
                                                It is a long established fact that a reader will be distracted by
                                                the readable content of a page.
                                            </p>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img
                                                    className="rounded-circle shadow-1-strong"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                                                    alt="avatar"
                                                    width={65}
                                                    height={65}
                                                />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            Simona Disa <span className="small">- 3 hours ago</span>
                                                        </p>
                                                    </div>
                                                    <p className="small mb-0">
                                                        letters, as opposed to using 'Content here, content here',
                                                        making it look like readable English.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img
                                                    className="rounded-circle shadow-1-strong"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                                    alt="avatar"
                                                    width={65}
                                                    height={65}
                                                />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            John Smith <span className="small">- 4 hours ago</span>
                                                        </p>
                                                    </div>
                                                    <p className="small mb-0">
                                                        the majority have suffered alteration in some form, by injected
                                                        humour, or randomised words.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-start mt-4">
                                    <img
                                        className="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp"
                                        alt="avatar"
                                        width={65}
                                        height={65}
                                    />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    Natalie Smith <span className="small">- 2 hours ago</span>
                                                </p>
                                                <a href="#!">
                                                    <span className="small">&#8617; reply</span>
                                                </a>
                                            </div>
                                            <p className="small mb-0">
                                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                                                below for those interested. Sections 1.10.32 and 1.10.33.
                                            </p>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img
                                                    className="rounded-circle shadow-1-strong"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                                                    alt="avatar"
                                                    width={65}
                                                    height={65}
                                                />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            Lisa Cudrow <span className="small">- 4 hours ago</span>
                                                        </p>
                                                    </div>
                                                    <p className="small mb-0">
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                                                        scelerisque ante sollicitudin commodo. Cras purus odio,
                                                        vestibulum in vulputate at, tempus viverra turpis.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img
                                                    className="rounded-circle shadow-1-strong"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(29).webp"
                                                    alt="avatar"
                                                    width={65}
                                                    height={65}
                                                />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            Maggie McLoan <span className="small">- 5 hours ago</span>
                                                        </p>
                                                    </div>
                                                    <p className="small mb-0">
                                                        a Latin professor at Hampden-Sydney College in Virginia, looked
                                                        up one of the more obscure Latin words, consectetur
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-start mt-4">
                                            <a className="me-3" href="#">
                                                <img
                                                    className="rounded-circle shadow-1-strong"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                                    alt="avatar"
                                                    width={65}
                                                    height={65}
                                                />
                                            </a>
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            John Smith <span className="small">- 6 hours ago</span>
                                                        </p>
                                                    </div>
                                                    <p className="small mb-0">
                                                        Autem, totam debitis suscipit saepe sapiente magnam officiis
                                                        quaerat necessitatibus odio assumenda, perferendis quae iusto
                                                        labore laboriosam minima numquam impedit quam dolorem!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}