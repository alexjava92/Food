import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';
import {Box, Card, CardContent, Divider, Typography} from '@mui/material';
import {OrderItemList} from './OrdersList';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';

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
                <Box display="flex" alignItems="center" mb={3}>
                    <HistoryIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                    <Typography variant="h4">
                        История заказов
                    </Typography>
                </Box>
            )}

            {deliveredOrders.map((order) => (
                <Card key={order.id} variant="outlined" sx={{ marginBottom: 3 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography variant="h6">
                                Заказ №{order.id}:
                            </Typography>
                            <Typography variant="h6" color={order.orderStatus === "deleted" ? "error.main" : "success.main"}>
                                {order.orderStatus === "deleted" ? <CancelIcon /> : <CheckCircleOutlineIcon />} {order.orderPrice} руб.
                            </Typography>
                        </Box>

                        <Typography variant="caption" display="block" gutterBottom>
                            ⏳ {order.deliveryDate.toLocaleString()}
                        </Typography>

                        <Divider sx={{ my: 1 }} />

                        {order.items.map((item, index) => (
                            <Box display="flex" alignItems="center" mt={1}>
                                <ArrowRightIcon color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2">
                                    {item.name} - {item.quantity}
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DeliveredOrders;
