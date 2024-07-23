import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../features/productsearchSlice";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const filteredProducts = useSelector(filterProducts);
  const dispatch=useDispatch();
  const userObj = useSelector((state)=>state.users.loggedIn)
  const clearLocalStorage = () => {
      if(userObj.id==undefined){
          localStorage.clear()
      }
  }
  useEffect(() => {
    clearLocalStorage();
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    dispatch(filterProducts(searchTerm));
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Link
            to="/"
            style={{
              width: "20%",
              height: "2%",
              position: "relative",
              left: "0%",
            }}
          >
            <img
              src="/logo.png"
              style={{
                width: "90%",
                height: "2%",
                position: "relative",
                left: "0%",
              }}
              alt="Logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <form className="d-flex" role="search">
                <input
                  className="form-control broad"
                  type="search"
                  placeholder="Search for Products, Brands and more.."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ width: "35rem", right: "10%" }}
                />
              </form>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/order" className="nav-link" style={{ fontSize: "1.3rem" }}>
                      <i className="bi bi-bag-check"></i>Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/profile"
                      className="nav-link"
                      style={{ fontSize: "1.3rem" }}
                    >
                      <i className="bi bi-person-circle"></i>Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link" style={{ fontSize: "1.3rem" }}>
                      <i className="bi bi-cart3"></i>Cart 
                    </Link>
                  </li>
                  <li className="nav-item" style={{ color: '#00a2ea' }}>
                    <button
                      onClick={handleLogout}
                      className="nav-link btn btn-primary" style={{ backgroundColor: '#00a2ea', color: 'white', fontSize: '1.1rem' }}
                    >
                      <i className="bi bi-power"></i>
                    </button>
                  </li>
                </>
              ) : (<>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link active btn btn-primary"
                    style={{
                      backgroundColor: '#00a2ea', color: 'white'
                    }}
                  >
                    Not logged in? Login now!
                  </Link>

                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" style={{ fontSize: "1.3rem" }}>
                    <i className="bi bi-bag-check"></i>Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                    style={{ fontSize: "1.3rem" }}
                  >
                    <i className="bi bi-person-circle"></i>Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" style={{ fontSize: "1.3rem" }}>
                    <i className="bi bi-cart3"></i>Cart 
                  </Link>
                </li>
              </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;