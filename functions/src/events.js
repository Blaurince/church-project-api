import { FieldValue } from "firebase-admin/firestore";
//mport jwt from "jsonwebtoken";
import { db } from "./dbConnect.js";
//import { resolvePath } from "react-router-dom";


  const collection = db.collection("events");

  

  export async function getEvents(req, res) {
    try {
      
      const eventsCollection = await db.collection("events").limit(4).get();
      console.log(eventsCollection.size); // Check the size of the retrieved collection
      const events = eventsCollection.docs.map(doc => ({...doc.data(), id: doc.id}));
      console.log(events); // Check the retrieved events
      res.send(events);
    } catch (error) {
      console.error(error); // Log any errors that occur
      res.status(500).send("Internal Server Error");
    }
  }
  export async function getAllEvents(req, res) {
    try {
      
      const eventsCollection = await db.collection("events").get();
      console.log(eventsCollection.size); // Check the size of the retrieved collection
      const events = eventsCollection.docs.map(doc => ({...doc.data(), id: doc.id}));
      console.log(events); // Check the retrieved events
      res.send(events);
    } catch (error) {
      console.error(error); // Log any errors that occur
      res.status(500).send("Internal Server Error");
    }
  }

export async function addEvents(req, res) {

const { title, date, location } = req.body
if(!title|| !date || !location) {
  res.status(400).send({ message: "Show title, date, and location are required." })
  return
}
const newEvents = {
  title,
  date,
  location,
  createdAt: FieldValue.serverTimestamp(),
}
await db.collection("events").add(newEvents) // add the new event
getEvents(req, res) // return the updated list
}

export async function getEvent(req, res) {
  try {
    
    const collectionRef = await  collection.doc(req.params.id).get();
    
    if(!collectionRef.exists){
      return res.statu(404).json({error : 'document not found'})
    }
    
    const event = collectionRef.data()

   // res.send(event)
    return res.status(200).send({status: "success", data: event})
    
  } catch (error) {
     return res.status(500).send({status : "failed", msg: error})
  }
}


export async function updateEvent(req, res) {
  try {
   // const id = req.body.id;
   // delete req.body.id;
    const data = req.body;
    const eventRef =  db.collection("events").doc(data.id);

      await  eventRef.update(data);

    
    return res.status(200).send({status: "success", msg: "data updated"})
 
  } catch (error) {
     return res.status(500).send({status: 'failed',masg: {error}})
  }
   
}

export async function deleteEvent(req, res){
try {
   const id = req.params.id
   const EventRef =  db.collection("events").doc(id);
   await EventRef.delete();
   await getEvents(req, res)

   return res.status(200).send({status: "success", msg: "event deleted"})
} catch (error) {
    return res.status(500).send({status: 'failed', msg: {error }})
}
}

 