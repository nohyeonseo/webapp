import React, { useState, useEffect } from 'react';
import './A001A0005.css'; // 새 CSS 파일 임포트
import Navbar from '../../common/header/Navbar';
import { API_GET } from '../../common/api/Client';
import { useNavigate } from 'react-router-dom';

const A001A0005 = () => {
    // 이 예제에서는 상태를 하드코딩했습니다. 실제 앱에서는 API에서 이 데이터를 가져와야 합니다.
    const [order, setOrder] = useState({
        items: [
            { id: 1, name: 'c메뉴', quantity: 2, price: 3000 },
            { id: 2, name: 'b메뉴', quantity: 1, price: 2000 }
        ],
        total: 8000, // 수량과 가격을 곱한 값을 모두 더한 총합계
        deliveryAddress: '',
        paymentMethod: 'card', // 'cash' or 'card'
        specialInstructions: ''
    });

    const orderItems = [
        { id: 1, name: 'c메뉴', quantity: 2, price: 3000 },
        { id: 2, name: 'b메뉴', quantity: 1, price: 2000 },
    ];

    // 총합계 계산
    const totalSum = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    // 주문 완료 핸들러
    const submitOrder = () => {
        console.log('주문 데이터', order);
        // 여기에 주문 데이터를 서버로 전송하는 코드를 구현하세요.
        alert('주문이 완료되었습니다.');
    };

    return (
        <>
            <Navbar />
            <div className="container-md order-form-container">
                <h4>주문서</h4>
                <hr />
                {/* 주문 내역 리스트 */}
                <div className="order-items">
                    {orderItems.map((item) => (
                        <div className="order-item" key={item.id}>
                            <span>{item.name}</span>
                            <span>{item.quantity}개</span>
                            <span>{(item.price * item.quantity).toLocaleString()}원</span>
                        </div>
                    ))}
                    <div className="order-total">
                        <strong>총합계: </strong>
                        <span>{totalSum.toLocaleString()}원</span>
                    </div>
                </div>

                <h4>배달지 주소</h4>
                <input
                    type="text"
                    value={order.deliveryAddress}
                    onChange={(e) => setOrder({ ...order, deliveryAddress: e.target.value })}
                    className="form-control"
                />

                <h4>요청사항</h4>
                <textarea
                    value={order.specialInstructions}
                    onChange={(e) => setOrder({ ...order, specialInstructions: e.target.value })}
                    className="form-control"
                ></textarea>

                <h4>결제방식</h4>
                <select
                    value={order.paymentMethod}
                    onChange={(e) => setOrder({ ...order, paymentMethod: e.target.value })}
                    className="form-control"
                >
                    <option value="card">카드</option>
                    <option value="cash">현금</option>
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