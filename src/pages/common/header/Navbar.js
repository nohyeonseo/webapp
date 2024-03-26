import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setAuthInfo } from './../store/store'; 
import './Navbar.css'; 

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-danger position-fixed w-100">
      <div className="container-md d-flex justify-content-between align-items-center">

        <Link to="/A001A0002" className="navbar-brand">
          <img src="/img/home.png" alt="" width="30" height="30" />
        </Link>

        <div className="d-flex">
          {!isAuthenticated ? (
            <button className="login-button" onClick={() => {}}>
              로그인
            </button>
          ) : (
            <button className="login-button ms-auto" onClick={() => {}}>
              로그아웃
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;