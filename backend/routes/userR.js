import express from 'express'
import {USER} from '../models/userM.js'


const router = express.Router();


router.post("/", async(req,res) =>{

      try {
            if(
                  !req.body.name ||
                  !req.body.username ||
                  !req.body.password ||
                  !req.body.status
            ){
                  return res.status(400).send("includes all information please")
            }
            // if nakapag input lahat ganto gagawen
            const newUser = {
                  name : req.body.name,
                  username : req.body.username,
                  password : req.body.password,
                  status : req.body.status,
            }

            const user = await USER.create(newUser);
            return res.status(201).json(user)


      } catch (error) {
            res.json(error)
      }
})



router.get("/", async(req,res) => {
      USER.find({})
      .then(result =>{
            res.json(result)
      })
      .catch(error => res.json(error))
})

export default router
