
//To define routes for client requests


//1 import express    - We need express for router . The router that we are using is inside the express
const express = require('express')

//4 Import product controller from controller folder
const productController = require('../controllers/productController')
const wishlistController=require('../controllers/wishlistController')
const cartController=require('../controllers/cartController')
//2 Using express create object for Router class inorder to setup path
const router = new express.Router();

//3 Use router object to  resolve client request 

             //get all products from api request 

 router.get('/products/all-products',productController.getAllProducts) 
 


 //4 Get a particular product details
 router.get('/products/view-product/:id',productController.viewProduct)


//5 add a new product to the wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)


//6 view all wishlist items
router.get('/wishlists/view-all-wishlist',wishlistController.getWishListsItems)

 //7 delete a particular wishlist item
 router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteProduct) 



 //8  add to cart
 router.post('/carts/add-to-cart',cartController.addToCart)

 
 //9 get cart products
 router.get('/carts/get-cart',cartController.getCart)

 //10 delete carts
 router.delete('/carts/delete-product/:id',cartController.deleteCartProduct)

//11 increment qunatity 
router.get('/carts/increment-product/:id',cartController.incrementProduct)

//12 decrement quantity
router.get('/carts/decrement-product/:id',cartController.decrementProduct)


//5 export routes
 module.exports= router

