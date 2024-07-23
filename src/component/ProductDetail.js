import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/products.json');
                const data = response.data;
                const selectedProduct = data.find(p => p.id === parseInt(id));
                setProduct(selectedProduct);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="product-detail-container">
            {product && (
                <>
                    <img src={product.image} alt={product.title} className="product-detail-image" />
                    <div className="product-detail-info">
                        <h1 className="product-detail-title">{product.title}</h1>
                        <p className="product-detail-description">{product.description}</p>
                        <p className="product-detail-price">Price: ${product.price}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetail;