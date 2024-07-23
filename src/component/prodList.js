import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, selectFilteredProducts } from "../features/productsearchSlice";
import NavBar from "./header";
import { Link } from "react-router-dom";
import { clear } from "@testing-library/user-event/dist/clear";

const ProductList = () => {
  const dispatch = useDispatch();

  const filteredProducts = useSelector(selectFilteredProducts);
  const [allCategories, setCategories] = useState([]);
  const [allBrands, setBrands] = useState([]);
  const [productcp, setProductscp] = useState([]);
  const [categoryselect, setCategorySelect] = useState("");
  const [brandselect, setBrandSelect] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const userObj = useSelector((state)=>state.users.loggedIn)

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
      const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        if(existingCartItems.length>0){
            existingCartItems.map(cart=>{
                addSingleProductToCart(cart);
            })
        }
        localStorage.removeItem('cartItems')
    } else {
      setIsLoggedIn(false);
    }
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        dispatch(setProducts(response.data));
        setProductscp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios
      .get("http://localhost:8080/api/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  const addSingleProductToCart = async (prod) => {
    console.log("User object is "+userObj.id);
    const response = await axios.post('http://localhost:8080/cart/addToCart',{userId:userObj.id,product:prod});
  }
  const addToCart = (product) => {
    if(isLoggedIn){
        
            addSingleProductToCart({...product,quantity:1});
        
    }else{
        const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = existingCartItems.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      existingCartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    }
    
  };
  

  const SortProducts = (category) => {
    switch (category) {
      case 1:
        dispatch(setProducts([...filteredProducts].sort((a, b) => b.price - a.price)));
        break;
      case 2:
        dispatch(setProducts([...filteredProducts].sort((a, b) => a.price - b.price)));
        break;
      case 3:
        dispatch(setProducts([...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))));
        break;
      default:
        break;
    }
  };

  const FilterByCategory = (value) => {
    if (value === "" && brandselect === "") {
      setCategorySelect("");
      dispatch(setProducts([...productcp]));
      return;
    }
    if (value === "" && brandselect !== "") {
      setCategorySelect("");
      FilterByBrand(brandselect);
      return;
    }

    setCategorySelect(value);
    if (brandselect === "") {
      dispatch(setProducts([...productcp].filter((a) => a.category === value)));
    } else {
      dispatch(setProducts([...productcp].filter((a) => a.category === value && a.brand === brandselect)));
    }
  };

  const FilterByBrand = (value) => {
    if (value === "" && categoryselect === "") {
      setBrandSelect("");
      dispatch(setProducts([...productcp]));
      return;
    }
    if (value === "" && categoryselect !== "") {
      setBrandSelect("");
      FilterByCategory(categoryselect);
      return;
    }

    setBrandSelect(value);
    if (categoryselect === "") {
      dispatch(setProducts([...productcp].filter((a) => a.brand === value)));
    } else {
      dispatch(setProducts([...productcp].filter((a) => a.brand === value && a.category === categoryselect)));
    }
  };

  const FilterByPrice = (value) => {
    dispatch(setProducts([...productcp].filter((a) => a.price < value)));
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3 col-sm-4 col-12 bg-light sidebar-sticky" style={{ height: "100vh", position: "sticky", top: "0", zIndex: "10000", overflow: "scroll" }}>
            <div className="d-flex flex-column flex-shrink-0 p-3 " style={{ width: "280px" }}>
              <span className="fs-4">Sort</span>
              <hr />
              <ul className="nav nav-pills flex-column gap-2 mb-auto">
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page" onClick={() => SortProducts(1)} style={{ textAlign: 'center', backgroundColor: '#00a2ea' }}>
                    High to Low
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page" onClick={() => SortProducts(2)} style={{ textAlign: 'center', backgroundColor: '#00a2ea' }}>
                    Low to High
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page" onClick={() => SortProducts(3)} style={{ textAlign: 'center', backgroundColor: '#00a2ea' }}>
                    Alphabetically
                  </a>
                </li>
              </ul>

              <span className="fs-4 d-flex align-items-center mb-3 mt-2 mb-md-0 me-md-auto text-decoration-none">Filter</span>

              <hr />

              <ul className="nav flex-column gap-2 mb-auto">
                <li className="nav-item">
                  <span className="nav-link" aria-current="page">
                    Category
                  </span>
                  <div className="ms-3">
                    <input type="radio" className="mx-2" name="category" value={""} onClick={(e) => FilterByCategory(e.target.value)} /> None <br />

                    {allCategories.map((item, index) => (
                      <React.Fragment key={index}>
                        <input type="radio" className="mx-2" name="category" value={item} onClick={(e) => FilterByCategory(e.target.value)} /> {item} <br />
                      </React.Fragment>
                    ))}
                  </div>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page">
                    Brand
                  </a>
                  <div className="ms-3">
                    <input type="radio" className="mx-2" name="brand" value={""} onClick={(e) => FilterByBrand(e.target.value)} /> None <br />

                    {allBrands.map((item, index) => (
                      <React.Fragment key={index}>
                        <input type="radio" className="mx-2" name="brand" value={item} onClick={(e) => FilterByBrand(e.target.value)} /> {item} <br />
                      </React.Fragment>
                    ))}
                  </div>
                </li>
              </ul>
              <hr />

              <div className="mb-auto">
                <label htmlFor="priceRange" className="form-label">Price Range</label>
                <input type="range" className="form-range" name="foo" id="priceRange" min="0" max="1000" onChange={(e) => FilterByPrice(e.target.value)} />
                <output htmlfor="foo" onforminput="value = foo.valueAsNumber;"></output>
                <div className="d-flex justify-content-between mt-2">
                  <span>&#8377;0</span>
                  <span>&#8377;100000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-sm-8 col-12">
            <div className="row">
              {filteredProducts.length === 0 ? (
                <div className="col-12 text-center">
                  <p>Product is out of stock, Stay tuned for restock</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="card h-100">
                      <Link to={`/product/${product.id}`}>
                        <img
                          className="card-img-top"
                          src={product.image}
                          alt={product.title}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">Price: &#8377; {product.price}</p>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
