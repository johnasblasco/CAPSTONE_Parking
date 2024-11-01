import mongoose from "mongoose";

const settingsSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    parkingRules: {
      type: String,
    },
    twoWheels: {
      type: Number,
      required: true,
    },
    threeAndFourWheels: {
      type: Number,
      required: true,
    },
    ticket34: {
      type: Number,
      required: true,
    },
    ticket2: {
      type: Number,
      required: true,
    },
    hoursLimit: {
      type: Number,
      default: 0, // Optional: Set a default value if needed
    },
    overtimeFees: {
      type: Number,
      default: 0, // Optional: Set a default value if needed
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // Optional: Automatically add createdAt and updatedAt fields
);

export const SETTINGS = mongoose.model("Settings", settingsSchema);
