import React, {useEffect, useState} from 'react';
import {Grid, IconButton, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SubmitOrderButton from "./SubmitOrderButton";
import {submitOrder} from "../redux/actions";
import {useDispatch} from "react-redux";


export type OrderItemSummary = {
    id: number;
    name: string;
    quantity: number;
    price: number;
};

export type OrderSummary = {
    id: number;
    items: OrderItemSummary[];
};

type OrderSummaryProps = {
    orderItems: OrderItemSummary[];
    onItemRemove: (itemId: number) => void;
};


const OrderSummary: React.FC<OrderSummaryProps> = ({orderItems, onItemRemove}) => {
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(submitOrder());
    };
    // Используйте useState для хранения суммы цен
    const [priceList, setPriceList] = useState(0);

    // Вычислите сумму цен при загрузке компонента
    useEffect(() => {
        const totalPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setPriceList(totalPrice);
    }, [orderItems]);

    return (
        <Grid container spacing={2}>
            {orderItems.length > 0 && (
                <Grid item xs={12}>
                    <h1 style={{ fontSize: '24px' }}>Корзина заказа: {priceList} руб.</h1>
                </Grid>
            )}
            {orderItems.length > 0 &&
                orderItems.map((item) => (
                    <Grid item xs={6} key={item.id}>
                        <Paper elevation={3} style={{
                            padding: '10px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s', // Добавляем анимацию
                        }}>
                            <div className="order-item">
                                {item.name} - {item.quantity} - {item.price}
                                <IconButton
                                    color="error"
                                    aria-label="delete"
                                    onClick={() => onItemRemove(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            {orderItems.length > 0 && (
                <Grid item xs={12}>
                    <SubmitOrderButton onSubmit={handleSubmit} />
                </Grid>
            )}

        </Grid>

    );
};


export default OrderSummary;
