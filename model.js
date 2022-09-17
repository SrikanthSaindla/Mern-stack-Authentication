const mongoose=require("mongoose")

let Registeruser=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    conformpassword:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Registeruser",Registeruser)