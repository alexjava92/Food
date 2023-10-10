import React from 'react';
import Menu from "./Menu";

import OrderSummary from "./OrderSummary";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../redux/actions";
import KitchenPage from "./KitchenPage";
import {Grid, styled} from "@mui/material";
import DeliveredOrders from "./DeliveredOrders";
import {AppState} from "../redux/reducers";




const MenuPage: React.FC = () => {
    const dispatch = useDispatch();
    const menuItems = useSelector((state: AppState) => state.menuItems);  // Укажите правильный тип для `state`
    const orderItems = useSelector((state: AppState) => state.orderItems);  // Укажите правильный тип для `state`

    const handleItemSelect = (item: any) => {  // Укажите правильный тип для `item`
        dispatch(addItem(item));
    };


    const handleItemRemove = (itemId: number) => {
        dispatch(removeItem(itemId));
    };

    return (

        <StyledGrid container spacing={3} >
            <Grid item sm={3} >

                <Menu items={menuItems} onItemSelect={handleItemSelect}/>
            </Grid>

            <Grid item sm={3}>
                <OrderSummary orderItems={orderItems} onItemRemove={handleItemRemove}/>
            </Grid>

            <Grid item sm={3}>
                <KitchenPage/>
            </Grid>

            <Grid item sm={3}>
                <DeliveredOrders/>
            </Grid>
        </StyledGrid>

    );
};

const StyledGrid = styled(Grid)`
 
`;

export default MenuPage;

