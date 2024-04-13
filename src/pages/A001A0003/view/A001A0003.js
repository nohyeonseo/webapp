import React, { useState, useEffect } from 'react';
import './A001A0003.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { useSearchParams } from 'react-router-dom';
import { API_GET } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';

const A001A0003 = () => {

    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams();
    const catId = searchParams.get('catId'); // URL에서 catId 추출
    const [shops, setShops] = useState([]); // API에서 받아온 가게 데이터 저장할 상태


    useEffect(() => {
        const getCatStore = async () => {
            try {
                const {data} = await API_GET(`/rest/v1/A001A0003/get_catStore/${catId}`);
                console.log("Api 결과: ",data);
                if(data.result === "SUCCESS"&& data.data.length > 0) {
                    setShops(data.data);
                    console.log("카테 리스트 불러오기 성공", data.data);
                }else {
                    alert("카테에 해당하는 가게가 존재하지않습니다.");
                    return;
                }

            } catch (e) {
                console.error('카테 리스트 불러오기에 실패:', e);
                alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
                return;
            }
        };
        getCatStore();
    }, []);

    const handlestore = (storeId) => {
        navigate(`/A001A0004/${storeId}`);
    }

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
                    <div className="shop-item" key={index} onClick={()=> handlestore(shop.storeId)}>
                        <img
                            src={shop.imgUrl}
                            alt={shop.name}
                            className="shop-img"
                        />
                        <div className="shop-details">
                            <p className="shop-name">{shop.name}</p>
                            <p className="shop-price">{shop.storeDes}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default A001A0003;