const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
const PORT = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Cjprvsyp040592',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.post('/orders-add', async (req, res) => {
    const { orderId, items, totalQuantity, totalPrice } = req.body;

    try {
        // Начинаем транзакцию
        await pool.query('BEGIN');

        // Добавляем основную информацию о заказе в таблицу `orders`
        await pool.query('INSERT INTO orders (id, total_quantity, total_price) VALUES ($1, $2, $3)', [orderId, totalQuantity, totalPrice]);

        // Если items является массивом массивов, разворачиваем его в один массив
        const allItems = Array.isArray(items[0]) ? [].concat(...items) : items;

        // Для каждого товара в списке `allItems` добавляем его в таблицу `order_items`
        for (let item of allItems) {
            await pool.query('INSERT INTO order_items (order_id, name, price, quantity) VALUES ($1, $2, $3, $4)', [orderId, item.name, item.price, item.quantity]);
        }

        // Завершаем транзакцию
        await pool.query('COMMIT');

        res.status(200).json({ message: 'Order added successfully!' });
    } catch (err) {
        console.error(err);

        // Если что-то пошло не так, откатываем транзакцию
        await pool.query('ROLLBACK');

        res.status(500).json({ error: 'Internal server error' });
    }
});

