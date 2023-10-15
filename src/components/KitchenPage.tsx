import React, {useEffect, useRef} from 'react';
import OrdersList from "./OrdersList";
import {useDispatch, useSelector} from 'react-redux';
import {deleteOrder, markOrderAsDelivered, markOrderAsDone} from '../redux/actions';


import {AppState} from "../redux/reducers";



const KitchenPage: React.FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: AppState) => state.orders);


    const handleMarkAsDone = (orderId: number) => {
        dispatch(markOrderAsDone(orderId));
    };


    const handleDeleteOrder = (orderId: number) => {
        dispatch(deleteOrder(orderId));
    };

    const handleMarkAsDelivered = (orderId: number) => {
        dispatch(markOrderAsDelivered(orderId));
    };


    return (
        <div>

            <OrdersList orders={orders} onMarkAsDone={handleMarkAsDone}
                        onDeleteOrder={handleDeleteOrder}
                        onMarkAsDelivered={handleMarkAsDelivered}/>

        </div>
    );
};

export default KitchenPage;
