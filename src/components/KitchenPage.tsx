import React, {useEffect, useRef, useState} from 'react';
import OrdersList, {OrderList} from "./OrdersList";
import { useDispatch, useSelector } from 'react-redux';
import {deleteOrder, markOrderAsDelivered, markOrderAsDone, setOrders} from '../redux/actions';
import axios from 'axios';
import { AppState } from "../redux/reducers";
import {updateOrderStatusToCompleted} from "../api/api";


const KitchenPage: React.FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: AppState) => state.orders);
    console.log("выполняется " , orders)
    // Получение заказов с сервера при монтировании компонента
    const [transformedOrders, setTransformedOrders] = useState<OrderList[]>([]);

    const fetchOrders = async () => {
        try {

            const response = await axios.get('http://localhost:5000/api/orders-all');
            console.log("UseEffect",  response.data)
            // Обновление состояния redux полученными заказами
            // Предполагается, что у вас есть действие для установки заказов. Замените 'setOrders' на ваше действие.
            //dispatch(setOrders(response.data));

            const rawData:any = response.data; // ваш исходный массив заказов

            const ordersMap:any = {};

            rawData.forEach((orderData:any) => {
                const {
                    id,
                    name,
                    price,
                    quantity,
                    status,
                    total_price,
                    total_quantity
                } = orderData;

                if (!ordersMap[id]) {
                    ordersMap[id] = {
                        id: id,
                        items: [],
                        orderPrice: parseFloat(total_price),
                        totalQuantity: total_quantity,
                        isDone: status
                    };
                }

                ordersMap[id].items.push({
                    name,
                    price: parseFloat(price),
                    quantity
                });
            });

            const result: OrderList[] = Object.values(ordersMap) as OrderList[];
            console.log("преобразованый", result);
            setTransformedOrders(result);
            dispatch(setOrders(result));
        } catch (error) {
            console.error("Ошибка при получении заказов:", error);
        }
    };

    useEffect(() => {



        fetchOrders();
    }, [dispatch]);

    const handleMarkAsDone = async (orderId: number) => {
        await updateOrderStatusToCompleted(orderId);
        await fetchOrders();  // Повторно получаем список заказов
        dispatch(markOrderAsDone(orderId));
    };

    const handleDeleteOrder = async (orderId: number) => {
        dispatch(deleteOrder(orderId));
    };

    const handleMarkAsDelivered = async (orderId: number) => {
        dispatch(markOrderAsDelivered(orderId));
    };

    return (
        <div>
            <OrdersList orders={transformedOrders} onMarkAsDone={handleMarkAsDone}
                        onDeleteOrder={handleDeleteOrder}
                        onMarkAsDelivered={handleMarkAsDelivered}/>
        </div>
    );
};

export default KitchenPage;
