import { initializeApp } from "firebase/app"

// Web config is public by design.
const firebaseConfig = {
  apiKey: "AIzaSyDMIxfZOGvONZA7xDcdClkULMQaX1ChMz4",
  authDomain: "wizard1-f16de.firebaseapp.com",
  projectId: "wizard1-f16de",
  storageBucket: "wizard1-f16de.firebasestorage.app",
  messagingSenderId: "1094200768569",
  appId: "1:1094200768569:web:c5850fc4174a947565f5e8",
}

export const app = initializeApp(firebaseConfig)
