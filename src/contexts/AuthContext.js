import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../components/Firebase"
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile
} from "firebase/auth";
import {collection, addDoc } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

  function createAccount(email, password){
    const user = createUserWithEmailAndPassword(auth, email, password);
    
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
  function resetPassword(email){
    const reset = sendPasswordResetEmail(auth, email);
    return reset;
  }
  function updateUserEmail(newEmail){
    const emailUpdated = updateEmail(currentUser, newEmail);
    return emailUpdated;
  }
  function updateUserPassword(newPassword){
    const passwordUpdated = updatePassword(currentUser, newPassword);
    return passwordUpdated;
  }
  function updateUserProfile(displayName, photoURL){
    const profileUpdated = updateProfile(currentUser, {
      displayName, 
      photoURL})
    return profileUpdated;
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false);
    })
    return unsubscribe
  }, [])

  //DB firestore
 
  //add user to users collection
  


  const value = {
    currentUser,
    createAccount,
    signin,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    sendEmailVerification
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

