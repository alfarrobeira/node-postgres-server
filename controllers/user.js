import dbPool from "../db/postgres.js";

const getUsers = async() => {
    // query all users from db
    const query = "SELECT * FROM users";
    // {rows} or {rows:users} is both functional
    const { rows } = await dbPool.query(query);

    return rows;
}

const createUser = async(req, res) => {

    const { first_name, last_name, age, active } = req.body;
    const query = "INSERT INTO users (first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *";

    // validate data before writing to db
    if (!first_name || !last_name || !age)
        return res.json({ error: "missing data" });

    // I could use variables and provide the input via Insomnia...
    const { rows: [user] } = await dbPool.query(query, [first_name, last_name, age, active]);
    // ...or I provide the input right away (in this case: comment out "req.body" and validation)
    // const { rows } = await dbPool.query(query, ["Anja", "Hofmann", "45", true]);

    return user;
}

const getUser = async(req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM users WHERE id=$1";

    // {rows:[user]} to access object in array // removes [] in response
    const { rows: [user] } = await dbPool.query(query, [id]);

    // requested item
    return user;
}

const editUser = async(req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age} = req.body;
    const query = "UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *";

    const { rows: [user] } = await dbPool.query(query, [first_name, last_name, age, id]);

    // updated item
    return user;
}

const deleteUser = async(req, res) => {
    const { id } = req.params;
    // query to delete item in db
    //const query = "DELETE * FROM users WHERE id=$1";
    // query to set user inactive, update active state
    const query = "UPDATE users SET active = false WHERE id = $1 RETURNING *";

    const { rows: [user] } = await dbPool.query(query, [id]);
   
    return user;
}

const getUserOrders = async(req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM orders WHERE user_id = $1";

    const { rows } = await dbPool.query(query, [id]);

    return rows;
}

const flagInactive = async(req, res) => {
    const { id } = req.params;
    const query = "UPDATE users SET active=false WHERE NOT EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id) AND users.id = $1 RETURNING *";  

    const { rows: [user] } = await dbPool.query(query, [id]);

    return user;
}

export { getUsers, createUser, getUser, editUser, deleteUser, getUserOrders, flagInactive };