import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';
import { useNavigate, useParams } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); 
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

    const loginbtn = () => {
      navigate('/A001A0001');
    }

    const logoutbtn = () => {
      localStorage.clear();
      alert("로그아웃되었습니다.");
      window.location.href = '/A001A0002';
      console.log("로그아웃시 상태 :",localStorage);
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-danger position-fixed w-100">
            <div className="container-md d-flex justify-content-between align-items-center">

                <Link to="/A001A0002" className="navbar-brand">
                    <img src="/img/home.png" alt="" width="30" height="30" />
                </Link>

                <div className="d-flex">
                    {!isAuthenticated ? (
                        <button className="login-button" onClick={loginbtn}>
                            로그인
                        </button>
                    ) : (
                        <button className="login-button" onClick={logoutbtn}>
                            로그아웃
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;