const express=require("express")
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {postRouter}=require("./routes/Post.route")
const dotenv = require('dotenv')
const cors=require("cors");
const { authenticate } = require("./middleware/authentication.middleware")
require('dotenv').config()

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error);
        console.log("db is not connected");
    }
    console.log(`server is running at ${process.env.port}`);
})


