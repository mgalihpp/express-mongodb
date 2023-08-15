const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connectMongo");
const ListModel = require("./models/list");
require("dotenv").config();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/List", async (req, res) => {
  try {
    const list = await ListModel.find({});
    return res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ error: "error to find list" });
  }
});

app.post("/createList", async (req, res) => {
  const { name } = req.body;

  try {
    const newList = new ListModel({ name });
    const saveList = await newList.save();
    res.status(201).json(saveList);
  } catch (error) {
    res.status(400).json({ error: "erros creating list" });
  }
});

app.delete("/deleteList/:id", async (req, res) => {
  const listId = req.params.id;

  try {
    const deleteList = await ListModel.findByIdAndDelete(listId);

    if (!deleteList) {
      return res.status(404).json({ error: "list not found" });
    }

    return res.json({ message: "list item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error deleting list" });
  }
});

app.put("/updateList/:id", async (req, res) => {
  const listId = req.params.id;
  const { checked } = req.body;

  try {
    const updateList = await ListModel.findByIdAndUpdate(
      listId,
      { checked: checked },
      { new: true }
    );

    if (!updateList) {
      return res.status(404).json({ error: "list not found" });
    }

    return res.json({ message: "list item update successfully" });
  } catch (error) {
    return res.status(500).json({ error: "error updating list" });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
