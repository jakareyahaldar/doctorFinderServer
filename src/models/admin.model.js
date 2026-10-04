const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    username: { required: true, default: "admin", type: String },
    password: { required: true, default: "admin", type: String },
},{ timestamps: true })


const model = mongoose.model("admin",schema)

module.exports = model