import express from 'express'
import {VEHICLE} from '../models/vehicle.js'

const router = express.Router()

// socket IO instance
let io;

export function vehicleInit(ioInstance) {
  io = ioInstance;
}



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
                  status : true,
                  charges: req.body.charges,
                  extraCharges: 0,
            }

            const vehicle = await VEHICLE.create(newVehicle);
            io.emit('newVehicle', vehicle);
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

router.put("/:id", async (req, res) => {
      try {
          const { id } = req.params;
  
          // Update the vehicle in the database and return the updated document
          const updatedVehicle = await VEHICLE.findByIdAndUpdate(id, req.body, { new: true });
  
          if (!updatedVehicle) {
              return res.status(404).json({ message: 'Vehicle not found' });
          }
  
          // Emit the updated vehicle
          io.emit('updateVehicle', updatedVehicle);
          console.log('Emitted updated vehicle:', updatedVehicle);
  
          // Send the updated vehicle data and status in one response
          return res.status(200).json(updatedVehicle);
  
      } catch (error) {
          console.log("Error updating vehicle:", error);
          return res.status(500).send({ message: error.message });
      }
  });
  

export default router