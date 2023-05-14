import { FieldValue } from "firebase-admin/firestore";
//mport jwt from "jsonwebtoken";
import { db } from "./dbConnect.js";
import { resolvePath } from "react-router-dom";


  const collection = db.collection("events");

export async function getEvents(req, res) {
  const eventsCollection = await db.collection("events").get()
  const events = eventsCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
  res.send(events)
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
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    const event = await db.collection("events").doc(id).update();
    
    return res.status(500).send({status: "success", msg: "data updated"})
 
  } catch (error) {
     return res.status(500).send({status: 'failed',masg: {erro}})
  }
   
}

export async function deleteEvent(req, res){
try {
   const id = req.bodyu.id;
   const Event =  db.collection("events");
   await Event.doc(id).delete();

   return res.status(200).send({status: "success", msg: {error}})
} catch (error) {
    return res.status(500).send({status: 'failed', msg: {error }})
}
}

 