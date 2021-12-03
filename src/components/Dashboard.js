import React, { useState} from 'react';
import Tree from "../tempData/familytree.json"
import FamilyCard from './FamilyCard';
import styles from '../index.module.css';

const Dashboard = () => {
  //view families
  const [ view, setView ] = useState(0)
  const handleView = (event) => {
        setView(event.target.value)
    }  

    return (
        <div className={styles.wrapper}>            
        <h3 style={{textAlign: "center"}}> Families </h3>
        <div className={styles.view}>
            {Tree.map((f,index)=> (<button className={styles.viewButton} onClick={handleView} value={index}>{f.familyName} / {f.headOfHouse[0]}</button>))}
            <button > + Create New </button>
        </div>
       <FamilyCard family={Tree[view]} />
       
        </div>  
    )
}

export default Dashboard;