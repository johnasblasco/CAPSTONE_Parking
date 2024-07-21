import express from "express"
import {EARNINGS} from '../models/earnings.js'


const router = express.Router()

router.post("/", async(req,res) => {

      try {
            const newEarnings = {
                  totalEarnings : req.body.totalEarnings
            }
      
            const earnings = await EARNINGS.create(newEarnings);
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

export default router