import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors'
import { login, signup } from './src/users.js'
import { getEvents, addEvents, getEvent, updateEvent,deleteEvent } from './src/events.js'
// const PORT = 5000



const app = express()
app.use(cors())
app.use(express.json())

 
// app.post('/create', (req, res)=>{
//   res.send({"message":"User created successfully"})
// })

app.post("/signup", signup)
app.post("/login", login)


app.get("/get-events", getEvents)
app.post("/create-event", addEvents) 
app.get("/get-event/:id", getEvent)
app.put("/update-event/:id", updateEvent)
app.delete("/delete-event/:id",deleteEvent)





// app.listen(PORT, () => {
//   console.log('Am I here .....');
//   console.log(`Listening on  http://localhost:${PORT}...`)
// })


export const api = functions.https.onRequest(app)
