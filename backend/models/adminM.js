import mongoose from "mongoose";

const adminScheme = mongoose.Schema(
      {
            username:{
                  type: String,
                  required: true,
            },
            password:{
                  type: String,
                  required: true,
            },
      },

      {
            timestamps : true
      }

)
export const ADMIN = mongoose.model("admin",adminScheme)