import express from 'express';
import { USER } from '../models/userM.js';

const router = express.Router();

// POST route
router.post("/", async(req, res) => {
    try {
        if (!req.body.name || !req.body.username || !req.body.password) {
            return res.status(400).send("Includes all information please");
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

// GET all users
router.get("/", async (req, res) => {
    USER.find({})
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
});

// GET a user by ID
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

// PUT to update user
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

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

// DELETE a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await USER.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log("Error in delete:", error);
        res.status(500).send({ message: error.message });
    }
});

// GET route to check if username exists
router.get('/check-username', async (req, res) => {
      try {
          const { username } = req.query;
  
          if (!username) {
              return res.status(400).json({ message: "Username is required" });
          }
  
          const existingUser = await USER.findOne({ username }); // Query database for the username
          const exists = !!existingUser; // Convert to boolean
  
          return res.status(200).json({ exists });
      } catch (error) {
          console.error("Error checking username:", error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  });
  
export default router;
