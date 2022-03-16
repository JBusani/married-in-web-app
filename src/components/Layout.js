import React from 'react';
import Navigation, {NavigationFooter} from './Navigation';
import logo from "../assets/logoCropped.jpg";
import styles from '../components/navigation.module.css';
import { Outlet } from 'react-router-dom';



const Layout = (props) => {
    //context of user id if there is one

    //navigation 
    //login if no user
    //register if no user
    //sign out if user

    return (
        <div>
            <div className={styles.logo}>
                <img src={logo} alt="Married In Logo" />
            </div>
            <Navigation />
            <Outlet />
            <NavigationFooter />
            <p style={{textAlign: "center", fontSize: ".7rem"}}>Married In &copy; {new Date().getFullYear()}</p>
        </div>
    )
}

export default Layout;