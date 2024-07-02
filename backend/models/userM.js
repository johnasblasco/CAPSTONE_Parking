import mongoose from "mongoose";

const userScheme = mongoose.Schema(
      {
            name:{
                  type: String,
                  required: true,
            },
            username:{
                  type: String,
                  required: true,
            },
            password:{
                  type: String,
                  required: true,
            },
            status:{
                  type: Boolean,
                  required: true,
            },
      },

      {
            timestamps : true
      }

)
export const USER = mongoose.model("user",userScheme)