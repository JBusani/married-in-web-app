import React from "react";
import { Link } from 'react-router-dom'
import styles from './navigation.module.css'

const Navigation = () => {

    return (
        <nav className={styles.navContainer}>
            <Link className={styles.link} to="/">Home</Link>
            <Link className={styles.link} to="/signup">Sign Up</Link>
            <Link className={styles.link} to="/signin">Log In</Link>
        </nav>
    )
}
export default Navigation;