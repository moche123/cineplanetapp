import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyDMhZQTLPK72vwAsdZvpYpvj5Jk1echwYI",
    authDomain: "cineplanetapp-348400.firebaseapp.com",
    projectId: "cineplanetapp-348400",
    storageBucket: "cineplanetapp-348400.appspot.com",
    messagingSenderId: "386498024375",
    appId: "1:386498024375:web:5719fa7d3c140e8b9b0e32"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  export const signInWithGoogle = async() => {
      return await signInWithPopup(auth,provider)
      
  }

