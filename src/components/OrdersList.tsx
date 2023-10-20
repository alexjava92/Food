import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, CardActions, Typography, Box, Divider} from '@mui/material';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

export type OrderItemList = {
    idItemList: number;
    name: string;
    quantity: number;
};

export type OrderList = {
    id: number;
    items: OrderItemList[];
    isDone?: boolean;
    orderPrice: number
    totalQuantity: number
};

type OrdersListProps = {
    orders: OrderList[];
    onMarkAsDone: (orderId: number) => void;
    onDeleteOrder: (orderId: number) => void;
    onMarkAsDelivered: (orderId: number) => void;
};

const OrdersList: React.FC<OrdersListProps> = ({
                                                   orders,
                                                   onMarkAsDone,
                                                   onDeleteOrder,
                                                   onMarkAsDelivered
                                               }) => {



    return (
        <Box sx={{ minWidth: 275 }}>
            {orders.map(order => (
                <Card key={order.id} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                                <KitchenIcon color="primary" sx={{ mr: 1 }} />
                                <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Заказ №{order.id}
                                </Typography>
                            </Box>
                            {order.isDone && <CheckCircleOutlineIcon color="success" sx={{ fontSize: 24 }} />}
                        </Box>

                        <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 1 }}>
                            Сумма заказа: {order.orderPrice} руб.
                        </Typography>

                        <Divider sx={{ my: 1 }} />

                        {order.items.map((item, index) => (
                            <Typography key={index} variant="body2" sx={{ mt: 1 }}>
                                {item.name} - {item.quantity}
                            </Typography>
                        ))}
                    </CardContent>

                    <CardActions>
                        {!order.isDone && (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onMarkAsDone(order.id)}
                                    size="small"
                                    startIcon={<CheckCircleOutlineIcon />}
                                >
                                    Готов
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => onDeleteOrder(order.id)}
                                    size="small"
                                    startIcon={<CancelIcon />}
                                >
                                    Удалить
                                </Button>
                            </>
                        )}
                        {order.isDone && (
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => onMarkAsDelivered(order.id)}
                                size="small"
                                startIcon={<DeliveryDiningIcon />}
                            >
                                Выдать
                            </Button>
                        )}
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export default OrdersList;
