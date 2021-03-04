const express = require("express");
const { dbConnection } = require("./config/database");
const { crud } = require("./config/queries");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

const { read, readHome, post, del, update } = crud;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    const sqlQuery = readHome;

    dbConnection.query(sqlQuery, (err, result) => {
        err ? res.send(err) : res.send(result);
    });
});

app.get("/maintainer", (req, res) => {
    const sqlQuery = read;

    dbConnection.query(sqlQuery, (err, result) => {
        err ? res.send(err) : res.send(result);
    });
});

app.post("/new/register", (req, res) => {
    const { concept, mount, date, operationType } = req.body;

    const sqlQuery = post;
    dbConnection.query(
        sqlQuery, [concept, mount, date, operationType],
        (err, result) => {
            err ? res.send(err) : res.send("Operacion guardada");
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    const sqlQuery = del;

    dbConnection.query(sqlQuery, [id], (err, result) => {
        err ? res.send(err) : res.send("Operacion eliminada");
    });
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { concept, mount, date } = req.body;
    const updated = { concept, mount, date };

    const sqlQuery = update;

    dbConnection.query(sqlQuery, [updated, id], (err, result) => {
        err ? res.send(err) : res.send("Operacion actualizada");
    });
});

app.listen(PORT, () => console.log(`el servidor corre en el puerto ${PORT}`));