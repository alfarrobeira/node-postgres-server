import dbPool from "../db/postgres.js";

const getOrders = async (req, res) => {
  // query all orders from db
  const query = "SELECT * FROM orders";
    // {rows} or {rows:orders} is both functional
  const { rows: orders } = await dbPool.query(query);

  return orders;
};

const createOrder = async (req, res) => {
  const { price, date, user_id } = req.body;
  
  // validate data before writing to db
  if (!price || !date || !user_id) return res.json({ error: "missing data" });

  const query = "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *";

  const { rows: order } = await dbPool.query(query, [price, date, user_id]);

  return order;
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM orders WHERE id=$1";

  const { rows: [order] } = await dbPool.query(query, [id]);

  // requested item
  return order;
};

const editOrder = async (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  const query = "UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 RETURNING *";

  const { rows: [order] } = await dbPool.query(query, [price, date, user_id, id]);

  // updated item
  return order;
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM orders WHERE id=$1";

  const { rows: [orders] } = await dbPool.query(query, [id]);

  return orders;
};

export { getOrders, createOrder, getOrder, editOrder, deleteOrder };