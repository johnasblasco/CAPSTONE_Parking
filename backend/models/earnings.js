import mongoose from "mongoose";

const earnings = mongoose.Schema(

      {
            currentDate : {  
                  type : Date,
                  required : true,
            },

            earnings : {
                  type : Number,
                  required : true,
            }
      }

)
export const EARNINGS = mongoose.model("earnings",earnings)