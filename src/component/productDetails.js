import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './header';



const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
  };

  const addToCart = () => {
    console.log(`Product ${productId} added to cart`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <NavBar/>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>Price: &#8377; {product.price}</p>
          <p>{product.description}</p>

         
          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </>
  )
}
 export default ProductDetails;
