const express = require('express')

const app = express()

require('dotenv').config()

app.use(express.json())

const connectDB = require('./connectMongo')

connectDB()

const listModel = require('./models/list')

const PORT = process.env.PORT

app.get("/List", async (req, res) => {
    try {
        const list = await listModel.find({});
        return res.status(200).json(list);
    } catch (error){
        res.status(404).json({ error : "error to find list"});
    }
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})