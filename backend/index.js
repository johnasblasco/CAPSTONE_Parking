import {PORT, DATABASE} from './config.js'

//server imports
import express from 'express'
import cors from 'cors'

//database imports
import mongoose from 'mongoose'

//import components
import userR from './routes/userR.js'
import adminR from './routes/adminR.js'
import vehicleR from './routes/vehicleR.js'
const app = express()

app.use(cors())
app.use(express.json())

app.use("/admin",adminR)
app.use("/user",userR)
app.use("/vehicle",vehicleR)


// database/mongo
export const Connection = async() => {
      try {
            await mongoose.connect(DATABASE);
            console.log("boss runing na ang ating database")

            // hindi mag ru run yung server kapag hindi tayo naka connect sa database
            app.listen(PORT, ()=>{
                  console.log(`boss running na backend port ${PORT} tayo`)
            })

           
      } catch (error) {
            console.log("boss hindi tayo maka connect kase baka mali link mo or Ip address")
      }
}
Connection();
