import express from "express";
import { SETTINGS } from '../models/settingsM.js';

const router = express.Router();

// POST route to create new settings
router.post("/", async (req, res) => {
  try {
    const { companyName, parkingRules, twoWheels, threeAndFourWheels, ticket34, ticket2, hoursLimit, overtimeFees, image } = req.body;

    const missingFields = [];
    if (!companyName) missingFields.push('companyName');
    if (!parkingRules) missingFields.push('parkingRules');
    if (!twoWheels) missingFields.push('twoWheels');
    if (!threeAndFourWheels) missingFields.push('threeAndFourWheels');
    if (!ticket34) missingFields.push('ticket34');
    if (!ticket2) missingFields.push('ticket2');
    if (!hoursLimit) missingFields.push('hoursLimit');
    if (!overtimeFees) missingFields.push('overtimeFees');

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Please include the following required information: ${missingFields.join(', ')}` });
    }

    const newSettings = {
      companyName,
      parkingRules,
      twoWheels,
      threeAndFourWheels,
      ticket34,
      ticket2,
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

// PUT route to update existing settings
router.put("/", async (req, res) => {
  try {
    const { companyName, parkingRules, twoWheels, threeAndFourWheels, ticket34, ticket2, hoursLimit, overtimeFees, image } = req.body;

    const missingFields = [];
    if (!companyName) missingFields.push('companyName');
    if (!parkingRules) missingFields.push('parkingRules');
    if (!twoWheels) missingFields.push('twoWheels');
    if (!threeAndFourWheels) missingFields.push('threeAndFourWheels');
    if (!ticket34) missingFields.push('ticket34');
    if (!ticket2) missingFields.push('ticket2');

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Please include the following required information: ${missingFields.join(', ')}` });
    }

    const settings = await SETTINGS.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found." });
    }

    // Update settings only with the provided values
    settings.companyName = companyName;
    settings.parkingRules = parkingRules;
    settings.twoWheels = twoWheels;
    settings.threeAndFourWheels = threeAndFourWheels;
    settings.ticket34 = ticket34;
    settings.ticket2 = ticket2;
    settings.hoursLimit = hoursLimit;
    settings.overtimeFees = overtimeFees;
    settings.image = image || settings.image; // Keep existing if not provided

    await settings.save();
    return res.status(200).json({ message: "Settings updated successfully", settings });
  } catch (error) {
    console.error('Error in PUT request:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});

// GET route to retrieve current settings
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
