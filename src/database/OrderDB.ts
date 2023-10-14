
import pkg from 'pg';
const {Client} = pkg;

type AddOrderType = {
    id: number
    name_item: string
    quantity: number
    orderPrice: number
}

export async function addOrder(order: AddOrderType): Promise<boolean> {
    const { id, name_item, quantity, orderPrice } = order;

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'gpt',
        password: 'Cjprvsyp040592',
        port: 5432,
    });

    try {
        await client.connect();

        const query = {
            text: 'INSERT INTO orders (id, name_item, quantity, order_price) VALUES ($1, $2, $3, $4)',
            values: [id, name_item, quantity, orderPrice],
        };
        await client.query(query);

    } catch (error) {
        console.error('Ошибка при добавлении заказа:', error);
        return false;  // Возвращает false при ошибке
    } finally {
        await client.end();
    }

    return true;  // Возвращает true, если запись была успешно добавлена
}

