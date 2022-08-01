export const Footer = () => {
    return (
        <footer className="navbar-fixed-bottom bg-dark text-center text-white">
            <div className="container p-4 pb-0">
                <section className="mb-4">
                    {/* Facebook */}
                    <a
                        className="btn btn-outline-light btn-floating m-1"
                        href="https://www.facebook.com/profile.php?id=100010478416709"
                        role="button"
                        target="_blank"
                    >
                        <i className="fa fa-facebook" style={{margin: "4px 4px 4px 4px"}} />
                    </a>

                    {/* Instagram */}
                    <a
                        className="btn btn-outline-light btn-floating m-1"
                        href="https://www.instagram.com/emil.stoichev/"
                        role="button"
                        target="_blank"
                    >
                        <i className="fa fa-instagram" style={{margin: "4px 4px 4px 4px"}}/>
                    </a>

                    {/* Github */}
                    <a
                        className="btn btn-outline-light btn-floating m-1"
                        href="https://github.com/Emil-Stoychev"
                        role="button"
                        target="_blank"
                    >
                        <i className="fa fa-github" style={{margin: "4px 4px 4px 4px"}}/>
                    </a>
                </section>
            </div>
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", userSelect: "none" }}
            >
                © 2022 Copyright
                <br />
                <a style={{ color: "white", userSelect: "none" }}>Made by Emil Stoychev</a>
            </div>
        </footer>
    )
}