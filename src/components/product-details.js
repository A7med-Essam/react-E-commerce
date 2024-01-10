import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil";
import { cart, currentCategory, currentProducts } from "../App";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Thumbs } from 'swiper/modules';
import { Navigation } from 'swiper/modules';


function ProductDetails(params) {
    const [getCurrentCategory, setCurrentCategory] = useRecoilState(currentCategory);
    const { id } = useParams();
    const [getCurrentProuct, setCurrentProuct] = useState();
    const [getProucts, setProucts] = useRecoilState(currentProducts);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentProuct(getProucts.find(e => e.productId == id));
        if (getCurrentCategory == '') {
            navigate('/');
        }
    }, [id, getCurrentProuct])
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <section className="breadcrumb text-right">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <a href="https://masjjd.com/" aria-label="Home Page"><i className="fas fa-home"></i> </a>
                            <span className="separate">/</span>
                            <a href="https://masjjd.com/category/eDDea">{getCurrentCategory.name}</a>
                            <span className="separate">/</span>
                            <span>{getCurrentProuct?.name}</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-wrapper page--product-details text-right" data-product-id="612997812" id="product_612997812">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12" style={{ direction: "ltr" }}>
                            <div className="product-details__slider listen-to-thumbnails-option ">
                                <div className="splide-images-wrapper">
                                    <div className="splide splide--images splide--slide splide--rtl splide--draggable is-active"
                                        id="product_main_slider" style={{ visibility: "visible" }}>
                                        <div className="splide__track" id="product_main_slider-track">
                                            <Swiper
                                                className="mySwiper" modules={[Thumbs, Navigation]} thumbs={{ swiper: thumbsSwiper }}
                                                loop={true} spaceBetween={10} navigation={false}>
                                                <SwiperSlide>
                                                    <img
                                                        src="https://cdn.salla.sa/vlPz/qP5cCke7NeXRExBZ2rfomT8Er4Gzik3t35CgVY2C.jpg" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img
                                                        src="https://cdn.salla.sa/vlPz/ZxJHB9TtYDJAXKbHTyf85jHU9q10q0IvITFnGWY6.jpg" />
                                                </SwiperSlide>

                                            </Swiper>

                                            <Swiper className="mySwiper2" loop={true} spaceBetween={10} onSwiper={setThumbsSwiper}
                                                slidesPerView={4} freeMode={true} watchSlidesProgress={true}>
                                                <SwiperSlide>
                                                    <img
                                                        src="https://cdn.salla.sa/vlPz/qP5cCke7NeXRExBZ2rfomT8Er4Gzik3t35CgVY2C.jpg" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img
                                                        src="https://cdn.salla.sa/vlPz/ZxJHB9TtYDJAXKbHTyf85jHU9q10q0IvITFnGWY6.jpg" />
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <ProductInfo />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

