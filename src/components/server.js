const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Cjprvsyp040592',
    port: 5432,
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on :)) http://localhost:${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Запрос для получения всех заказов +
app.get('/api/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        res.status(500).json({ message: 'Ошибка при получении заказов' });
    }
});

// Запрос для получения всех заказов и позиций заказа
app.get('/api/orders-all', async (req, res) => {
    try {
        const orderId = req.params.id; // Получаем id из URL

        // Параметризованный SQL-запрос
        const queryText = `
            SELECT o.*, oi.name, oi.price, oi.quantity
            FROM orders o
                     JOIN order_items oi ON o.id = oi.order_id
        `;

        const result = await pool.query(queryText); // Передаем id как параметр
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        res.status(500).json({ message: 'Ошибка при получении заказов' });
    }
});

// Запрос для получения заказа и его позиций
app.get('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id; // Получаем id из URL

        // Параметризованный SQL-запрос
        const queryText = `
            SELECT o.*, oi.name, oi.price, oi.quantity
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            WHERE o.id = $1;
        `;

        const result = await pool.query(queryText, [orderId]); // Передаем id как параметр
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        res.status(500).json({ message: 'Ошибка при получении заказов' });
    }
});

// Удаление заказа
app.put('/api/orders-removed/:id', async (req, res) => {
    try {
        const orderId = req.params.id; // Получаем id из URL

        // Обновляем статус заказа на "removed"
        const queryText = `
            UPDATE orders
            SET status = 'removed'
            WHERE id = $1;
        `;

        await pool.query(queryText, [orderId]);

        res.status(200).json({ message: 'Статус заказа успешно обновлен на "removed"' });
    } catch (error) {
        console.error('Ошибка при обновлении статуса заказа:', error);
        res.status(500).json({ message: 'Ошибка при обновлении статуса заказа' });
    }
});

// Заказ готов completed
app.put('/api/orders-completed/:id', async (req, res) => {

    try {
        const orderId = req.params.id; // Получаем id из URL

        // Обновляем статус заказа на "completed"
        const queryText = `
            UPDATE orders
            SET status = 'completed'
            WHERE id = $1;
        `;

        await pool.query(queryText, [orderId]);

        res.status(200).json({ message: 'Статус заказа успешно обновлен на "completed"' });
    } catch (error) {
        console.error('Ошибка при обновлении статуса заказа:', error);
        res.status(500).json({ message: 'Ошибка при обновлении статуса заказа' });
    }
});

// Заказ выдан issued
app.put('/api/orders-issued/:id', async (req, res) => {

    try {
        const orderId = req.params.id; // Получаем id из URL

        // Обновляем статус заказа на "Issued"
        const queryText = `
            UPDATE orders
            SET status = 'issued'
            WHERE id = $1;
        `;

        await pool.query(queryText, [orderId]);

        res.status(200).json({ message: 'Статус заказа успешно обновлен на "issued"' });
    } catch (error) {
        console.error('Ошибка при обновлении статуса заказа:', error);
        res.status(500).json({ message: 'Ошибка при обновлении статуса заказа' });
    }
});


// Запрос для создания нового заказа и добавление позиций в две таблицы
app.post('/api/orders-add', async (req, res) => {
    try {
        const { orderId, items, totalQuantity, totalPrice } = req.body;

        // Вставка данных о заказе в таблицу `orders`
        const orderQueryText = `
            INSERT INTO orders (id, total_quantity, total_price, status)
            VALUES ($1, $2, $3, 'new')
            RETURNING id;
        `;

        const orderResult = await pool.query(orderQueryText, [orderId, totalQuantity, totalPrice]);
        const insertedOrderId = orderResult.rows[0].id;

        // Вставка элементов заказа в таблицу `order_items`
        const itemQueryText = `
            INSERT INTO order_items (order_id, name, price, quantity)
            VALUES ($1, $2, $3, $4);
        `;

        for (let item of items) {
            await pool.query(itemQueryText, [insertedOrderId, item.name, item.price, item.quantity]);
        }

        res.status(201).json({ message: 'Заказ успешно добавлен', id: insertedOrderId });
    } catch (error) {
        console.error('Ошибка при добавлении заказа:', error);
        res.status(500).json({ message: 'Ошибка при добавлении заказа' });
    }
});









// 1. Создание записи в истории заказов
app.post('/order-history-add', async (req, res) => {
    const { items, totalQuantity, totalPrice, status } = req.body;

    try {
        const result = await pool.query('INSERT INTO order_history (items, total_quantity, total_price, status) VALUES ($1, $2, $3, $4) RETURNING id', [JSON.stringify(items), totalQuantity, totalPrice, status]);
        res.status(200).json({ message: 'Order history added successfully!', orderId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Получение всех записей из истории заказов
app.get('/order-history', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM order_history');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Обновление записи в истории заказов
app.put('/order-history-update/:id', async (req, res) => {
    const orderId = parseInt(req.params.id);
    const { items, totalQuantity, totalPrice, status } = req.body;

    try {
        await pool.query('UPDATE order_history SET items = $1, total_quantity = $2, total_price = $3, status = $4 WHERE id = $5', [JSON.stringify(items), totalQuantity, totalPrice, status, orderId]);
        res.status(200).json({ message: 'Order history updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... ваш текущий код ...

// 1. Добавление элемента меню
app.post('/menu-add', async (req, res) => {
    const { name, price, description, amount } = req.body;

    try {
        await pool.query('INSERT INTO menu (name, price, description, amount) VALUES ($1, $2, $3, $4)', [name, price, description, amount]);
        res.status(200).json({ message: 'Menu item added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Обновление элемента меню
app.put('/menu-update/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);
    const { name, price, description, amount } = req.body;

    try {
        await pool.query('UPDATE menu SET name = $1, price = $2, description = $3, amount = $4 WHERE id = $5', [name, price, description, amount, itemId]);
        res.status(200).json({ message: 'Menu item updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Удаление элемента меню
app.delete('/menu-delete/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);

    try {
        await pool.query('DELETE FROM menu WHERE id = $1', [itemId]);
        res.status(200).json({ message: 'Menu item deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Получение всех элементов меню
app.get('/menu', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... ваш текущий код ...
