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

router.put("/:id", async(req, res) => {
      try {

            const {id} = req.params;

            const result = await VEHICLE.findByIdAndUpdate(id, req.body)
                        
            if(!result){
                  return res.status(404).json({message: 'Vehicle not found'})
            }

            return res.status(200).send({message: 'Vehicle updated successfully'})

      } catch (error) {
            console.log("error sa update")
            req.status(500).send({message: error.message})
      }
})

export default router