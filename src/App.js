import './App.css';
import Navbar from './components/navbar';
import Product from './components/product';
import SuccessCheckout from './components/successCheckout';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './components/product-details';
import Cart from './components/cart';
import { Routes, Route } from "react-router-dom";
import { atom } from 'recoil';


export const currentProducts = atom({
  key: 'currentProducts',
  default: [],
});

export const currentCategory = atom({
  key: 'currentCategory',
  default: "",
});

export const cart = atom({
  key: 'cart',
  default: JSON.parse(localStorage.getItem('sp-cart')) || [],
});



function App() {





  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Product />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="success" element={<SuccessCheckout />} />
        <Route path="*" element={<Product />} />
      </Routes>


    </div>
  );
}

export default App;

