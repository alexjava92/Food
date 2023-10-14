const { Pool } = require('pg');
const app = require("../src/App");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gpt',
    password: 'Cjprvsyp040592',
    port: 5432,
});

app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


