import axios from 'axios';


export const addNewOrder = (orderToSubmit) => {


    axios.post('http://localhost:5000/orders-add', orderToSubmit)
        .then(response => {
            console.log('Добавленная позиция:', response.data);
            // Обновите состояние приложения, если это необходимо
        })
        .catch(error => {
            console.error('Ошибка при добавлении позиции:', error);
        });
};

