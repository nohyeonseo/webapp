import React, { useState, useEffect } from 'react';
import './A001A0004.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
const A001A0004 = () => {
    const [activeTab, setActiveTab] = useState('menu');
    const [quantities, setQuantities] = useState({}); // 메뉴별 수량 상태

    // 하드코딩된 메뉴 데이터
    const menuItems = [
      { id: 1, name: 'c메뉴', price: 3000 },
      { id: 2, name: 'b메뉴', price: 2000 },
      { id: 3, name: 'a메뉴', price: 1000 },
    ];
    const infoItems = [
        { id: 1, detail: '가게 정보1' },
        { id: 2, detail: '가게 정보2' },
        { id: 3, detail: '가게 정보3' },
      ];

    // 수량 변경 핸들러
    const handleQuantityChange = (id, value) => {
      setQuantities(prev => ({ ...prev, [id]: value }));
    };
    const handleAddToCart = (item) => {
        // 여기에 장바구니 추가 로직 구현
        alert(`${item.name}이(가) 장바구니에 추가되었습니다.`);
      };
      
    return (
      <div>
        <Navbar />
        {/* 탭 메뉴 */}
        <div className="tabs">
          <button onClick={() => setActiveTab('menu')} className={activeTab === 'menu' ? 'active' : ''}>
            메뉴
          </button>
          <button onClick={() => setActiveTab('info')} className={activeTab === 'info' ? 'active' : ''}>
            정보
          </button>
        </div>
        
        {/* 탭 내용 */}
        <div className="tab-content">
        {activeTab === 'menu' ? (
        <div className="menu-list">
            {menuItems.map(item => (
            <div className="menu-item" key={item.id}>
                <div className="menu-img-placeholder"></div>
                <div className="menu-details">
                <p className="menu-name">{item.name}</p>
                <p className="menu-price">{`${item.price.toLocaleString()} 원`}</p>
                {/* 수량 선택 드롭다운 */}
                <select
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="menu-quantity"
                >
                    {[1, 2, 3, 4, 5].map((number) => (
                    <option key={number} value={number}>
                        {number} 개
                    </option>
                    ))}
                </select>
                {/* 담기 버튼 추가 */}
                <button
                    onClick={() => handleAddToCart(item)}
                    className="add-to-cart-button"
                >
                    담기
                </button>
                </div>
            </div>
            ))}
        </div>
          ) : (
            <div className="info-list">
              {infoItems.map(info => (
                <div className="info-item" key={info.id}>
                  <p>{info.detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 페이지 하단 주문하기 버튼 */}
        <div className="order-button-container">
            <button className="order-button" onClick={() => alert('주문이 완료되었습니다.')}>
                주문하기
            </button>
        </div>
      </div>
    );
  };
  
export default A001A0004;