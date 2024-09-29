import express from 'express'
import {ADMIN} from '../models/adminM.js'
import { LOGHISTORY } from '../models/loginHistory.js';


const router = express.Router();


router.post("/", async(req,res) =>{

      try {
            if(!req.body.username ||!req.body.password ){
                  return res.status(400).send("includes all information please")
            }

            
            // if nakapag input lahat create new Admin
            const newAdmin = {
                  name: req.body.name,
                  username : req.body.username,
                  password : req.body.password
            }

            const admin = await ADMIN.create(newAdmin);
            return res.status(201).json(admin)


      } catch (error) {
            res.json(error)
      }
})

// PUT endpoint to update the existing admin's details
router.put("/", async (req, res) => {
      try {
          console.log('Request received:', req.body);  // Add this for debugging
  
          const { name, username, password } = req.body;
          if (!username || !password) {
              return res.status(400).send("Please include all required information.");
          }
  
          const admin = await ADMIN.findOne();
          if (!admin) {
              return res.status(404).json({ message: "Admin not found." });
          }
  
          admin.name = name || admin.name;
          admin.username = username || admin.username;
          admin.password = password || admin.password;
  
          await admin.save();
          return res.status(200).json({ message: "Admin updated successfully", admin });
      } catch (error) {
          console.error('Error in PUT request:', error);  // Add this for error details
          return res.status(500).json({ message: "An error occurred", error });
      }
  });
  



router.get("/", async(req,res) => {
      ADMIN.find({})
      .then(result =>{
            res.json(result)
      })
      .catch(error => res.json(error))
})



router.post("/loginHistory", async(req,res) => {
     
      try {
            if(!req.body.name ||!req.body.timeIn ){
                  return res.status(400).send("includes all information please")
            }
            const newLogHistory = {
                  name : req.body.name,
                  timeIn : req.body.timeIn,
                  timeOut : req.body.timeOut
            }
            const newLog = await LOGHISTORY.create(newLogHistory);
            return res.status(201).json(newLog)

      } catch (error) {
            console.log(error)
            res.send(error)
      }
      
})

router.get("/loginHistory", async(req,res) => {
      LOGHISTORY.find({})
      .then(result =>{
            res.json(result)
      })
      .catch(error => res.json(error))
})

router.get("/loginHistory/:id",(req, res)=>{  

      const {id} = req.params
      // then / promises
      LOGHISTORY.findById(id)
      .then(result => {
            res.json(result);
      })
      .catch(err => {
            res.json(err);
      });

})

router.put("/loginHistory/:id", async(req, res) => {
      try {
            
            const {id} = req.params;

            const result = await LOGHISTORY.findByIdAndUpdate(id, req.body)

            if(!result){
                  return res.status(404).json({message: 'user not found'})
            }

            return res.status(200).send({message: 'User updated successfully'})

      } catch (error) {
            console.log("error sa update")
            res.status(500).send({message: error.message})
      }
})


export default router
