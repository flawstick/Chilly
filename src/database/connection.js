const MySql = require('mysql');
const {
    server,
    user,
    password,
    database
} = require('./data/auth.json');


// Make pool varibale 
var pool;

// Connect the connection to the database
const init = async function () {

    // Initialize connection pool with database
    pool = MySql.createPool({
        connectionLimit: 10,
        host: server,
        user: user,
        password: password,
        database: database
    });

    console.log(`[DATABASE] [READY] Connected!`);

}

// Disconnect and load extra data into database
const disconnect = async function () {
    pool.end(); // kill connection
}

module.exports = {
    init,
    pool,
    disconnect
}