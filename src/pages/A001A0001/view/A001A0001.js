import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './A001A0001.css'; // CSS 파일 임포트
import {setAuthInfo} from '../../common/store/store';
import Navbar from '../../common/header/Navbar'
import {API_GET, API_POST} from '../../common/api/Client';

const A001A0001 = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const Login = async () => {
      // 로그인 로직 구현
      if (username === '') {
        alert("아이디를 입력하세요");
        return;
      }
      if (password === '') {
        alert("비밀번호를 입력하세요");
        return;
      }
      try{
        const {data} = await API_POST('/rest/v1/A001A0001/login-in', {
          username,
          password,
        });
        console.log("로그인 시도:",data);
        if(data.result == "FAIL"){
          alert("로그인에 실패하였습니다.");
          return;
        }
        alert("로그인에 성공");
        setAuthInfo(data.data);
        navigate('/A001A0002');
      }
      catch(e){
        alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
      }
    };
  
    const join = async() => {
      navigate('/A001A0006'); //회원가입페이지
    };

    return(
      <div>
        <Navbar />
        <div className="login-container">
        <div className="login-title">로그인 페이지</div>
  
        <div className="login-form">
          <div className="input-group">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="아이디를 입력하세요"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
  
          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <button className="login-button" onClick={Login}>
            로그인 하기
          </button>
          <button className="join-button" onClick={join}>
            회원가입
          </button>
        </div>
      </div>
      </div>
    );

};
export default A001A0001;