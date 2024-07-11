import express from 'express'
import {VEHICLE} from '../models/vehicle.js'

const router = express.Router()


router.post('/', async(req,res) => {

      try {
            if(
                  !req.body.ticketNumber ||
                  !req.body.startDate ||
                  !req.body.plateNumber ||
                  !req.body.category 
                  
            ){
                  return res.status(400).send("includes all information please")
            }
            const newVehicle = {
                  ticketNumber : req.body.ticketNumber,
                  startDate : req.body.startDate,
                  plateNumber : req.body.plateNumber,
                  category : req.body.category,
                  endDate : null,
                  status : true
            }

            const vehicle = await VEHICLE.create(newVehicle);
            return res.status(201).json(vehicle)
            
      } catch (error) {
            res.json(error)
      }

})

router.get("/", async(req,res) => {
      VEHICLE.find({})
      .then(result =>{
            res.json(result)
      })
      .catch(error => res.json(error))
})


router.get("/:id",(req, res)=>{  

      const {id} = req.params
      // then / promises
      VEHICLE.findById(id)
      .then(result => {
            res.json(result);
      })
      .catch(err => {
            res.json(err);
      });

})
export default router