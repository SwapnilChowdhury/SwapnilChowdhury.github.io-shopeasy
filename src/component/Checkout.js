import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Products.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeCart } from '../features/cartSlice';

const Checkout = ({onUpdateQuantity }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [checkoutItems, setCheckoutItems] = useState([]);
    const getItemsFromCart = async () => {
        const response = await axios.get(`http://localhost:8080/cart/getCart/${userObj.id}`);
        setCheckoutItems(response.data)
    }
    const userObj = useSelector((state)=>state.users.loggedIn);
    useEffect(() => {
        if (location.state && location.state.item) {
            setCheckoutItems([location.state.item]);
        } else {
            getItemsFromCart()
        }
    }, [location.state]);

    const handleQuantityChange = (productId, quantity) => {
        if (quantity >= 0) {
            onUpdateQuantity(productId, quantity);
        }
    };
    const clearFromCart =  async () => {
        
        const response  = await axios.post(`http://localhost:8080/cart/clearFromCart/${userObj.id}`)
        dispatch(storeCart(checkoutItems));
    }
    const handlePayment = () => {
        if (paymentMethod === 'COD') {
            clearFromCart();
            navigate('/success');
        } else {
            navigate('/payment');
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {checkoutItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                checkoutItems.map(product => (
                    <div key={product.id} className="checkout-item">
                        <img src={product.image} alt={product.title} className="checkout-item-image" />
                        <div className="checkout-item-details">
                            <h3 className="checkout-item-title">{product.title}</h3>
                            <p className="checkout-item-price">Price: ${product.price}</p>
                            <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                min="0"
                            />
                            <p>Total Price: ${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))
            )}
            {checkoutItems.length > 0 && (
                <>
                    <div className="payment-method">
                        <h3>Select Payment Method</h3>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={paymentMethod === 'UPI'}
                                onChange={() => setPaymentMethod('UPI')}
                            />
                            UPI
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="Net Banking"
                                checked={paymentMethod === 'Net Banking'}
                                onChange={() => setPaymentMethod('Net Banking')}
                            />
                            Net Banking
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={paymentMethod === 'COD'}
                                onChange={() => setPaymentMethod('COD')}
                            />
                            Cash on Delivery (COD)
                        </label>
                    </div>
                    <button onClick={handlePayment} disabled={!paymentMethod}>
                        Proceed to Pay
                    </button>
                </>
            )}
        </div>
    );
};

export default Checkout;