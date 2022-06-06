const MySql = require('mysql');
const {
    server,
    user,
    password,
    database
} = require('./data/auth.json');


// Make pool varibale 
const pool = MySql.createPool({
    connectionLimit: 10,
    host: server,
    user: user,
    password: password,
    database: database
});

// Disconnect and load extra data into database
const disconnect = async function () {
    pool.end(); // kill connection
}

module.exports = {
    pool,
    disconnect
}