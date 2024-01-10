import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cart } from "../App";

function SuccessCheckout(params) {
    const [getCart, setCart] = useRecoilState(cart);

    useEffect(() => {
        setCart([])
    }, [])

    return (
        <>
            <div className="card text-center" style={{ borderRadius: "4px", display: "block", padding: "60px", background: "#FFF", margin: "0 auto", border: "none" }}>
                <div style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                    <i className="checkmark" style={{ color: "#9ABC66", fontSize: "100px", lineHeight: "200px", marginLeft: "-15px" }}>✓</i>
                </div>
                <h1 className="mt-4" style={{ color: "#88B04B", fontSize: "40px", fontWeight: "900", marginBottom: "10px", fontFamily: "'Nunito Sans', 'Helvetica Neue', sans-serif" }}>Success</h1>
                <p style={{ color: "#404F5E", fontFamily: "'Nunito Sans', 'Helvetica Neue', sans-serif", fontSize: "20px", margin: "0" }}>
                    We received your purchase request<br /> we'll be in touch shortly
                </p>
            </div>
        </>
    )
}

export default SuccessCheckout