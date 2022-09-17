const  express =require("express")
const app=express()
const mongoose=require('mongoose')
const cors=require("cors")

 
const jwt =require('jsonwebtoken')
const Registeruser =require("./model")
const middleware=require("./middleware")

app.use(express.json())
app.use(cors({orgin:"*"}))

mongoose.connect("mongodb+srv://srikanth:srikanth@cluster0.znxgqvo.mongodb.net/test").then(
    ()=>console.log("DB connected..")
)     


 
app.post('/register' ,async(req,res)=>{
    try{
       const{username,email,password,conformpassword}=req.body

       let exist=await Registeruser.findOne({email})

       if (exist){
        return res.status(400).send("User Already Exist")
       }
       if (password!==conformpassword){
        return res.status(400).send("Password are not Matching")
       }
       let newUser=new Registeruser({
        username,
        email,
        password,
        conformpassword
       })
       await newUser.save()
       res.status(200).send("Resgister User Sucessfully")

    }catch(e){
        console.log(e)
          
         return res.status(500).send("Internal Sever Error")
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body

        let exist=await Registeruser.findOne({email})
        if(!exist){
            return res.status(400).send("User Not found")
        }
        if(exist.password!==password){
            return res.status(400).send("Invaild Credentials")
        }
        let payload={
            user:{
                id:exist._id
            }
        }
        jwt.sign(payload,"jwtSecret",{expiresIn:3600000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})
            })

    }
    catch(e){
    console.log(e)
    return res.status(500).send("Sever Error")
    }
})

app.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await Registeruser.findById(unique.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})
app.listen(5000,()=>{
    console.log("server is running...")
})
