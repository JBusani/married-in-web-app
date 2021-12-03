import React, { useContext, useState, useEffect } from "react"
import { auth } from "../components/Firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("jake")
  const [loading, setLoading] = useState(true)

  function createAccount(email, password){
      return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
}
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(user);
      setLoading(false)
    })
    return unsubscribe
  }, [])
  const value = {
    currentUser,
    createAccount,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

