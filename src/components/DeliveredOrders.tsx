import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';
import { Card, CardContent, Typography } from '@mui/material';
import {OrderItemList} from './OrdersList';  // если у вас там определены типы
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export type DeliveredOrderList = {
    id: number;
    items: OrderItemList[];
    deliveryDate: Date; // Дата и время доставки
    orderStatus: "issued" | "deleted"
    orderPrice: number

};


const DeliveredOrders: React.FC = () => {
    const deliveredOrders = useSelector((state: AppState) => state.deliveredOrders);

    return (
        <div>
            {deliveredOrders.length > 0 && (
            <Typography variant="h4" gutterBottom>
                История заказов:
            </Typography>
            )}
            {deliveredOrders.map((order) => (

                <Card key={order.id} style={{ marginBottom: 20 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Заказ №{order.id}: {order.orderStatus === "deleted" ? (
                            <del>{order.orderPrice}</del>
                        ) : order.orderPrice} руб. {order.orderStatus === "deleted" ? "🔴" : "🟢"}
                        </Typography>
                        <Typography variant="caption">
                            ⏳ {order.deliveryDate.toLocaleString()}
                        </Typography>
                        {order.items.map((item, index) => (
                            <Typography key={index} variant="body2" paragraph>
                               <ArrowRightIcon/> {item.name} - {item.quantity}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DeliveredOrders;
