const connection = require('../Model/dbconnect');

//---------------------------------- GET

const getUser = (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM admin"
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
            }
            else {
                res.json(result);
            }
        })
    }
    catch (error) {
        res.send(error.sqlMassage)
    }
};

module.exports = { getUser }