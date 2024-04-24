import React, { useState, useEffect } from 'react';
import './A001A0004.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const A001A0004 = () => {
    const navigate = useNavigate(); 
    const [activeTab, setActiveTab] = useState('menu');
    const [quantities, setQuantities] = useState({}); 
    const [store , setStore] = useState({});
    const [menus, setMenus] = useState([]);
    const {storeId} = useParams();

    useEffect(()=> {
      const getShop = async ()=> {
        try {
          const {data} = await API_GET(`/rest/v1/A001A0004/get_Shop/${storeId}`);
          console.log("api 결과 : ", data);
          if(data.result === "SUCCESS" && data.data !== null){
            setStore(data.data);
          }else {
            alert("가게 정보가 존재하지않습니다.");
            return;
          }
        }catch(e){
          console.error('api 실패:', e);
          alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
          return;
        }
      };
      getShop();
    },[storeId]);

    useEffect(()=> {
      const getmenu = async ()=> {
        try{
          const {data} = await API_GET('/rest/v1/A001A0004/get_menu',{ shopId: storeId });
          console.log("메뉴 api 결과: " , data);
          if(data.result === "SUCCESS" && data.data !== null){
            setMenus(data.data);
          }else {
            alert("메뉴정보가 존재하지 않습니다.");
            return;
          }
        
        }catch(e){
          console.error('api 실패:', e);
          alert("메뉴 서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
          return;
        }
      };
      getmenu();
    },[]);


    useEffect(() => {
      console.log("가게정보 업데이트 :", store);
    }, [store]);


    // 수량 변경 핸들러
    const handleQuantityChange = (id, value) => {
      setQuantities(prev => ({ ...prev, [id]: value }));
    };


    const handleAddToCart = (item) => {
      if(localStorage.getItem('username') !==null) {
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const exItemIndex = cart.findIndex(cartItem => cartItem.menuId === item.menuId);
    
        //menuId가 이미 존재할 경우
        if (exItemIndex !== -1) {
          cart[exItemIndex].quantity += quantities[item.menuId] || 1;
          // 장바구니 내 해당 메뉴 항목의 현재 수량 +=사용자가 선택한 해당 아이템의 수량
        } 
        else {
          cart.push({
            menuId: item.menuId,
            menuName: item.menuName,
            price: item.price,
            quantity: quantities[item.menuId] || 1,
          });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("localStorage에 담겨진 메뉴 : ",localStorage );
        alert(`${item.menuName}이(가) ${quantities[item.menuId] || 1}개가 장바구니에 추가되었습니다.`);
      }else {
        alert('로그인 이후 담기 기능을 사용하실수 있습니다.');
        return;
      }
    
    };

    const localStorageDel = () => {
      localStorage.removeItem('cart');
      alert("주문 목록 삭제");
      console.log("localStorage에 담겨진 메뉴 : ",localStorage );
    };

    const nextpage = () => {
      if(localStorage.getItem('username') !==null){
        navigate('/A001A0005');
      } else {
        alert('로그인이 필요합니다');
        return;
      }
      
    }
      
    return (
      <div>
        <Navbar />
        {/* 탭 메뉴 */}
        <div className="tabs">
          <button onClick={() => setActiveTab('menu')} className = {activeTab === 'menu' ? 'active' : ''}>
            메뉴
          </button>
          <button onClick={() => setActiveTab('info')} className = {activeTab === 'info' ? 'active' : ''}>
            정보
          </button>
        </div>
        
        {/* 탭 내용 */}
        <div className="tab-content">
        {activeTab === 'menu' ? (
        
        <div className="menu-list">
          {menus.map(item => (
          <div className="menu-item" key={item.menuId}>
              
            <div className="menu-img-placeholder"> 
              <img src={item.menuUrl} alt={item.menuName} className="menu-image"/>
            </div>
            <div className="menu-details">
            <p className="menu-name"> {item.menuName}</p>
            <p className="menu-price"> {`${item.price.toLocaleString()} 원`}</p>
            
            {/* 수량 선택 드롭다운 */}
            <select
                value={quantities[item.menuId] || 1}
                onChange={(e) => handleQuantityChange(item.menuId, e.target.value)}
                className="menu-quantity">

                {[1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                      {number} 개
                  </option>
                ))}
                
            </select>

            {/* 담기 버튼 추가 */}
              <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">
                  담기
              </button>
            </div>
          </div>
          ))}
        </div>
          ) : (
            <div className="info-list">
              {/* 가게 이름 */}
              {store.name && (
                <div className="info-item">
                  <p>가게 이름: {store.name}</p>
                </div>
              )}

              {/* 가게 설명 */}
              {store.storeDes && (
                <div className="info-item">
                  <p>설명: {store.storeDes}</p>
                </div>
              )}
              
              {/* 가게 오픈 시간 */}
              {store.openH && (
                <div className="info-item">
                  <p>오픈 시간: {store.openH}</p>
                </div>
              )}
              
              {/* 가게 클로즈 시간 */}
              {store.closeH && (
                <div className="info-item">
                  <p>클로즈 시간: {store.closeH}</p>
                </div>
              )}
              
              {/* 휴일 */}
              {store.hoilday && (
                <div className="info-item">
                  <p>휴일: {store.hoilday}</p>
                </div>
              )}
              
              {/* 연락처 */}
              {store.number && (
                <div className="info-item">
                  <p>연락처: {store.number}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 페이지 하단 주문하기 버튼 */}
        <div className="order-button-container">
            <button className="order-button" onClick={localStorageDel}>
                주문 목록 삭제
            </button>

            <button className="order-button" onClick={nextpage}>
                주문하기
            </button>
        </div>
      </div>
    );
  };
  
export default A001A0004;