import mongoose from "mongoose";

const vehicleHistoryScheme = mongoose.Schema(
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
            }
           
      },
      {
            timestamps : true
      }

)

export const VEHICLEHISTORY = mongoose.model("vehicleHistory",vehicleHistoryScheme)