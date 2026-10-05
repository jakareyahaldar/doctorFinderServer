const jwt = require("jsonwebtoken")
const adminColl = require("../models/admin.model.js")


// check is admin have or not 
async function CheckAdmin(){
    try{
        const [ admin ] = await adminColl.find()
        if(!admin){
            const newAdmin = new adminColl({})
            await newAdmin.save()
        }
    }catch(err){
        console.log(err)
    }
}
CheckAdmin()

module.exports = {

    login: async (req,resp)=>{
        try{
            const { username, password } = req.body
            if(!username) throw new Error("Please enter username.")
            if(!password) throw new Error("Please enter password.")

            // find username
            const admin = await adminColl.findOne({ username })
            if(!admin) throw new Error("Invalid Username.")
            // checking password 
            if(admin.password !== password) throw new Error("Invalid password.")
            
            // if all set then create a token and send it to the client
            const token = jwt.sign({_id: admin._id},"tamimshaikh123456789")
            resp.json({token})

        }catch(err){
            console.log(err)
            resp.status(500).json({ error: err.message })
        }
    },

    token_verify: async (req, resp)=>{
        try{

            // const cookie = req.headers.cookie 
            // const sliceCookie = cookie.split(";")
            // const tokenIndex = sliceCookie.findIndex( e => e.includes("admin_token"))
            // if(tokenIndex === -1){
            //     resp.json({ verified: false })
            //     return
            // }
            const token = req.headers.admin_token //sliceCookie[tokenIndex].split("=")[1]
            if(!token){
                resp.json({ verified: false })
                return
            }

            const decode_token = jwt.decode(token,"tamimshaikh123456789")
            if(!decode_token){
                resp.json({ verified: false })
                return
            }

            const { _id } = decode_token
            if(!_id){
                resp.json({ verified: false })
                return
            }

            const admin = await adminColl.findOne({ _id })
            if(!admin){
                resp.json({ verified: false })
                return
            }
            resp.json({ verified: true })
        }catch(err){
            resp.json({ verified: false })
        }
    },

    update_credentials: async (req, resp)=>{
        try{
            const token = req?.headers?.authorization ? req?.headers?.authorization.split(" ")[1] : null
            const decoded = jwt.decode(token,"tamimshaikh123456789")
            if(!decoded || !decoded?._id) throw new Error("forbiden user..")
            let { username, password } = req.body
            username = username.trim()
            password = password.trim()
            if(!username || !password){
                throw new Error("Please provide username and password.")
            }
            await adminColl.findOneAndUpdate({ _id: decoded._id }, {username, password})
            resp.json({message: "Admin Credentials updaed."})
        }catch(err){
            resp.status(500).json({ message: err.message})
        }
    }

}