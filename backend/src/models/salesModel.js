const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute(
        `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity 
        FROM sales_products AS sp
        INNER JOIN products AS p ON sp.product_id = p.id
        INNER JOIN sales AS s ON sp.sale_id = s.id
        ORDER BY sp.sale_id, sp.product_id `,
        );
    return result;
};

const getById = async (id) => {
    const [result] = await connection.execute(`SELECT  
        s.date, sp.product_id AS productId, sp.quantity 
        FROM sales_products AS sp
        INNER JOIN products AS p ON sp.product_id = p.id
        INNER JOIN sales AS s ON sp.sale_id = s.id
        WHERE sp.sale_id = ?
        ORDER BY sp.sale_id, sp.product_id`, [id]);
    return result;
};

const create = async (info) => {
    const querySales = 'INSERT INTO sales (date) VALUES (NOW())';
    const querySalesProducts = (
        'INSERT INTO sales_products (product_id, sale_id, quantity) VALUES ')+info.map((_) => ('(?, ?, ?)')).join(', ')+';';
        const [{ insertId }] = await connection.execute(querySales);
    const params = info.flatMap((product) => [product.productId, insertId, product.quantity]);
    await connection.execute(querySalesProducts, params);
    return insertId;
};

const drop = async (id) => {
    const query = 'DELETE FROM sales WHERE id = (?)';
    const [{ affectedRows }] = await connection.execute(query, [id]);
    return affectedRows;
};

module.exports = { getAll, getById, create, drop };
