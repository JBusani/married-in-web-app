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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false);
    })
    return unsubscribe
  }, [])

  //DB firestore

  //Read Data for display
  const [dashboardFamilyArray, setDashboardFamilyArray] = useState();
  useEffect(()=>{  
    if(currentUser){
    async function readData(){
    let families = [];
    const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/families`));
    console.group("This is the context useEffect for reading data: ", currentUser.uid)

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        families.push(doc.data());
      });
      setDashboardFamilyArray(families);
    }
    readData();
  }
}, [currentUser]);
  console.group("dashboard Array : ", dashboardFamilyArray)
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
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

