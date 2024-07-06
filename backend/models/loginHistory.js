import mongoose from "mongoose";

const loginHistory = mongoose.Schema(
      {
            name:{
                  type: String,
                  required: true,
            },
            timeIn:{
                  type: Date,
                  required: false,
            },
            timeOut:{
                  type: Date,
                  required: false,
            }

      }
)

export const LOGHISTORY = mongoose.model("loginHistory",loginHistory)