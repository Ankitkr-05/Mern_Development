require("dotenv").config({path: './configure.env'});
const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./router/apimethod");
const cookieParser = require("cookie-parser")
require("./database/connection")


// (1)
const port = process.env.PORT || 8000;

app.use(cors());

app.use(cookieParser());

// (6) Before router
app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// (1)
app.use(router);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static("frontend/build"))
}

// (1)
app.listen(port, () => {
    console.log(`Listening at port num ${port}`)
})