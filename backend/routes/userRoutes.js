const express = require("express")
const User = require("../models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const passport = require("passport")
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const { registerRules, validator } = require("../middlewares/validator");
const isVolunteer = require("../middlewares/isVolunteer");
const upload = require("../utils/multer");
const router = express.Router()


/**
 * @method Post
 * @description register
 * @path '/users/registerUser' 
 * */

// register user

router.post("/registerUser",registerRules(),validator, isVolunteer,async (req, res)=>{
    const {email, password, passwordConfirmation}= req.body
    //  const url = `${req.protocol}://${req.get('host')}`;
    // console.log(req.file);
    // const { file } = req;
    try {
        const existUser= await User.findOne({email})
        if(existUser) {return res.status(400).send({msg: "user already exist, please login"})}

        const newUser = new User({...req.body})
        const hashedPassword = await bcrypt.hash(password, 10)
        const hashedConfirmation  = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        newUser.password= hashedPassword;
        newUser.passwordConfirmation= hashedConfirmation;
        // newUser.image = `${url}/${file.path}`;

        await newUser.save() 
        res.send({msg: "user registred with success", newUser})

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
        
    }
})


//login user 

router.post("/login", async (req, res)=>{
    const {password, email}= req.body
    try {
        const existedUser = await User.findOne({email})
        if(!existedUser){ return res.status(400).send({msg:"Please Add Email or Password"})}

      const passwordMatched = await bcrypt.compare(password, existedUser.password)
      if(!passwordMatched){ return res.status(400).send({msg: "Invalid email or password"})}

      const payload={idUser: existedUser._id}
      const token = await jwt.sign(payload,process.env.secretOrPrivateKey)
      res.send({user: existedUser, token})
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    
    }
})

router.get("/currentUser", isAuth(), (req, res)=>{
res.send(req.user)
})  

router.get("/allUsers", isAuth(), isAdmin ,async (req, res)=>{
try {
    const Users = await User.find({})
    res.send(Users)
} catch (error) {
    res.status(400).send(error.message)
}
    
    })  


    router.get("/currentUser",isAuth(), async(req, res)=>{
   res.send(req.user)
    })

    router.get("/allUsers",isAuth(), isAdmin, async(req, res)=>{
        try {
            const users = await User.find({})
            res.send(users)
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

    router.put("/editUser",isAuth(), upload("user").single("file") , async (req, res)=>{
    const {_id, password, passwordConfirmation} = req.user
    console.log(req.user)

     const url = `${req.protocol}://${req.get('host')}`;
    console.log(req.file);
    const { file } = req;
    

        try {
           const image = `${url}/${file.path}`;
            const result = await User.updateOne({_id}, {$set:{...req.body, image}});
            const UpdatedUser = await User.findOne({_id});
            return res.send({msg: "User upadated", UpdatedUser})
        } catch (error) {
    
            console.log(error)
            res.status(400).send(error.message)
            
        }
    })

module.exports= router