export const IntroduceSection = () => {
    return (
        <>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light" style={{userSelect: 'none'}}>Welcome to our store</h1>
                        <p className="lead text-muted" style={{userSelect: 'none'}}>
                            You can find all in our store and we have good news for you, Every new register user will receive a 100€ and you will be able to use them for whatever you want! <br /> What are you waiting for?
                        </p>
                        <p>
                            <a href="/user/login" className="btn btn-primary my-2" style={{ margin: "2%" }}>Login</a>
                            <a href="/user/register" className="btn btn-secondary my-2">Register</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}