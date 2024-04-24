import React, { useState, useEffect } from 'react';
import './A002A0001.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A002A0001 = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [storeList , setStoreList] = useState([]);

    useEffect(()=> {
      const getStoreList = async ()=> {
        try{
          const {data} = await API_GET('/rest/v1/A002A0001/get_storeList');
          console.log("가게 api 결과: " , data.data);
          if(data.result === "SUCCESS" && data.data !== null){
            setStoreList(data.data);
          }else {
            alert("메뉴정보가 존재하지 않습니다.");
            return;
          }
        }catch(e){
          console.error('api 실패:', e);
          alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
          return;
        }
      };
      getStoreList();
    },[]);

    const changeStore = (e) => {
      const selStoreId = e.target.value; //사용자가 이벤트(e) 클릭시 해당 이벤트 (여기선 option)의 value를 들고옴 (여기선 store.id)
      const selStore = storeList.find(store => store.storeId === selStoreId);
      if (selStore) {
        setFormData({
          store_Id: selStore.storeId,
          name: selStore.name,
          number: selStore.number,
          open_h: selStore.openH,
          close_h: selStore.closeH,
          holiday: selStore.holiday,
          cat_id: selStore.catId,
          store_des: selStore.storeDes, 
          img_url: selStore.imgUrl
        });
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("수정할 formdata :",formData);
      try{
        const {data} = await API_POST('/rest/v1/A002A0001/update_Store',formData);
          console.log("api 결과: " , data.data);
          if(data.result === "SUCCESS" && data.data !== null){
            alert("가게 정보가 수정되었습니다.");
            navigate('/A001A0009');
          }else {
            alert("수정하는데 실패하였습니다.");
            return;
          }
      }catch(e){
        console.error('api 실패:', e);
        alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
        return;
      }
    };
  
    return (
      <div>
        <Navbar />
        <div className="form-container">
        <h1>가게 수정</h1>
        <form onSubmit={handleSubmit} className="store-form">
          <label>
            가게 선택하기
            <select onChange={changeStore}>
              {storeList.map((store) => (
                <option key={store.storeId} value={store.storeId}>
                  {store.name}
                </option>
              ))}
            </select>
          </label>
          
          <label>
            가게 ID:
            <input type="text" name="store_Id" value={formData?.storeId || '없음'} onChange={handleInputChange} required />
          </label>
          <label>
            가게 Name:
            <input type="text" name="name" value={formData?.name || '없음'} onChange={handleInputChange} required />
          </label>
          <label>
            가게 Number:
            <input type="text" name="number" value={formData?.number|| '없음'} onChange={handleInputChange} required />
          </label>

          <label>
            Open Hours (00:00 - 23:59):
            <input type="time" name="open_h" min="00:00" max="23:59" value={formData?.open_h|| '없음'} onChange={handleInputChange} required />
          </label>
          <label>
            Close Hours (00:00 - 23:59):
            <input type="time" name="close_h" min="00:00" max="23:59" value={formData?.close_h|| '없음'} onChange={handleInputChange} required />
          </label>

          <label>
            휴일:
            <select name="holiday" value={formData?.holiday|| '없음'} onChange={handleInputChange} required>
              <option value="월요일">월요일</option>
              <option value="화요일">화요일</option>
              <option value="수요일">수요일</option>
              <option value="목요일">목요일</option>
              <option value="금요일">금요일</option>
              <option value="토요일">토요일</option>
              <option value="일요일">일요일</option>
            </select>
          </label>
          <label>
            가게 카테고리 ID:
            <select name="cat_id" value={formData?.cat_id|| '없음'} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              <option value="cat_001">Korean (한식)</option>
              <option value="cat_002">Japanese (일식)</option>
              <option value="cat_003">Chinese (중식)</option>
              <option value="cat_004">Western (양식)</option>
              <option value="cat_005">Snacks (분식)</option>
            </select>
          </label>
          <label>
            가게 설명:
            <textarea name="store_des" value={formData?.store_des|| '없음'} onChange={handleInputChange} required />
          </label>
          <label>
            가게 Image URL:
            <input type="text" name="img_url" value={formData?.img_url|| '없음'} onChange={handleInputChange} required />
          </label>

          <button type="submit">가게 수정하기</button>

        </form>
      </div>
      </div>
    );
  };
export default A002A0001;