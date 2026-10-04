const mongoose = require("mongoose")

const { MONGO_URI } = require("./config")


async function db_con() {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Database is Connected...")
    }catch(err){
        console.log("Faild to connect database: ",err)
        process.exit()
    }
}

module.exports = db_con