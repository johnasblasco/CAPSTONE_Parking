import express from 'express'
import { USER } from '../models/userM.js'

const router = express.Router();

// POST route (already correct)
router.post("/", async(req, res) => {
    try {
        if (!req.body.name || !req.body.username || !req.body.password) {
            return res.status(400).send("includes all information please");
        }
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            status: req.body.status,
            login: req.body.login,
        };

        const user = await USER.create(newUser);
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET all users (already correct)
router.get("/", async (req, res) => {
    USER.find({})
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
});

// GET a user by ID (already correct)
router.get("/:id", (req, res) => {
    const { id } = req.params;
    USER.findById(id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

// PUT to update user (fixed)
router.put("/:id", async (req, res) => {
      try {
          const { id } = req.params;
          const { status } = req.body; // Assuming status is being sent in the request body
  
          // Validate if status is a boolean
          if (typeof status !== 'boolean') {
              return res.status(400).json({ message: "Invalid status value" });
          }
  
          const result = await USER.findByIdAndUpdate(id, { status }, { new: true });
  
          if (!result) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          return res.status(200).json({ message: 'User updated successfully', user: result });
      } catch (error) {
          console.log("Error in update:", error);
          res.status(500).json({ message: error.message });
      }
  });
  
// DELETE a user (added)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // This will delete the user
        const result = await USER.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log("error sa delete", error);
        res.status(500).send({ message: error.message });
    }
});

export default router;
