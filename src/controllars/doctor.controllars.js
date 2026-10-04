const doctorColl = require('../models/doctor_model.js')

module.exports = {
    add_doctor: async (req,resp)=>{
        try{
            const data = req.body
            const required_config = ["name","designation","appointment","fees"]
            for ( const fild of required_config ){
                if(!data[fild]){
                    resp.status(404).json({error: fild+" Not Found!"})
                    return
                }
            }

            // check alradyadded or not 
            const findBySlug = await doctorColl.findOne({ slug: data.slug })
            console.log(findBySlug)
            if(findBySlug){
                resp.status(500).json({error: "Alrady added this doctor."})
                return
            }

            // create new
            const newDoctor = new doctorColl(data)
            const save = await newDoctor.save()
            resp.json({doctor: save})
        }catch(err){
            resp.status(500).json({ error: err.message })
        }
    },

    edit_doctor: async (req,resp)=>{
        try{
            const data = req.body
            const required_config = ["name","designation","appointment","fees","_id"]
            for ( const fild of required_config ){
                if(!data[fild]){
                    resp.status(404).json({error: fild+" Not Found!"})
                    return
                }
            }
            await doctorColl.findOneAndUpdate({_id: data._id}, data)
            resp.json({status: "success", _id: data._id})
        }catch(err){
            resp.status(500).json({ error: err.message })
        }
    },

    get_doctors: async (req,resp)=>{
        try{
            const doctors = await doctorColl.find()
            resp.json({ doctors })
        }catch(err){
            resp.status(500).json({ error: err.message })
        }
    },


    delete_doctors: async (req,resp)=>{
        try{
            const { _id } = req.body
            if(!_id){
                resp.status(404).json({error: "id not found"})
            }
            await doctorColl.findOneAndDelete({_id})
            resp.json({_id, status: "success"})
        }catch(err){
            resp.status(500).json({ error: err.message })
        }
    }
}