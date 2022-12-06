const router = require("express").Router()
const db = require("../dbConfig")
router.post("/signup", async(req,res) => {
  console.log(req.body)
  try{
    res.send("SIGNUP")
  }catch(err) {

  } 
})

module.exports=router