const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    name: { required: true, type: String },
    slug: { required: true, type: String },
    image: String,
    degrees: [String],
    designation: String,
    specialty: {
        name: String,
        slug: String,
        category: String
    },
    expertise: [String],
    workplace: {
        name: String,
        city: String,
        division: String
    },
    appointment: {
        phone: [String]
    },
    chambers: [
        { name: String, city: String, address: String }
    ],
    conditionsTreated: [String],
    fees: {
        newPatient: { required: true, type: String },
        followUp: { required: true, type: String },
        reportReview: String,
    },
    rating: String
},{ timestamps: true })


const model = mongoose.model("doctor",schema)

module.exports = model