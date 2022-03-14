import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import styles from './navigation.module.css'
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logoCropped.jpg"

const Navigation = () => {
    return (
        <>
        <nav className={styles.navContainer}>
            <Link className={styles.link} to="/">Married In</Link>            
            <Link className={styles.link} to="dashboard">Dashboard</Link>
        </nav>
        </>
        
    )
}
export const NavigationFooter = () =>{
    return (
        <>
        <div>
            Site Map:
            <ul>
                <li><Link className={styles.link} to="/">Married In</Link></li>
                <li><Link className={styles.link} to="dashboard">Dashboard</Link></li>
            </ul>
        </div>
        </>
    )
}
export default Navigation;
