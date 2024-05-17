import React, { useState, useEffect } from 'react';
import './A002A0002.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A002A0002 = () => {
  
  const navigate = useNavigate();
  const [StoreList , setStoreList] = useState([]);
  const [MenuList , setMenuList] = useState([]);
  const [selstore , setSelStore] = useState('') //선택된 가게 -> 선택된 가게의 menuId 등등 나열됨
  const [selMenu , setSelMenu] = useState([]);


  useEffect(() => {
      const getstore = async () => {
          try {
              const {data} = await API_GET('/rest/v1/A001A0010/store'
             
            
            );
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
    const selStoreId = event.target.value; //가게 선택시 선택한 value(storeId) 를 selStoreId로
    setMenuData(prevMenuData => ({
        ...prevMenuData,
        storeId: selStoreId
    }));
    getMenuByStore(selStoreId);
  };

  const getMenuByStore = async(storeId) => {
    try {
      const {data} = await API_GET(`/rest/v1/A002A0002/get_menu?store_id=${storeId}`);
      console.log("선택 가게의 메뉴 결과: ",data.data)
      if(data.result === "SUCCESS"){
          setMenuList(data.data);
          console.log("가게의 메뉴 목록 ", data.data);
      }else{
          alert("가게 불러오는데 실패");
          return;
      }
    } catch (e) {
        console.error('data 연결 없음:', e);
        alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
        return;
    }
  }

  const changeMenu = (event) => {
    const selMenuId = event.target.value; //메뉴선택시 선택한 value(menuId) 를 selMenuId
    setMenuData(prevMenuData => ({
        ...prevMenuData,
        menuId: selMenuId
    }));
    selMenu(selMenuId);
  };


  const menu = async (event) => {
    event.preventDefault();
      
  };
    
    
      return (
        <div>
            <Navbar />
            <div className="menu-form-container">
            <h1>메뉴 수정</h1>
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
                메뉴 선택:
                <select name="storeId" value={menuData.menuId} onChange={changeMenu} required>
                  <option value="">메뉴를 선택하세요</option>
                  {MenuList.map(menu => (
                    <option key={menu.menuId} value={menu.menuId}>{menu.menuName}</option>
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
              <button type="submit">메뉴 수정하기</button>
          </form>
            </div>
        </div>
      );
    };

export default A002A0002;