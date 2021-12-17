import React from "react";
import {Outlet} from 'react-router-dom'
import Navigation from "./Navigation";
import logo from "../assets/logoCropped.jpg";
import styles from "../components/navigation.module.css";
import aniLogo from "../assets/marriedIn.mp4";
export default function App() {

  return (
    <div>
      <div className={styles.logo}>
        <img src={logo} alt="Married In Logo" />
      </div>
      <Outlet />
      <Navigation />
      <p style={{textAlign: "center", fontSize: ".7rem"}}>Married In &copy; {new Date().getFullYear()}</p>
    </div>
  );
}
