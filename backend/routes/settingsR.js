import express from "express";
import { SETTINGS } from '../models/settingsM.js';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Destructure req.body
    const { companyName, twoWheels, threeAndFourWheels, pricePerTicket, parkingRules, hoursLimit, overtimeFees, image } = req.body;

    if (!companyName || !twoWheels || !threeAndFourWheels || !pricePerTicket) {
      return res.status(400).send("Please include all required information.");
    }

    const newSettings = {
      companyName,
      parkingRules,
      twoWheels,
      threeAndFourWheels,
      pricePerTicket,
      hoursLimit,
      overtimeFees,
      image: image || '', // Optional image or default value
    };

    const settings = await SETTINGS.create(newSettings);
    return res.status(201).json(settings);
  } catch (error) {
    console.error('Error in POST request:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});

router.put("/", async (req, res) => {
  try {
    console.log('Request received:', req.body); // Add this for debugging

    const { companyName, parkingRules, twoWheels, threeAndFourWheels, pricePerTicket, hoursLimit, overtimeFees, image } = req.body;
    if (!companyName || !twoWheels || !threeAndFourWheels || !pricePerTicket) {
      return res.status(400).send("Please include all required information.");
    }

    const settings = await SETTINGS.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings Value not found." });
    }

    settings.companyName = companyName || settings.companyName;
    settings.parkingRules = parkingRules || settings.parkingRules;
    settings.twoWheels = twoWheels || settings.twoWheels;
    settings.threeAndFourWheels = threeAndFourWheels || settings.threeAndFourWheels;
    settings.pricePerTicket = pricePerTicket || settings.pricePerTicket;
    settings.hoursLimit = hoursLimit || settings.hoursLimit;
    settings.overtimeFees = overtimeFees || settings.overtimeFees;
    settings.image = image || settings.image;

    await settings.save();
    return res.status(200).json({ message: "Settings updated successfully", settings });
  } catch (error) {
    console.error('Error in PUT request:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const settings = await SETTINGS.findOne(); // Use findOne() to fetch a single document
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.json(settings);
  } catch (error) {
    console.error('Error in GET request:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});

export default router;
