import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Layout from './components/Layout'
import Tree from "./tempData/familytree.json"
import FamilyCard from './components/FamilyCard'
//CSS
import styles from './index.module.css';

console.log(Tree[1])

const App = (props) => {
    const [ view, setView ] = useState(0)
    const handleView = (event) => {
        setView(event.target.value)
        console.log(event.target.value)
    }
 return (
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
 )
 }
ReactDOM.render(<App />, document.getElementById('app'));