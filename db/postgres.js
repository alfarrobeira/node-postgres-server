import * as dotenv from 'dotenv';
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

// create new Pool to have a pool of connections available
// (otherwise for every request a new connection has to be established and closed afterwards)
const dbPool = new Pool({
    connectionString: process.env.DB_CONNECTION
});

// export dbPool with specifying the query parameters ? 
export default  {
    query: (text, params) => dbPool.query(text, params),
}