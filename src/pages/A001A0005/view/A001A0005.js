import React, { useState, useEffect } from 'react';
import './A001A0005.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET,API_POST } from '../../common/api/Client';
import { json, useNavigate } from 'react-router-dom';

const A001A0005 = () => {
    
    const [orderMenu , setOrderMenu] = useState([]);
    const [totalSum, setTotalSum] = useState('0');
    const [userAddress , setUserAddress] = useState('');
    const navigate = useNavigate(); 
    //주문 요청 사항 
    const [orderplus , setOrderPlus] = useState({
        Address: '',
        Instructions:'',
        payMethod:''
    });
    const [username,setUname]= useState('');
    const [tellnumber , setTellnumber] = useState('');

    useEffect(() => {
        const cartJSON = localStorage.getItem('cart');
        const cart = JSON.parse(cartJSON) || [];
        setOrderMenu(cart);

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        setTotalSum(total);
        
        const addressJSON = localStorage.getItem('address') || '없음';
        setUserAddress(addressJSON);

        const username = localStorage.getItem('username') || '없음';
        setUname(username);

        const utellnum = localStorage.getItem('tellnumber') || '없음';
        setTellnumber(utellnum);
    }, []);

    const changelist = (e) => {(
        setOrderPlus({
            ...orderplus,
            [e.target.name]: e.target.value,
        })
    )};

    const submitOrder = async () => {
        // API 호출 구현
        const res = {
            username,
            orderMenu, //cart 객체
            totalSum,
            userAddress,
            tellnumber,
            ...orderplus,
        }
        try {
            console.log("res 값:",res);
            const {data} = await API_POST(`/rest/v1/A001A0005/insert_order`, res);
            console.log("api 결과 : ", data);
            if(data.result === "SUCCESS" && data.data !== null){
              alert('주문이 완료되었습니다');
              localStorage.removeItem('cart');
                if(data.data.orderId != "null"){
                    const orderId = data.data.orderId
                    navigate(`/A001A0007?orderId=${orderId}`);
                } 
            }else {
              alert("주문에 실패하였습니다. 다시 시도해주세요");
              return;
            }
          }catch(e){
            console.error('api 실패:', e);
            alert("서버가 연결되지 않았습니다.\n담장자에게 문의 주세요.");
            return;
          }
    };

    return (
        <>
            <Navbar />
            <div className="container-md order-form-container">
                <h4>주문서</h4>
                <hr />
                {/* 주문 내역 리스트 */}
                <div className="order-items">
                    {orderMenu.map((item,index) => (
                        <div className="order-item" key={index}>
                            <span>{item.menuName}</span>
                            <span>{item.quantity}개</span>
                            <span>{(item.price * item.quantity).toLocaleString()}원</span>
                        </div>
                    ))}
                    <div className="order-total">
                        <strong>총 주문 가격: </strong>
                        <span>{totalSum.toLocaleString()}원</span>
                    </div>
                </div>

                <h4>사용자 주소</h4>
                <input
                    name="useaddress"
                    type="text"
                    value={userAddress}
                    readOnly 
                    className="form-control"
                />

                <h4>배달지 주소</h4>
                <input
                    name="Address"
                    type="text"
                    value={orderplus.Address}
                    className="form-control"
                    onChange={changelist}
                />

                <h4>전화번호</h4>
                <input
                    name="tellnum"
                    type="text"
                    value={tellnumber}
                    className="form-control"
                    readOnly
                />

                <h4>요청사항</h4>
                <textarea
                    name="Instructions"
                    value={orderplus.Instructions}
                    className="form-control"
                    onChange={changelist}
                ></textarea>

                <h4>결제방식</h4>
                <select
                    name="payMethod"
                    value={orderplus.payMethod}
                    className="form-control"
                    onChange={changelist}
                >
                    <option value="카드">카드</option>
                    <option value="현금">현금</option>
                </select>

                {/* 주문 완료 버튼 */}
                <button onClick={submitOrder} className="btn btn-success btn-block">
                    주문 완료하기
                </button>
            </div>
        </>
    );
};
export default A001A0005;