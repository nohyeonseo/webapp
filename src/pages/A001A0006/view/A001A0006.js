import React, { useState, useEffect } from 'react';
import './A001A0006.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';

const A001A0006 = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        tellnumber: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API_POST('/rest/v1/A001A0006/sign-in', formData);
            if( data.result === "success"){
               alert("회원가입이 완료되었습니다"); 
               console.log(data);
            } else{
                alert("회원가입에 실패하였습니다. \n다시 시도해주세요");
                console.log(data)
            }   
        }catch(error) {
            console.error("회원가입 실패",error);
            alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="signup-container">
                <form onSubmit={handleSubmit} className="signup-form">
                    
                    <h2>회원가입</h2>
                    
                    <input type="text" name="username" placeholder="사용자 이름" value={formData.username} onChange={handleChange} />
                    <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                    <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} />
                    <input type="text" name="tellnumber" placeholder="전화번호" value={formData.tellnumber} onChange={handleChange} />
                    <input type="text" name="address" placeholder="주소" value={formData.address} onChange={handleChange} />
                    
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </>
    );
};
export default A001A0006;