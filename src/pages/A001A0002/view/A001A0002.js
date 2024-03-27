import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './A001A0002.css'; // CSS 파일 임포트
import { setAuthInfo } from '../../common/store/store';
import Navbar from '../../common/header/Navbar';
import { API_GET } from '../../common/api/Client';

const A001A0002 = (props) => {
    const navigate = useNavigate();
    // const [categories, setCategories] = useState([]);
    // const [adimg , setImg] = useState();
    const [search, setSearch] = useState([]); // 검색어 상태
    const [searchresult, setSeachResult] = useState(); //검색된 결과 담기

    const categories = [
        { id: 1, name: '한식', image: 'korean' },
        { id: 2, name: '중식', image: 'chinese' },
        { id: 3, name: '일식', image: 'japanese' },
        { id: 4, name: '양식', image: 'western' },
        { id: 5, name: '분식', image: 'snacks' },
    ];


    // useEffect(() => {
    //     const getCate = async () => {
    //         try {
    //             const data = await API_GET('/A001A002/categories');
    //             setCategories(data);
    //         } catch (e) {
    //             console.error('카테고리 불러오기에 실패:', e);
    //         }
    //     };
    //     getCate();
    // }, []);
    
    // useEffect(() => {
    //     const getimg = async () => {
    //         try {
    //             const data = await API_GET('/A001A002/Adimg');
    //             setImg(data);
    //             console.log("광고이미지 불러오기",data);
    //         } catch (e) {
    //             console.error('광고이미지 불러오기에 실패:', e);
    //         }
    //     };
    //     getimg();
    // }, []);

    const searchChange = (e) => {
        setSearch(e.target.value); // 입력 필드의 변경사항을 setSearch 상태에 반영,e.target.value-> value로 업데이트한다고 선언
    };

    const handleSearch = async() => {
        try{
            const {data} =  await API_GET('/A001A002/search-in', search);
            if(data.result=== "success"){
                console.log("서치 성공");
                setSeachResult(data);
            }else{
                alert("검색결과가 존재하지않습니다.");
                console.log(data);
            }
        }catch(e){
            console.log(e);
            alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="contents">
                {/* 광고창 */}
                <div className="ad-box">
                    <img
                        className="ad-img"
                        src="/img/image.png"
                        alt="광고 이미지"
                    />
                </div>

                
                {/* 카테고리 */}
                <div className="category-box">
                    {categories.map((cat, index) => (
                        <div className="category-item" key={index}>
                            <a href={`/A001A0003`}>
                                <img
                                    src={`/img/no-img.png`}
                                    alt={cat.name}
                                    className="category-img"
                                />
                            </a>
                            <p className="category-name">{cat.name}</p>
                        </div>
                    ))}
                </div>


                {/* 검색창 */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="음식점을 검색해보세요."
                        className="search-input"
                        value={search}  // input 요소의 값을 search 상태 값으로 설정,무엇이 보여지고 있는지
                        onChange={searchChange} //입력할 때마다 발생하는 이벤트
                    />
                    <button className="search-button" onClick={handleSearch}>
                        검색
                    </button>
                </div>
                {/* 검색된 결과 */}
                {/* {searchresult.map((result, index) => (
                    <div key={index}>{result.name}</div>
                ))} */}

            </div>
        </div>
    );
};

export default A001A0002;