const express = require("express")
const { add_doctor, get_doctors, edit_doctor, delete_doctors } = require("../controllars/doctor.controllars.js")
const router = express.Router()


// /doctor/insert
router.post('/',add_doctor)
router.put('/',edit_doctor)
router.delete('/',delete_doctors)
router.get('/',get_doctors)






module.exports = router