const router = require("express").Router()
const db = require("../dbConfig")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.get("/login", async(req, res) => {
  const username = req.body.username
  const password = req.body.password

  try{

    if(!username || !password) return res.status(400).json({message: "Please make sure to enter all the required details"})

    const checkIfUserExists = await db.query("SELECT username, hashed_password, profile_image")

  }catch(err){

  }

})

router.post("/signup", async(req,res) => {
  const username = req.body.username
  const password = req.body.password
  try{
    if(!password || !username) return res.status(400).json({message: "Please be sure to fill in all the required details."})

    const checkUsernameExistsQuery = await db.query("SELECT * FROM USERS WHERE username ILIKE $1", [username])
    if(checkUsernameExistsQuery.rowCount > 0){
      return res.status(400).json({
        message: "Could not create an account since there already exists an account with the above username"
      })
    }
    const salt = await bcrypt.genSalt() //generates a salt which we can then use to hash the password
    const hashedPass = await bcrypt.hash(password,salt)
    console.log(hashedPass)
    const addUserQuery = await db.query("INSERT INTO users(username,hashed_password,profile_image,joined_on) VALUES ($1, $2, $3, $4) returning id", [username, hashedPass,"https://img.freepik.com/premium-vector/people-happy-face-man-icon_24640-19226.jpg?w=2000", new Date()])

    if(addUserQuery.rowCount > 0){
      const authCookie = jwt.sign({
        userID: addUserQuery.rows[0].id,
        username,
        url:"https://img.freepik.com/premium-vector/people-happy-face-man-icon_24640-19226.jpg?w=2000"
      }, process.env.JWT_SECRET)
      res.cookie("authCookie", authCookie, { httpOnly: true }).json({
        userID: addUserQuery.rows[0].id,
        url: "https://img.freepik.com/premium-vector/people-happy-face-man-icon_24640-19226.jpg?w=2000",
        message: "Successfully created your account!"
      })
    }


  }catch(err) {
    res.status(400).json({
      message: "Something went wrong!",
      errorDetails: err.message
    })
  } 
})

module.exports=router