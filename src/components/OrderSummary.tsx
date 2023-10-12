import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
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
                    <Box display="flex" alignItems="center">
                        <ShoppingCartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
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
                                    <DeleteIcon />
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
