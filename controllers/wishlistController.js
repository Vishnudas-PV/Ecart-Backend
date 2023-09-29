//logic for wishLists
//import wishLists form model
const wishlists = require('../models/wishlistSchema')
const wishList=require('../models/wishlistSchema')

//logic for add wishlist
exports.addToWishlist=async(req,res)=>{
    //get product details 
    // req.body={
    //     id:9890,
    //     title:'err',
    //     price:'688'
    // }
    // - Probably we give like this but here we cant set like this because the data is dependent ,So we use destructuring
    // Destructuring 
    // syntax:  = const {id,title,price,image}=req.body
        const {id,title,price,image}=req.body

        //logic

        try{
              //check the product is already available in wishlists
        const item = await wishlists.findOne({id})
        if(item){
            res.status(401).json("Product already available in Wishlist")
        }
        else{
            //add a new product  to  the wishlists
             const newProduct = new wishlists({id,title,price,image})
             //To store the new product in the wishlists
             await newProduct.save()
             //send response back to the client
             res.status(200).json("Product added successfully")

        }
}
catch(error){
    res.status(200).json(error)
}

        }
      
// get all wishlist products
exports.getWishListsItems=async (req,res)=>{

    //logic

    try{
const allWishlist=await wishlists.find()
res.status(200).json(allWishlist) // wishlists products details


    }
    catch(error){

        res.status(404).json(error)
    }
}

//delete a particular product from the  wishlist  
exports.deleteProduct=async (req,res)=>{
    //logic - id get - delete - to fetch remaining product details 
    //get if from request
    const{id}=req.params
    try{
  
        const removeProduct=await wishlists.deleteOne({id})
        //get remaining product details after deleting a particular product
        if(removeProduct){
            const allItems= await wishList.find()
            res.status(200).json(allItems)
        }


    }
    catch(error){
      
        res.status(404).json(error)
    }
}