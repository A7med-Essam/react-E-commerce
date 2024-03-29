import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { cart, currentProducts, currentCategory } from "../App";
import $ from 'jquery';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/slices/category-slice";

function Navbar(params) {
    const [getTotalPrice, setTotalPrice] = useState();
    const Dispatch = useDispatch();
    const getCategory = useSelector(state => state.categories);

    const [getCurrentCategory, setCurrentCategory] = useRecoilState(currentCategory);
    const [getProuct, setProucts] = useRecoilState(currentProducts);
    const [getCart, setCart] = useRecoilState(cart);

    useEffect(() => {
        Dispatch(fetchCategory());
    }, [])

    useEffect(() => {
        const total = getCart.reduce((accumulator, product) => accumulator + (product.price * product.qty), 0);
        setTotalPrice(total)
    }, [getCart])

    function toggleCategory(e) {
        $(e.target).parent().siblings().children().removeClass('offers-link');
        $(e.target).addClass('offers-link')
    }


    return (
        <>
            <div className="mb-50 shadow-lg">
                <header id="site-header-outer" style={{ height: '95px' }}>
                    <div className="site-header d-flex justify-content-center">
                        <div className="container">
                            <div className="site-header__wrapper">
                                <h1 className="theme-logo d-block">
                                    <a href="https://masjjd.com">
                                        <img width="55" height="55"
                                            src="https://cdn.salla.sa/vlPz/dMqNKZWH0xXxwFJrHXQ1fglXHdPvZOmuLhybeUsH.jpeg"
                                            alt="main-logo" />
                                        <div></div>
                                    </a>
                                </h1>
                                <div id="search_form" className="flex-gorw form--search">
                                    <div oval="" inline="" height="45" className="hydrated">
                                        <div className="s-search-modal">
                                            <div className="s-search-container s-search-inline">
                                                <div className="s-search-input-wrapper"><span className="s-search-icon-wrap"><span
                                                    className="s-search-icon">

                                                </span></span><input type="search" enterKeyHint="search" autoComplete="off"
                                                    className="s-search-input" placeholder="ادخل كلمة البحث"
                                                    style={{ height: "45px", borderRadius: "22.5px" }} /></div>
                                                <div className="s-search-results">
                                                    <p className="s-search-no-results-placeholder" style={{ display: "none" }}>لا توجد نتائج
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 main-header-components d-flex">
                                    <div className="site-header__cart">
                                        <salla-cart-summary className="hydrated">
                                            <Link className="s-cart-summary-wrapper" to={"/cart"}>
                                                <div id="s-cart-icon">
                                                    <slot-fb name="icon"><i className="s-cart-summary-icon">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30"
                                                            height="32" viewBox="0 0 30 32">
                                                            <title>cart</title>
                                                            <path
                                                                d="M15.426 28.084c0-1.412-0.85-2.684-2.156-3.226-1.305-0.54-2.807-0.241-3.805 0.758-0.999 0.998-1.298 2.5-0.758 3.805 0.54 1.303 1.815 2.155 3.226 2.155 1.928-0.003 3.49-1.564 3.492-3.492h0.001zM10.597 28.084h0.001c0-0.54 0.326-1.027 0.825-1.235 0.498-0.206 1.074-0.091 1.455 0.29 0.383 0.382 0.497 0.957 0.29 1.456-0.208 0.5-0.695 0.825-1.235 0.825-0.355 0-0.695-0.142-0.944-0.391-0.251-0.251-0.392-0.591-0.392-0.946h-0.001l0.001 0.001zM28.23 28.084c0-1.412-0.85-2.684-2.155-3.226-1.305-0.54-2.807-0.241-3.806 0.758s-1.297 2.5-0.756 3.805c0.54 1.303 1.813 2.155 3.226 2.155 1.927-0.003 3.49-1.564 3.491-3.492zM23.401 28.084c0-0.54 0.326-1.027 0.825-1.235 0.5-0.206 1.075-0.091 1.457 0.29s0.497 0.957 0.289 1.456c-0.206 0.5-0.693 0.825-1.233 0.825-0.738 0-1.337-0.599-1.337-1.337l-0.001 0.001zM1.953 0.234l-0.342-0.059c-0.29-0.064-0.594-0.004-0.839 0.166-0.247 0.169-0.414 0.436-0.463 0.734-0.050 0.3 0.023 0.607 0.201 0.85s0.444 0.402 0.738 0.44l0.341 0.059c1.825 0.324 3.248 1.794 3.548 3.662l1.981 12.369h-0.001c0.218 1.387 0.913 2.651 1.96 3.563s2.379 1.412 3.754 1.41h14.242c0.601 0 1.088-0.498 1.088-1.112s-0.487-1.112-1.088-1.112h-14.242c-1.679-0.001-3.139-1.183-3.525-2.854h11.463c1.614 0.004 3.188-0.518 4.493-1.49 1.305-0.973 2.271-2.346 2.762-3.918l1.298-4.136c0.145-0.455 0.065-0.953-0.213-1.336-0.278-0.385-0.72-0.608-1.187-0.602h-20.467l-0.181-1.141c-0.218-1.367-0.849-2.631-1.802-3.615-0.954-0.983-2.184-1.64-3.518-1.878h-0.001zM26.946 9.096l-0.993 3.169v-0.001c-0.353 1.122-1.044 2.101-1.975 2.796s-2.056 1.067-3.208 1.067h-11.833l-1.125-7.042 19.134 0.011z">
                                                            </path>
                                                        </svg>
                                                    </i></slot-fb>
                                                </div><span className="s-cart-summary-count">{getCart.length}</span>
                                                <p className="s-cart-summary-content" style={{ width: "50px", display: "flex" }}>
                                                    <b className="s-cart-summary-total">
                                                        {getTotalPrice}
                                                    </b>
                                                    <b>
                                                        ج.م
                                                    </b>
                                                </p>
                                            </Link>
                                        </salla-cart-summary>
                                    </div>
                                </div>
                                <a href="#" className="mobile-search-trigger header-side-panel-trigger d-md-none ml-2"
                                    aria-label="Search Trigger">
                                    <span className="sicon-search icon"></span>
                                </a>
                                <a href="#" className="side-panel-trigger header-side-panel-trigger d-md-none ml-2"
                                    aria-label="Mobile Side Panel Trigger" data-panel-trigger="header-mobiel-nav">
                                    <span className="sicon-ellipsis-vertical icon"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="hero header-block header-block--nav-wrapper">
                    <div className="container hero__content horizontal-nav-wrapper">

                        <nav className="nav-desktop nav-desktop--horizontal">
                            <ul className="m-0">
                                {getCategory?.map((res, index) => {
                                    return (
                                        <li className="menu-item" key={res.categoryId} onClick={(e) => { setCurrentCategory(res); toggleCategory(e); setProucts(res.products) }}>
                                            <Link to='product' className={index == 0 ? 'offers-link' : ''} >{res.name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                    </div>
                </section>
            </div>
        </>
    )
}

export default Navbar;