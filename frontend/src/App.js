import "./App.css";

import {  Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";
import MyOrders from "./components/orders/MyOrders";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import {Cart} from "./components/cart/Cart";

function App() {
  return (
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/me/orders" element={<MyOrders/>}/>
            <Route path="/me/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>

        <Footer />
      </div>
  );
}

export default App;
