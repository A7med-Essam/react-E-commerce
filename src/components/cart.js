import { useRecoilState } from "recoil";
import { cart } from "../App";
import EmptyCart from "./emptyCart";
import CartItems from "./cartItems";

function Cart(params) {
    const [getCart, setCart] = useRecoilState(cart);


    return (
        <>
            <section className="page-wrapper page--cart">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-progress d-flex justify-content-between align-items-center">
                                <div className="step step-1 is-active">
                                    <span className="step__icon">
                                        <i className="fas fa-shopping-cart"></i>
                                        <span className="badge badge--small badge--circular badge--danger quantity d-flex justify-content-center align-items-center"
                                            id="cart-items-count-badge">{getCart.length}</span>
                                    </span>
                                    <div className="step__title">
                                        <h3 className="title">سلة المشتريات</h3>
                                        <span className="font-sm color-muted">الخطوة الاولى</span>
                                    </div>
                                </div>
                                <div className="step step-2">
                                    <span className="step__icon">
                                        <i className="fas fa-wallet"></i>
                                    </span>
                                    <div className="step__title">
                                        <h3 className="title">اتمام الطلب</h3>
                                        <span className="font-sm color-muted">الخطوة الثانية</span>
                                    </div>
                                </div>
                            </div>
                            {getCart.length ? <CartItems /> : <EmptyCart />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Cart