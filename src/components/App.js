import React, { useState } from "react";
import Layout from './Layout'
import Tree from "../tempData/familytree.json"
import styles from '../index.module.css';
import FamilyCard from './FamilyCard'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from './Firebase'; 

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [ view, setView ] = useState(0)
  const [user, setUser] = useState({});
  
  
  const handleView = (event) => {
        setView(event.target.value)
        console.log(event.target.value)
    }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
      
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>

      <div className={styles.wrapper}>
         <Layout>
            
            
             <h3 style={{textAlign: "center"}}> Families </h3>
             <div className={styles.view}>
                 {Tree.map((f,index)=> (<button className={styles.viewButton} onClick={handleView} value={index}>{f.familyName} / {f.headOfHouse[0]}</button>))}
                 <button > + Create New </button>
             </div>
            <FamilyCard family={Tree[view]} />
         </Layout>      
     </div>
    </div>
  );
}

export default App;