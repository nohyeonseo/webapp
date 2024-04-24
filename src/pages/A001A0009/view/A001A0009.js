import React, { useState, useEffect } from 'react';
import './A001A0009.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A001A0009 = () => {

  const navigate = useNavigate();

  const createStore = async () => {
    navigate('/A001A0008');
  };
  const createMenu = async () => {
    navigate('/A001A0010');
  };
  const createAd = async() => {
    navigate('/A001A0011');
  };

  const updateStore = async () => {
    navigate('/A002A0001');
  };
  const updateMenu = async () => {
    navigate('/A001A0013');
  };
  const updateAd = async() => {
    navigate('/A001A0014');
  };

 
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="section">
          <h2>등록하기</h2>
          <div className="selection-box" onClick={createStore}>
            <p>가게 등록</p>
          </div>
          <div className="selection-box" onClick={createMenu}>
            <p>메뉴 등록</p>
          </div>
          <div className="selection-box" onClick={createAd}>
            <p>광고 등록</p>
          </div>
        </div>

        <div className="section">
          <h2>수정하기</h2>
          <div className="selection-box" onClick={updateStore}>
            <p>가게 수정</p>
          </div>
          <div className="selection-box" onClick={updateMenu}>
            <p>메뉴 수정</p>
          </div>
          <div className="selection-box" onClick={updateAd}>
            <p>광고 수정</p>
          </div>
        </div>
      </div>
    </div>



  );

};
export default A001A0009;