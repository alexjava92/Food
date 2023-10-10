import React from 'react';
import {Button, Card, CardContent, CardActions, Typography, Box} from '@mui/material';

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
                    <h1 style={{ textAlign: 'center', margin: '0 auto' }}>
                        Заказ {order.id}: {order.isDone && '🟢'}
                    </h1>
                    <CardContent>

                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Номер заказа {order.id} сумма: {order.orderPrice} руб.
                        </Typography>
                        {order.items.map((item, index) => (
                            <Typography key={index} variant="body2">
                                {item.name} - {item.quantity}
                            </Typography>
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onMarkAsDone(order.id)}
                            disabled={order.isDone}
                            size="small"
                        >
                            Заказ готов
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onDeleteOrder(order.id)}
                            size="small"
                            style={{ display: order.isDone ? 'none' : 'block' }}
                        >
                            Удалить заказ
                        </Button>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => onMarkAsDelivered(order.id)}
                            size="small"
                        >
                            Заказ выдан
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export default OrdersList;
