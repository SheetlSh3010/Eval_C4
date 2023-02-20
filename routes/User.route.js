const express=require("express")
const {UserModel}=require("../model/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cors=require("cors")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{

    const {name,email,pass,age,city}=req.body
    try{
    bcrypt.hash(pass, 5, async(err, hash) =>{
        // Store hash in your password DB.
        if(err){
            console.log(err);
        }
        else{
            let user = new UserModel({name,email,age,city,pass:hash})
            await user.save()
            res.send({"msg":"You have been signup successfully"})
        }
    });
} catch (error) {
    console.log(error);
    res.send({"msg":"some thing went wrong"})
}
})

userRouter.post("/login",async(req,res)=>{
    try {
        let {email,pass}=req.body;
       let data= await UserModel.find({email});
       console.log(data);
       if(data.length>0){
        bcrypt.compare(pass,data[0].pass,(err,result)=>{
            if(result){
                var dataid=data[0]._id;
                
               
                var token = jwt.sign({dataid}, 'masai');
                res.send({"msg":"login successfull","token":token});
            }else{
                res.send({"msg":"You are not authorized"})
            }
        })
       }
       else{
        res.send("wrong credentials")
       }
    } catch (error) {
        res.send({"msg":"some thing went wrong"})
        console.log(error);
    }
});





module.exports={
    userRouter
}