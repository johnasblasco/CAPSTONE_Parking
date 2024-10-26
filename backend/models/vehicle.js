import mongoose from "mongoose";

const vehicleScheme = mongoose.Schema(
      {
                  
            ticketNumber : {
                  type: Number,
                  required : true
            },
            startDate : {
                  type: Date,
                  required : true,
            },
            plateNumber : {
                  type : String,
                  required : true,
            },
            category : {
                  type : String, 
                  required : true,
            },
            endDate : {
                  type: Date,
                  required : false,
            },
            status : {
                  type : Boolean,
                  required : false
            },
            charges: {
                  type : Number,
                  required : false
            },
            extraCharges: {
                  type : Number,
                  required : false
            }
           
      },
      {
            timestamps : true
      }

)

export const VEHICLE = mongoose.model("vehicle",vehicleScheme)