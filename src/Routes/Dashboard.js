import React, { useState, useEffect} from 'react';
import Tree from "../tempData/familytree.json"
import FamilyCard from '../components/FamilyCard';
import styles from '../index.module.css';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import CreateCollection from '../components/CreateNewFamily';
import { sendEmailVerification } from 'firebase/auth';



const Dashboard = () => {
    const {currentUser, logout, getDocs, collection, onSnapshot, db} = useAuth();
    const [dashboardFamilyArray, setDashboardFamilyArray] = useState([]);
    let navigate = useNavigate();
    const [ openCollection, setOpenCollection ] = useState(false);
    const [ errors, setErrors ] = useState("");

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
    },[]);

    
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
    function handleCloseCollection(){
        setOpenCollection(false);
    }
    function resendVerificationEmail(){
        sendEmailVerification(currentUser);
    }
    console.group("Dashboard: Current User: " , currentUser)
  
    

    
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
                    {dashboardFamilyArray ? dashboardFamilyArray.map((family,index)=> (<button key={index} className={styles.viewButton} onClick={handleView} value={index}>{family.family}</button>)) : <p>Create Your first family!</p>}
                    <button className={styles.viewButton} style={{backgroundColor: "lightgreen"}} onClick={handleOpenCollection} type="button" > + Create New </button>
                </div> 
                {openCollection ? <CreateCollection user={currentUser.uid} handleCloseCollection={handleCloseCollection} /> : null }
                <FamilyCard dashboardFamilyArray={dashboardFamilyArray} view={view} />
            </div>
    )
}

export default Dashboard;