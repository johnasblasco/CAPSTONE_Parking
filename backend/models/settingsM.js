import mongoose from "mongoose";

const settingsScheme = mongoose.Schema(
      {
            companyName:{
                  type: String,
                  required: true,
            },
            parkingRules:{
                  type: String,
            },
            twoWheels:{
                  type: Number,
                  required: true,
            },
            threeAndFourWheels:{
                  type: Number,
                  required: true,
            },
            pricePerTicket:{
                  type: Number,
                  required: true,
            },
            hoursLimit:{
                  type: Number,
            },
            overtimeFees:{
                  type: Number,
            },
            image:{
                  type: String,
            }

      }, 

)
export const SETTINGS = mongoose.model("settings",settingsScheme)