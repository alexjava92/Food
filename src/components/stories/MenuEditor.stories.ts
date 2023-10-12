import {appReducer} from "../../redux/reducers";
import {AddMenuItemAction} from "../../redux/actions";


describe('menuItems reducer', () => {
    it('should handle ADD_MENU_ITEM', () => {
        const initialState = {
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

        const action: AddMenuItemAction = {
            type: 'ADD_MENU_ITEM',
            payload: {
                name: 'Item 1',
                price: 10,
                description: 'Description 1',
                amount: 'Amount 1'
            },
        };

        const nextState = appReducer(initialState, action );

        expect(nextState.menuItems).toHaveLength(1);
        expect(nextState.menuItems[0]).toEqual({
            id: 1,
            name: 'Item 1',
            price: 10,
            description: 'Description 1',
            amount: 'Amount ',
        });
    });
});
