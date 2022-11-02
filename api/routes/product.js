const Product = require("../models/Product");
const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require("express").Router();

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) =>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req,res)=>{
    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})
            res.status(200).json(updatedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async(req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get('/find/:id', async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qGenre = req.query.genre;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qGenre) {
        products = await Product.find({
          genre: {
            $in: [qGenre],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;