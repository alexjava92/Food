// reducers.ts
import {
    ADD_ITEM,
    SUBMIT_ORDER,
    MARK_ORDER_AS_DONE,
    AppActionTypes,
    REMOVE_ITEM,
    UPDATE_ORDER,
    UPDATE_ITEM_QUANTITY,
    DELETE_ORDER,
    MARK_ORDER_AS_DELIVERED,
    ADD_MENU_ITEM, UPDATE_MENU_ITEM,
} from './actions';
import {MenuItem} from "../components/Menu";
import {OrderItemSummary} from "../components/OrderSummary";
import {OrderItemList} from "../components/OrdersList";
import {DeliveredOrderList} from "../components/DeliveredOrders";


export interface AppState {
    menuItems: MenuItem[];
    orderItems: OrderItemSummary[];
    orders: { id: number; items: OrderItemList[]; orderPrice: number }[];
    selectedOrder: { id: number; items: OrderItemList[] } | null;
    deliveredOrders: DeliveredOrderList[];

}

const initialState: AppState = {
    menuItems: [
        {id: 1, name: 'Шаурма классическая', price: 185},
        {id: 2, name: 'HOT-ШАУРМА', price: 190},
        {id: 3, name: 'Сэндвич c курицей', price: 199},
        {id: 4, name: 'Чикенсы 7 шт.', price: 120},
        {id: 5, name: 'Картофель фри 100 гр.', price: 90},
        {id: 6, name: 'Картофель деревенский 80гр.', price: 90},
        {id: 7, name: 'Кольца лука 7 шт.', price: 90},
        {id: 8, name: 'Гренки с чесноком 10 шт.', price: 80},
        {id: 9, name: 'Гренки с беконом 5 шт.', price: 980},
        {id: 10, name: 'Сырные палочки 7 шт.', price: 130},
        {id: 11, name: 'Кофе', price: 50},
        {id: 12, name: 'Чай', price: 30},
        {id: 13, name: 'Сок', price: 40},
        {id: 14, name: 'Вода', price: 20},
        {id: 15, name: 'Пирог', price: 100},
        {id: 16, name: 'Торт', price: 200},
        {id: 17, name: 'Мороженое', price: 50},
        {id: 18, name: 'Шоколад', price: 30},
        {id: 19, name: 'Конфеты', price: 20},
        {id: 20, name: 'Печенье', price: 30},
        {id: 21, name: 'Хлеб', price: 20},
        {id: 22, name: 'Булочка', price: 15},
        // ...other menu items
    ],
    orderItems: [],
    orders: [],
    deliveredOrders: [],
    selectedOrder: null,

};

export const appReducer = (state = initialState, action: AppActionTypes): AppState => {
    switch (action.type) {
        case ADD_ITEM:
            // Проверка, есть ли уже выбранный элемент в заказе
            const existingOrderItem = state.orderItems.find(orderItem => orderItem.id === action.item.id);

            if (existingOrderItem) {
                // Если элемент уже в заказе, увеличиваем его количество
                const updatedOrderItems = state.orderItems.map(orderItem =>
                    orderItem.id === action.item.id
                        ? {...orderItem, quantity: orderItem.quantity + 1}
                        : orderItem
                );
                return {
                    ...state,
                    orderItems: updatedOrderItems
                };
            } else {
                // Если элемента нет в заказе, добавляем его с начальным количеством 1
                const newOrderItem = {...action.item, quantity: 1,};
                return {
                    ...state,
                    orderItems: [...state.orderItems, newOrderItem]
                };
            }
        case ADD_MENU_ITEM: {

            return {
                ...state,
                menuItems: [
                    ...state.menuItems,
                    {
                        id: state.menuItems.length + 1,
                        name: action.payload.name,
                        price: action.payload.price
                    }
                ]
            }

        }
        case UPDATE_MENU_ITEM:
                return {
                    ...state,
                    menuItems: state.menuItems.map(item => {
                        if(item.id === action.payload.id) {
                            return action.payload;
                        }
                        return item;
                    })
                }

        case REMOVE_ITEM:
            const updatedOrderItems = state.orderItems.map(orderItem =>
                orderItem.id === action.itemId
                    ? {...orderItem, quantity: orderItem.quantity - 1}
                    : orderItem
            ).filter(orderItem => orderItem.quantity > 0);
            return {...state, orderItems: updatedOrderItems};
        case SUBMIT_ORDER:
            // Проверка на наличие элементов в заказе перед отправкой
            if (state.orderItems.length === 0) {
                console.error('No items to submit');
                return state;  // возвращаем текущее состояние, если нет элементов для заказа
            }
            // Вычисляем orderPrice, складывая цены всех позиций заказа
            const orderPrice = state.orderItems.reduce((totalPrice, item) => {
                return totalPrice + item.price * item.quantity;
            }, 0);
            // Формирование нового заказа
            const newOrder = {

                id: state.orders.length + state.deliveredOrders.length + 1,  // присваиваем новому заказу следующий ID
                items: state.orderItems.map(item => ({
                    ...item,
                    id: new Date().getTime() + Math.random()// создаем уникальный ID для каждого товара
                })),
                orderPrice: orderPrice
            };

            return <AppState>{
                ...state,  // сохраняем текущее состояние
                orders: [...state.orders, newOrder],  // добавляем новый заказ в список заказов
                orderItems: []  // очищаем текущий заказ
            };
        case MARK_ORDER_AS_DONE:
            // Находим заказ с указанным orderId и отмечаем его как выполненный
            const updatedOrders = state.orders.map(order =>
                order.id === action.orderId ? {...order, isDone: true} : order
            );

            return {
                ...state,
                orders: updatedOrders
            };
        case UPDATE_ORDER:
            return <AppState>{
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.orderId
                        ? {...order, items: action.updatedItems}
                        : order
                )
            };
        case UPDATE_ITEM_QUANTITY:
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order.id !== action.orderId) return order;

                    return {
                        ...order,
                        items: order.items.map(item => {
                            if (item.name !== action.itemName) return item;

                            return {
                                ...item,
                                quantity: action.quantity
                            };
                        })
                    }
                })
            }
        case DELETE_ORDER:
            const orderToDelete = state.orders.find(order => order.id === action.orderId);
            if (!orderToDelete) return state;

            const currentDateTime = new Date(); // Текущая дата и время
            const year = currentDateTime.getFullYear(); // Текущий год
            const month = currentDateTime.getMonth() + 1; // Текущий месяц (добавляем 1, так как месяцы считаются с 0)
            const day = currentDateTime.getDate(); // Текущий день месяца
            const hours = currentDateTime.getHours(); // Текущие часы
            const minutes = currentDateTime.getMinutes(); // Текущие минуты
            const seconds = currentDateTime.getSeconds(); // Текущие секунды

            const deliveredOrderToDelete = {
                ...orderToDelete,
                deliveryDate: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                orderStatus: "deleted"
            };

            return <AppState>{
                ...state,
                orders: state.orders.filter(order => order.id !== action.orderId),
                deliveredOrders: [...state.deliveredOrders, deliveredOrderToDelete].reverse()
            };
        case MARK_ORDER_AS_DELIVERED:
            const foundOrder = state.orders.find(order => order.id === action.orderId);
            if (!foundOrder) return state;

            const deliveredOrder = {
                ...foundOrder,
                deliveryDate: new Date(),
                orderStatus: "issued"
            };

            return <AppState>{
                ...state,
                orders: state.orders.filter(order => order.id !== action.orderId),
                deliveredOrders: [...state.deliveredOrders, deliveredOrder].reverse()
            };

        default:
            return state;
    }
};