function OutOfStockButton(params) {

    return (
        <>
            <div className="product-sections-wrapper">
                <div className="form form--product-options product-details__options ajax">
                    <div className="product-section product-section--has-label product-section--totals">
                        <div>
                            <label>السعر</label>
                        </div>
                        <div className="text-left">
                            <div className="price-wrapper price-wrapper--large product-main-price">
                                <span className="color-danger">9,957.99 EGP</span>
                                <small>12,234.10 EGP</small>
                            </div>
                        </div>
                    </div>
                    <div
                        className="product-section product-actions product-section--notify list--spaced no-p mb-0 no-border has-quick-purchase">
                        <button type="button"
                            className="undefined rounded-pill s-button-element s-button-btn s-button-solid s-button-wide s-button-primary s-button-loader-after"><span
                                className="s-button-text">اعلمني عند التوفر</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

function BuyButton(params) {
    const [getCart, setCart] = useRecoilState(cart);
    const { id } = useParams();
    const [getCurrentProuct, setCurrentProuct] = useState();
    const [getProucts, setProucts] = useRecoilState(currentProducts);

    useEffect(() => {
        setCurrentProuct(getProucts.find(e => e.productId == id));
    }, [id, getCurrentProuct])

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
    return (
        <>
            <div className="product-sections-wrapper">
                <div className="form form--product-options product-details__options ajax"
                    encType="multipart/form-data" method="post">
                    <div className="product-section product-section--has-label product-section--totals">
                        <div>
                            <label>السعر</label>
                        </div>
                        <div className="text-left">
                            <div className="price-wrapper price-wrapper--large product-main-price">
                                <span className="color-danger">{getCurrentProuct?.price} EGP</span>
                                <small>2,886.28 EGP</small>
                            </div>
                        </div>
                    </div>
                    <div
                        className="product-section product-actions product-section--quantity no-p mb-0 no-border has-quick-purchase">
                        {/* <div className="qty-wrapper">
                            <salla-quantity-input max="100" value="1" name="quantity" readOnly
                                className="btn--oval s-quantity-input hydrated">
                                <div className="s-quantity-input-container"><button
                                    className="s-quantity-input-increase-button s-quantity-input-button"
                                    type="button"><span>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            width="32" height="32" viewBox="0 0 32 32">
                                            <title>add</title>
                                            <path
                                                d="M26.667 14.667h-9.333v-9.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333v9.333h-9.333c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h9.333v9.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-9.333h9.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333z">
                                            </path>
                                        </svg>
                                    </span></button><input className="s-quantity-input-input" max="100" value="1"
                                        name="quantity" min="1" readOnly /><button
                                            className="s-quantity-input-decrease-button s-quantity-input-button"
                                            type="button"><span>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                width="32" height="32" viewBox="0 0 32 32">
                                                <title>minus</title>
                                                <path
                                                    d="M26.667 14.667h-21.333c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333h21.333c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333z">
                                                </path>
                                            </svg>
                                        </span></button></div>
                            </salla-quantity-input>
                        </div> */}
                        <div className="flex-grow-1">
                            <div className="btn--oval s-add-product-button-with-quick-buy hydrated">
                                <button onClick={() => { addToCart(getCurrentProuct) }}
                                    className="undefined s-button-element s-button-btn s-button-solid s-button-wide s-button-primary s-button-loader-center mx-2">
                                    <span className="s-button-text">إضافة للسلة</span>
                                </button>
                                {/* <button
                                    className="s-quick-buy-button s-button-element s-button-btn s-button-outline s-button-wide s-button-primary-outline s-button-loader-after mx-2">
                                    <span className="s-button-text">
                                        <span>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                width="32" height="32" viewBox="0 0 32 32">
                                                <title>full-wallet</title>
                                                <path
                                                    d="M29 12h-26c-0.668-0.008-1.284-0.226-1.787-0.59l0.009 0.006c-0.744-0.552-1.222-1.428-1.222-2.416 0-1.657 1.343-3 2.999-3h6c0.552 0 1 0.448 1 1s-0.448 1-1 1v0h-6c-0.552 0-1 0.448-1 1 0 0.326 0.156 0.616 0.397 0.798l0.002 0.002c0.167 0.12 0.374 0.194 0.599 0.2l0.001 0h26c0.552 0 1 0.448 1 1s-0.448 1-1 1v0zM27 12c-0.552 0-1-0.448-1-1v0-3h-3c-0.552 0-1-0.448-1-1s0.448-1 1-1v0h4c0.552 0 1 0.448 1 1v0 4c0 0.552-0.448 1-1 1v0zM29 30h-26c-1.657 0-3-1.343-3-3v0-18c0-0.552 0.448-1 1-1s1 0.448 1 1v0 18c0 0.552 0.448 1 1 1v0h25v-5c0-0.552 0.448-1 1-1s1 0.448 1 1v0 6c0 0.552-0.448 1-1 1v0zM29 18c-0.552 0-1-0.448-1-1v0-6c0-0.552 0.448-1 1-1s1 0.448 1 1v0 6c0 0.552-0.448 1-1 1v0zM31 24h-7c-2.209 0-4-1.791-4-4s1.791-4 4-4v0h7c0.552 0 1 0.448 1 1v0 6c0 0.552-0.448 1-1 1v0zM24 18c-1.105 0-2 0.895-2 2s0.895 2 2 2v0h6v-4zM25 12c-0.001 0-0.001 0-0.002 0-0.389 0-0.726-0.222-0.891-0.546l-0.003-0.006-3.552-7.106-2.306 1.152c-0.13 0.066-0.284 0.105-0.447 0.105-0.552 0-1-0.448-1-1 0-0.39 0.223-0.727 0.548-0.892l0.006-0.003 3.2-1.6c0.13-0.067 0.284-0.106 0.447-0.106 0.39 0 0.727 0.223 0.892 0.548l0.003 0.006 4 8c0.067 0.13 0.106 0.285 0.106 0.448 0 0.552-0.448 1-1 1v0zM21 12c-0.001 0-0.001 0-0.002 0-0.389 0-0.726-0.222-0.891-0.546l-0.003-0.006-3.552-7.106-15.104 7.552c-0.13 0.066-0.284 0.105-0.447 0.105-0.552 0-1-0.448-1-1 0-0.39 0.223-0.727 0.548-0.892l0.006-0.003 16-8c0.13-0.067 0.284-0.106 0.447-0.106 0.39 0 0.727 0.223 0.892 0.548l0.003 0.006 4 8c0.067 0.13 0.106 0.285 0.106 0.448 0 0.552-0.448 1-1 1-0.001 0-0.001 0-0.002 0h0z">
                                                </path>
                                            </svg>
                                        </span>
                                        اشتري الآن
                                    </span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProductInfo(params) {
    const { id } = useParams();
    const [getCurrentProuct, setCurrentProuct] = useState();
    const [getProucts, setProucts] = useRecoilState(currentProducts);
    useEffect(() => {
        setCurrentProuct(getProucts.find(e => e.productId == id));
    })
    return (
        <>
            <div className="product-details__info">
                <div className="product-details__title">
                    <div className="title-wrapper">
                        <h2 className="title title--xx-large  mb-10 ">{getCurrentProuct?.name}</h2>
                        <div className="price-wrapper-info price-wrapper--large product-main-price">
                            <span className="color-danger">{getCurrentProuct?.price} EGP</span>
                            <span className="price-wrapper">
                                <small>12,234.10 EGP</small>
                            </span>
                        </div>
                        <small className="color-grey">السعر شامل الضريبه</small>
                    </div>
                    <div className="share-like-wrapper">
                        <div className="share-like">
                            <button
                                className="btn--wishlist animated s-button-element s-button-icon s-button-outline s-button-light-outline s-button-loader-center"
                                data-id="612997812" shape="icon" type="button"><span className="s-button-text">
                                    <i className="far fa-heart"></i>
                                </span></button>
                        </div>
                    </div>
                </div>
                <div className="d-flex px-3 py-2 bg-grey b-radius mb-30 float-start purchase-hot-wrapper">
                    <p className="purchase-hot">
                        <i className="sicon-box-bankers"></i>
                        المتبقي
                        <span>0</span>
                    </p>
                </div>
                <article className="article article--main article--product-details mb-50 ">
                    <p>ميكروفون صوتي ديناميكي ذا خصائص الاتجاهية</p>
                    <p><br /></p>
                    <p>المواصفات :</p>
                    <ul>
                        <li>فرط قلبي</li>
                        <li>25/18000 هرتز</li>
                        <li>280</li>
                        <li>مِرنان ( كاشف موجات الهرتزية ) ثلاثي المرحلة على مرحلتين لتحسين إعادة الإنتاج عالي
                            التردد</li>
                        <li>هندسة صوت خاصة مع نسيج صوتي عالي الجودة</li>
                        <li>فتحات صوتية خاصة لخصائص اتجاهية مستقلة عن التردد</li>
                        <li>الوزن 345 جرام</li>
                    </ul>
                </article>
                <div className="grid-block pay-installment mb-20">
                </div>
                {true ? <BuyButton /> : <OutOfStockButton />}
            </div>
        </>
    )
}

export default ProductDetails