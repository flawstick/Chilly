const MySql = require('mysql');
const {
    server,
    user,
    password,
    database
} = require('./data/auth.json');


// Initiate connection with the database
const connection = MySql.createConnection({
    host: server,
    user: user,
    password: password,
    database: database
});

// Connect the connection to the database
const init = async function () {
    connection.connect(function (err) {
        if (err) throw err;
        console.log(`[DATABASE] [READY] Connected!`);
    });
}

// Disconnect and load extra data into database
const disconnect = async function () {
    connection.end(); // kill connection
}

module.exports = {
    init,
    connection,
    disconnect
}