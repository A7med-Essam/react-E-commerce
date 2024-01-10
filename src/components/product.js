import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { cart, currentProducts } from "../App";
import $ from 'jquery';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/swiper-bundle.css";


function Product(params) {
    const [getProucts, setProucts] = useRecoilState(currentProducts);
    const [getCart, setCart] = useRecoilState(cart);

    $(document).ready(function () {
        $(".s-button-element").not(".s-button-disabled").on("click", function () {
            const currentImage = $(this).closest(".product-block").find("img");
            const animatedImage = currentImage.clone().addClass("animate").appendTo("body");
            const cartPosition = $(".s-cart-summary-wrapper").offset();
            animatedImage.css({ top: currentImage.offset().top, left: currentImage.offset().left });
            animatedImage.animate({
                top: cartPosition.top,
                left: cartPosition.left,
                opacity: 0
            }, 1000, function () {
                $(this).remove();
                $("#s-cart-icon").addClass('animated rubberBand');
                setTimeout(() => {
                    $("#s-cart-icon").removeClass('animated rubberBand')
                }, 1000);
            });

        });
    });

    function addToCart(product) {
        if (getCart.some(p => p.productId === product.productId)) {
            setCart(prevCart => {
                const updatedCart = prevCart.map(p => {
                    if (p.productId === product.productId) {
                        return { ...p, qty: p.qty + 1 };
                    }
                    return p;
                });
                localStorage.setItem('sp-cart', JSON.stringify(updatedCart));
                return updatedCart;
            });
        } else {
            setCart(prevCart => {
                const updatedCart = [...prevCart, { ...product, qty: 1 }];
                localStorage.setItem('sp-cart', JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    }

    const swiperParams = {
        spaceBetween: 10,
        slidesPerView: 'auto',
    };

    return (
        <>
            <div className="flex min-h-screen" style={{ margin: "50px" }}>
                <div className="s-products-list-wrapper s-products-list-vertical-cards d-flex">
                    {/* <div className="product-block is-out contain">

                        <div className="product-block__thumb">
                            <Link to="product/1" className="thumb-wrapper" aria-label="المؤذن الآلي المطور">
                                <img className="loaded" width="200" height="200"
                                    src="https://cdn.salla.sa/vlPz/YguTRobaZ1X11moPmAwWUjCo6m3fLKCfz1vLUq9F.jpg"
                                    data-src="https://cdn.salla.sa/vlPz/YguTRobaZ1X11moPmAwWUjCo6m3fLKCfz1vLUq9F.jpg"
                                    alt="undefined" loading="lazy" data-ll-status="loaded" />
                            </Link>
                        </div>

                        <div className="relative wide donating-wrap text-right">
                            <div className="product-block__info">
                                <Link to="product/1" className="product-title text-decoration-none">
                                    <h2 className="title title--primary title--small">المؤذن الآلي المطور</h2>
                                    <p></p>
                                </Link>

                                <div className="price-wrapper">
                                    <span className="color-danger">8959.46 ج.م</span><small>13674.96 ج.م</small>
                                </div>

                                <div className="btn btn--floated btn--add-to-cart btn--add-to-cart disabled"
                                    style={{ padding: "0" }}>
                                    <button
                                        className="s-button-element s-button-btn s-button-outline s-button-light-outline s-button-disabled s-button-loader-center"
                                        disabled="">
                                        <span className="s-button-text">
                                            <i className="fas fa-shopping-bag"
                                                style={{ fontSize: "13px", marginBottom: "9px" }}></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <Swiper className="mySwiper mainSwiper" {...swiperParams}>
                        {getProucts.map((p) => {
                            return (
                                <SwiperSlide key={p.productId}>
                                    <div className="product-block contain">

                                        <div className="product-block__thumb">

                                            <Link to={"../product/" + p.productId} className="thumb-wrapper" aria-label="ريموت كنترول المؤقتة">
                                                <img className="loaded" style={{ width: "200px", height: "200px" }}
                                                    src="https://cdn.salla.sa/vlPz/gzh23d6elbLVlzjSNVCAdSAGszQ7O0nIDa7Ecnx2.jpg"
                                                    data-src="https://cdn.salla.sa/vlPz/gzh23d6elbLVlzjSNVCAdSAGszQ7O0nIDa7Ecnx2.jpg"
                                                    alt="undefined" loading="lazy" data-ll-status="loaded" />
                                            </Link>
                                        </div>

                                        <div className="relative wide donating-wrap text-right">
                                            <div className="product-block__info">
                                                <Link to={"product/" + p.productId} className="product-title text-decoration-none">
                                                    <h2 className="title title--primary title--small">{p.name}</h2>
                                                    <p></p>
                                                </Link>

                                                <div className="price-wrapper">
                                                    <span>{p.price} ج.م</span>
                                                </div>

                                                <div className="btn btn--floated btn--add-to-cart btn--add-to-cart "
                                                    style={{ padding: "0" }}>
                                                    <button onClick={() => { addToCart(p) }}
                                                        className="s-button-element s-button-btn s-button-solid s-button-primary s-button-loader-center"><span
                                                            className="s-button-text">
                                                            <i className="fas fa-shopping-bag" style={{ fontSize: "13px", marginBottom: "9px" }}></i>

                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

                </div>

                <div className="s-products-list-loading-wrapper" style={{ display: "none" }}>
                    <span className="s-button-loader s-button-loader-center s-infinite-scroll-btn-loader"></span>
                </div>

                <div className="s-infinite-scroll-wrapper" style={{ display: "none" }}>
                    <button className="s-infinite-scroll-btn s-button-btn s-button-primary">
                        <span className="s-button-text s-infinite-scroll-btn-text">تحميل المزيد</span>
                        <span className="s-button-loader s-button-loader-center s-infinite-scroll-btn-loader"
                            style={{ display: "none" }}></span>
                    </button>
                </div>
            </div>
        </>
    )

}



export default Product;