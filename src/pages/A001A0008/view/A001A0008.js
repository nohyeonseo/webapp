import React, { useState, useEffect } from 'react';
import './A001A0008.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A001A0008 = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const {data} = await API_POST('/rest/v1/A001A0008/insert_store', formData);
        if(data.result === "SUCCESS" && data.data !== null) {
          console.log("삽입된 store", data.data);
          alert('가게가 등록되었습니다.');
          navigate('/A001A0002');
        } else {
          alert('가게가 등록 과정에 오류가 발생하였습니다.');
          return;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    return (
      <div>
        <Navbar />
        <div className="form-container">
        <h1>가게 등록</h1>
        <form onSubmit={handleSubmit} className="store-form">
          <label>
            Store ID:
            <input type="text" name="store_id" value={formData.store_id} onChange={handleInputChange} required />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Number:
            <input type="text" name="number" value={formData.number} onChange={handleInputChange} required />
          </label>

          <label>
            Open Hours (00:00 - 23:59):
            <input type="time" name="open_h" min="00:00" max="23:59" value={formData.open_h} onChange={handleInputChange} required />
          </label>
          <label>
            Close Hours (00:00 - 23:59):
            <input type="time" name="close_h" min="00:00" max="23:59" value={formData.close_h} onChange={handleInputChange} required />
          </label>

          <label>
            Holiday:
            <select name="holiday" value={formData.holiday} onChange={handleInputChange} required>
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
            Category ID:
            <select name="cat_id" value={formData.cat_id} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              <option value="cat_001">Korean (한식)</option>
              <option value="cat_002">Japanese (일식)</option>
              <option value="cat_003">Chinese (중식)</option>
              <option value="cat_004">Western (양식)</option>
              <option value="cat_005">Snacks (분식)</option>
            </select>
          </label>
          <label>
            Description:
            <textarea name="store_des" value={formData.store_des} onChange={handleInputChange} required />
          </label>
          <label>
            Image URL:
            <input type="text" name="img_url" value={formData.img_url} onChange={handleInputChange} required />
          </label>

          <button type="submit">Submit</button>

        </form>
      </div>
      </div>
    );
  };
export default A001A0008;