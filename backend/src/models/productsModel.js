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
    return insertId ;
};

const update = async (id, name) => {
    const query = 'UPDATE products SET name = ? WHERE id = (?)';
    const [{ affectedRows }] = await connection.execute(query, [name, id]);
    return affectedRows;
};

const drop = async (id) => {
    const query = 'DELETE FROM products WHERE id = (?)';
    const [{ affectedRows }] = await connection.execute(query, [id]);
    return affectedRows;
};

module.exports = { getAll, getById, create, update, drop };
