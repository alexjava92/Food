// actions.ts

import {MenuItem} from "../components/Menu";
import {OrderItemList} from "../components/OrdersList";


export const ADD_ITEM = 'ADD_ITEM';
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const MARK_ORDER_AS_DONE = 'MARK_ORDER_AS_DONE';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
export const DELETE_ORDER = 'DELETE_ORDER';
export const MARK_ORDER_AS_DELIVERED = 'MARK_ORDER_AS_DELIVERED';
export const SET_ORDERS = 'SET_ORDERS';

export interface AddItemAction {
    type: typeof ADD_ITEM;
    item: MenuItem;
}

export interface AddMenuItemAction {
    type: typeof ADD_MENU_ITEM;
    payload: {
        name: string;
        price: number;
        description: string,
        amount: string
    }
}

interface UpdateMenuItemAction {
    type: typeof UPDATE_MENU_ITEM;
    payload: MenuItem;
}

interface DeleteMenuItemAction {
    type: typeof DELETE_MENU_ITEM;
    id: number;
}

export interface SubmitOrderAction {
    type: typeof SUBMIT_ORDER;
}

export interface MarkOrderAsDoneAction {
    type: typeof MARK_ORDER_AS_DONE;
    orderId: number;
}

export interface RemoveItemAction {
    type: typeof REMOVE_ITEM;
    itemId: number;
}

export interface UpdateOrderAction {
    type: typeof UPDATE_ORDER;
    orderId: number;
    updatedItems: OrderItemList[];
}

interface UpdateItemQuantityAction {
    type: typeof UPDATE_ITEM_QUANTITY;
    orderId: number;
    itemName: string;
    quantity: number;
}

export interface DeleteOrderAction {
    type: typeof DELETE_ORDER;
    orderId: number;
}

export interface MarkOrderAsDeliveredAction {
    type: typeof MARK_ORDER_AS_DELIVERED;
    orderId: number;
}
export interface SetOrdersAction {
    type: typeof SET_ORDERS;
    orders: any[]; // замените `any` на тип вашего заказа, если он у вас есть
}

export type AppActionTypes = AddItemAction | SubmitOrderAction | MarkOrderAsDoneAction | RemoveItemAction |
    UpdateOrderAction | UpdateItemQuantityAction | DeleteOrderAction | MarkOrderAsDeliveredAction | AddMenuItemAction |
    UpdateMenuItemAction | DeleteMenuItemAction | SetOrdersAction;


export const addItem = (item: MenuItem): AppActionTypes => ({
    type: ADD_ITEM,
    item
});
export const addMenuItem = (name: string, price: number, description: string, amount: string): AppActionTypes => ({
    type: ADD_MENU_ITEM,
    payload: {
        name,
        price,
        description,
        amount
    }
})
export const updateMenuItem = (item: MenuItem): UpdateMenuItemAction => {
    return {
        type: UPDATE_MENU_ITEM,
        payload: item
    }
}
export const deleteMenuItemAC = (id: number): DeleteMenuItemAction => {
    return {
        type: DELETE_MENU_ITEM,
        id
    }
}
export const submitOrder = (): AppActionTypes => ({
    type: SUBMIT_ORDER
});

export const markOrderAsDone = (orderId: number): AppActionTypes => ({
    type: MARK_ORDER_AS_DONE,
    orderId
});

export const removeItem = (itemId: number): AppActionTypes => ({
    type: REMOVE_ITEM,
    itemId
});

export const updateOrder = (orderId: number, updatedItems: OrderItemList[]): AppActionTypes => ({
    type: UPDATE_ORDER,
    orderId,
    updatedItems
});
export const updateItemQuantity = (orderId: number, itemName: string, quantity: number): UpdateItemQuantityAction => ({
    type: UPDATE_ITEM_QUANTITY,
    orderId,
    itemName,
    quantity,
});
export const deleteOrder = (orderId: number): AppActionTypes => ({
    type: DELETE_ORDER,
    orderId
});

export const markOrderAsDelivered = (orderId: number): AppActionTypes => ({
    type: MARK_ORDER_AS_DELIVERED,
    orderId
});

export const setOrders = (orders: any[]): AppActionTypes => ({
    type: SET_ORDERS,
    orders
});
