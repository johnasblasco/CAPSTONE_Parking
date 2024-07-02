import express from 'express'
import {ADMIN} from '../models/adminM.js'


const router = express.Router();


router.post("/", async(req,res) =>{

      try {
            if(!req.body.username ||!req.body.password ){
                  return res.status(400).send("includes all information please")
            }
            // if nakapag input lahat ganto gagawen
            const newAdmin = {
                  username : req.body.username,
                  password : req.body.password
            }

            const admin = await ADMIN.create(newAdmin);
            return res.status(201).json(admin)


      } catch (error) {
            res.json(error)
      }
})



router.get("/", async(req,res) => {
      ADMIN.find({})
      .then(result =>{
            res.json(result)
      })
      .catch(error => res.json(error))
})

export default router
