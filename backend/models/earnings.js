import mongoose from "mongoose";

const earnings = mongoose.Schema(

      {
            currentDate : {  
                  type : Date,
                  required : true,
            },

            totalEarnings : {
                  type : Number,
                  required : true,
            },
            todayEarnings : {
                  type : Number,
                  required : true,
            },
            yesterdayEarnings : {
                  type : Number,
                  required : false,
            }
      }

)
export const EARNINGS = mongoose.model("earnings",earnings)