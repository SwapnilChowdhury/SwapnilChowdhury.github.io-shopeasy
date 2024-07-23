import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Review = () => {
  const { productId } = useParams();
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  const { rating, comment } = review;

  const onChange = (e) =>
    setReview({ ...review, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/products/${productId}/reviews`, review);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <select name="rating" value={rating} onChange={onChange}>
        <option value="0">Select Rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>
      <textarea name="comment" value={comment} onChange={onChange} placeholder="Write your review"></textarea>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default Review;