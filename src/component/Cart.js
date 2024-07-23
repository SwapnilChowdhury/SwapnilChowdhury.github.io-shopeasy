import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Products.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Cart = () => {
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        getFromCart();
    },[])
    const userObj = useSelector((state)=>state.users.loggedIn);
    const getFromCart = async () => {
        const response = await axios.get(`http://localhost:8080/cart/getCart/${userObj.id}`);
        setCart(response.data);
    }
    const onUpdateQuantity = async (productId, quantity) => {
        if (quantity > 0) {
          setCart(cart.map(product =>
            product.id === productId ? { ...product, quantity } : product
          ));
          const response = await axios.post(`http://localhost:8080/cart/getCart/${userObj.id}`,{productId:productId,quantity:quantity})

        } else {
          onRemoveFromCart(productId);
        const response = await axios.post(`http://localhost:8080/cart/deleteFromCart/${userObj.id}`,{productId:productId})

        }
      };
      const onRemoveFromCart = async (productId) => {
        setCart(cart.filter(product => product.id !== productId));
        const response = await axios.post(`http://localhost:8080/cart/deleteFromCart/${userObj.id}`,{productId:productId})

      };
    const navigate = useNavigate();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = (item) => {
        navigate('/checkout', { state: { item } });
    };

    const handleCheckoutAll = () => {
        navigate('/checkout', { state: { cart } });
    };

    return (
        <div className="cart-container">
            <header className="cart-header">
                <Link to="/" className="back-to-shop">
                    &larr; Back to Shop
                </Link>
                <h2>Your Cart</h2>
            </header>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map(product => (
                        <div key={product.id} className="cart-item">
                            <img src={product.image} alt={product.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{product.title}</h3>
                                <p className="cart-item-price">Unit Price: ${product.price.toFixed(2)}</p>
                                <p>Total Price: ${(product.price * product.quantity).toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}>+</button>
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => onUpdateQuantity(product.id, parseInt(e.target.value))}
                                        min="1"
                                        className="quantity-input"
                                    />
                                    <button className="quantity-btn" onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}>-</button>
                                </div>
                                <button className="remove-from-cart-button" onClick={() => onRemoveFromCart(product.id)}>
                                    Remove from Cart
                                </button>
                                <button className="checkout-item-button" onClick={() => handleCheckout(product)}>
                                    Proceed to Checkout for This Product
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Total Items: {totalItems}</h3>
                        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                        <button className="checkout-button" onClick={handleCheckoutAll}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;