import { useEffect } from "react"

export const ErrorSection = () => {

    useEffect(() => {
        window.onload = window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div style={{ margin: "12%" }}>
                <div className="text-center">
                    <h1 className="display-1 fw-bold" style={{ fontFamily: "Copperplate, Papyrus, fantasy", userSelect: "none", color: "navajowhite" }}>404</h1>
                    <p
                        className="fs-3"
                        style={{ fontFamily: "Copperplate Gothic", userSelect: "none", color: "navajowhite" }}
                    >
                        <span
                            className="text-danger"
                        >Opps!
                        </span>
                        Page not found.
                    </p>
                    <p className="lead" style={{ userSelect: "none", color: "navajowhite" }}>
                        The page you’re looking for doesn’t exist.
                    </p>
                    <a href='/catalog' className="btn btn-primary" style={{ margin: "0 0 5% 0" }}>Go to Catalog</a>
                </div>
            </div>
        </>
    )
}