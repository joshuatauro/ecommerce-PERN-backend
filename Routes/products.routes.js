const router = require("express").Router()
const db = require("../dbConfig")


router.post("/add", async(req, res) => {
  const productImagesArray = req.body.imgArray
  const name = req.body.name
  const descArray = req.body.descArray
  const about = req.body.about

  console.log(descArray)
  
  try{
    const addProductQuery = await db.query("INSERT INTO products(title, about, details, images) VALUES ($1, $2, $3, $4) RETURNING id", [name, about, descArray, productImagesArray]) 
    console.log(addProductQuery)
    res.json({
      body: addProductQuery.rows
    })
  }catch(err) {
    console.log(err)
  }
  
  
})
router.get("/:id", async(req, res) => {

  const id = req.params.id

  try{

    const getProductQuery = await db.query("SELECT * FROM products WHERE id=$1", [id])
    console.log(getProductQuery.rows)
    res.status(200).json({
      prodDetails: getProductQuery.rows[0]
    })
  }catch(err) {
    console.log(err)
  } 


})

module.exports=router