import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "../secrets.js";

initializeApp({ // connect to our Firebase PROJECT
  credential: cert(credentials) // using these credentials
})

export const db = getFirestore() // connect us to FireSTORE DB