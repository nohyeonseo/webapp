import React, { useState, useEffect } from 'react';
import './A001A0011.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A001A0011 = () => {
    const navigate = useNavigate();
    const [AdList, setAdList] = useState([]);

    useEffect(() => {
        const getad = async () => {
            try {
                const {data} = await API_GET('/rest/v1/A001A0002/Adimg');
                console.log("api 결과: ",data)
                if(data.result === "SUCCESS"){
                    setAdList(data.data);
                    console.log("광고 목록 ", data.data);
                }else{
                    alert("광고 불러오는데 실패");
                    return;
                }
            } catch (e) {
                console.error('data 연결 없음:', e);
                alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
                return;
            }
        };
        getad();
    }, []);

    const [AdData, setAdData] = useState({
        imgId:'',
        imgName: '',
        imgUrl: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAdData({
            ...AdData,
            [name]: value
        });
    };

    const createad = async (event) => {
        event.preventDefault();
        try {
            const {data} = await API_POST('/rest/v1/A001A0011/insert_Ad', AdData);
            if(data.result === "SUCCESS" && data.data !== null) {
            console.log("삽입된 광고: ", data.data);
            alert('광고가 등록되었습니다.');
            navigate('/A001A0009');
            } else {
                alert('광고 등록 과정에 오류가 발생하였습니다.');
                return;
            }
        } catch (e) {
            console.error('data 연결 없음:', e);
            alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
            return;
        }
    };

        
    return (
        <div>
            <Navbar />
            <div className="menu-form-container">
            <h1>광고 등록하기</h1>
            <form onSubmit={createad}>
            <label>
                등록된 광고 목록
                <ul>
                    {AdList.map(Ad => (
                        <li key={Ad.imgId}>
                            광고 ID - {Ad.imgId} <hr />
                            광고 이름 - {Ad.imgName}
                        </li>
                    ))}
                </ul>
            </label>
            <label>
                광고 ID: 
                <input type="text" name="imgId" value={AdData.imgId} onChange={handleChange} required />
            </label>
            <label>
                광고 이름: 
                <input type="text" name="imgName" value={AdData.imgName} onChange={handleChange} required />
            </label>
            
            <label>
                광고 이미지 URL (img/): 
                <input type="text" name="imgUrl" value={AdData.imgUrl} onChange={handleChange} required />
            </label>
            <button type="submit">광고 등록하기</button>
        </form>
            </div>
        </div>
    );
};

export default A001A0011;