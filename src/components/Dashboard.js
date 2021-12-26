import React, { useState} from 'react';
import Tree from "../tempData/familytree.json"
import FamilyCard from './FamilyCard';
import styles from '../index.module.css';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import CreateCollection from './CreateCollection';
import { sendEmailVerification } from 'firebase/auth';

const Dashboard = () => {
    const {currentUser, logout} = useAuth();
    let navigate = useNavigate();
    const [ openCollection, setOpenCollection ] = useState(true);
    const [ errors, setErrors ] = useState("");
  //view families
  const [ view, setView ] = useState(0)
  const handleView = (event) => {
        setView(event.target.value)
    }  
    async function handleLogOut(){
        setErrors('');
        try{
            logout().then(navigate("/signin", {replace: true}));
        }catch{
            setErrors('Failed to log out');
        }
    }
    function handleOpenCollection(){
        setOpenCollection(true);
    };
    function resendVerificationEmail(){
        sendEmailVerification(currentUser);
    }
    console.group(currentUser)

    return (
        <div className={styles.wrapper}>
            {currentUser.emailVerified ? <span></span> : <p>Please check inbox for verification or resend email<button type='button' onClick={resendVerificationEmail}>Resend</button></p>}
            <h2>Profile: {currentUser.displayName || currentUser.email}</h2>
            {errors && <p>{errors}</p>}
            <strong> Email: </strong>{currentUser?.email}
            <button onClick={handleLogOut}>Sign Out</button>
            <Link to="/update-profile">Update Profile</Link>
            <h3 style={{textAlign: "center"}}> Families </h3>
            <div className={styles.view}>
                {Tree.map((f,index)=> (<button key={index} className={styles.viewButton} onClick={handleView} value={index}>{f.familyName}</button>))}
                <button className={styles.viewButton} style={{backgroundColor: "lightgreen"}} onClick={handleOpenCollection} type="button" > + Create New </button>
            </div> 
            {openCollection ? <CreateCollection user={currentUser.uid} /> : <FamilyCard family={Tree[view]} /> }
        </div>  
    )
}

export default Dashboard;