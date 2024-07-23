import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './component/LoginComponent';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import RegisterComponent from './component/RegisterComponent';
import OrderComponent from './component/OrderComponent';
import React, { useState } from 'react';
import Carousell from './component/Carousell';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import Payment from './component/Payment';
import ProductList from './component/prodList';
import ProductDetails from './component/productDetails';
import Success from './component/Success';
import Review from './component/Review';
import { ErrorPage } from './component/ErrorPage';



function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory] = useState('');

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...existingProduct, quantity: existingProduct.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      setCart(cart.map(product =>
        product.id === productId ? { ...product, quantity } : product
      ));
    } else {
      handleRemoveFromCart(productId);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={ProductList}></Route>
        <Route path='/login' Component={LoginComponent}></Route>
        <Route path='/register' Component={RegisterComponent}></Route>
        <Route path='/order' Component={OrderComponent}></Route>
        <Route path='/product/:productId' Component={ProductDetails}></Route>
        <Route path='/success' Component={Success}></Route>
        <Route path='/review' Component={Review}></Route>
        <Route path='/errorPage' Component={ErrorPage}></Route>
          <Route
            path="/carousell"
            element={
              <Carousell
                onAddToCart={handleAddToCart}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />
            }
          />
          
          <Route path="/cart" element={
            <Cart
              
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          } />
          <Route path="/checkout" element={
            <Checkout
              onUpdateQuantity={handleUpdateQuantity}
            />
          } />

          <Route path="/payment" element={<Payment />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
