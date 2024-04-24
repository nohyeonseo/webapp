import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './A001A0002.css'; // CSS 파일 임포트
import { setAuthInfo } from '../../common/store/store';
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';

const A001A0002 = (props) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [Imgs , setImgs] = useState([]); //광고이미지 배열
    const [Index, setIndex] = useState(0); // 현재 보여줄 이미지의 인덱스
    
    const [search, setSearch] = useState(''); // 검색어 상태
    const [searchResult, setSearchResult] = useState([]); // 검색된 결과 담기

    useEffect(() => {
        const getCat = async () => {
            try {
                const {data} = await API_GET('/rest/v1/A001A0002/get_cat');
                console.log("Api 결과: ",data);
                if(data.result === "SUCCESS") {
                    setCategories(data.data);
                    console.log("카테 불러오기", data.data);
                }else {
                    alert("카테 이미지를 불러오는데 실패");
                    return;
                }

            } catch (e) {
                console.error('카테고리 불러오기에 실패:', e);
                alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
                return;
            }
        };
        getCat();
    }, []);
    
    useEffect(() => {
        const getimg = async () => {
            try {
                const {data} = await API_GET('/rest/v1/A001A0002/Adimg');
                console.log("api 결과: ",data)
                if(data.result === "SUCCESS"){
                    setImgs(data.data);
                    console.log("광고이미지 불러오기",data.data);
                }else{
                    alert("광고 이미지를 불러오는데 실패");
                    return;
                }
            } catch (e) {
                console.error('data 연결 없음:', e);
                alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
                return;
            }
        };
        getimg();
    }, []);

    // 다음 이미지로 넘기기
    const nextImage = () => {
        setIndex((Index + 1) % Imgs.length);
    };

    // 이전 이미지로 돌아가기
    const prevImage = () => {
        setIndex((Index - 1 + Imgs.length) % Imgs.length);
    };

    const searchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async() => {

        try{
            const res = { search: search }; 
            const { data } = await API_POST(`/rest/v1/A001A0002/searchIn`, res);
            if(data.result=== "SUCCESS" && data.data !==null){
                console.log("서치 성공",data.data);
                setSearchResult(data.data);
            }else{
                console.log(data);
            }
        }catch(e){
            console.log(e);
            alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
        }
    };
    const SearchResult = ({ result, onClick }) => {
        return (
          <div className="result-card" onClick={onClick}>
            <img src={result.imgUrl} alt={result.name} className="result-img" />
            <div className="result-info">
              <h3 className="result-name">{result.name}</h3>
              <p className="result-description">{result.storeDes}</p>
              <p className="result-time">Open: {result.openH} - Close: {result.closeH}</p>
              <p className="result-number">Contact: {result.number}</p>
            </div>
          </div>
        );
      };

      const handlestore = (storeId) => {
        navigate(`/A001A0004/${storeId}`);
    }


    return (
        <div>
            <Navbar />
            <div className="contents">
                {/* 광고창 */}
                {/* <div className="ad-box">
                    {Imgs.length > 0 && (
                        <div className="ad-img-container">
                            <button className="prev-button" onClick={prevImage}>&lt;</button>
                            <img
                                className="ad-img"
                                src={Imgs[Index].imgUrl}
                                alt={`광고 이미지 ${Index + 1}`}
                            />
                            <button className="next-button" onClick={nextImage}>&gt;</button>
                        </div>
                    )}
                </div> */}
                <div className="ad-box">
                    {Imgs.length > 0 && (
                        <div className="ad-img-container">
                            <button className="prev-button" onClick={prevImage}>&lt;</button>
                            <div className="ad-label">광고</div> {/* 광고 레이블 추가 */}
                            <img
                                className="ad-img"
                                src={Imgs[Index].imgUrl}
                                alt={`광고 이미지 ${Index + 1}`}
                            />
                            <button className="next-button" onClick={nextImage}>&gt;</button>
                        </div>
                    )}
                </div>
                
                {/* 카테고리 */}
                <div className="category-box">
                    {categories.map((cat, index) => (
                        <div className="category-item" key={index}>
                            <a href={`/A001A0003?catId=${cat.catId}`}>
                                <img
                                    src={cat.catUrl ? cat.catUrl : `/img/no-img.png`}
                                    alt={cat.catName}
                                    className="category-img"
                                />
                            </a>
                            <p className="category-name">{cat.catName}</p>
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
                <div className="results-container">
                    {searchResult.map((result, index) => (
                        <SearchResult key={index} result={result} onClick={() => handlestore(result.storeId)}/>
                    ))}
                </div>  
            </div>
        </div>
    );
};

export default A001A0002;