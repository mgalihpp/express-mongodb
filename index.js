const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connectMongo");
const listModel = require("./models/list");
require("dotenv").config();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed methods
  })
);

connectDB();

app.get("/List", async (req, res) => {
    try {
        const list = await listModel.find({});
        return res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ error: "error to find list" });
    }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
