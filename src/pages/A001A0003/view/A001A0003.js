import React, { useState, useEffect } from 'react';
import './A001A0003.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';

const A001A0003 = () => {
    // 하드코딩된 가게 데이터
    const shops = [
        { name: '한식당 청국장', price: 15000, image: 'korean-food' },
        { name: '중식당 마파두부', price: 12000, image: 'chinese-food' }
    ];

    return (
        <div>
            <Navbar />
            {/* 검색창 */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="음식점을 검색해보세요."
                    className="search-input"
                />
                <button className="search-button">
                    검색
                </button>
            </div>
            {/* 가게리스트 */}
            <div className="shop-list">
                {shops.map((shop, index) => (
                    <div className="shop-item" key={index}>
                        <img
                            src={`/img/no-img.png`}
                            alt={shop.name}
                            className="shop-img"
                        />
                        <div className="shop-details">
                            <p className="shop-name">{shop.name}</p>
                            <p className="shop-price">{`${shop.price.toLocaleString()} 원`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default A001A0003;