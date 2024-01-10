import { Link } from "react-router-dom"

function EmptyCart(params) {

    return (
        <>
            <div className="b-radius padded-30 bg-grey cart-elements-wrapper">
                <div className="not-found-products-msg white-bg mt-5">
                    <div className="white placeholder-block placeholder-block--empty-cart mt-20 mb-20">
                        <i className="fas fa-shopping-cart"></i>
                        <p>السلة فارغة</p>
                    </div>
                    <Link to="/product" className="btn btn--wide btn--padded btn--oval btn--primary">
                        عودة للرئيسية
                    </Link>
                </div>
            </div>
        </>
    )
}


export default EmptyCart