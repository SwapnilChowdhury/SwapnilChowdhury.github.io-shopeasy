import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    filterProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setProducts, filterProducts } = productsSlice.actions;

export const selectFilteredProducts = (state) => state.products.filteredProducts;

export default productsSlice.reducer;