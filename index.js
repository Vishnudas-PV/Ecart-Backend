
//1 Automatically load .env file into the application
require('dotenv').config()


        //  Import Statements

//2 import express
const express = require('express')

//6 inmport cors
const cors=require('cors') 

// import connection
require('./connection')

//import routes
const router = require('./routes/router')


//3 Create an application using the express
const server = express()

//4 Define the port
const PORT = 5000

//7 Use cors in server app
server.use(cors())
server.use(express.json()) 
server.use(router)

//5 run the application
server.listen(PORT,()=>{
    console.log('listening on port'+PORT);
})

//8 Define routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerce Service started')
})