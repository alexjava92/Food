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
    ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM,
} from './actions';
import {MenuItem} from "../components/Menu";
import {OrderItemSummary} from "../components/OrderSummary";
import {OrderItemList} from "../components/OrdersList";
import {DeliveredOrderList} from "../components/DeliveredOrders";
import {log} from "util";
import {addNewOrder} from "../api/api";



export interface AppState {
    menuItems: MenuItem[];
    orderItems: OrderItemSummary[];
    orders: { id: number; items: OrderItemList[]; orderPrice: number }[];
    selectedOrder: { id: number; items: OrderItemList[] } | null;
    deliveredOrders: DeliveredOrderList[];

}

const initialState: AppState = {

    menuItems: [
        {
            id: 1,
            name: 'Шаурма классическая',
            price: 185,
            description: 'Описание для Шаурмы классической',
            amount: '1 шт'
        },
        {
            id: 2,
            name: 'HOT-ШАУРМА',
            price: 190,
            description: "Лаваш, микс салат, морковь-корейка, куриное филе, сыр, соус от шефа, острый соус.",
            amount: "1 шт"
        },
        {
            id: 3,
            name: 'Сэндвич c курицей',
            price: 199,
            description: 'Описание для Сэндвича c курицей',
            amount: '1 шт'
        },
        {
            id: 4,
            name: 'Чикенсы 7 шт.',
            price: 120,
            description: 'Описание для Чикенсов 7 шт.',
            amount: '7 шт'
        },
        {
            id: 5,
            name: 'Картофель фри 100 гр.',
            price: 90,
            description: 'Описание для Картофеля фри 100 гр.',
            amount: '100 гр'
        },
        {
            id: 6,
            name: 'Картофель деревенский 80гр.',
            price: 90,
            description: 'Описание для Картофеля деревенского 80 гр.',
            amount: '80 гр'
        },
        {
            id: 7,
            name: 'Кольца лука 7 шт.',
            price: 90,
            description: 'Описание для Колец лука 7 шт.',
            amount: '7 шт'
        },
        {
            id: 8,
            name: 'Гренки с чесноком 10 шт.',
            price: 80,
            description: 'Описание для Гренок с чесноком 10 шт.',
            amount: '10 шт'
        },
        {
            id: 9,
            name: 'Гренки с беконом 5 шт.',
            price: 980,
            description: 'Описание для Гренок с беконом 5 шт.',
            amount: '5 шт'
        },
        {
            id: 10,
            name: 'Сырные палочки 7 шт.',
            price: 130,
            description: 'Описание для Сырных палочек 7 шт.',
            amount: '7 шт'
        },
        {
            id: 11,
            name: 'Кофе',
            price: 50,
            description: 'Описание для Кофе',
            amount: '1 шт'
        },
        {
            id: 12,
            name: 'Чай',
            price: 30,
            description: 'Описание для Чая',
            amount: '1 шт'
        },
        {
            id: 13,
            name: 'Сок',
            price: 40,
            description: 'Описание для Сока',
            amount: '1 шт'
        },
        {
            id: 14,
            name: 'Вода',
            price: 20,
            description: 'Описание для Воды',
            amount: '1 шт'
        },
        {
            id: 15,
            name: 'Пирог',
            price: 100,
            description: 'Описание для Пирога',
            amount: '1 шт'
        },
        {
            id: 16,
            name: 'Торт',
            price: 200,
            description: 'Описание для Торта',
            amount: '1 шт'
        },
        {
            id: 17,
            name: 'Мороженое',
            price: 50,
            description: 'Описание для Мороженого',
            amount: '1 шт'
        },
        {
            id: 18,
            name: 'Шоколад',
            price: 30,
            description: 'Описание для Шоколада',
            amount: '1 шт'
        },
        {
            id: 19,
            name: 'Конфеты',
            price: 20,
            description: 'Описание для Конфет',
            amount: '1 шт'
        },
        {
            id: 20,
            name: 'Печенье',
            price: 30,
            description: 'Описание для Печенья',
            amount: '1 шт'
        },
        {
            id: 21,
            name: 'Хлеб',
            price: 20,
            description: 'Описание для Хлеба',
            amount: '1 шт'
        },
        {
            id: 22,
            name: 'Булочка',
            price: 15,
            description: 'Описание для Булочки',
            amount: '1 шт'
        }

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
                        price: action.payload.price,
                        description: action.payload.description,
                        amount: action.payload.amount,

                    }
                ]
            }

        }
        case UPDATE_MENU_ITEM:
            console.log('Updating menu item with payload:', action.payload);
            return {
                ...state,
                menuItems: state.menuItems.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                })
            }
        case DELETE_MENU_ITEM: {
            const deleteMenuItem = state.menuItems.find(item => item.id === action.id);
            if (!deleteMenuItem) return state;
            const newMenuItems = state.menuItems.filter(
                item => item.id !== deleteMenuItem.id
            );
            state.menuItems = newMenuItems;
            return {...state}
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
            console.log(orderToSubmit)
            addNewOrder(orderToSubmit)



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

