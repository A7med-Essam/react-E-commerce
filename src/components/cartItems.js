import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil";
import { cart } from "../App";

function CartItems(params) {
    const [getCart, setCart] = useRecoilState(cart);
    const [getTotalPrice, setTotalPrice] = useState();
    useEffect(() => {
        const total = getCart.reduce((accumulator, product) => accumulator + (product.price * product.qty), 0);
        setTotalPrice(total)
    }, [getCart])


    function increaseQty(id) {
        if (getCart.some(p => p.productId == id)) {
            setCart(prevCart => {
                const updatedCart = prevCart.map(p => {
                    if (p.productId == id) {
                        return { ...p, qty: p.qty + 1 };
                    }
                    return p;
                });
                localStorage.setItem('sp-cart', JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    }

    function decreaseQty(id) {
        if (getCart.some(p => p.productId == id)) {
            setCart(prevCart => {
                const updatedCart = prevCart.map(p => {
                    if (p.productId == id) {
                        return { ...p, qty: p.qty > 1 ? p.qty - 1 : 1};
                    }
                    return p;
                });
                localStorage.setItem('sp-cart', JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    }

    function removeItem(id) {
        if (getCart.some(p => p.productId === id)) {
            setCart(prevCart => {
                const updatedCart = prevCart.filter(p => p.productId !== id);
                localStorage.setItem('sp-cart', JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    }


    return (
        <>
            <div className="b-radius padded-30 bg-grey cart-elements-wrapper">
                <ul className="list list--table borderless cart-details">
                    <li className="list--table__head bg-white b-radius">
                        <div>
                            <span>المنتج</span>
                        </div>
                        <div>
                            <span className="text-center">
                                السعر
                            </span>
                            <span className="text-center">
                                الكمية
                            </span>
                            <span className="text-center">
                                المجموع
                            </span>
                            <span className="delete-item"></span>
                        </div>
                    </li>

                    {
                        getCart.map((res) => {
                            return (<li key={res.productId} className="cart-product-entry padded-10 bg-white b-radius mb-30">
                                <div className="wide form">
                                    <div className="product-block product-block--inline">
                                        <div className="product-block__thumb center">
                                            <Link className="d-flex" to={"../product/"+res.productId}>
                                                <span
                                                    className="avatar-wrapper avatar-wrapper--bordered avatar-wrapper--circular avatar-wrapper--small placeholder">
                                                    <img className="loaded" alt="لاقط الماني حساس بايرديناميك TGV-50S"
                                                        src="https://cdn.salla.sa/vlPz/AtOutShFtNHX5ADPwDaxxGaLhG5JeEWSPvmgx28x.jpg" />
                                                </span>
                                                <span>
                                                    <h6 className="title title--small">
                                                        {res.name}
                                                    </h6>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="product-block__info">
                                            <span className=" cart-item-price" data-title="السعر">
                                                {res.price} EGP
                                            </span>
                                            <span data-title="الكمية">
                                                <salla-quantity-input
                                                    className="transtion transition-color duration-300 s-quantity-input hydrated"
                                                    value="1" name="quantity">
                                                    <div className="s-quantity-input-container">
                                                        <button onClick={()=>{increaseQty(res.productId)}}
                                                            className="s-quantity-input-increase-button s-quantity-input-button"><span>
                                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                    width="32" height="32" viewBox="0 0 32 32">
                                                                    <title>add</title>
                                                                    <path
                                                                        d="M26.667 14.667h-9.333v-9.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333v9.333h-9.333c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h9.333v9.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-9.333h9.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                        <input className="s-quantity-input-input" value={res.qty} name="quantity" min="1" readOnly />
                                                        <button onClick={()=>{decreaseQty(res.productId)}}
                                                            className="s-quantity-input-decrease-button s-quantity-input-button">
                                                            <span>
                                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                    width="32" height="32" viewBox="0 0 32 32">
                                                                    <title>minus</title>
                                                                    <path
                                                                        d="M26.667 14.667h-21.333c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h21.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </salla-quantity-input>
                                            </span>
                                            <span className="font-bold text-left cart-item-total" data-title="المجموع">
                                                {res.price * res.qty} EGP
                                            </span>
                                            <span className="delete-entry">
                                                <button onClick={()=>{removeItem(res.productId)}}
                                                    className="btn--delete s-button-element s-button-icon s-button-solid s-button-small s-button-danger s-button-loader-center">
                                                    <span className="s-button-text">
                                                        <i className="fas fa-times-circle"></i>
                                                    </span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            )
                        })
                    }



                    <li className="total padded-20 bg-white b-radius mb-5">
                        <div className="wide no-p summary">
                            <div className="form form--coupon">
                                <div className="form-group">
                                    <input placeholder="ادخل كود الخصم" className="form-control coupone-code__input" readOnly
                                        id="coupon-input" name="coupon" type="text" value="" />
                                    <span id="coupon-error"></span>
                                    <div id="coupon-submit"
                                        className="coupone-code__submit has-not-coupon s-button-wrap hydrated">
                                        <button
                                            className="coupone-code__submit has-not-coupon s-button-element s-button-btn s-button-solid s-button-primary s-button-loader-center">
                                            <span className="s-button-text">
                                                <span className="coupon-text">إضافة</span>
                                                <i className="sicon-cancel icon"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0 mb-0">
                                <span className="text-right">عدد الأصناف</span>
                                <span id="cart-items-count" data-cart-count="">{getCart.length}</span>
                            </div>
                            <div className="sub-total">
                                <span className="text-right">مجموع المنتجات</span>
                                <span id="cart-sub-total">{getTotalPrice} EGP</span>
                            </div>
                            <div className="shipping ">
                                <span className="text-right">تكلفة الشحن</span>
                                <span id="cart-shipping-cost">0 EGP</span>
                            </div>
                            <div className="discount ">
                                <span className="text-right">الخصم</span>
                                <span id="cart-total-discount">- 0 EGP</span>
                            </div>
                            <div className="total color-primary no-border">
                                <span className="text-right">الإجمالي</span>
                                <span id="cart-final-total" data-cart-total="">{getTotalPrice} EGP</span>
                            </div>
                        </div>
                    </li>
                    <li className="hints bg-hover-none mb-30">
                        <small className="d-block font-xsm color-muted mt-10">
                            * الأسعار شاملة للضريبة
                        </small>
                    </li>
                </ul>
                <div className="cart-bottom-actions">
                <Link to="../success" className="w-100">
                    <button
                        className="btn--oval btn--md s-button-element s-button-btn s-button-solid s-button-wide s-button-primary s-button-loader-end">
                        <span className="s-button-text">
                            اتمام الطلب
                        </span>
                    </button>
                </Link>
                </div>
            </div>
        </>
    )
}


export default CartItems