const express = require("express")
const cors = require("cors")
const app = express()
const doctorRoute = require("./routes/doctor.route.js")
const authRoute = require("./routes/auth.route.js")
const config = require("./config/config.js")


// middlewares 
app.use(express.json())
app.use(cors({
    origin: config.CLIENT_URI,
    credentials: true
}))

// ROUTES
app.use('/doctor/',doctorRoute)
app.use('/auth/',authRoute)

// Sample route 
app.get("/",(req,resp)=>{
    resp.json({ status: "server is running." })
})



module.exports = app