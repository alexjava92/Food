import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


export const updateOrderStatusToCompleted = async (orderId) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/orders-completed/${orderId}`);
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Ошибка при обновлении статуса заказа:", error);
        throw error;
    }
};








export const addNewOrder = async (orderToSubmit) => {
    try {
        const response = await axios.post('http://localhost:5000/api/orders-add', orderToSubmit);
        console.log('Добавленная позиция:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при добавлении позиции:', error);
        throw error;
    }
};

export const getOrder = (orderToSubmit) => {


    axios.get('http://localhost:5000/orders')
        .then(response => {
            console.log('Получен список заказов:', response.data);
            // Обновите состояние приложения, если это необходимо
        })
        .catch(error => {
            console.error('Ошибка получения заказов:', error);
        });
};



