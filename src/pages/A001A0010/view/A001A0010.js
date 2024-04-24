import React, { useState, useEffect } from 'react';
import './A001A0010.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A001A0010 = () => {
  
  const navigate = useNavigate();
  const [StoreList , setStoreList] = useState([]);
  const [selstore , setSelStore] = useState('');

  useEffect(() => {
      const getstore = async () => {
          try {
              const {data} = await API_GET('/rest/v1/A001A0010/store');
              console.log("api 결과: ",data)
              if(data.result === "SUCCESS"){
                  setStoreList(data.data);
                  console.log("가게 목록 ", data.data);
              }else{
                  alert("가게 불러오는데 실패");
                  return;
              }
          } catch (e) {
              console.error('data 연결 없음:', e);
              alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
              return;
          }
      };
      getstore();
  }, []);

  const [menuData, setMenuData] = useState({
      storeId: '',
      menuName: '',
      menuId: '',
      price: '',
      menuUrl: ''
    });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMenuData({
      ...menuData,
      [name]: value
    });
  };

  const changeStore = (event) => {
    const selStoreId = event.target.value;
    setMenuData(prevMenuData => ({
        ...prevMenuData,
        storeId: selStoreId
    }));
  };

  const menu = async (event) => {
    event.preventDefault();
      try {
        const {data} = await API_POST('/rest/v1/A001A0010/insert_menu', menuData);
        if(data.result === "SUCCESS" && data.data !== null) {
          console.log("삽입된 menu: ", data.data);
          alert('메뉴가 등록되었습니다.');
          navigate('/A001A0009');
        } else {
          alert('메뉴 등록 과정에 오류가 발생하였습니다.');
          return;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
  };
    
    
      return (
        <div>
            <Navbar />
            <div className="menu-form-container">
            <h1>메뉴 등록</h1>
            <form onSubmit={menu}>
              <label>
                가게 선택:
                <select name="storeId" value={menuData.storeId} onChange={changeStore} required>
                  <option value="">가게를 선택하세요</option>
                  {StoreList.map(store => (
                    <option key={store.storeId} value={store.storeId}>{store.name}</option>
                  ))}
                </select>
              </label>
              <label>
                메뉴 이름:
                <input type="text" name="menuName" value={menuData.menuName} onChange={handleChange} required />
              </label>
              <label>
                메뉴 ID:
                <input type="text" name="menuId" value={menuData.menuId} onChange={handleChange} required />
              </label>
              <label>
                가격:
                <input type="number" name="price" value={menuData.price} onChange={handleChange} required />
              </label>
              <label>
                메뉴 이미지 URL:
                <input type="text" name="menuUrl" value={menuData.menuUrl} onChange={handleChange} required />
              </label>
              <button type="submit">메뉴 등록하기</button>
          </form>
            </div>
        </div>
      );
    };

export default A001A0010;