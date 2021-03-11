module.exports = {
    crud: {
        read: "SELECT * FROM Operations ",
        readHome: "SELECT * FROM Operations ORDER BY ID DESC limit 10",
        post: "INSERT INTO Operations (Concept, Mount, DATE, OperationType) VALUES (?,?,?,?)",
        del: "DELETE FROM Operations WHERE ID = ?",
        update: "UPDATE Operations SET ? WHERE ID =?",
    },
};