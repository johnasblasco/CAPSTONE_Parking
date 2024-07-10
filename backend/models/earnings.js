import mongoose from "mongoose";

const earnings = mongoose.Schema(

      {
            totalEarnings : {
                  type : Number,
                  required : false,
            }
      }

)
export const EARNINGS = mongoose.model("earnings",earnings)