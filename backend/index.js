import {PORT, DATABASE} from './config.js'
import axios from 'axios'
//server imports
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

//database imports
import mongoose from 'mongoose'

//import routes
import userR from './routes/userR.js'
import adminR from './routes/adminR.js'
import vehicleR, {init} from './routes/vehicleR.js'
import earningsR from './routes/earningsR.js'

//use express
const app = express()

//my middelware
app.use(cors())
app.use(express.json())

app.use("/admin",adminR)
app.use("/user",userR)
app.use("/vehicle",vehicleR)
app.use("/earnings",earningsR)
     


// database/mongo
const Connection = async() => {
      try {

            await mongoose.connect(DATABASE);
            console.log("boss runing na ang ating database")

           
      } catch (error) {
            // hindi mag ru run yung server kapag hindi tayo naka connect sa database
            console.log("boss hindi tayo maka connect kase baka mali link mo or Ip address", error)
            return
      }
}
Connection();


// ExpressServer (HTTP)
const expressServer = app.listen(PORT, ()=>{
      console.log(`boss running na backend port ${PORT} tayo`)
})


// use my ExpressServer to SocketIO server
const io = new Server(expressServer, { cors: { origin: '*' } });


// socket ON connection
io.on('connection', socket => {
      console.log(`User ${socket.id} connected boss`)



      // send this to all
      const initialData = async () => {
            const vehicle = await axios.get('http://localhost:8000/vehicle');
            socket.emit('vehicles', vehicle.data)
      }
      initialData();
      
})    

      
init(io);