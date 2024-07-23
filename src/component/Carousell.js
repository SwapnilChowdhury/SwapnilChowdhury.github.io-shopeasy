import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

const Carousell = ({ onAddToCart, searchTerm, selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                let data = response.data;

                if (selectedCategory) {
                    data = data.filter(product => product.category === selectedCategory);
                }
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const handleAddToCart = (productId) => {
        const selectedProduct = products.find(product => product.id === productId);
        if (selectedProduct) {
            onAddToCart(selectedProduct);
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="products-container">
            {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                    <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.title} className="product-image" />
                    </Link>
                    <div className="product-details">
                        <div>
                            <h2 className="product-title">{product.title}</h2>
                            <p className="product-price">Price: ${product.price}</p>
                        </div>
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousell;