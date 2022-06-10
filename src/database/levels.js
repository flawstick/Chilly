const {
    connection,
    pool
} = require('./connection');
const {
    levelOneThreshold,
    chainMultiplier,
    chat
} = require('../../config.json');
const {
    client
} = require('../index.js');
const {
    Log
} = require('../utils/log.js');
const {
    comets,
    moons,
    stars,
    solarSystems,
    neutronStars,
    guildId
} = require('../../config.json');

// Add xp to the user
const addXP = async function (uuid, amount) {

    // Data retrieval query
    const sql = `SELECT * FROM levels WHERE uuid = '${uuid}'`;

    // Create a connection from the connection pool
    pool.getConnection(function (err, connection) {
        if (err) return console.log(err);

        // Execute query
        connection.query(sql, (error, results, fields) => {
            if (error) return console.log(error); // Catch error

            // Add use to database if id doesn't exist
            if (results.length == 0) {
                createEmptyLevelRow(uuid);
                return;
            }

            // Database retrieval query
            const xpsql = `SELECT * FROM levels WHERE uuid = '${uuid}'`;

            // Get the xp and add amount to it
            connection.query(xpsql, (error, results, fields) => {
                if (error) return console.log(error); // Catch error

                // Set added amount of xp
                let sql = `UPDATE levels SET xp = ${results[0].xp + amount} WHERE uuid = '${uuid}'`;

                // The amount of xp left for level to end
                const left = getLeftForLevel(results[0].level, results[0].xp);

                // Check if the amount added is less than needed to end level
                if (left <= amount) {
                    sql = `UPDATE levels SET xp = ${amount - left} WHERE uuid = '${uuid}'` // set xp
                    addLevel(uuid, 1); // add level
                }

                // Run the query to change the level
                connection.query(sql, (error, results, fields) => {
                    if (error) return console.log(error);
                });
            });
        });
    });
}

// Add level to a user
const addLevel = async function (uuid) {

    // Data retrieval query
    const sql = `SELECT * FROM levels WHERE uuid = '${uuid}'`;

    // Create a connection from the connection pool
    pool.getConnection(function (err, connection) {
        if (err) return console.log(err); // Catch error

        // Execute query
        connection.query(sql, (error, results, fields) => {
            if (error) return console.log(error); // Catch error

            if (results.length != 0) {

                // Database update query 
                const updateSql = `UPDATE levels SET level = ${results[0].level + 1} WHERE uuid = '${uuid}'`;

                // Execute query
                connection.query(updateSql, (error, result, fields) => {
                    if (error) return console.log(error); // Catch error
                });

                // Tell people that level has been added to the player.
                Log(`[INFO] [LEVEL] [ADD]`, `added level to uuid: '${uuid}'`);
                const channel = client.channels.cache.get(chat);
                channel.send(`<@${uuid}> you are now level ${results[0].level + 1}! <3`);

                // Fetch specefic member into cache by id
                const member = client.guilds.cache.get(guildId).members.cache.get(uuid);

                // UWU JSON OBJECT
                const uwu = {
                    1: comets,
                    2: moons,
                    3: stars,
                    4: solarSystems,
                    5: neutronStars
                }

                // If that member has reached a role advancing thershold
                if ((results[0].level + 1) % 10 == 0)

                    // Set the appropriate role to level
                    member.roles.add(uwu[(results[0].level + 1) / 10]);


            } else // Catch error
                Log(`[ERROR] [LEVEL] [ADD]`, `Couldn't add level to uuid: '${uuid}'`);
        });
    });
}


// Get exactly how much xp needed to surpass current level
const getLeftForLevel = function (level, xp) {

    // Geometric chain equation
    const neededForLevel = levelOneThreshold * Math.pow(chainMultiplier, level - 1);

    // Geometric series equation
    // An = A1 * q^n-1

    // Return the needed amount to level up
    return neededForLevel - xp;
}

// Add an empty row for a new user
const createEmptyLevelRow = async function (uuid) {

    // Data retrieval query
    const sql = `SELECT * FROM levels WHERE uuid = '${uuid}'`;

    // Create a connection from the connection pool
    pool.getConnection(function (err, connection) {
        if (err) return console.log(err); // check for errors

        // Execute query
        connection.query(sql, (error, results, fields) => {
            if (error) return console.log(error); // Catch error

            // Check if user exists in table
            if (results.length == 0) {

                // Database update query
                const sql = `INSERT INTO levels(uuid, xp, level) VALUES('${uuid}', 0, 0)`;

                // Add empty level query execute
                connection.query(sql, (error, results, fields) => {
                    if (error) return console.log(error); // Catch error
                });
            }
        });
    });
}

module.exports = {
    addXP,
    addLevel,
    getLeftForLevel,
    createEmptyLevelRow,
};