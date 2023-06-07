const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM products');
    return result;
};

const getById = async (id) => {
    const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return result;
};

const create = async (name) => {
    const query = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [name]);
    return {
        id: insertId,
        name,
    };
};

module.exports = { getAll, getById, create };
