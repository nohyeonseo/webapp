import React, { useState, useEffect } from 'react';
import './A001A0007.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET, API_POST } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const A001A0007 = () => {
    const [searchParams] = useSearchParams();
    const orderIdParam = searchParams.get('orderId'); // URL에서 orderId 추출
    const [receipt, setReceipt] = useState([]);
    const navigate = useNavigate(); 

    useEffect(()=> {
        const getOrder = async () => {
            try {
                // 쿼리 파라미터를 위한 params 객체 생성
                let params = {};
                if (orderIdParam) {
                    params.orderId = orderIdParam; // params 객체에 키-값 쌍 추가
                }
                const { data } = await API_GET(`/rest/v1/A001A0007/get_Order`,params);
                console.log(data.data);
                if(data.result === "SUCCESS" && data.data !== null){
                    setReceipt(data.data);
                }else{
                    alert("데이터가 존재하지않습니다.");
                    return;
                }
            }catch(e) {
                console.log("getOrder api 오류 :", e);
                alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
                return;
            }
        };
        getOrder();
    },[]);

    const returnHome = async () => {
        navigate('/A001A0002');
    }
    

    return (
        <>
            <Navbar />
            <div className="receipt-container">
                <h2>영수증</h2>
                <p><strong>주문 번호 :</strong> {receipt.length > 0 ? receipt[0].orderId : '없음'} 번 </p>
                <p><strong>주문자 전화번호 :</strong> {receipt.length > 0 ? receipt[0].tellnumber : '없음'} </p>
                <hr />
                <h4> - 주문 목록 - </h4>
                
                {receipt.map((item, index) => (
                    <p key={index}> 메뉴 - {item.menuname} {item.quantity}개<br/> 1개당 가격-{item.price.toLocaleString()}원</p>
                    
                ))}
                
                <p><strong>총 합계 :</strong> {receipt.length > 0 ? receipt[0].totalPrice : '없음'} 원</p>
                <hr />
                <p><strong> 배송 요청 사항 :</strong> {receipt.length > 0 ? receipt[0].instructions : '없음'}</p>
                <p><strong>결제방식 :</strong> {receipt.length > 0 ? receipt[0].paymentMethod : '없음'}</p>
                <p><strong>배달 주소 :</strong> {receipt.length > 0 ? receipt[0].useraddress : '없음'}</p>
            </div>
            <div className="button-container">
                <button className="custom-button" onClick={returnHome}>
                    메인 홈으로
                </button>
            </div>
        </>
    );
};

export default A001A0007;