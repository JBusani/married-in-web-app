import React, { useState} from 'react';
import Tree from "../tempData/familytree.json"
import FamilyCard from './FamilyCard';
import styles from '../index.module.css';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import CreateCollection from './CreateCollection';

const Dashboard = () => {
    const {currentUser, logout} = useAuth();
    let navigate = useNavigate();
    const [ openCollection, setOpenCollection ] = useState(false);
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

    return (
        <div className={styles.wrapper}>
            <h2>Profile: {currentUser.email}</h2>
            {errors && <p>{errors}</p>}
            <strong> Email: </strong>{currentUser?.email}
            <button onClick={handleLogOut}>Sign Out</button>
            <Link to="/update-profile">Update Profile</Link>
            <h3 style={{textAlign: "center"}}> Families </h3>
            <div className={styles.view}>
                {Tree.map((f,index)=> (<button key={index} className={styles.viewButton} onClick={handleView} value={index}>{f.familyName} / {f.headOfHouse[0]}</button>))}
                <button className={styles.viewButton} style={{backgroundColor: "lightgreen"}} onClick={handleOpenCollection} > + Create New </button>
            </div>
            {openCollection ? <CreateCollection /> : <FamilyCard family={Tree[view]} /> }
        </div>  
    )
}

export default Dashboard;