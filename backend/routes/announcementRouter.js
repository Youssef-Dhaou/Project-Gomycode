const express = require("express");
const { query } = require("express");
const isAuth = require("../middlewares/isAuth");
const { deleteOne } = require("../models/Announcement");
const Announcement = require("../models/Announcement");
const upload = require("../utils/multer");


const router = express.Router()

/** 
 * @method Post
 * @description add announcement
 * @path '/announcements/addAnnouncement'
 */


router.post("/addAnnouncement",isAuth(), upload("announcement").single("file") ,async (req, res)=>{
    const url = `${req.protocol}://${req.get('host')}`;
    console.log(req.file);
    const { file } = req;
    try {
        const newAnnounce = new Announcement({ ...req.body, user: req.user._id });
        newAnnounce.image = `${url}/${file.path}`;
        await newAnnounce.save();
        res.send({newAnnounce,msg:"this announce is successfully added"})
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})

router.get("/", async (req, res)=>{
    try {
        const {status, _id} = req.query 
        const allAnnounce = await Announcement.find({$or:[{status},{_id}]}).populate("user","fullName")
         console.log(status, _id)
        res.send(allAnnounce)
    } catch (error) {
        console.log(error)
        res.status(400).send("failed")
    }
})

router.delete("/:id", async(req, res)=>{
    try {
        const announceDeleted = await Announcement.deleteOne({_id : req.params.id})
        console.log()
        if(announceDeleted.deletedCount){return res.send("Announce deleted")} 
        res.status(400).send({msg: "Already deleted"})

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)

    }
})

router.put("/:id", upload("announcement").single("file"), async (req, res)=>{
    
    const url = `${req.protocol}://${req.get('host')}`;
        console.log(req.file);
        const { file } = req;
    try {
        
        const image = `${url}/${file.path}`;

        const result = await Announcement.updateOne({ _id: req.params.id}, {$set:{...req.body, image}});
        const UpdatedAnnouce = await Announcement.findOne({ _id: req.params.id});
        if(result.modifiedCount){ return res.send({msg: "Announce upadated", UpdatedAnnouce})}
        res.status(400).send({msg:"already updated"})
    } catch (error) {

        console.log(error)
        res.status(400).send(error.message)
        
    }
})


router.get("/oneAnnounce/:id",async(req,res)=>{
    try {
       const oneAnnounce=await Announcement.findOne({_id:req.params.id}) 
       res.send({oneAnnounce})  
      } catch (error) {
          console.log(error)
          res.status(400).send("failed to get the Announce")
      }
   
  }
  )

router.put('/like/:id',isAuth(),async(req,res)=>{

    try {
        const result = await Announcement.findById( req.params.id)

        //chek if the poste is already been liked 
        if(result.likes.filter(like=>like.user.toString()==req.user._id).length>0){
            return res.status(400).send({msg: "announce already liked"})
        }

        result.likes.unshift({user:req.user._id})
        await result.save()
        res.send(result.likes)
    } catch (error) {
        console.log(error.message)  
        res.status(400).send("serveur error")
        
    }
})

router.put('/unlike/:id',isAuth(),async(req,res)=>{

    try {
        const result = await Announcement.findById(req.params.id)
        console.log(result)

        //chek if the poste is already been liked 
        if(result.likes.filter(like=>like.user.toString()==req.user._id).length===0){
            return res.status(400).send({msg: "announce has not been liked"})
        }

        const removeIndex = result.likes.map(like=> like.user.toString()).indexOf(req.user._id)
        result.likes.splice(removeIndex, 1)
        await result.save()
        res.send(result.likes)
    } catch (error) {
        console.log(error.message)  
        res.status(400).send("serveur error")
        
    }
})


module.exports= router;