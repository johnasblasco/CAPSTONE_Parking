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



router.post('/loginHistory', async (req, res) => {
      try {
          const { name, timeIn } = req.body;
  
          if (!name || !timeIn) {
              return res.status(400).json({ message: 'Name and timeIn are required' });
          }
  
          const newLogHistory = {
              name,
              timeIn,
              timeOut: null, // Default value
          };
  
          const newLog = await LOGHISTORY.create(newLogHistory);
          res.status(201).json(newLog);
      } catch (error) {
          console.error('Error creating log history:', error);
          res.status(500).json({ message: 'An error occurred while creating the log history' });
      }
  });
  
  // Get all log entries
  router.get('/loginHistory', async (req, res) => {
      try {
          const logs = await LOGHISTORY.find({});
          res.status(200).json(logs);
      } catch (error) {
          console.error('Error fetching log histories:', error);
          res.status(500).json({ message: 'An error occurred while fetching log histories' });
      }
  });
  
  // Get a single log entry by ID
  router.get('/loginHistory/:id', async (req, res) => {
      try {
          const { id } = req.params;
          const log = await LOGHISTORY.findById(id);
  
          if (!log) {
              return res.status(404).json({ message: 'Log entry not found' });
          }
  
          res.status(200).json(log);
      } catch (error) {
          console.error('Error fetching log entry:', error);
          res.status(500).json({ message: 'An error occurred while fetching the log entry' });
      }
  });
  
  // Update timeOut for a log entry (logout)
  router.put('/loginHistory/:id', async (req, res) => {
      try {
          const { id } = req.params;
          const { timeOut } = req.body;
  
          if (!timeOut) {
              return res.status(400).json({ message: 'timeOut is required for logout' });
          }
  
          const updatedLog = await LOGHISTORY.findByIdAndUpdate(
              id,
              { timeOut },
              { new: true } // Return the updated document
          );
  
          if (!updatedLog) {
              return res.status(404).json({ message: 'Log entry not found' });
          }
  
          res.status(200).json({ message: 'Log entry updated successfully', log: updatedLog });
      } catch (error) {
          console.error('Error updating log entry:', error);
          res.status(500).json({ message: 'An error occurred while updating the log entry' });
      }
  });
  
  // Delete a log entry by ID
  router.delete('/loginHistory/:id', async (req, res) => {
      try {
          const { id } = req.params;
  
          const deletedLog = await LOGHISTORY.findByIdAndDelete(id);
  
          if (!deletedLog) {
              return res.status(404).json({ message: 'Log entry not found' });
          }
  
          res.status(200).json({ message: 'Log entry deleted successfully' });
      } catch (error) {
          console.error('Error deleting log entry:', error);
          res.status(500).json({ message: 'An error occurred while deleting the log entry' });
      }
  });
  


export default router
