import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { DiCodeigniter } from "react-icons/di";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/Cart';
import { Badge } from 'antd';
import useCategory from "../../hooks/useCategory";
import SearchInput from '../Form/Searchinput';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <DiCodeigniter size={30} className="me-2" />
          <span className="fw-bold">Ecommerce</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
         
          <ul className="navbar-nav align-items-center">
          <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">All Categories</Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/Register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUserCircle className="me-2" />
                  {auth?.user?.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">Dashboard</NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <NavLink onClick={handleLogout} to="/Login" className="dropdown-item">Logout</NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item ms-3">
              <NavLink to="/Cart" className="nav-link position-relative">
                <FaShoppingCart size={20} />
                <Badge count={cart?.length} showZero className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.length}
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
