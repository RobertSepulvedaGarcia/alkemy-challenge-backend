const mysql = require("mysql2");
const { database } = require("../config/keys");

const dbConnection = mysql.createPool(database);

dbConnection.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED");
        }

        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TOO MANY CONNECTIONS");
        }

        if (err.code === "ECONNREFUSED") {
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }

    if (connection) {
        connection.release();
        console.log("conectado a la base de datos");
    }

    return;
});

module.exports = { dbConnection };