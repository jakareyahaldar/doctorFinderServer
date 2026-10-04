const express = require("express")
const router = express.Router()
const { login, token_verify, update_credentials } = require("../controllars/auth.controllars.js")


router.post("/login", login)
router.post("/update-credentials", update_credentials)
router.get("/token-verify", token_verify)



module.exports = router