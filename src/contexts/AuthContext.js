import React, { useContext, useState, useEffect } from "react"
import { auth } from "../components/Firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("jake")
  const [loading, setLoading] = useState(true)

  function createAccount(email, password){
    const user = createUserWithEmailAndPassword(auth, email, password)
    return user;
  }

  function signin(email, password){
    const signedin = signInWithEmailAndPassword(auth, email, password)
    return signedin;
  }
  function logout(){
    const loggedOut = signOut(auth);
    return loggedOut;
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(loading);
      setLoading(false);
      console.log(`still loading effect: ${loading}`)
    })
    return unsubscribe
  }, [])
  const value = {
    currentUser,
    createAccount,
    signin,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

