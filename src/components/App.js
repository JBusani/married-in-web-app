import React, { useState } from "react";
import Layout from './Layout'
import Tree from "../tempData/familytree.json"
import styles from '../index.module.css';
import FamilyCard from './FamilyCard';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";

function App() {

  //view families
  const [ view, setView ] = useState(0)
  const handleView = (event) => {
        setView(event.target.value)
    }  

  /*const logout = async () => {
    await signOut(auth);
  };*/

  return (
    <div className="App">
      <AuthProvider>
        <SignUp />
      


      <h4> User Logged In: </h4>
      {/*user?.email}

      <button onClick={logout}> Sign Out </button>*/}

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
     </AuthProvider>
    </div>
  );
}

export default App;