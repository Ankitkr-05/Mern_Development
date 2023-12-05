const mongoose = require("mongoose");

// (4&5) DB Connection URL:
const CONNECTDATABASE = process.env.DBCONNECTION;

// (3) DB Connection code:
mongoose.connect(CONNECTDATABASE, {dbName: "mernstackDatabase"})
        .then(() => {
            console.log("DataBase connected successfully :)")
        })
        .catch((err) => {
            console.log(err)
        })