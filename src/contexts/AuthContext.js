import React, { useContext, useState, useEffect } from "react"
import { auth, db, } from "../components/Firebase"
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updateProfile,
  
} from "firebase/auth";
import { setDoc, doc, getDocs, collection, onSnapshot} from "firebase/firestore";

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
    console.group('starting useEffect in Context')
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false);
    })
    console.group('ending useEffect in Context')
    return unsubscribe
  }, [])

  //DB firestore

  //add user to users collection
  function createUserDocument(userId, email){
    try{
      setDoc(doc(db, "users/" + email), {
        email: email,
        userId: userId,
        families: [],
        members: [],
      })
    }catch(e){
      console.error("Error adding document: ", e);
    }
  }


  const value = {
    currentUser,
    createAccount,
    signin,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    sendEmailVerification,
    createUserDocument,
    getDocs,
    collection,
    onSnapshot,
    db,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

