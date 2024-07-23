import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Success = () => {
    const user = useSelector((state) => state.users.loggedIn);
    const checkoutItems = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const totalItems = checkoutItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="container">
            <header className="cart-header">
                <Link to="/" className="back-to-shop">
                    &larr; Back to Shop
                </Link>
                <h2>Your Cart</h2>
            </header>
            <div className="checkout-container">
                <h2>Your order has been successfully placed</h2>
                <h2>Your order wil be delivered in 2 days</h2>
                {checkoutItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    checkoutItems.map(product => (
                        <div key={product.id} className="checkout-item">
                            <img src={product.image} alt={product.title} className="checkout-item-image" />
                            <div className="checkout-item-details">
                                <h3 className="checkout-item-title">{product.title}</h3>
                                <p className="checkout-item-price">Price: ${product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>Payment: ${(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}

            </div>
            <div className="cart-summary">
                        <h3>Total Items: {totalItems}</h3>
                        <h3>Keep exact Amount: ${totalAmount.toFixed(2)} in cash ready</h3>
                        
            </div>
        </div>
    )
}

export default Success;