const app = require("./src/main.js")
const db_con = require("./src/config/db_con.js")
const config = require("./src/config/config.js")


///Check all env vars 
const var_keys = Object.keys(config)
for (const key of var_keys){
    if(!config[key]){
        console.log(key+" Env Not found.")
        console.log("Shatdowning Server!")
        process.exit()
    }
}

db_con() 





app.listen(5000,()=> console.log("Server running at PORT: 5000"))