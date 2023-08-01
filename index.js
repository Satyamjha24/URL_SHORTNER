const express = require('express');
const cors = require('cors');
const { urlRouter } = require('./routes/url.route');
const { connection } = require('./db')
require("dotenv").config()

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.status(200).send("Welcome To URL_Shortner Homepage");
})

app.use("/url", urlRouter)


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Successfully Connected to the database server")
    } catch (error) {
        console.log(error)
        console.log("Cannot connect to the database server")
    }
    console.log(`Server is running at PORT ${process.env.PORT}`)
})