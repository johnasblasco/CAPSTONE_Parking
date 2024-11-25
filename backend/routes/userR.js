import express from 'express'
import {USER} from '../models/userM.js'


const router = express.Router();


router.post("/", async(req,res) =>{

      try {
            if(
                  !req.body.name ||
                  !req.body.username ||
                  !req.body.password
                  
            ){
                  return res.status(400).send("includes all information please")
            }
            // if nakapag input lahat ganto gagawen
            const newUser = {
                  name : req.body.name,
                  username : req.body.username,
                  password : req.body.password,
                  status : req.body.status,
                  login : req.body.login,
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

// with id

router.get("/:id",(req, res)=>{  

      const {id} = req.params
      // then / promises
      USER.findById(id)
      .then(result => {
            res.json(result);
      })
      .catch(err => {
            res.json(err);
      });

})

router.put("/:id", async(req, res) => {
      try {
            if(
                  !req.body.name ||
                  !req.body.username ||
                  !req.body.password
                
                  
            ){
                  return res.status(400).send({message: "send mo lahat"})
            }

            const {id} = req.params;

            const result = await USER.findByIdAndUpdate(id, req.body)

            if(!result){
                  return res.status(404).json({message: 'user not found'})
            }

            return res.status(200).send({message: 'User updated successfully'})

      } catch (error) {
            console.log("error sa update")
            req.status(500).send({message: error.message})
      }
})


export default router
