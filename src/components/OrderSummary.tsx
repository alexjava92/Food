import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,
    IconButton,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {submitOrder} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {addNewOrder} from "../api/api";
import {AppState} from "../redux/reducers";


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
    const totalQuantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderData = {
        items: orderItems,
        total_quantity: totalQuantity,
        total_price: totalPrice,
        status: "Processing"
    };
    const state = useSelector((state: AppState) => state);

    const dispatch = useDispatch();


    const handleSubmit = async () => {
        try {
            // Вычисляем orderPrice, складывая цены всех позиций заказа
            const orderPrice = state.orderItems.reduce((totalPrice, item) => {
                return totalPrice + item.price * item.quantity;
            }, 0);
            // Формирование нового заказа
            const newOrder = {

                id: state.orders.length + state.deliveredOrders.length + 1,  // присваиваем новому заказу следующий ID
                items: state.orderItems.map(item => ({
                    ...item,
                    id: new Date().getTime()// создаем уникальный ID для каждого товара
                })),
                orderPrice: orderPrice

            };
            const orderToSubmit = {
                orderId: newOrder.id,
                items: newOrder.items,
                totalQuantity: newOrder.items.reduce((total, item) => total + item.quantity, 0),
                totalPrice: newOrder.orderPrice
            };
            await addNewOrder(orderToSubmit)

            // Если вам нужно отправить submitOrder перед созданием заказа:
            dispatch(submitOrder());


            // Здесь вы можете обработать логику после создания заказа
            // Например, очистить orderItems или показать сообщение об успехе
        } catch (error) {
            console.error("Ошибка при создании заказа:", error);
            // Обработка ошибок (например, показать пользователю сообщение об ошибке)
        }
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
                    <Box display="flex" alignItems="center">
                        <ShoppingCartIcon color="primary" sx={{fontSize: 28, mr: 1}}/>
                        <Typography variant="h5">
                            Корзина заказа: {priceList} руб.
                        </Typography>
                    </Box>
                </Grid>
            )}

            <Grid item xs={12}>
                <List>
                    {orderItems.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.name}
                                secondary={`${item.quantity} - ${item.price} руб.`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton color="error" onClick={() => onItemRemove(item.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            {orderItems.length > 0 && (
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Оформить заказ
                    </Button>
                </Grid>
            )}
        </Grid>

    );
};


export default OrderSummary;
