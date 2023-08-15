const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            required: false,
            default: false //default values
        }
    }
)
const ListModel = mongoose.model("list", ListSchema);
module.exports = ListModel;