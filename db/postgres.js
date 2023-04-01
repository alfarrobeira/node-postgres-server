//import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

// create new Pool to have a pool of connections available
// (otherwise for every request a new connection has to be established and closed afterwards)
const dbPool = new Pool({
    // todo: save connection string to ENV variable
    connectionString: "postgres://dxdvdtht:dI26qA6LBCJAdqwaLeT8jnn5K7T_DaNl@surus.db.elephantsql.com/dxdvdtht"
});

// export dbPool with specifying the query parameters ? 
export default  {
    query: (text, params) => dbPool.query(text, params),
}