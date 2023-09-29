//import carts model
const carts= require('../models/cartSchema')

//add to cart collection
exports.addToCart = async(req,res)=>{
    //get products details from the request
    const {id,title,price,image,quantity}= req.body
     
    //logic 
    try{

        //Check if the product is already in the cart
        const products = await carts.findOne({id})
        if(products){
            //Product is present in the cart, update the qauntity and price accordingly
            products.quantity +=1 

            //update the grand Total
            products.grandTotal=products.price*products.quantity
        
            //save changes to the db
            products.save()

            //send response back to the client
            res.status(200).json("Product details updated")
        }
        else{
            //Product is not present in the cart ,Add product to cart
            const newProduct = new carts({
                id,title,price,image,quantity,grandTotal:price

            }
                
            )

            //save new product details
            newProduct.save()

            //send response back to client
            res.status(200).json("Product added successfully")

        }
        

    }
    catch(error){
        res.status(404).json(error)
    }


}

//get cart product
exports.getCart = async (req,res)=>{
  
    try{

        //logic for get cart product from database

        const getacart= await carts.find();
       


            res.status(200).json(getacart);

        
    
        
    }
    catch(error){

       res.status(404).json(error)

    }
}
    //delete a product from the cart
    exports.deleteCartProduct=async(req,res)=>{
    //get product id from the request
    const {id} = req.params
    //remove product from the cart
    try{
        const removeProduct = await carts.deleteOne({id})//product deleted
        if(removeProduct.deleteCount != 0){
            //get all remaining products from the cart'
            
            const allProducts =await carts.find()
            res.status(200).json(allProducts) //response send back to client


        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

//logic for increment and decrement of quantity
exports.incrementProduct=async(req,res)=>{
//find product id from the cart
const{id}=req.params

    try{

        //if the product is already in the cart then qunatity will be increment by 1
        const product=await carts.findOne({id})
        if(product){
            product.quantity +=1;
            //update the grandTotal
            product.grandTotal=product.price*product.quantity
            //save changes to database
            await product.save()
        //after the product has been saved, updated the content into the client side
        const allCart=await carts.find()
        res.status(200).json(allCart)

        }
        else{
            res.status(401).json("Product not found")
        }


    }
    catch(error){
      res.status(404).json(error)
    }
}

//decrement Quantity
exports.decrementProduct=async(req,res)=>{
    const {id}=req.params
    try{
   const product=await carts.findOne({id})
   if(product){
    //remove the product from the cart
   
    //decrement qunatity
    product.quantity -=1;
    if(product.quantity==0){
        await carts.deleteOne({id})
        //remaining products will send back to the client
        
    }
    else{

        const allCart=await carts.find()
        res.status(200).json(allCart)
            //decrement of price
    product.grandTotal=product.price*product.quantity;
    

    //save the changes in database
    await product.save()
    }
  



    
    


   }

   else{
    res.status(401).json("Product not found")
   }

    }
    catch(error){
        res.status(404).json(error)
    }
}
