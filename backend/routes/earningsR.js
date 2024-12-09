import express from "express"
import {EARNINGS} from '../models/earnings.js'


const router = express.Router()

let io;

export function earningsInit(ioInstance) {
  io = ioInstance;
}

router.post("/", async(req,res) => {

      try {
            const newEarnings = {
                  currentDate : req.body.currentDate,
                  earnings : req.body.earnings
            }
      
            const earnings = await EARNINGS.create(newEarnings);
            io.emit('updateEarnings', newEarnings)
            return res.status(201).json(earnings)
      } catch (error) {
            res.json(error)
      }

})

router.get("/", (req,res) => {
      EARNINGS.find({})
      .then(response => res.json(response))
      .catch(error => res.json(error))
})

router.get("/:id", (req,res) => {
      const {id} = req.params
      EARNINGS.findById(id)
      .then(response => res.json(response))
      .catch(error => res.json(error))
})

router.put("/:id", async(req, res) => {
      try {
      
            const {id} = req.params;

            const result = await EARNINGS.findByIdAndUpdate(id, req.body)

            if(!result){
                  return res.status(404).json({message: 'not found'})
            }
            return res.status(200).json(result)

      } catch (error) {
            console.log(error)
            console.log("error sa update")
      }
})

export default router
